
//funkcija splash loga paslepsanai
//logu var aizvert tikai, kad tiek aizverts main.html, jo savadak programmai pazud main logs un ta aizveras pavisam..
function closeCurrentWindow(){
	var splashWindow = Titanium.UI.getMainWindow();
	splashWindow.hide();
}

$(document).ready(function() { 

document.getElementById('splashmsg').innerHTML = "Starting up...";
document.getElementById('splashmsg').innerHTML = "Opening main window...";

var splashWindow = Titanium.UI.getCurrentWindow();

mainWindow = Titanium.UI.createWindow({
        id: "mainWindow",
        url: "app://main.html",
        title: "Veritweet desktop client",
        //contents: "<html>foo!</html>"
        //baseURL: "app://main.html"
        //x: 300,
        //y: 400,
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
	

mainWindow.open();
document.getElementById('splashmsg').innerHTML = "Welcome to Veritweet!!!";	

var delay = setInterval("closeCurrentWindow()",1000);





});