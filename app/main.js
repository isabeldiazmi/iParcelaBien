'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

var express = require('express');
var bodyParser = require('body-parser')
var apps = express();
// parse application/x-www-form-urlencoded 
apps.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
apps.use(bodyParser.json())

var serialport = require('serialport');// include the library
var SerialPort = serialport.SerialPort; // make a local instance of it

apps.post('/', function (req, res) {
    
    console.log(req.body);
    return res.send('Enviando!');
    //return 12;
    var  portName = "COM6";

    var myPort = new SerialPort(portName, {
        baudRate: 9600,
        // look for return and newline at the end of each data packet:
        parser: serialport.parsers.readline("\n")
    });

    myPort.on('open', showPortOpen);
    myPort.on('data', sendSerialData);
    myPort.on('close', showPortClose);
    myPort.on('error', showError);
    function showPortOpen() {
        console.log('port open. Data rate: ' + myPort.options.baudRate);
        // #xBee , humedad, temperatura
        sendSerialData("2, 38, 18");
    }
    function sendSerialData(data) {
        console.log(data);
        myPort.write(data);
    }


    function showPortClose() {
        console.log('port closed.');
    }
    
    function showError(error) {
        console.log('Serial port error: ' + error);
    }
    res.send('Enviando!');
});

apps.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});