
function xhr_get(queryurl, dataAction) 
  {  
	//Titanium.API.debug("xhr_get: "+queryurl); 
    var xhr = Titanium.Network.createHTTPClient();  
    xhr.onload = function() {
        //Titanium.API.info('HTTP status = ' + this.status);
        //Titanium.API.info('Response text ' + this.responseText);
            
       dataAction(this.responseText);       
    };
        
    xhr.open('GET', 'http://www.veritweet.com/unsecure_home.php?'+queryurl); 
    xhr.send();
 };
 
 //globalais mainigais..
 var megadata;
 
 function ajax_get(queryurl, dataAction) {
 	 $.ajax({
					type: "POST",
					url: "http://www.veritweet.com/unsecure_home.php",
					data: queryurl,
					//dataType: 'json',
					success: function(msg){
					
					megadata = msg;
					//Titanium.API.fireEvent('processFollowing', {data:msg});	
					Titanium.API.fireEvent('processFollowing', {"data":msg});	
					//dataAction(msg);
					/*
					for (x in msg)
					{					
					var message = format_message_html(msg[x].username, msg[x].USERID, get_profile_imagename(msg[x].USERID), msg[x].pic, msg[x].msg, msg[x].time_added);	
	                document.getElementById('MsgContainer').innerHTML +=  message;
					}
					*/
				}
			});	 
 };

   
 var veritweet = {
 	
 	loginUser: function(username1, password1){
	
		//alert(username1);
    	queryurl = "login=yes&username="+username1+"&password1="+password1+"&check_login=1";
 		xhr_get(queryurl, mainLogic.processLogin);
 	},
 
 
 	//get followers no veritweet
 	getFollowers: function(useris){
 	 	if(useris==undefined) {useris = user.myuserid;};
 	
 		queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_followers_list=1&useris="+useris;
 		xhr_get(queryurl, database.processFollowers);
 	},
 	
 	//get following no veritweet
 	getFollowing: function(useris){
		if(useris==undefined) {useris = user.myuserid;};
 		
 		queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_following_list=1&useris="+useris;
 		xhr_get(queryurl, database.processFollowing);
 	},
 	
 	//get updates no veritweet	
 	getUpdates: function(useris){ 
	 	if(useris==undefined) {useris = user.myuserid;};
	 	
    	var lastUserUpdateID = database.getUserLastUpdateId(useris);
 		Titanium.API.debug("lastUserUpdateID: "+lastUserUpdateID);
  
 		//alert(lastUserUpdateID);
    	queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_user_feed=1&useris="+useris;
  
	  	if(lastUserUpdateID != null) {
			queryurl += "&get_updates_after="+lastUserUpdateID;
		};
		
		//alert(queryurl);
		
		xhr_get(queryurl, database.processUpdates);
  
 	}, 
	
	 getFollowingUpdates: function(){ 
 	
    	var lastUpdateTimeAdded =  database.getLastUpdateTimeAdded();					
    	queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_following_feed=1";
  
	  	if(lastUpdateTimeAdded != null) {
			queryurl += "&get_updates_after="+lastUpdateTimeAdded;
		};
		
		setStatusMsg(queryurl);
		//izmainita updates insert funkcija.
		//xhr_get(queryurl, database.processUpdates);  
		xhr_get(queryurl, database.processUpdatesAll);  
 	}, 
 	
 	getProfile: function(useris){
 		if(useris==undefined) {useris = user.myuserid;};

		queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_user_profile=1&useris="+useris;
 		xhr_get(queryurl, database.processProfile);
 	
 	},
 	
 	postUpdate: function(description) {
 		queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&subupdate=1&description="+description;
 		xhr_get(queryurl);
 	
 	},
	
	shortenLink: function(link, dataAction) {
		queryurl = "http://vtw.me/yourls-api.php?action=shorturl&url="+link+"&format=simple&username=admin&password=19701970";
		 
		var xhr = Titanium.Network.createHTTPClient(); 
		 
		xhr.onload = function() {
				//Titanium.API.info('HTTP status = ' + this.status);
				//Titanium.API.info('Response text ' + this.responseText);
					
			   dataAction(this.responseText);       
			};
				
		xhr.open('GET', queryurl); 
		xhr.send();
				
	}
 };
 

