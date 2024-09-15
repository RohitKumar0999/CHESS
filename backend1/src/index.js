"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 }); // Creating an Instance
wss.on('connection', function connection(ws) {
    ws.on('error', console.error); // Log the error if connection unsuccessfull
    ws.on('message', function message(data) {
        console.log('received: %s', data); // Log the message if connection established
    });
    ws.send('something'); //Dummy message
});
