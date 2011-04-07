
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
	}
	
};

