var serial; // variable to hold an instance of the serialport libraryvar 
portName = 'COM3'; // fill in your serial port name here
var options = {
	baudrate: 115200
}; // change the data rate to whatever you wish

var inData = []; // for incoming serial data

function setup() {
	createCanvas(400, 300);
	serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.on('list', printList); // set a callback function for the serialport list event
	serial.on('connected', serverConnected); // callback for connecting to the server
	serial.on('open', portOpen); // callback for the port opening
	serial.on('data', serialEvent); // callback for when new data arrives
	serial.on('error', serialError); // callback for errors
	serial.on('close', portClose); // callback for the port closing

	serial.list(); // list the serial ports
	serial.open(portName, options);
	frameRate(5);
}

function draw() {
	var max = 32768;
	background(floor(map(inData[0], -max, max, 0, 255)), floor(map(inData[1], -32768, 32768, 0, 255)), floor(map(inData[2], -32768, 32768, 0, 255)));
	fill(255);
	//text("sensor value: " + inData, 30, 30);
	//console.log(floor(map(inData[1], -max, max, 0, 255)));
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) { // convert it to a number:
		var splitString = split(inString, ',');
		for (var i = 0; i < splitString.length; i++) {
			inData[i] = Number(splitString[i]);
		}
	}
}

function printList(portList) {
	// portList is an array of serial port names
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		console.log(i + " " + portList[i]);
	}
}

function serverConnected() {
	console.log('connected to server.');
}

function portOpen() {
	console.log('the serial port opened.')
}

function serialError(err) {
	console.log('Oops ! Something went wrong with the serial port. ' + err);
}

function portClose() {
	console.log('The serial port closed.');
}
