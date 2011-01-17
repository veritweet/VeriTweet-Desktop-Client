var db;

var database = {
    initDB: function(){
    	db = Titanium.Database.open(user.dbname);
		
		db.execute('CREATE TABLE IF NOT EXISTS following (USERID REAL UNIQUE, username TEXT)');
   		db.execute('CREATE TABLE IF NOT EXISTS followers (USERID REAL UNIQUE, username TEXT)');
        db.execute('CREATE TABLE IF NOT EXISTS updates (ID REAL UNIQUE, type TEXT, USERID TEXT, PID TEXT, UID TEXT, UIDO TEXT, msg TEXT, pic TEXT, time_added TEXT, views TEXT, reply TEXT, edited TEXT, public TEXT, twitter_status_id TEXT, twitter_update_type TEXT, username TEXT)');
        db.execute('CREATE TABLE IF NOT EXISTS members (USERID REAL UNIQUE, email TEXT, username TEXT, firstname TEXT, lastname TEXT, birthday TEXT, gender TEXT, address TEXT, city TEXT, postal_code TEXT, state TEXT, country TEXT, phone TEXT, profileviews TEXT, addtime TEXT, lastlogin TEXT, verified TEXT, status TEXT, profilepicture TEXT, saying TEXT, website TEXT, interests TEXT, showAge TEXT, bg TEXT, showbg TEXT, tile TEXT, public TEXT, alert_com TEXT, alert_msg TEXT, alert_fol TEXT, alert_fr TEXT, fil1 TEXT, fil2 TEXT, fil3 TEXT, fil4 TEXT, fil5 TEXT, twit_use TEXT, tw_id TEXT, tw_name TEXT, tw_screen_name TEXT, tw_location TEXT, tw_description TEXT, tw_profile_image_url TEXT, tw_url TEXT, tw_verified TEXT, tw_profile_background_image_url TEXT, tw_fakeuser TEXT, last_twitter_post TEXT, legal_name TEXT, cl_peoplorbus TEXT, tw_followers TEXT, tw_following TEXT, tw_tweets TEXT)');
    
        //Titanium.API.info('sql db initialised');
		log('sql db initialised');
    },
    
	dropTable: function(table){
		db = Titanium.Database.open(user.dbname);
		//db.execute('DELETE FROM '+table);	
		db.execute('DROP TABLE '+table);
		Titanium.API.info('Database table:'+table+' dropped');
	},
	
	dropAllTables: function() {
		database.dropTable('following');
		database.dropTable('followers');
		database.dropTable('updates');
		database.dropTable('members');	
		Titanium.API.info('All database tables dropped');
	},
    
//FOLLOWERS
//==============================================================================PROCESS FOLLOWERS
	processFollowers: function(data){
		//alert('processFollowers - '+data);
		var dataJ = JSON.parse(data);
		
		for (dataEntry in dataJ)
					{
					entryJ = dataJ[dataEntry];					
					database.insertFollowers(entryJ);
					};					
	//database.selectFollowers();
	
	},
	
//==============================================================================INSERT FOLLOWERS
    insertFollowers: function(entryJ) {
    	db = Titanium.Database.open(user.dbname);
    	
    	var USERID = entryJ.USERID;
	    var username = entryJ.username;
	    
	   // alert('entryJ.USERID:'+entryJ.USERID);
	  	    
    	db.execute('DELETE FROM followers WHERE USERID='+USERID);
    	//db.execute('INSERT INTO followers (USERID) VALUES (?)', USERID);
    	db.execute('INSERT INTO followers (USERID, username) VALUES (?, ?)', USERID, username);
            
    	Titanium.API.info(USERID+' - '+username+' inserted into followers table');
    }, 

//==============================================================================SELECT FOLLOWERS
	selectFollowers: function(){
		db = Titanium.Database.open(user.dbname);
		var data = [];

		var rows = db.execute('SELECT * FROM followers');
		while (rows.isValidRow()) 
		{
			//var currentData = [];
							
		  	data.push({
		    	USERID: rows.fieldByName('USERID'),
		    	username: rows.fieldByName('username')
  			});
  			
  			//Titanium.API.info('select no followeru tabulas:'+rows.fieldByName('USERID') + ' - '+rows.fieldByName('username'));
  			
			rows.next();
		}
		rows.close();
	
	    return data;
	},
	
//FOLLOWING
//==============================================================================PROCESS FOLLOWING
	processFollowing: function(data){
		//alert('processFollowing - '+data);
		var dataJ = JSON.parse(data);
		
		db = Titanium.Database.open(user.dbname);
		db.execute('BEGIN TRANSACTION');
		db.execute('DELETE FROM following');
		
	/*
	//http://mess.genezys.net/jquery/jquery.async.php
		jQuery.eachAsync(dataJ, {
			delay: 100,
			bulk: 0,
			loop: function(index, value)
			{ 
				database.insertFollowing(value);	
			},
			end: function()
			{ 
				Titanium.API.fireEvent('showFollowing');
				db.execute('END TRANSACTION');
			}
		})
		
	*/
	
	for (dataEntry in dataJ)
					{
					entryJ = dataJ[dataEntry];					
					database.insertFollowing(entryJ);					
					};	

	db.execute('END TRANSACTION');
	db.close();
		
		Titanium.API.fireEvent('showFollowing');
	},
	
//==============================================================================INSERT FOLLOWING
	insertFollowing: function(entryJ) {    	
    	
    	var USERID = entryJ.USERID;
	    var username = entryJ.username;
	    				
    	//db.execute('DELETE FROM following WHERE USERID='+USERID);
    	db.execute('INSERT INTO following (USERID, username) VALUES (?, ?)', USERID, username);
            
    	//Titanium.API.info(USERID+' - '+username+' inserted into following table');
    }, 
    
//==============================================================================SELECT FOLLOWING
	selectFollowing: function(){
		db = Titanium.Database.open(user.dbname);
		var data = [];

		var rows = db.execute('SELECT * FROM following');
		while (rows.isValidRow()) 
		{
		  	data.push({
		    	USERID: rows.fieldByName('USERID'),
		    	username: rows.fieldByName('username')
  			});
  			
  			//Titanium.API.debug('select no following tabulas:'+rows.fieldByName('USERID') + ' - '+rows.fieldByName('username'));
  			
			rows.next();
		}
		rows.close();
	
	    return data;
	},
    
	selectFollowingIdList: function(){
		db = Titanium.Database.open(user.dbname);
		var data ="";

		var rows = db.execute('SELECT USERID FROM following');
		while (rows.isValidRow()) 
		{
			if (data=="")
			{
				data=rows.fieldByName('USERID');
			} else {
				data+=", "+rows.fieldByName('USERID');			
			}
		   
			rows.next();
		}
		rows.close();
	    return data;
	},
	
//UPDATES
//==============================================================================LAST USER UPDATE ID DB

	getUserLastUpdateId: function (userid) {
		db = Titanium.Database.open(user.dbname);
	    var lastUpdateID = null;
	
		var rows = db.execute("SELECT ID FROM updates WHERE USERID='"+userid+"' ORDER BY ID desc LIMIT 1");
		while (rows.isValidRow()) 
		{  			
  			lastUpdateID = rows.fieldByName('ID');  			
  			Titanium.API.debug('Last update ID for user '+userid+' = '+lastUpdateID);  			
			rows.next();
		}
		rows.close();
	
	    return lastUpdateID;	
	},
	
	getLastUpdateId: function (useris) { 
		db = Titanium.Database.open(user.dbname);
	    var lastUpdateID = null;
		var query;
	
	    if(useris==undefined) {
			//panem visus kam seko
			var userList = database.selectFollowingIdList();
			//pieliek pasreizeja usera id
			if (userList!="") {
				userList = "("+userList+", "+user.myuserid+")";
			} else {
				userList = "("+user.myuserid+")";		
			}
			
			//alert(userList);
			query = "SELECT ID FROM updates WHERE USERID IN "+userList+" ORDER BY ID desc LIMIT 1";			
			
		} else {	
			query = "SELECT ID FROM updates WHERE USERID='"+useris+"' ORDER BY ID desc LIMIT 1";
		};
	
		var rows = db.execute(query);
		while (rows.isValidRow()) 
		{  			
  			lastUpdateID = rows.fieldByName('ID');  			
  			Titanium.API.debug('Last update ID for user '+useris+' = '+lastUpdateID);  			
			rows.next();
		}
		rows.close();
	
	    return lastUpdateID;
	},

	getLastUpdateTimeAdded: function (useris) { 
		db = Titanium.Database.open(user.dbname);
	    var lastUpdateTimeAdded = null;
		var query;
	
	    if(useris==undefined) {
			//panem visus kam seko
			var userList = database.selectFollowingIdList();
			//pieliek pasreizeja usera id
			if (userList!="") {
				userList = "("+userList+", "+user.myuserid+")";
			} else {
				userList = "("+user.myuserid+")";		
			}
			
			query = "SELECT time_added FROM updates WHERE USERID IN "+userList+" ORDER BY time_added desc LIMIT 1";			
			
		} else {	
			query = "SELECT time_added FROM updates WHERE USERID='"+useris+"' ORDER BY time_added desc LIMIT 1";
		};
	
		var rows = db.execute(query);
		while (rows.isValidRow()) 
		{  			
  			lastUpdateTimeAdded = rows.fieldByName('time_added');  				
			rows.next();
		}
		rows.close();
		
		setStatusMsg('Last update time added: '+ lastUpdateTimeAdded);		
	    return lastUpdateTimeAdded;	
	},

	//following saraksta updates
	getNewFollowingUpdatesCount: function (time_added) { 
		db = Titanium.Database.open(user.dbname);
	    var newFollowingUpdatesCount = 0;
	
		var rows = db.execute("SELECT count(time_added) as skaits FROM updates where time_added > "+time_added);
		while (rows.isValidRow()) 
		{  			
  			newFollowingUpdatesCount = rows.fieldByName('skaits'); 		
			rows.next();
		}
		rows.close();
	
		setStatusMsg(newFollowingUpdatesCount+" new updates since "+time_added);	
		//alert(newFollowingUpdatesCount);
	    return newFollowingUpdatesCount;	
	},

//==============================================================================PROCESS UPDATES

	processUpdates: function(data){
		var dataJ = JSON.parse(data);

		for (dataEntry in dataJ)
					{
					entryJ = dataJ[dataEntry];		
			    	//var USERID = entryJ.USERID;
				    //var username = entryJ.username;
					database.insertUpdate(entryJ);

					};		
		Titanium.API.fireEvent('updatesReceived');			
	},
	
	//atraka processUpdates versija, ja jaieliek db vairakas updates.. - jaliek workerii..
	processUpdatesAll: function(data){
		var dataJ = JSON.parse(data);

		db = Titanium.Database.open(user.dbname);
		db.execute('BEGIN TRANSACTION');
		
		for (dataEntry in dataJ)
					{
					entryJ = dataJ[dataEntry];		
					
					var ID = entryJ.ID;
					var type = entryJ.type;
					var USERID = entryJ.USERID;
					var	PID = entryJ.PID;
					var UID = entryJ.UID;
					var UIDO = entryJ.UIDO;
					var msg = entryJ.msg;
					var pic = entryJ.pic;
					var time_added = entryJ.time_added;
					
					//alert(msg + " - time_added:" + time_added)
					
					var views = entryJ.views;
					var reply = entryJ.replay;
					var edited = entryJ.edited;
					var	publicc = entryJ.public;
					var twitter_status_id = entryJ.twitter_status_id;
					var twitter_update_type = entryJ.twitter_update_type;
					var username = entryJ.username; 
					
					try
					  {					
					db.execute("INSERT INTO updates (ID, type, USERID, PID, UID, UIDO, msg, pic, time_added, views, reply, edited, public, twitter_status_id, twitter_update_type, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
								ID, type, USERID, PID, UID, UIDO, msg, pic, time_added, views, reply, edited, publicc, twitter_status_id, twitter_update_type, username);
					  }
					catch(err)
					  {
					  Titanium.API.error("***************************** database.processUpdatesAll() **************************");
					  Titanium.API.error(err);
					  Titanium.API.error(msg);
					  Titanium.API.error("***************************** database.processUpdatesAll() **************************");
					  //alert(err);
					  //alert(msg);
					  }
								
					};		
		
		db.execute('END TRANSACTION');			
		Titanium.API.fireEvent('updatesReceived');			
	},

//==============================================================================INSERT UPDATE
	insertUpdate: function(entryJ) {
    	db = Titanium.Database.open(user.dbname);
    	
		var ID = entryJ.ID;
		var type = entryJ.type;
		var USERID = entryJ.USERID;
		var	PID = entryJ.PID;
		var UID = entryJ.UID;
		var UIDO = entryJ.UIDO;
		var msg = entryJ.msg;
		var pic = entryJ.pic;
		var time_added = entryJ.time_added;
		var views = entryJ.views;
		var reply = entryJ.replay;
		var edited = entryJ.edited;
		var	publicc = entryJ.public;
		var twitter_status_id = entryJ.twitter_status_id;
		var twitter_update_type = entryJ.twitter_update_type;
		var username = entryJ.username; 
	      	    	  	    
		db.execute("INSERT INTO updates (ID, type, USERID, PID, UID, UIDO, msg, pic, time_added, views, reply, edited, public, twitter_status_id, twitter_update_type, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
        		    ID, type, USERID, PID, UID, UIDO, msg, pic, time_added, views, reply, edited, publicc, twitter_status_id, twitter_update_type, username);
            
    	Titanium.API.info(ID+' - '+msg+' inserted into '+USERID+' updates table');
    }, 
//==============================================================================SELECT USER UPDATES
	selectUserUpdates: function(userid){

		db = Titanium.Database.open(user.dbname);
		var data = [];

		//var rows = db.execute('SELECT * FROM updates WHERE USERID='+userid+' LIMIT 30');
		//var rows = db.execute('SELECT * FROM updates WHERE USERID='+userid);
		
		var rows = db.execute('SELECT USERID, username, msg, time_added FROM updates WHERE USERID='+userid+' ORDER BY time_added DESC LIMIT 20');
				
		while (rows.isValidRow()) 
		{
		  	data.push({
		    	USERID: rows.fieldByName('USERID'),
		    	msg: rows.fieldByName('msg'),
		    	username: rows.fieldByName('username'),
		    	postType:'veritweet',
				type_icon:'icon/icon_twitter.png',
				time_added:rows.fieldByName('time_added')
  			});
  			  			
			rows.next();
		}
		rows.close();	
	    return data;   
	    
	},
    
//==============================================================================SELECT FOLLOWING UPDATES
// te vaig lai selektejas vispirms useru id, kam tiek followots un tad updates
// funkcija jasauc pec tam, kad updates ir ieladetas no veritweet iekš db

	selectFollowingUpdates: function(){
		db = Titanium.Database.open(user.dbname);
		var data = [];

		var followingIdList = database.selectFollowingIdList();
		
		var rows = db.execute('SELECT * FROM updates WHERE USERID IN ('+followingIdList+') ORDER BY time_added DESC LIMIT 20');
		while (rows.isValidRow()) 
		{
		
			//alert(rows.fieldByName('time_added')+" - " + rows.fieldByName('msg'));
		
		  	data.push({
		    	USERID: rows.fieldByName('USERID'),
		    	msg: rows.fieldByName('msg'),
		    	username: rows.fieldByName('username'),
		    	postType:'veritweet',
				type_icon:'icon/icon_twitter.png',
				time_added:rows.fieldByName('time_added'),
				postId: rows.fieldByName('ID')
  			});
			rows.next();
		}
		rows.close();
	
	    return data;
	},
	

	selectFollowingUpdatesAfterOrBefore: function(time_added, when){
		db = Titanium.Database.open(user.dbname);
		var data = [];

		var followingIdList = database.selectFollowingIdList();
		
		var when_added;		
		if (when="before") {
			when_added = "time_added < "+time_added;
		} else {
			when_added = "time_added > "+time_added;
		};		
				
		var rows = db.execute('SELECT * FROM updates WHERE USERID IN ('+followingIdList+') AND '+when_added+' ORDER BY time_added DESC');
		while (rows.isValidRow()) 
		{	
		  	data.push({
		    	USERID: rows.fieldByName('USERID'),
		    	msg: rows.fieldByName('msg'),
		    	username: rows.fieldByName('username'),
		    	postType:'veritweet',
				type_icon:'icon/icon_twitter.png',
				time_added:rows.fieldByName('time_added'),
				postId: rows.fieldByName('ID')
  			});
			rows.next();
		}
		rows.close();
	
	    return data;
	},
	
	//==============================================================================SELECT FOLLOWERS UPDATES
// te vaig lai selektejas vispirms useru id, kas ir followeri un tad updates
// funkcija jasauc pec tam, kad updates ir ieladetas no veritweet iekš db

	selectFollowersUpdates: function(userid){
		db = Titanium.Database.open(user.dbname);
		var data = [];

		var rows = db.execute('SELECT * FROM updates WHERE USERID IN (SELECT USERID FROM followers) ORDER BY ID');
		while (rows.isValidRow()) 
		{
		  	data.push({
		    	USERID: rows.fieldByName('USERID'),
		    	msg: rows.fieldByName('msg')
		    	//username: rows.fieldByName('username')
  			});
  			
  			//Titanium.API.info('select no updates tabulas followers:'+rows.fieldByName('USERID') + ' - '+rows.fieldByName('msg'));
  			
			rows.next();
		}
		rows.close();
	
	    return data;
	},
//PROFILE

//==============================================================================PROCESS PROFILES
	processProfile: function(data){
		var dataJ = JSON.parse(data);
		
		for (dataEntry in dataJ)
					{
					entryJ = dataJ[dataEntry];					
					database.insertProfile(entryJ);
					};		
	},

//==============================================================================INSERT PROFILE
	insertProfile: function(update_object){
		db = Titanium.Database.open(user.dbname);

		var USERID=update_object.USERID;
		var email=update_object.email;
		var username=update_object.username;
		var firstname=update_object.firstname;
		var lastname=update_object.lastname;
		var birthday=update_object.birthday;
		var gender=update_object.gender;
		var address=update_object.address;
		var city=update_object.city;
		var postal_code=update_object.postal_code;
		var state=update_object.state;
		var country=update_object.country;
		var phone=update_object.phone;
		var profileviews=update_object.profileviews;
		var addtime=update_object.addtime;
		var lastlogin=update_object.lastlogin;
		var verified=update_object.verified;
		var status=update_object.status;
		var profilepicture=update_object.profilepicture;
		var saying=update_object.saying;
		var website=update_object.website;
		var interests=update_object.interests;
		var showAge=update_object.showAge;
		var bg=update_object.bg;
		var showbg=update_object.showbg;
		var tile=update_object.tile;
		var publicc=update_object.public; //public = publicc reserved word
		var alert_com=update_object.alert_com;
		var alert_msg=update_object.alert_msg;
		var alert_fol=update_object.alert_fol;
		var alert_fr=update_object.alert_fr;
		var fil1=update_object.fil1;
		var fil2=update_object.fil2;
		var fil3=update_object.fil3;
		var fil4=update_object.fil4;
		var fil5=update_object.fil5;
		var twit_use=update_object.twit_use;
		var tw_id=update_object.tw_id;
		var tw_name=update_object.tw_name;
		var tw_screen_name=update_object.tw_screen_name;
		var tw_location=update_object.tw_location;
		var tw_description=update_object.tw_description;
		var tw_profile_image_url=update_object.tw_profile_image_url;
		var tw_url=update_object.tw_url;
		var tw_verified=update_object.tw_verified;
		var tw_profile_background_image_url=update_object.tw_profile_background_image_url;
		var tw_fakeuser=update_object.tw_fakeuser;
		var last_twitter_post=update_object.last_twitter_post;
		var legal_name=update_object.legal_name;
		var cl_peoplorbus=update_object.cl_peoplorbus;
		var tw_followers=update_object.tw_followers;
		var tw_following=update_object.tw_following;
		var tw_tweets=update_object.tw_tweets;

		db.execute("INSERT INTO members (USERID, email, username, firstname, lastname, birthday, gender, address, city, postal_code, state, country, phone, profileviews, addtime, lastlogin, verified, status, profilepicture, saying, website, interests, showAge, bg, showbg, tile, public, alert_com, alert_msg, alert_fol, alert_fr, fil1, fil2, fil3, fil4, fil5, twit_use, tw_id, tw_name, tw_screen_name, tw_location, tw_description, tw_profile_image_url, tw_url, tw_verified, tw_profile_background_image_url, tw_fakeuser, last_twitter_post, legal_name, cl_peoplorbus, tw_followers, tw_following, tw_tweets) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    USERID, email, username, firstname, lastname, birthday, gender, address, city, postal_code, state, country, phone, profileviews, addtime, lastlogin, verified, status, profilepicture, saying, website, interests, showAge, bg, showbg, tile, publicc, alert_com, alert_msg, alert_fol, alert_fr, fil1, fil2, fil3, fil4, fil5, twit_use, tw_id, tw_name, tw_screen_name, tw_location, tw_description, tw_profile_image_url, tw_url, tw_verified, tw_profile_background_image_url, tw_fakeuser, last_twitter_post, legal_name, cl_peoplorbus, tw_followers, tw_following, tw_tweets);  
            
    	Titanium.API.info(USERID+' - '+username+' profile inserted into members table');

	},

//==============================================================================SELECT PROFILE


	
};


