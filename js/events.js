
Titanium.API.addEventListener('updatePosted', function(event)
{
    log("updatePosted event fired"); 
	veritweet.getFollowingUpdates();
});	

Titanium.API.addEventListener('onMsgDisplayBottom', function(event)
{
    log("onMsgDisplayBottom event fired"); 

		var msgcount = 0;								

		//ja tiek radits konkreta usera feed
		if (current_userid!="") {					
					msgcount = database.countUpdatesBefore($(".Msg:last").attr("time_added"), current_userid);
					
					if (msgcount > 19) {
						setStatusMsg('Loading previous 20 updates from database!');
						showUpdatesBefore($(".Msg:last").attr("time_added"), current_userid);	
					} else {						
						time_added = database.getOldestUpdateTimeAdded(current_userid);
						veritweet.getUserUpdatesBefore(time_added, current_userid);
					};
					
				//ja tiek radits visu following feed
				} else {
					msgcount = database.countUpdatesBefore($(".Msg:last").attr("time_added"));
					
					if (msgcount > 19) {
						setStatusMsg('Loading previous 20 updates from database!');
						showUpdatesBefore($(".Msg:last").attr("time_added"));	
					} else {						
						time_added = database.getOldestUpdateTimeAdded();
						veritweet.getFollowingUpdatesBefore(time_added);
					};
				}
							

});	

Titanium.API.addEventListener('onMsgDisplayBottomOlderUpdates', function(event)
{
		log("onMsgDisplayBottomOlderUpdatesDownloaded event fired"); 
	   // alert($(".Msg:last").attr("time_added"));
		if (current_userid!=""){
			showUpdatesBefore($(".Msg:last").attr("time_added"),current_userid);
		} else {
			showUpdatesBefore($(".Msg:last").attr("time_added"));
		};
});


Titanium.API.addEventListener('showFollowing', function(event)
{
    log("showFollowing event fired"); 
	setStatusMsg('Downloding following list profiles and profile images!');
	getFollowingProfiles();
	setStatusMsg('Displaying following list!');
	showFollowing();
	setStatusMsg('Downloding your timeline!');
	veritweet.getFollowingUpdates();
});	

Titanium.API.addEventListener('showFollowers', function(event)
{
    log("showFollowers event fired"); 
	setStatusMsg('Displaying follower list!');
	//alert('Displaying follower list!');
	showFollowers();

});	

Titanium.API.addEventListener('updatesReceived', function(event)
{
    log("updatesReceived event fired");
    setStatusMsg('Update check complete!');		

	//globalais mainigiais updateposted
	if (updateposted==true) {
		showLatestFeed();	
		updateposted=false;
	} else {
	
		//ja laika, kad tiek ladeti updates pariet uz citu useri, tad nerada ka ir jaunas updates main feeda
		if (current_userid=="") {	
	
			if ($(".Msg").html()==null) {
				showLatestFeed();
			} else {
				var count = database.getNewFollowingUpdatesCount($(".Msg").attr("time_added"));
				
				setStatusMsg(count+' new updates');				
				if (count>0) {	
				
					if ($('#automatic_update_loading').is(':checked')) {
						$('#newMsgCount').remove();	
						showLatestFeed();					
					} else {			
						interfacePrependMsgCount(count);
					}
					
				};				
			};
		};
	 };
});	

Titanium.API.addEventListener('onUpdatesReceivedUser', function(event)
{
	// ieliek ka repated_call = true, lai nenotiktu atkartota eventa looposana, gadîjumâ, ja userim kopejais update skaits mazaks par 20
	showUserUpdates(current_userid, true);
});	

Titanium.API.addEventListener('onCheckForUpdatesOnServer', function(event)
{
	if (current_userid=="") {	
		veritweet.getFollowingUpdates();	
	};	

});	

log("events registered");