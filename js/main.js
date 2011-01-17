  
 var mainLogic = {
 
 	initApp: function(){
	
	$('#version').html("Version "+Titanium.App.getVersion());
	////////////////////////////////////////////////	
	
		setStatusMsg('Starting app init');
		createImageFolders();
		
		//database.initDB();
		//database.dropAllTables();				
		database.initDB();
		veritweet.getTrends();
		//mainLogic.getUserUpdates();		
		//database.selectUserUpdates(user.myuserid);
		
	//following sarakstu paradam izmantojot events.js eventu un interface.js funkciju
	//showProgresWheel('following_container');
		//Titanium.API.fireEvent('showFollowing');
	
	//paradam jaunakos ierakstus no db
		//showProgresWheel('MsgContainer');
		//showLatestFeed();				
		//setStatusMsg('Application initialised');		
		
	veritweet.getFollowing();
	veritweet.getFollowers();
	
	//Titanium.API.fireEvent('showFollowing');
	
	//veritweet.getFollowers();
	//mainLogic.getFollowersUpdates(); 		
		
	//novelkam jaunakos apdeitus	
	//veritweet.getFollowingUpdates();
	setInterval("veritweet.getFollowingUpdates()", 30000);
	 
	//alert(database.getLastUpdateId(314));
	 
 	}, 
	
	//funkcija aizver splash screen, kas ir main screen programmai, izsaucas no otra loga body onunload()
	closeApp: function(){	
		var splashWindow = Titanium.UI.getMainWindow();
		splashWindow.close();
	},
 	
 	processLogin: function(msg){
 																
		if (msg!="login error") {

		    user.myuserid = msg;
		    user.dbname=msg+"-database";
		    setStatusMsg('Login ok.');
			
			veritweet.getProfile();
		    mainLogic.initApp();		    
		} 
		 else 
		{
			user.username="";
			user.password="";
		    user.myuserid="";
		    user.dbname="";

			alert("Incorrect login!");
		};
		 	
 	},
 
 	//==========================================================UPDATES
 	getUserUpdates: function(){
 		veritweet.getUpdates();
 	}, 	
 	
 	getFollowersUpdates: function(){
 		var data = database.selectFollowers();
 		
 		for (dataEntry in data)
					{
					Titanium.API.debug(data[dataEntry].USERID);
					veritweet.getUpdates(data[dataEntry].USERID);
					};
 	},
 	
	
   /////////////////////////////////////////////////////////////////////
   getTrends: function(termins){
   
   
   
   },
	
 	//==========================================================PROFILES
 	getUserProfile: function(){
	 	veritweet.getProfile();
 	},
 	
 	getFollowersProfiles: function(){
		var data = database.selectFollowers();
 		
 		for (dataEntry in data)
					{
					Titanium.API.debug(data[dataEntry].USERID);
					veritweet.getProfile(data[dataEntry].USERID);
					};	
 	},
 	
 	getFollowingProfiles: function(){
 	 	var data = database.selectFollowing();
 		
 		for (dataEntry in data)
					{
					Titanium.API.debug(data[dataEntry].USERID);
					veritweet.getProfile(data[dataEntry].USERID);
					};		
 	},
	
	updatePosted: function(msg){
		setStatusMsg(msg);
		Titanium.API.fireEvent('updatePosted');
	
	}
 		
 }; 
 
//=================================USERIS - TODO japarceï uz localstorage
 var user = {
 	username: "Desktop.Client",
 	password: "12345678",
 	myuserid: "",
 	dbname:""
 };  
 
 //mainigais kura likt pedejo redzamo update
 var temp = {};

//startejam app, kad viss ielâdçts
$(document).ready(function() {			
	//mainLogic.initApp();		
	
//=================================================================================================================UPDATE MANAGER
	   var uManager = Titanium.UpdateManager.startMonitor(['app_update','sdk'],'alert("New update");',60000);
		
		uManager.onupdate = function(details){
			var mess = 'A new version: ' + details.version + ' is available. Would you like to install it?';
			var con = confirm(mess);
			if (con)    {		   
					 // this function installs the new updated version of my app
					uManager.installAppUpdate(details, function(){
						alert('The new version has been installed');
					});
				}
		};
//=================================================================================================================UPDATE MANAGER BEIGAS	

	setStatusMsg('Login...');
	show_login();

});

//===============================================CSS switcher
//TODO: - saglabat uzslegto
//TODO: - parslegt tikai master.css izveloties to no mapes /usercss

$(document).ready(function() { 
	$("#css_switcher li a").click(function() { 
		//$("link").attr("href",$(this).attr('rel'));
		$("#masterCSS").attr({href : $(this).attr('href')});
		//$("#masterCSS").attr({href : "css/master2.css"});
		return false;
	});
});
