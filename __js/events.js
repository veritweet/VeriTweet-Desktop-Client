//alert('registering event');

Titanium.API.addEventListener('showFollowing', function(event)
{
    log("showFollowing event fired"); 
	showFollowing();
	veritweet.getFollowingUpdates();
});	

Titanium.API.addEventListener('updatesReceived', function(event)
{
    log("updatesReceived event fired");
    setStatusMsg('Update check complete!');		

	if ($(".Msg").html()==null) {
		showLatestFeed();
	} else {
		var count = database.getNewFollowingUpdatesCount($(".Msg").attr("time_added"));
		
		setStatusMsg(count+' new updates');		
	
		if (count>0) {
			interfacePrependMsgCount(count);
		}
		
	};
		
});	

log("events registered");