var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http, {allowEIO3: true}); //require socket.io module and pass the http object (server)
var si = require('systeminformation');
var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO


in1 = new Gpio(24, {
	mode: Gpio.OUTPUT
});
in2 = new Gpio(25, {
	mode: Gpio.OUTPUT
});
enA = new Gpio(23, {
	mode: Gpio.OUTPUT
});
in3 = new Gpio(6, {
	mode: Gpio.OUTPUT
});
in4 = new Gpio(13, {
	mode: Gpio.OUTPUT
});
enB = new Gpio(5, {
	mode: Gpio.OUTPUT
});

in1.digitalWrite(0);
in2.digitalWrite(0);
enA.digitalWrite(1);

in3.digitalWrite(0);
in4.digitalWrite(0);
enB.digitalWrite(1);

enA.pwmWrite(255);
enB.pwmWrite(120);
enA.pwmFrequency(20000)
enB.pwmFrequency(20000)


http.listen(8080); //listen to port 8080
console.log("Web server started on port 8080");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function handler(req, res) { //what to do on requests to port 8080
	fs.readFile(__dirname + '/index.html', function (err, data) { 
		if (err) {
			res.writeHead(404, {
				'Content-Type': 'text/html'
			}); //display 404 on error
			return res.end("404 Not Found");
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		}); //write HTML
		res.write(data); //write data from .html
		return res.end();
		console.log("connection to server created");
	});
}

io.sockets.on('connection', function (socket) {// Web Socket Connection
	console.log("socket.io connection created");
	socket.emit('notification', {message: "Connected - Speed set to LOW"});
	si.currentLoad().then(data => socket.emit('notification', {data: data}));
	socket.on('keydown', function (data) { //get motor status from client
		console.log("keydown " + data); //output data from WebSocket connection to console
		switch(data ) {
		    case "right":
			    in1.digitalWrite(0);
			    in2.digitalWrite(1);
			    break;
            case "left":
    			in1.digitalWrite(1);
    			in2.digitalWrite(0);
    			break;
            case "forward":
    			in3.digitalWrite(0);
    			in4.digitalWrite(1);
    			break;
            case "backward":
    			in3.digitalWrite(1);
    			in4.digitalWrite(0);
    			break;
            case "stop":
    			in1.digitalWrite(0);
    			in2.digitalWrite(0);
    			in3.digitalWrite(0);
    			in4.digitalWrite(0);
    			break;
            case "low":
			enB.pwmWrite(120);
			socket.emit('notification', {message: "Speed - LOW"})
    			break;
            case "medium":
			enB.pwmWrite(190);
			socket.emit('notification', {message: "Speed - MEDIUM"})
    			break;
            case "high":
			enB.pwmWrite(255);
			socket.emit('notification', {message: "Speed - HIGH"})
    			break;
		};
	});

	socket.on('keyup', function (data) { //get motor status from client
		console.log("keyup " + data); //output data from WebSocket connection to console
		switch(data ) {
		    case "right":
			    in1.digitalWrite(0);
			    in2.digitalWrite(0);
			    break;
            case "left":
    			in1.digitalWrite(0);
    			in2.digitalWrite(0);
    			break;
            case "forward":
    			in3.digitalWrite(0);
    			in4.digitalWrite(0);
    			break;
            case "backward":
    			in3.digitalWrite(0);
    			in4.digitalWrite(0);
    			break;
            case "stop":
    			in1.digitalWrite(0);
    			in2.digitalWrite(0);
    			in3.digitalWrite(0);
    			in4.digitalWrite(0);
    			break;
		};
	});
});

process.on('SIGINT', function () { //on ctrl+c
	in1.digitalWrite(0);
	in2.digitalWrite(0);
	enA.digitalWrite(0);
	in3.digitalWrite(0);
	in4.digitalWrite(0);
	enB.digitalWrite(0);
	process.exit(); //exit completely
});
