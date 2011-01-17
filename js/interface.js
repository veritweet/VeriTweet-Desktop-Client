    //--------------------------------------------------------------------------------------------------------------------------------------------------------------- globalie mainigie    
  var ApplicationDataDirectory = Titanium.Filesystem.getApplicationDataDirectory();

  var profileImageThumbPath = 'file:///'+ApplicationDataDirectory+'/images/membersprofilepic/thumbs/';
  var profileImagePath = 'file:///'+ApplicationDataDirectory+'/images/membersprofilepic/';
  
  var updateImageThumbPath = 'file:///'+ApplicationDataDirectory+'/pics/thumbs/';
  var updateImagePath = 'file:///'+ApplicationDataDirectory+'/pics/';
  
  //izmanto events, lai zinatu, ka iesutits jauns update
  var updateposted = false;
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------end globalie mainigie    
  
  function show_hide_debug() {
    	
	if ( document.getElementById('debug').style.visibility == 'visible') {	
	document.getElementById('debug').style.visibility = 'hidden';
		} else {
	 document.getElementById('debug').style.visibility = 'visible'; 
	}
	 
  }
  
  function left_screen() {  
    $('#screen_left').toggleClass('left');
	$('#screen_main').toggleClass('right');
  }
  
  function right_screen() {  
   $('#screen_main').toggleClass('left');
   $('#screen_right').toggleClass('right');
	
  }
  
  function bottom_screen() {  
    $('#screen_bottom').toggleClass('bottom');
	$('#screen_main').toggleClass('bottom');
  }
 
 //==========================================================================
 
  //piebindojam eventus POGAM - EVENTI POGAS
$(document).ready(function() { 

		$('.BHome').click(function() {
			//initApplication();
			//alert('bhome');
			alert('Handler for home .click() called.');
		});	
		
		$('.BTimeline').click(function() {
		    showLatestFeed();
			//alert('Handler for TIMELINE.click() called.');
			
		});	
		
		$('.BPrivat').click(function() {
		    //showMyUpdates();
			interfacePrependMsgCount();
			//alert('Handler for PRIVAT.click() called.');
		});	
		
	   // $('.BProfile').click(function() {
		//    left_screen();
			//alert('Handler for BProfile .click() called.');
		//});	
		
		$('.BSettings').click(function() {
		    right_screen();
			//alert('Handler for BSettings .click() called.');
		});	
		
		$('.BSwitchLogin').click(function() {
		    
			switchUser();
			//alert('Handler for BSwitchLogin .click() called.');
		});	
	
		$('#search_button').click(function() {
		
			search_field = 	$('#search_field').val();						
		    //performSearch('#search_field');
					
		//	alert('Handler for BSearchButton .click() called.');
		});	
		
		$('#update_button').click(function() {

				var desc = $('#description').val();
					if (desc!=''){
					
						updateposted = true;
						veritweet.postUpdate($('#description').val());
						$('#description').val("");
						updateCountdown();
					}
		});	
		
		$('#search_field').keydown(function() {
			 if (event.keyCode == '13') {
				search_field = 	$('#search_field').val();
			    performSearch('#search_field');	
			}
			
			//alert('Handler for .keydown() called.');
		});
		
		$('.BHome').tooltip();
		$('.BTimeline').tooltip();
		$('.BPrivat').tooltip();
		$('.BProfile').tooltip();
		$('.BSettings').tooltip();
		$('.BSwitchLogin').tooltip();
		$('#search_button').tooltip();
		$('#update_button').tooltip();		

	//funkcija nosaka vai ir noskrollets lidz lejai..
	//http://yelotofu.com/2008/10/jquery-how-to-tell-if-youre-scroll-to-bottom/
	$("#MsgContainer").scroll(function() {
			var elem = $("#MsgContainer");
				if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
				alert('bottom');
			}
	});
	

$(".iframe").live('click', function(event) {

		//Titanium.API.debug(event);		
		$('#preview_link_iframe').remove();

		var iframe = '<iframe id="preview_link_iframe" src ="'+$(this).attr('href')+'"></iframe>';
		$(iframe).prependTo('#preview_link');
		
		$('#preview_link > a').remove();
		
		var url ='<a target="_blank" href="'+$(this).attr('href')+'">Open in browser</a>';
		$(url).appendTo('#preview_link');
	
	    event.preventDefault();

		$.fancybox({
					'width'				: '100%',
					'height'			: '100%',
					'autoScale'			: false,
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					//'type'			: 'iframe',
					'href'				: '#preview_link'
		});
	});		

/*
	$(".BProfile").live('click', function(event) {

		Titanium.API.debug(event);
		
		$('#preview_link_iframe').remove();

		var iframe = '<iframe id="preview_link_iframe" src ="http://www.tvnet.lv"></iframe>';
		$(iframe).prependTo('#preview_link');
	
	    event.preventDefault();

		$.fancybox({
					'width'				: '50%',
					'height'			: '50%',
					'autoScale'			: false,
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					//'type'				: 'iframe',
					'href'				: '#preview_link'
		});
	});		
	*/
	//end document ready	
     }); 

function show_login(){	 
//LOGIN DIALOGS==================================================================================	
	//$('#login_username').val(localStorage.getItem('last_username'));
	//$('#login_password').val(localStorage.getItem('last_password'));
	
	$('#login_username').val(user.username);
	$('#login_password').val(user.password);
	
	$(function() {
	
		$("#dialog-message").dialog({
			modal: true,
			title: "Veritweet login",
			closeOnEscape: false,
			closeText: 'hide',
			resizable: false,
			draggable: false, 
			position: 'center',
			buttons: {
				Ok: function() {
					$(this).dialog('close');
					//alert($('#login_password').val());
					//alert($('#login_username').val());
					setStatusMsg('Loging in '+$('#login_username').val());
					veritweet.loginUser($('#login_username').val(),$('#login_password').val());					
				}
			}
		});
	});
};

//LOGIN DIALOGS BEIDZAS==================================================================================	

//====================================================================format message - JĀPARLIEK UZ utils.js
  function posted(t) {
    var now = new Date();
	var nt = now.getTime();
    var pt =parseInt(t);
    var diff = parseInt((now.getTime() - pt) / 1000);
/* Debug values 
	document.write("Now: " + nt + " -> ");
	document.write(" Postted : "+pt+"<BR>");
	document.write("Diff: "+diff+"<BR>");
 */

    if (diff < 60) { return diff.toString() + " seconds ago"; }
    else if (diff < 120) { 		return 'less than minute ago'; }
    else if (diff < (2700)) { 	return (parseInt(diff / 60)).toString() + ' minutes ago'; }
    else if (diff < (5400)) { 	return 'about an hour ago'; }
    else if (diff < (86400)) { 	return 'about ' + (parseInt(diff / 3600)).toString() + ' hours ago'; }
    else if (diff < (172800)) { return '1 day ago'; } 
    else {return (parseInt(diff / 86400)).toString() + ' days ago'; }
}

 function format_message_html(username, userid, profile_image, update_image_thumb, msg, time_added, postId )  {
    update_image_thumb = "";
	var profile_image=profileImageThumbPath+userid+"-m.jpg";
  
   	var message = "";
	var myOldString = msg;	

    //URLs starting with http://, https://, or ftp:// 
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; 
    var msg1 = myOldString.replace(replacePattern1, '<a class="iframe" target="_blank" href="$1">$1</a>');
	var replacePattern1 = /(@([a-zA-Z0-9_]+))/gim;
	var msg = msg1.replace(replacePattern1, '<a class="twitname" target="_blank"  href=\"http://www.twitter.com/$1">$1</a>');
	
	
/* Script change time to days

	$a = time_added ;*/
	var currentDate=new Date();
    var currenttime = currentDate.getTime();
	var myDate =  parseInt(currenttime/1000);

		//message +='<div class="Msg" time_added="'+time_added+'" postId="'+postId+'">'+'<a href="#" onclick="database.getNewFollowingUpdatesCount("'+time_added+'");">'+time_added+" = "+postId+'</a>';
		message +='<div class="Msg" time_added="'+time_added+'" postId="'+postId+'">';
	
	message +='	<div class="MsgPicture">';
	//	message +='		<a href="" target="_blank"><img src="'+profile_image+'" alt="'+username+'" width="52" height="52" hspace="5" vspace="5" border="0" align="bottom" /> </a>';
		message +='		<img src="'+profile_image+'" alt="'+username+'"/>';
		message +='	</div>';
		message +='	<div class="MsgBody">';
		message +='			<a><strong>'+username+'</strong></a><br>';
		message +=' 		<blockquote><p>'+update_image_thumb+msg+'</p></blockquote>';
		message +='	</div>';
		message +='<div class="MsgInfo">';
	//	message +='<a href="javascript:showUserUpdates('+userid+')">'+username+'</a> '+time_added+' via '+myDate+'::'+(myDate-time_added)+'sec ago via VeriTweet';
	//	message +='<a href="javascript:showUserUpdates('+userid+')">'+username+'</a> '+(myDate-time_added)+'  blabla '+ posted('time_added')+' via VeriTweet';
		message +='<a href="javascript:alert('+userid+')">'+username+'</a> '+ posted(time_added*1000)+' via VeriTweet '+(myDate-time_added)+'sec ago';
	//	message +='<abbr class="timeago" title="2008-07-17T09:24:17Z">July 17, 2008</abbr>'; 
		message +='</div>';
		message +='</div>';
  
	return message;
  
  }
//====================================================================format message - JĀPARLIEK UZ utils.js

 
//========================================parada following sarakstu
function showFollowing(){
	$('#following_container').html("");
	
	var data = database.selectFollowing();
	
	 for (dataEntry in data)
		{
		//Titanium.API.debug(data[dataEntry].USERID);
		document.getElementById('following_container').innerHTML += "<li>"+'<a href="#" onclick="showUserUpdates('+data[dataEntry].USERID+')">'+data[dataEntry].username+"</li>"; 
		};	

	if ($('#following_container').html()==""){
		$('#following_container').html("You are not following anyone..");
	}
};

function showFollowers(){
	$('#followers_container').html("");
	
	var data = database.selectFollowers();
	
	 for (dataEntry in data)
		{
		document.getElementById('followers_container').innerHTML += "<li>"+'<a href="#" onclick="showUserUpdates('+data[dataEntry].USERID+')">'+data[dataEntry].username+"</li>"; 
		};	

	if ($('#followers_container').html()==""){
		$('#followers_container').html("You have no followers..");
	}
};


function getFollowingProfiles(){
	$('#following_container').html("");
	
	var data = database.selectFollowing();
	
	 for (dataEntry in data)
		{
		veritweet.getProfile(data[dataEntry].USERID);
		};	

};

function showUserUpdates(USERID){
	$('#MsgContainer').html("USERID: "+USERID);

	var data = database.selectUserUpdates(USERID);
	
	 for (dataEntry in data)
		{
		document.getElementById('MsgContainer').innerHTML += format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", "update_image_thumb", data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId )
		};	

};

//parada pedejos ierakstus 
function showLatestFeed() {
	
	//$('#MsgContainer').html("Latest feed:");	
	$('#MsgContainer').html("<hr/>");	
	var data = database.selectFollowingUpdates();
	
	 for (dataEntry in data)
		{				
		document.getElementById('MsgContainer').innerHTML += format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", "update_image_thumb", data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId )
		};	
};

function showProgresWheel(divid){	
	$("#"+divid).html('<center><img src="img/loading_ajax.gif"/></center>');

  };
 
function hideProgresWheel(divid){	
	document.getElementById(divid).innerHTML ='';
 };
 
 function setStatusMsg(msg){
	//$("#statusmsg").fadeOut("slow"); 
	$("#statusmsg").html(msg).fadeIn("slow");
 };
 

 
 //parada jaunakos ierakstus pec tam kad tie ienakusies datubaze
 function interfaceUpdatedLatestFeed() { 
	data = database.selectFollowingUpdatesAfterOrBefore($(".Msg").attr("time_added"), "after");
 
    var messages = "";
 
 	for (dataEntry in data)
		{				
			 messages += format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", "update_image_thumb", data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId )
		};	
	
	$('#newMsgCount').remove();	
	$(messages).prependTo('#MsgContainer');
 
 };
 
function interfacePrependMsgCount(msgCount){

	$('#newMsgCount').remove();	
	
	if (msgCount != undefined) {	
		//var msgCount = 0;
		var message = msgCount+" new updates"	
		$('<div id="newMsgCount"><p><a href="#" onclick="interfaceUpdatedLatestFeed();">'+message+'</a></p></div>').prependTo('#MsgContainer');
	};
	
};

//=======================================================================linku isinasana posta
 //panemts no interneta - url noteicejs
 function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

function interfaceTestLink() {
	var link = $("#testlink").val();
	
	if (isUrl(testlink)) {
	alert("is url");
	} else {
	alert("not url");
	};
};


/*
 function interfaceShortenLink(){
 
	var link = $("#link").val();

	if (link!="") { 
		veritweet.shortenLink(link,alert);
	} else {
		alert("jaievada links..")
	}; 
 };
*/

function updateCountdown() {
    // 140 is the max message length
    var remaining = 140 - jQuery('#description').val().length;
    jQuery('#countdown').text(remaining + ' characters remaining.');	
}

//IZSAUCAS NO veritweet.shortenLink 
function interfaceShowShortenedUpdate(lastWord, newurl){
	 if (newurl!=null){
			var element = $("#description").val();
			  newString = element.replace(lastWord,newurl); 
			  $("#description").val(newString);
			  updateCountdown();
		};

}

jQuery(document).ready(function($) {
    updateCountdown();
    $('#description').change(updateCountdown);
    $('#description').keyup(updateCountdown);
	
	$('#description').keypress(function(event) {
	
	    //keycode 32 = space
         if (event.keyCode == '32') {
		 
		 var element = $("#description").val().split(" ");
		 lastWord = element[element.length-1]

			if (isUrl(lastWord)) {
				veritweet.shortenLink(lastWord,interfaceShowShortenedUpdate);
								
				} else {
				//alert("not url");
				};
		 
		 };
  });
	
});
