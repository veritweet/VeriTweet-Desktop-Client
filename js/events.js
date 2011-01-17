//alert('registering event');
Titanium.API.addEventListener('updatePosted', function(event)
{
    log("updatePosted event fired"); 

	//showFollowing();
	veritweet.getFollowingUpdates();
});	


Titanium.API.addEventListener('showFollowing', function(event)
{
    log("showFollowing event fired"); 
	setStatusMsg('Downloding following list profiles and profile images!');
	//getFollowingProfiles();
	setStatusMsg('Displaying following list!');
	showFollowing();
	setStatusMsg('Downloding your timeline!');
	veritweet.getFollowingUpdates();
});	

Titanium.API.addEventListener('showFollowing', function(event)
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
	
			if ($(".Msg").html()==null) {
				showLatestFeed();
			} else {
				var count = database.getNewFollowingUpdatesCount($(".Msg").attr("time_added"));
				
				setStatusMsg(count+' new updates');		
			
				if (count>0) {
					interfacePrependMsgCount(count);
				}
				
			};
		};
});	

log("events registered");