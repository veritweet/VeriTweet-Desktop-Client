function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function getPosition(arrayName, guid)
{
//alert(arrayName.length);
    for(var ii=0;ii<arrayName.length;ii++)
    { 
       if(arrayName[ii].guid==guid){
            return ii;
       };
    };
};

function log(msg){
	Titanium.API.log(3, '*** '+ msg);
	//document.getElementById('debug').innerHTML += '<br/>'+ msg;
};

function logError(msg){
	Titanium.API.error(5, '*** '+ msg);
};

function var_dump(obj) {
   if(typeof obj == "object") {
      return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + obj;
   } else {
      return "Type: "+typeof(obj)+"\nValue: "+obj;
   }
}//end function var_dump