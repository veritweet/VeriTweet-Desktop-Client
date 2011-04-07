
document.getElementById('splashmsg').innerHTML = "Veritweet Desktop Client Version "+Titanium.App.getVersion();	

//funkcija splash loga paslepsanai
//logu var aizvert tikai, kad tiek aizverts main.html, jo savadak programmai pazud main logs un ta aizveras pavisam..
function closeCurrentWindow(){
	var splashWindow = Titanium.UI.getMainWindow();
	splashWindow.hide();
}

$(document).ready(function() { 

var splashWindow = Titanium.UI.getCurrentWindow();

mainWindow = Titanium.UI.createWindow({
        id: "mainWindow",
        url: "app://main.html",
        title: "Veritweet desktop client",
        width: 800,
        minWidth: 500,
        maxWidth: 3000,
        height: 600,
        minHeight: 500,
        maxHeight: 2000,
        maximizable: true,
        minimizable: true,
        closeable: true,
        resizable: true,
        fullscreen: false,
        maximized: true,
        minimized: false,
        usingChrome: true,
        topMost: false,
        visible: true,
        transparentBackground: false,
        transparency: false
    });
	

var delay = setInterval("mainWindow.open();",3000);
var delay = setInterval("closeCurrentWindow()",3000);

});