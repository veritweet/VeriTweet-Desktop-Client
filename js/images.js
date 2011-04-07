
 function downloadSingleImage(path, folder, filename){
   //path - kur njemt
   //folder - kur likt
   //filename - ka sauc
    
   // path = 'http://www.veritweet.com/images/membersprofilepic/1.jpg';	
  //	folder = '/images/membersprofilepic/';
  //	filename = "1.jpg";
    
	var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 1000000;  
 
    xhr.onreadystatechange = function(){
        // ready
    } 
    xhr.onload = function() {
        
		try{
			//document.getElementById('response').innerHTML = "onload";
			var f = Titanium.Filesystem.getFile( ApplicationDataDirectory+folder,filename);

			f.write(this.responseData);
					
			/*
			var image = 'file:///'+f.nativePath();
			
			var timeout = setInterval(function() {
				clearInterval(timeout);
				document.getElementById('response').innerHTML = '<img src="'+image+'" style="width: 124px; height: 165px;">';		
			}, 100);
			*/
			document.getElementById('response').innerHTML += "<br>Downloaded: "+path;
        }catch(e){
            //alert(e);
			document.getElementById('response').innerHTML = e;
        }
    };
 
     xhr.open("GET", path); 
     xhr.send();
 }
 
 function downloadVeritweetProfileImages(USERID, filename) {
 
    //alert('jaieliek parbaude uz db - kada tipa image ir userim un vai vispar ir'); 	
	var filename_array= filename.split(".");

	//var large_filename = USERID+'.jpg';	
	
	var small_thumb_filename = filename_array[0]+"-s."+filename_array[1];
	var medium_thumb_filename = filename_array[0]+"-m."+filename_array[1]; 
 
    var path1 =  'http://www.veritweet.com/images/membersprofilepic/'+filename;	
	var path2 =  'http://www.veritweet.com/images/membersprofilepic/thumbs/'+small_thumb_filename;	
	var path3 =  'http://www.veritweet.com/images/membersprofilepic/thumbs/'+medium_thumb_filename;	
	var path4 =  'http://www.veritweet.com/images/membersprofilepic/thumbs/'+filename;	
	
	var folder1 = '/images/membersprofilepic/';
    var folder2 = '/images/membersprofilepic/thumbs/';
		
	//main image
	downloadSingleImage(path1, folder1, filename);	
	//large thumb
	downloadSingleImage(path4, folder2, filename);	
	//medium thumb
	downloadSingleImage(path3, folder2, medium_thumb_filename);	
	//small thumb
	downloadSingleImage(path2, folder2, small_thumb_filename);	
	
 }
 
  function downloadVeritweetUpdateImages(imagename) {
    var path1 =  'http://www.veritweet.com/pics/'+imagename;	
	var path2 =  'http://www.veritweet.com/pics/thumbs/'+imagename;	
	var folder1 = '/pics/';
    var folder2 = '/pics/thumbs/';
	
	downloadSingleImage(path1, folder1, imagename);
	downloadSingleImage(path2, folder2, imagename);	
 }
 
 
 function profileImageLarge(USERID){
 
 //neizmantot
 	var filename = USERID+'.jpg';
	var folder = '/images/membersprofilepic/';
	var f = Titanium.Filesystem.getFile( ApplicationDataDirectory+folder,filename);

	var image = 'file:///'+f.nativePath();
    image = '<img src="'+image+'">';	
  
    return image;
 }
 
function profileImageThumb(USERID){
 //neizmantot
    var filename = USERID+'.jpg';
    var folder = '/images/membersprofilepic/thumbs';
  
	var image = "";
  
  	var f = Titanium.Filesystem.getFile( ApplicationDataDirectory+folder,filename);
	if (f.exists()) {
		var image = 'file:///'+f.nativePath();
		image = '<img src="'+image+'">';	
	
	}
	
	

  
   return image;
 }
 
 function profileImageThumbSmall(USERID){
  //neizmantot
 
 return "test";
 
    var filename = USERID+"-s"+'.jpg';
    var folder = '/images/membersprofilepic/thumbs';
  
  	//var f = Titanium.Filesystem.getFile( ApplicationDataDirectory+folder,filename);
	//var image = 'file:///'+f.nativePath();
	
	var path = ApplicationDataDirectory+folder+"/"+filename;
	var image = 'file:///'+path;
	
    image = '<img src="'+image+'">';	
  
   return image;
 }
 
 function createImageFolders(){
 	var newdir = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/images');
	newdir.createDirectory();
		
	var newdir = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/images/membersprofilepic');
	newdir.createDirectory();
	
	var newdir = Titanium.Filesystem.getFile(ApplicationDataDirectory+'/images/membersprofilepic/thumbs');
	newdir.createDirectory();
	
	var newdir = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/pics');
	newdir.createDirectory();
	
	var newdir = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/pics/thumbs');
	newdir.createDirectory();
 
 }

 
 function get_profile_imagename(USERID){
 
	//var imagename = "";	
					
	db.transaction(function(tx) { 

			tx.executeSql("SELECT profilepicture FROM members where USERID="+USERID+" LIMIT 1", [], function(tx, result) { 
			   for (var i = 0, item = null; i < result.rows.length; i++) { 
					 item = result.rows.item(i); 
					 
					 //PROFILA IMAGE
					 var profile_image=profileImageThumbPath+useris+"-m"+item['profilepicture'];
					 
					 imagename = profile_image;
					
				   } 
				 }); 
			   }); 
			   
	return imagename;
	};
	
	