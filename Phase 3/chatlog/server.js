// load the express module
const { response } = require("express");
let express = require("express");
const { request } = require("http");
let readline = require("readline");
let r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let app = express();                    //create the reference express module
let http = require("http").Server(app); // load the http module and connect to express module with Server properly
let io = require('socket.io')(http);    // load the socket.io module and connect http module with IIFE features

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true})) // which is use to enable post data receving from normal html form. 



// -------------load the database module------------------
let mongoose = require("mongoose");

let urlDB = "mongodb://localhost:27017/phase_three";
mongoose.pluralize(null);           
// connect the database it return promise object 
mongoose.connect(urlDB).
then(res=>console.log("connected mongoose database")).
catch(err=>console.log(err));

//to use this db connection we have to call function 
let db = mongoose.connection;
db.once("open",()=> {
// We have to defined schema which provide the structure for collection 
    let chatSchema = mongoose.Schema({
        //_id:Number,
        username:String,
        chatmessage:String, 
    });
    let chatModel = mongoose.model("Chatlog",chatSchema);

    app.get("/",(request,response)=> {
        response.sendFile(__dirname+"\\chatlog.html");
    })

    io.on("connection",(socket)=> {
        console.log("Client connected");
    
        //RECEIVE MESSAGE FROM CLIENT IN CONSOLE (NOT INPUT)
        socket.on("obj",(msg)=> {
            console.log(msg);
        })

        socket.on("clientEvent", function(data){
            let newChat = new chatModel({
                //_id:001,
                username: data.clientname,
                chatmessage: data.clientmessage});
    
            chatModel.insertMany(newChat,(err,result)=> {
                if(!err){
                    console.log(result)
                } else {
                    console.log(err)
                }
            });
        
        });

        // receive and display message ON SERVER FROM THE CLIENT SIDE (USER INPUT)
        socket.on("clientMessage",(msg)=> {
            io.emit("clientMessage", msg);
            console.log(msg);
        });

        // Send server message ON COMMAND LINE
        r1.on("line",(input)=> {
            io.emit("serverMessage", input);
            
            let newChat = new chatModel({
                //_id:002,
                username:"Server",
                chatmessage:input});
            chatModel.insertMany(newChat,(err,result)=> {
                if(!err){
                    console.log(result)
                } else {
                    console.log(err)
                }
            });
        
            console.log(`Server console: ${input}`); 
        });
    
        // sending data message to client (console)
        socket.emit("obj1", "Server is connected to this Client");
    })

}); // closing/end of database

// SERVER RUNNING ON HTTP MODULE
http.listen(9090,()=>console.log("Server running on port number 9090"));