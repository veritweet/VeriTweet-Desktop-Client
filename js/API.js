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
	Ti.API.log('*** '+msg);
};

function logError(msg){
	Ti.API.error('***'+msg);
};