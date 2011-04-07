
function xhr_get(queryurl, dataAction, event) 
  {
	//Titanium.API.debug("xhr_get: "+queryurl); 
    var xhr = Titanium.Network.createHTTPClient();  
    xhr.onload = function() {
       dataAction(this.responseText, event);       
    };
        
    xhr.open('GET', 'http://www.veritweet.com/unsecure_home.php?'+queryurl); 
    xhr.send();
 };
 
function ajax_get(queryurl, dataAction) {
 	 $.ajax({
					type: "POST",
					url: "http://www.veritweet.com/unsecure_home.php",
					data: queryurl,
					//dataType: 'json',
					success: function(msg){
					//alert(msg);
					dataAction(msg);			
				}
			});	 
 };
   
 var veritweet = {
 	
 	loginUser: function(username1, password1){
	
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
 	getUserUpdates: function(useris){ 
	 	if(useris==undefined) {useris = user.myuserid;};
	 	
    	var lastUpdateTimeAdded =  database.getLastUpdateTimeAdded(useris);	

    	queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_user_feed=1&useris="+useris;
  
	  	if(lastUpdateTimeAdded != null) {
			queryurl += "&get_updates_after="+lastUpdateTimeAdded;
		};
		
		//alert(queryurl);		
		xhr_get(queryurl, database.processUpdatesAll, "onUpdatesReceivedUser");
  
 	}, 
	
 	getUserUpdatesBefore: function(time_added, useris){
	
	 	if(useris==undefined) {useris = user.myuserid;};

    	queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_user_feed=1&useris="+useris;  
		queryurl += "&get_updates_before="+time_added;
		
		xhr_get(queryurl, database.processUpdatesAll, "onMsgDisplayBottomOlderUpdates");
	
	},
	
	 getFollowingUpdates: function(){ 
 	
    	var lastUpdateTimeAdded =  database.getLastUpdateTimeAdded();		

    	queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_following_feed=1";
  
	  	if(lastUpdateTimeAdded != null) {
			queryurl += "&get_updates_after="+lastUpdateTimeAdded;
		};

		setStatusMsg("Checking following list for updates..");
		xhr_get(queryurl, database.processUpdatesAll);  
 	}, 
	
	getFollowingUpdatesBefore: function(time_added){ 
 	
    	queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_following_feed=1";
		queryurl += "&get_updates_before="+time_added;

		setStatusMsg("Downloading updates..");
		xhr_get(queryurl, database.processUpdatesAll, "onMsgDisplayBottomOlderUpdates");  
 	}, 
 	
 	getProfile: function(useris){
 		if(useris==undefined) {useris = user.myuserid;};

		queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_user_profile=1&useris="+useris;
 		xhr_get(queryurl, database.processProfile);
 	
 	},
 		
	shortenLink: function(link, dataAction) {
		queryurl = "http://vtw.me/yourls-api.php?action=shorturl&url="+link+"&format=simple&username=admin&password=19701970";
		 
		var xhr = Titanium.Network.createHTTPClient(); 
		 
		xhr.onload = function() {					
			   dataAction(link, this.responseText);       
			};
				
		xhr.open('GET', queryurl); 
		xhr.send();
				
	},
	
//tikai online funkcija TODO move to online.js
   getTrends: function(termins) {
    
     document.getElementById('trends_container').innerHTML = '';
      
    if(termins==undefined) {
	  termins = "this_week";
	 };
	 
	 queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_trends="+termins;

	 $.ajax({
					type: "POST",
					url: "http://www.veritweet.com/unsecure_home.php",
					data: queryurl,
					dataType: 'json',
					success: function(msg){
									
					for (x in msg){						
						trend = '<a href="#" class="trenditem" onclick="online.performSearch('+"'"+msg[x].trend+"'"+')">' +msg[x].trend+ " ("+msg[x].trend_count+")"+ "</a>";
						document.getElementById('trends_container').innerHTML += trend +" ";
					}
				  }
			});
 }
 
 };
 
//=================================================================online.js
function ajax_get_json(queryurl, dataAction) {
	
 	 $.ajax({
					type: "POST",
					url: "http://www.veritweet.com/unsecure_home.php?"+queryurl,
					//data: queryurl,
					dataType: 'json',
					//dataType: 'text',
					success: function(msg){
						//alert(msg);
						dataAction(msg);			
					}
			});	 
 };
 
  function jsonProfile(){

	if ($('#showAge').attr('checked')) {
		$('#showAge').val("1");
	};

	if ($('#gender1').attr('checked')) {
		alert('gender1');
	};
	
	var fields = $("#profile_form").serializeArray();
	var json = '{';
		jQuery.each(fields, function(i, field) {
	
	if (i) {
			json = json + ',"' + field.name + '":"' + field.value + '"';
		} else {
			json = json + '"' + field.name + '":"' + field.value + '"';
		}
	});
		
	json = json + '}';

	return (json);
}

var online = {
    performSearch: function(query){
		if (query!=""){
			$('#MsgContainer').html('<span id="loading_ajax"><br/><br/><br/><center><img src="img/loading_ajax.gif"/></center></span>');		
			queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&search_updates=1"+"&search_query="+query;

			ajax_get_json(queryurl, showSearchResults);
		}
    } ,
	
	getUserProfile: function(useris){
			if(useris==undefined) {useris = user.myuserid;};
			queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_user_profile=1";
			ajax_get_json(queryurl, fillUserProfileFields);
	}, 
	
	sendUserProfile: function() {
	   
	   var profile = jsonProfile();

		 $.ajax({
					type: "POST",
					url: "http://www.veritweet.com/unsecure_home.php?login=yes&username="+user.username+"&password1="+user.password+"&send_json_profile=1&profile="+profile,
					//data: ",
  
					success: function(msg){
						//alert(msg); 
				}
			});
	},
	
	loadDemoCategories: function() {
	
	 	 $.ajax({
					type: "GET",
					url: "http://api.veritweet.com/v1/demo/categories.json?country=US",
					dataType: 'json',
					//dataType: 'text',
					success: function(msg){
						//alert(msg);
						show_demo_navigation(msg);			
					}
			});	 
		
	}
	
	
	
};


