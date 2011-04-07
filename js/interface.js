    //--------------------------------------------------------------------------------------------------------------------------------------------------------------- globalie mainigie    
  var ApplicationDataDirectory = Titanium.Filesystem.getApplicationDataDirectory();

  var profileImageThumbPath = 'file:///'+ApplicationDataDirectory+'/images/membersprofilepic/thumbs/';
  var profileImagePath = 'file:///'+ApplicationDataDirectory+'/images/membersprofilepic/';
  
  var updateImageThumbPath = 'file:///'+ApplicationDataDirectory+'/pics/thumbs/';
  var updateImagePath = 'file:///'+ApplicationDataDirectory+'/pics/';
  
  //izmanto events, lai zinatu, ka iesutits jauns update
  var updateposted = false;
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------end globalie mainigie    
  
/* LOGU BIDISANA */

//define tumso logu
$('html').append('<div id="all_screen_overlay"></div>')
$('#all_screen_overlay').css({'position':'absolute','left':'-999','z-index':'151','background-color':'#212121','opacity':'0'})

  function init_window_sizes(){
      var winW = document.body.offsetWidth;
      var winH = document.body.offsetHeight;
	  
	  $('#all_screen_overlay').css({'width':'100%','height':'100%'})
	  
      
      $('#screen_right, #screen_left, #screen_bottom').css({'height':winH-93})
      $('#screen_right').css({'width':600}) // NOSAKA logu platumus
      $('#screen_left').css({'width':600})
      $('#screen_bottom').css({'width':600})
  }


  //aizver logus, ja maina window izmeru
  window.onresize = function(){
        if( $('.thiActive').length) {
            hide_window('.thiActive',300);
        }
        
  }


  function init_start_pos($id){   // novieto logu pareize vieta pirms izsauksanas
    var winW = document.body.offsetWidth;
    $($id).css({'left':winW});
  }
  function left_screen() {  
   init_window_sizes();
   
   if(  !$('#screen_left').hasClass("thiActive") ){

        init_start_pos('#screen_left')
        show_window('#screen_left', 500);

    } else {

        hide_window('#screen_left',500);

    }
  }

  function right_screen() {  
   init_window_sizes();

   if(  !$('#screen_right').hasClass("thiActive") ){

        init_start_pos('#screen_right')
        show_window('#screen_right', 500);

    } else {
        
        hide_window('#screen_right',500);

    }
  }

function screen_overlay( $act ){ //show or hide
	var box = $('#all_screen_overlay')
	var width = box.width();
	if($act == 'show') {
		box.css({'left':'0'}).animate({'opacity':'0.5'})
	} else {
		box.css({'left':-width}).animate({'opacity':'0'})
	}
}  
	
  function show_window( $id ,$anSpeed ) {
    // hide_window('.thiActive');
    var winW = document.body.offsetWidth;
	screen_overlay('show');
    $('.thiActive').animate({'background-color':'#c2c2c2'}).css({'z-index':'150'})
        var innerW = $($id).width();
        var fromLeft = winW-innerW-65;
        $($id).css({'position':'absolute','z-index':'200','background-color':'#f1f1f1'})
            .show()
            .animate({'left':fromLeft}, $anSpeed ,function(){

                hide_window('.thiActive',500); // noslepj ieprieks izsaukto logu

                $(this).addClass('thiActive').css({});
            })
      

  }

  function hide_window( $id , $anSpeed ) {
       var winW = document.body.offsetWidth;
       var winH = document.body.offsetHeight;
		
           $($id).css({'position':'absolute'}).animate({'left':winW },$anSpeed,function(){
                $(this).css({'z-index':'150'}).hide().removeClass('thiActive');
				screen_overlay('hide');
           })

  }

  $('#all_screen_overlay').live('click',function(){
        screen_overlay('hide');
        hide_window('.thiActive',500);
  })
		
	
  

  function bottom_screen() {  

        init_window_sizes();
        if(  !$('#screen_bottom').hasClass("thiActive") ){

        init_start_pos('#screen_bottom')
        show_window('#screen_bottom', 500);

    } else {

        hide_window('#screen_bottom',500);

    }
  }
 
 //==========================================================================
 
  //piebindojam eventus POGAM - EVENTI POGAS
$(document).ready(function() { 

		$('.BHome').click(function() {
			var currwindow  = Titanium.UI.getCurrentWindow();
					
			if (currwindow.isFullscreen()) {
				currwindow.setFullscreen(false);
			} else {
				currwindow.setFullscreen(true);
			}			
		});			
		
		$('.BTimeline').click(function() {
		    showLatestFeed();
		});	
		
		$('.BPrivat').click(function() {
			showUserUpdates(user.myuserid, false);
		});	

		$('.BSettings').click(function() {
		    right_screen();
		});	
		
		$('.BSwitchLogin').click(function() {		    
			show_login();
		});	
			
		$('#update_button').click(function() {
			var desc = $('#description').val();
					if (desc!=''){
						setStatusMsg("Posting update!");
						updateposted = true;
						//alert($('#uploadform').serialize());
						$('#uploadform').submit();
					}
		});	
		
	//image file selection
		$('#clip_button').click(function() {
				$('#uploadform_inputfile').trigger('click');
		});	
	
		$('#search_button').click(function() {		
				search_field = $('#search_field').val();
			    online.performSearch(search_field);	
			//alert('Handler for BSearchButton .click() called.');
		});	
	
		$('#search_field').keydown(function() {
			 if (event.keyCode == '13') {
				search_field = 	$('#search_field').val();
			    online.performSearch(search_field);	
			}
		});
		
	 $('#select_view1').click(function() {
			switch_msgCSS_file('/css/msg-view-1.css');
		});
	
	 $('#select_view2').click(function() {
			switch_msgCSS_file('/css/msg-view-2.css');			
		});
	
	$('#select_view3').click(function() {
			switch_msgCSS_file('/css/msg-view-3.css');
		});
				
	//funkcija nosaka vai ir noskrollets lidz lejai..
	//http://yelotofu.com/2008/10/jquery-how-to-tell-if-youre-scroll-to-bottom/
	$("#MsgContainer").scroll(function() {
			var elem = $("#MsgContainer");
				if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {

				Titanium.API.fireEvent('onMsgDisplayBottom');
			}
	});
	

	
$(".iframe").live('click', function(event) {
		event.preventDefault();

		var new_width = $(window).width() * 0.8;
		var new_height = $(window).height() * 0.8;
		
		$('#preview_link').width(new_width);
		$('#preview_link').height( new_height);
		
		//Titanium.API.debug(event);		
		$('#preview_link_iframe').remove();

		var iframe = '<iframe id="preview_link_iframe" src ="'+$(this).attr('href')+'"></iframe>';
								
		$(iframe).prependTo('#preview_link');
		
		$('#preview_link_iframe').load(function()
		{
			$.fancybox.hideActivity();
		});
			
		
		$('#preview_link_iframe').width(new_width);
		$('#preview_link_iframe').height( new_height - 30);		
		
		$('#preview_link > a').remove();
		
		var url ='<a target="_blank" href="'+$(this).attr('href')+'">Open in browser</a>';
		$(url).appendTo('#preview_link');

		$.fancybox({
					'width'				: '100%',
					'height'			: '100%',
					'autoScale'			: false,
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					//'type'			: 'iframe',
					'href'				: '#preview_link',
					onComplete: function(){
						$.fancybox.showActivity();			
					}
		});

		
		
	});		

	/*
	$(".MsgImage").live('click', function(event) {
	
		//alert($(this).children('img').width());
	
		var image_name = $(this).attr("image_name");
		
		if (image_name!=""){		
		
		f = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/pics/'+image_name);
		if(f.exists()){
			var update_image = '<img src="'+updateImagePath+image_name+'"/>';
			var imgsrc = updateImagePath+image_name;
		} else {
		//ja bilde nav lokāli, tā vel nav atkacata (kacajas paraleli)) rādam to no servera.
			var update_image = '<img src="http://www.veritweet.com/pics/'+image_name+'"/>';
			var imgsrc = "http://www.veritweet.com/pics/"+image_name;
		}
		
		var img = new Image();
		img.src = imgsrc;
		//alert(imgsrc);		
		
		var i=0;
		while (i<1000)
		 {
		 i++;		  
		 }
		//alert(i);
				
		alert(img.width + 'x' + img.height);		
		
		$('#preview_image').html(update_image);
		var width = $('#preview_image').children('img').width();
		//alert(width);
			
		$.fancybox({
					//'width'				: 400,
					//'height'			: 400,
					'autoScale'			: true,
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					//'type'			: 'iframe',
					'href'				: '#preview_image',
					onComplete: function(){
						//$.fancybox.showActivity();			
					}
		});
	
		} 
	
	});	
*/
	

	$(".BProfile").live('click', function(event) {
		online.getUserProfile();		
	});		
	
	//end document ready	
     }); 

	function fillUserProfileFields(data){
		if (data[0]!=undefined) {

			var img = '<img src="http://www.veritweet.com/images/membersprofilepic/thumbs/'+data[0].USERID+'-m'+data[0].profilepicture+'">';
			$('#profle_picture').html(img);		
			
			$('#saying').val(data[0].saying);
			$('#interests').val(data[0].interests);
			$('#website').val(data[0].website);
			$('#firstName').val(data[0].firstname);
			$('#lastName').val(data[0].lastname);
			$('#city').val(data[0].city);
			$('#country').val(data[0].country);
			
			var birthday =data[0].birthday;
			var splitday = birthday.split("-");
			$('#day').val(splitday[2]);
			$('#month').val(splitday[1]);
			$('#year').val(splitday[0]);

			
			if (data[0].showAge=="1"){		
				$('input[name=showAge]').attr('checked', true);
			} else {
				$('input[name=showAge]').attr('checked', false);
			};
								 			
			$('#showAge').val(data[0].showAge);			

			$("input[name='gender']").each(function() {
				if($(this).val() == data[0].gender) {
					$(this).attr('checked', 'checked');
				}
			});
			
			//paradam profilu
			left_screen();		
		}
	}
		
//STARTUP DIALOGS==================================================================================		
function show_dialog_new_user(){	 
	setStatusMsg('Welcome to Veritweet!');
	
	$(function() {			
		$("#dialog-new-user").dialog({
			modal: true,
			title: "Welcome to Veritweet!",
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			closeText: 'hide',
			resizable: false,
			draggable: false, 
			position: 'center',
			width: 400,
			height: 300,
     		beforeClose: function(event, ui) {}
		});		
		
	});
};


//LOGIN DIALOGS==================================================================================			
function show_login(){	 
	$("#dialog-new-user").dialog("close");

	setStatusMsg('Please login!');

	//paradam pedejo veiksmigo useri un paroli..
	$('#login_username').val(localStorage.getItem('last_username'));
	$('#login_password').val(localStorage.getItem('last_password'));
	
	$(function() {			
		$("#dialog-message").dialog({
			modal: true,
			title: "Veritweet login",
			closeOnEscape: false,
			closeText: 'hide',
			resizable: false,
			draggable: false, 
			position: 'center',
			width: 320,
			height: 300,
     		beforeClose: function(event, ui) { 
			if (user.myuserid == '') {
				return false;
			};},

			buttons: {
				Ok: function() {
					user.username = $('#login_username').val();
					user.password = $('#login_password').val();
					
					setStatusMsg('Loging in '+$('#login_username').val());
					veritweet.loginUser($('#login_username').val(),$('#login_password').val());	
					$('#login_msg').html('<center><img src="img/loading_ajax.gif"/></center>');
									
				}
			}
		});
	});
};

function show_demo() {

$("#dialog-new-user").dialog("close");
mainLogic.initAppDemo();


}

//LOGIN DIALOGS BEIDZAS==================================================================================	

  function posted(t) {
    var now = new Date();
	var nt = now.getTime();
    var pt =parseInt(t);
    var diff = parseInt((now.getTime() - pt) / 1000);

    if (diff < 60) { return diff.toString() + " seconds ago"; }
    else if (diff < 120) { 		return 'less than minute ago'; }
    else if (diff < (2700)) { 	return (parseInt(diff / 60)).toString() + ' minutes ago'; }
    else if (diff < (5400)) { 	return 'about an hour ago'; }
    else if (diff < (86400)) { 	return 'about ' + (parseInt(diff / 3600)).toString() + ' hours ago'; }
    else if (diff < (172800)) { return '1 day ago'; } 
    else {return (parseInt(diff / 86400)).toString() + ' days ago'; }
}

//papildus klases Msg elementam W0-2 un col1-3
var msgClassCounter1 = 0;
var msgClassCounter2 = 0;

//funkcija jaizsauc katru reizi kad tiek notirits MsgContainer
function resetMsgClassCounters(){
	msgClassCounter1 = 0;
	msgClassCounter2 = 0;
};

 function format_message_html(username, userid, profile_image, update_image_thumb, msg, time_added, postId )  {
 
	if (msgClassCounter2 < 3) {		
		msgClassCounter2 = msgClassCounter2+1;
	} else {
			
		msgClassCounter2 = 1;		
		
		if (msgClassCounter1 < 2) {		
			msgClassCounter1 = msgClassCounter1+1;
		} else {
			msgClassCounter1 = 0;
		}
		
	}
  
	
	//hacks, lai rāditu png im gif images, kas ir nokacatas
	var f = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/images/membersprofilepic/thumbs/'+userid+"-m.jpg");
	if(f.exists()){
			var profile_image=profileImageThumbPath+userid+"-m.jpg";
	} else {
		
		f = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/images/membersprofilepic/thumbs/'+userid+"-m.png");
		
		if(f.exists()){
			var profile_image=profileImageThumbPath+userid+"-m.png";
		} else {
			f = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/images/membersprofilepic/thumbs/'+userid+"-m.gif");
			if(f.exists()){
				var profile_image=profileImageThumbPath+userid+"-m.gif";
			} else {
			//online
				var profile_image="http://www.veritweet.com/profile_image.php?userid="+userid;
			}
		}	
	}
	
	//update image
	if (update_image_thumb!=""){		
		f = Titanium.Filesystem.getFile( ApplicationDataDirectory+'/pics/thumbs/'+update_image_thumb);
		if(f.exists()){
			update_image_thumb = '<div class="MsgImage" image_name="'+update_image_thumb+'"><img src="'+updateImageThumbPath+update_image_thumb+'"/></div>';
		} else {
		//ja bilde nav lokāli, tā vel nav atkacata (kacajas paraleli)) rādam to no servera.
			update_image_thumb = '<div class="MsgImage" image_name="'+update_image_thumb+'"><img src="http://www.veritweet.com/pics/thumbs/'+update_image_thumb+'"/></div>';
		}
	} 
	
   	var message = "";
	var myOldString = msg;	

    //URLs starting with http://, https://, or ftp:// 
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; 
    var msg1 = myOldString.replace(replacePattern1, '<a class="iframe" target="_blank" href="$1">$1</a>');
	var replacePattern1 = /(@([a-zA-Z0-9_]+))/gim;
	var msg = msg1.replace(replacePattern1, '<a class="twitter-anywhere-user" target="_blank"  href=\"http://www.twitter.com/$1">$1</a>');
	
	var currentDate=new Date();
    var currenttime = currentDate.getTime();
	var myDate =  parseInt(currenttime/1000);
	
	//=====================================================================DATUMA FUNKCIJA
	var MsgDateTime = new Date(time_added * 1000);

	var MsgYear = MsgDateTime.getUTCFullYear();
	var MsgMonth = MsgDateTime.getUTCMonth();
	
	if (MsgMonth.toString().length <2) {MsgMonth = "0"+MsgMonth.toString()};
	
	var MsgDay 	= MsgDateTime.getUTCDate();
	if (MsgDay.toString().length <2) {MsgDay = "0"+MsgDay.toString()};
	
	var MsgHours = MsgDateTime.getUTCHours();
	if (MsgHours.toString().length <2) {MsgHours = "0"+MsgHours.toString()};
	
	var MsgMinutes = MsgDateTime.getUTCMinutes();
	if (MsgMinutes.toString().length <2) {MsgMinutes = "0"+MsgMinutes.toString()};

	var MsgSeconds = MsgDateTime.getUTCSeconds();	
	//MsgTime = MsgDateTime.toLocaleTimeString();
	
	var MsgDateTimeDisplay = MsgYear+"."+MsgMonth+"."+MsgDay + " "+ MsgHours + ":" + MsgMinutes;
	//=====================================================================DATUMA FUNKCIJA END	
	
		message +='<div class="Msg W'+msgClassCounter1+' col'+msgClassCounter2+'" time_added="'+time_added+'" postId="'+postId+'">';
		message +='<div class="mmcontainer">';
		message +='	<div class="MsgPicture">';
		message +='		<img src="'+profile_image+'" alt="'+username+'"/>';
		message +='	</div>';
		message +='	<div class="MsgBody">';
		message +='		<a class="usernamefield">'+username+'&nbsp</a>';
		message += update_image_thumb+ '<div class="messageline">' + msg + '</div>';
		message +='	</div>';
		message +='<div class="MsgTime">'+ MsgDateTimeDisplay +'</div>';
		message +='<div class="MsgInfo">';
		message +='<a href="#">'+username+'</a> '+ posted(time_added*1000)+' via Twitter. Message timestamp: '+ MsgDateTimeDisplay;
		message +='</div>';
		message +='</div>';
		message +='</div>';
  
	return message;  
  }

 
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
		$('#following_container').html("<p>You are not following anyone..</p>");
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
		$('#followers_container').html("<p>You have no followers..</p>");
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

function showUserUpdates(USERID, repeated_call){
	//ieliek globalaja mainigaja,kura usera feed tagad tiek radits MSG containeri (velak to izmanto events 'onUpdatesReceivedUser')
	current_userid = USERID;

	//check cik updates ir ko rādīt
	var time_now = Math.round(new Date().getTime() / 1000);	
	var UpdateCount = database.countUpdatesBefore(time_now, USERID);
		
	if ((UpdateCount>19) | (repeated_call==true)) {
	var data = database.selectUserUpdates(USERID);
	
	document.getElementById('MsgContainer').innerHTML = "";
	//notiram Msg klases counterus...
	resetMsgClassCounters();
	
	 for (dataEntry in data)
		{
		document.getElementById('MsgContainer').innerHTML += format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", data[dataEntry].pic , data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId )
		};	

	} else {	
		veritweet.getUserUpdates(USERID);		
	}
		
};

//parada pedejos ierakstus 
function showLatestFeed() {
	
	//ieliek globalaja mainigaja, ka netiek radits konkreta usera feed, bet gan viss feed..
	current_userid = "";
	
	document.getElementById('MsgContainer').innerHTML = "";
	//notiram Msg klases counterus...
	resetMsgClassCounters();
	
	var data = database.selectFollowingUpdates();	
	 for (dataEntry in data)
		{						
		document.getElementById('MsgContainer').innerHTML += format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", data[dataEntry].pic , data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId )
		};	
};

//parada mekletos ierakstus 
function showSearchResults(data) {	
	//ieliek globalaja mainigaja, ka netiek radits konkreta usera feed, bet gan search.
	current_userid = "-1";	
	document.getElementById('MsgContainer').innerHTML = "";
	//notiram Msg klases counterus...
	resetMsgClassCounters();	

	for (dataEntry in data)
		{				
		document.getElementById('MsgContainer').innerHTML += format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", data[dataEntry].pic , data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId )
		};	
};

//parada updates, kas ievietoti pirms noteikta laika
function showUpdatesBefore(time_added, useris){
	var data =  database.selectFollowingUpdatesAfterOrBefore(time_added, "before", useris);

	for (dataEntry in data)
		{				
		$("#MsgContainer").append( format_message_html(data[dataEntry].username, data[dataEntry].USERID, "profile_image", data[dataEntry].pic , data[dataEntry].msg, data[dataEntry].time_added, data[dataEntry].postId ) );
		};	
	
}

function showProgresWheel(divid){	
	$("#"+divid).html('<center><img src="img/loading_ajax.gif"/></center>');

  };
 
function hideProgresWheel(divid){	
	document.getElementById(divid).innerHTML ='';
 };
 
 function setStatusMsg(msg){
	$("#statusmsg").html(msg).fadeIn("slow");
 };
 
 
 //parada jaunakos ierakstus pec tam kad tie ienakusies datubaze
 function interfaceUpdatedLatestFeed() { 
	showLatestFeed(); 
 };
 
function interfacePrependMsgCount(msgCount){

	$('#newMsgCount').remove();	
	
	if (msgCount != undefined) {	
		//var msgCount = 0;
		var message = msgCount+" new updates"	
		$('<div id="newMsgCount"><a href="#" onclick="interfaceUpdatedLatestFeed();">'+message+'</a></div>').prependTo('#MsgContainer');
	};
	
};

//=======================================================================linku isinasana posta
 //panemts no interneta - url noteicejs
 function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

function updateCountdown() {
    // 140 is the max message length
    var remaining = 140 - jQuery('#description').val().length;
    jQuery('#countdown').text(remaining);	
}

//IZSAUCAS no veritweet.shortenLink 
function interfaceShowShortenedUpdate(lastWord, newurl){
	 if (newurl!=null){
			var element = $("#description").val();
			  newString = element.replace(lastWord,newurl); 
			  $("#description").val(newString);
			  updateCountdown();
		};
}

function show_demo_navigation(data){
		//data = {"categories":[{"category":"Top Stories", "channels":[{"channel":"cnnbrk", "id":"451"}]},{"category":"US News", "channels":[{"channel":"Reuters", "id":"73"}]},{"category":"World News", "channels":[{"channel":"cnnlive", "id":"452"}, {"channel":"bbc", "id":"80"}, {"channel":"CBCNews", "id":"53"}, {"channel":"cnn", "id":"198"}]},{"category":"Sports", "channels":[{"channel":"THE_REAL_SHAQ", "id":"453"}, {"channel":"DigitalRoyalty", "id":"455"}, {"channel":"reggie_bush", "id":"457"}, {"channel":"shawnemerriman", "id":"458"}, {"channel":"tonyhawk", "id":"459"}, {"channel":"nfl", "id":"460"}, {"channel":"sportsguy33", "id":"461"}, {"channel":"paulpierce34", "id":"462"}, {"channel":"DwightHoward", "id":"463"}, {"channel":"stewartcink", "id":"464"}, {"channel":"NickSwisher", "id":"465"}, {"channel":"kaj33", "id":"466"}, {"channel":"serenawilliams", "id":"467"}]},{"category":"Entertainment", "channels":[{"channel":"ThatKevinSmith", "id":"468"}, {"channel":"JakeSasseville", "id":"469"}, {"channel":"TheEllenShow", "id":"470"}, {"channel":"britneyspears", "id":"265"}, {"channel":"RyanSeacrest", "id":"472"}, {"channel":"eonline", "id":"257"}, {"channel":"chelsealately", "id":"473"}, {"channel":"PerezHilton", "id":"474"}, {"channel":"peoplemag", "id":"450"}, {"channel":"joelmchale", "id":"475"}, {"channel":"GiulianaRancic", "id":"476"}, {"channel":"levarburton", "id":"477"}, {"channel":"greggrunberg", "id":"478"}, {"channel":"dannymasterson", "id":"480"}, {"channel":"EW", "id":"481"}]},{"category":"Celebrities", "channels":[{"channel":"aplusk", "id":"482"}, {"channel":"rainnwilson", "id":"483"}, {"channel":"kevinrose", "id":"484"}, {"channel":"kirstiealley", "id":"485"}, {"channel":"Oprah", "id":"249"}, {"channel":"DrPhil", "id":"236"}, {"channel":"KimKardashian", "id":"235"}, {"channel":"Schwarzenegger", "id":"250"}, {"channel":"BrackObama", "id":"281"}, {"channel":"algore", "id":"242"}, {"channel":"Bill Gates", "id":"277"}, {"channel":"ladygaga", "id":"486"}]},{"category":"Technology", "channels":[{"channel":"The Next Web", "id":"545"}, {"channel":"gigaom", "id":"544"}, {"channel":"TechCrunch", "id":"543"}, {"channel":"mashable", "id":"67"}]},{"category":"Wacky", "channels":[{"channel":"Borat", "id":"503"}]}]};

		var directive = {
			  'li.topnode':{
				'cat<-categories':{
				  'a.category_name':'cat.category',
				 // "a.category_name@onclick": "alert('#{cat.category}');",

				  'li':{
					  'chan<-cat.channels':{
						'a.channel_name':'chan.channel',
						//"a@onclick": "alert('#{chan.id}');"
						"a@onclick": "showUserUpdates('#{chan.id}');"
												
					  }
				   }		
				}
			  }
			  
			};

		//create categories menu
		$('#demouser_menu').render(data, directive);
		
		//sliding menu
		$('#demouser_menu ul').hide();
		$('#demouser_menu li a').click(
			function() {
			  var checkElement = $(this).next();
			  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
				return false;
				}
			  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
				$('#demouser_menu ul:visible').slideUp('slow');
				checkElement.slideDown('slow');
				return false;
				}
			  }
			);
		  
	
		$('#navigation_user').hide(1000);	
		$('#navigation_demo').show(1000);

};


//==============================================PARSELEDZ MASTER CSS FAILU
function switch_masterCSS_file(css){
	$('#masterCSS').attr({href : css});
	localStorage.setItem('masterCSS', css);		
};

function switch_msgCSS_file(css){
	$('#msgCSS').attr({href : css});
	localStorage.setItem('msgCSS', css);		
};




//==============================================IELADEJOT PROGRAMMU UZLIEK PEDEJO MASTER CSS FAILU
jQuery(document).ready(function($) {


	var masterCSS = localStorage.getItem('masterCSS');		
				
	if (masterCSS !=null) {		
		switch_masterCSS_file(masterCSS);
	};
		
	var msgCSS = localStorage.getItem('msgCSS');		
		
	if (msgCSS !=null) {		
		switch_msgCSS_file(msgCSS);
	};

	var platform = Titanium.Platform.getName();
	var is_windows = platform.lastIndexOf("Windows");
		
	//Ieladejam no CSS mapes css failu sarakstu..
	var resourcesDir = Titanium.Filesystem.getResourcesDirectory();
	var dir = Titanium.Filesystem.getFile(resourcesDir+'/css');
	var dir_files = dir.getDirectoryListing();
	
	var select = $('#masterCSSselect');
	var options = select.attr('options');
	
    for (var i=0;i<dir_files.length;i++){ 
	
			var thelink = dir_files[i].toString();
			
			if (is_windows>-1) {
			var pieces = thelink.split('\\');
			} else {
			var pieces = thelink.split('/');
			}
						
			var filename = pieces[pieces.length-1];

		   if (filename != "msg-view-1.css" & filename != "msg-view-2.css" & filename != "msg-view-3.css") {		   
				options[options.length] = new Option(filename, "css/"+ filename);		   
		   }
		   
        }
		
	//uzliekam aktivo no localstore
	if (localStorage.getItem('masterCSS')!=""){
		$('#masterCSSselect').val(localStorage.getItem('masterCSS'));
	}
				
	$('#masterCSSselect').change(function() {
		switch_masterCSS_file($('#masterCSSselect option:selected').val());
	});
	
});


//linku saisinasana
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

$(document).ready(function() {
  
   $("#uploadform").jqupload({"callback":"onUploadFormSubmited"});
   $("#uploadform").jqupload_form();
  
});

function onUploadFormSubmited(msg){
	
	setStatusMsg("Update sent!");
	
	//alert(msg);	
	$('#description').val("");
	$('#display_filename').html("");
	$('#uploadform_inputfile').val("");
	updateCountdown();			
	mainLogic.updatePosted();
}

$(document).ready(function() {



});

