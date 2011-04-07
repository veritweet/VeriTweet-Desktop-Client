  
 var mainLogic = {
 
 	initApp: function(){
	
		$('#navigation_demo').hide(1000);
		$('#navigation_user').show(1000);	
	
	$('#version').html("Version "+Titanium.App.getVersion());
	////////////////////////////////////////////////	
	
		setStatusMsg('Starting app.');
		createImageFolders();		
		//database.reinitDB();			
		
		database.initDB();
		veritweet.getTrends();
				
		veritweet.getFollowing();
		veritweet.getFollowers();
				
		setInterval("Titanium.API.fireEvent('onCheckForUpdatesOnServer')", 30000);

 	}, 
	
	initAppDemo: function(){
	
		$('#version').html("Version "+Titanium.App.getVersion());

		user.username = "demouser";
		user.password = "demouser";
		user.myuserid = "1";
		user.dbname="1-database";
		database.initDB();	

		online.loadDemoCategories();
		veritweet.getTrends();
		setStatusMsg('Demo user login.');	
	},
	
	//funkcija aizver splash screen, kas ir main screen programmai, izsaucas no otra loga body onunload()
	closeApp: function(){	
		var splashWindow = Titanium.UI.getMainWindow();
		splashWindow.close();
	},
 	
 	processLogin: function(msg){
 														
		if (msg!="login error") {
			$('#MsgContainer').html('<span id="loading_ajax"><br/><br/><br/><center><img src="img/loading_ajax.gif"/></center></span>');
			$('#followers_container').html('<span id="loading_ajax"><br/><center><img src="img/loading_ajax.gif"/></center><br/></span>');
			$('#following_container').html('<span id="loading_ajax"><br/><center><img src="img/loading_ajax.gif"/></center><br/></span>');
			$('#trends_container').html('<span id="loading_ajax"><br/><center><img src="img/loading_ajax.gif"/></center><br/></span>');
																
			localStorage.setItem('last_username', user.username);
			localStorage.setItem('last_password', user.password);
			localStorage.setItem('last_myuserid', msg);			
									
		    user.myuserid = msg;
		    user.dbname=msg+"-database";
		    setStatusMsg('Login ok.');
			
			$("#uploadform_username").val(user.username);
			$("#uploadform_password1").val(user.password);
						
			veritweet.getProfile();
		    mainLogic.initApp();	
			
			$('#login_msg').html('');
			$("#dialog-message").dialog('close');			
		} 
		 else 
		{
			//saglabajam usernami, bet notiram password lauku..
			localStorage.setItem('last_username', user.username);
			localStorage.setItem('last_password', '');
			
			setStatusMsg('Incorrect login');
			user.username="";
			user.password="";
		    user.myuserid="";
		    user.dbname="";
			
			$('#login_msg').html('<center>Login unsuccessful. <br/>Try again!</center>'); 
			//show_login();
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
	
		Titanium.API.fireEvent('updatePosted');
	}
 		
 }; 
 
//=================================USERIS - TODO japarceï uz localstorage
 var user = {
 	username: "",
 	password: "",
 	myuserid: "",
 	dbname:""
 };  
 
 //mainigais kura likt pedejo redzamo update TODO - parbaudit vai vel vajag shito mainigo ?
 var temp = {};
 
 //globalais mainigais, kura likt sobrid radamo feed
 var current_userid = "";

//startejam app, kad viss ielâdçts
$(document).ready(function() {			
	
//=================================================================================================================UPDATE MANAGER
	   var uManager = Titanium.UpdateManager.startMonitor(['app_update','sdk'],'alert("New update");',60000);
		
		uManager.onupdate = function(details){
			var mess = 'A new version: ' + details.version + ' is available. Would you like to install it?';
			var con = confirm(mess);
			if (con)    {		   
					uManager.installAppUpdate(details, function(){
						alert('The new version has been installed');
					});
				}
		};
		
//=================================================================================================================UPDATE MANAGER BEIGAS	

	setStatusMsg('Welcome to Veritweet!');
	show_dialog_new_user()
	//show_login();

});

