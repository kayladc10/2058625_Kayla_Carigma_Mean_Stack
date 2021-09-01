// load the express module
const { response } = require("express");
let express = require("express");
const { request } = require("http");
let readline = require("readline");
let r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
let serverArray = ["Hello there!","How are you doing?", "Do you need help?","How is the weather?", "What time is it?", "What is your lunch?","See you later!"];
let counter = 0;
//create the reference express module
let app = express();

// load the http module and connect to express module with Server properly
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features
let io = require('socket.io')(http);

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\chatbox.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    
    //receive the message from client application
    socket.on("obj",(msg)=> {
        console.log(msg);
    })

    // receive and display message FROM THE CLIENT SIDE
    socket.on("chat message",(msg)=> {
        io.emit("chat message", msg);
        console.log(msg);
    })

    // HIT ENTER/RETURN KEY to send server message in the command prompt!!!
     r1.on("line",(input)=> {
        // send server message (array message to the client chat box)
        io.emit("serverMessage", `From Server: ${serverArray[counter]}`);
        console.log(`From Server: ${serverArray[counter]}`);
        counter++;   
     });
    
    // sending data to client (console)
    socket.emit("obj1", "Hello Client connected to server...");
})

// please run the server using http module not express module
http.listen(9090,()=>console.log("Server running on port number 9090"));