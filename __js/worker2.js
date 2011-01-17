 var user = {
	 username:"Desktop.Client",
	 password:"12345678",
	 dbname:"314-database"
 };  
 var db;
 
//importScripts('jquery/jquery-1.4.4.min.js');

function xhr_get(queryurl, dataAction) 
  {  
	Titanium.API.debug("xhr_get: "+queryurl);
 
    var xhr = Titanium.Network.createHTTPClient(); 
 
    xhr.onload = function() {
        Titanium.API.info('HTTP status = ' + this.status);
        //Titanium.API.info('Notice xml ' + this.responseXML + ' text ' + this.responseText);
        Titanium.API.info('Response text ' + this.responseText);
            
       dataAction(this.responseText);       
    };
        		
    xhr.open('GET', 'http://www.veritweet.com/unsecure_home.php?'+queryurl); 
    xhr.send();	
 };
 
 /*
 function xhr_get_new(queryurl) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryurl, false);
    xhr.send();
	setStatusMsg('+++++++++++++++++++++++++++++++++++++++++++++++'+xhr.responseText);
    return xhr.responseText;
  } catch (e) {
    return ''; // turn all errors into empty results
  }
 };
 */
  
 function getFollowing(useris){
		if(useris==undefined) {useris = user.myuserid;}; 		
 		queryurl = "login=yes&username="+user.username+"&password1="+user.password+"&get_following_list=1&useris="+useris;
 		xhr_get(queryurl, processFollowing);	
		var data =  xhr_get_new(queryurl);  		
		//postMessage("ok");		
 	};
 
 function processFollowing(data){

	var dataJ = JSON.parse(data);
	db = Titanium.Database.open(user.dbname);
		
	//db.execute('BEGIN TRANSACTION');
	db.execute('DELETE FROM following');		

		for (dataEntry in dataJ)
					{
					entryJ = dataJ[dataEntry];					
					insertFollowing(entryJ);					
					};	

	//db.execute('END TRANSACTION');
	db.close();
	alert('ok');
	//postMessage("ok");	
					
	};
	
function insertFollowing(entryJ) {
    	    	
    	var USERID = entryJ.USERID;
	    var username = entryJ.username;
	    	  	    
    	//db.execute('DELETE FROM following WHERE USERID='+USERID);		
    	db.execute('INSERT INTO following (USERID, username) VALUES (?, ?)', USERID, username);            
    	//Titanium.API.info(USERID+' - '+username+' inserted into following table');
    }
	
/*
onmessage = function(event) {
	user = JSON.parse(event.message);
	Titanium.API.error(user.username);
	//Titanium.API.error(event);
	
	//alert(event.data);
	//alert(event.data.myuserid);
	getFollowing(user.myuserid);
    
    return;
 };
 */
  
  function pause(){
       //pause for 3 seconds
    var start = new Date().getTime();
    while ((new Date().getTime()) < (start + 6000)) { }
   //postMessage("ok");
  alert('hello wind');
  
  };
  
  
 getFollowing(314);
//pause();



