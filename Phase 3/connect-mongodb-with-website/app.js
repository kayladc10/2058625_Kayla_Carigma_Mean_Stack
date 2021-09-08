//--CONNECT EACH WEB PAGE--
//--LOADING ALL MODULES--
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
// create the reference of express 
let app = express();
// which is use to enable post data receving from normal html form. 
app.use(bodyParser.urlencoded({extended:true}))
// add middleware 
app.use(cors());
app.use(bodyParser.json())

// -------------load the database module------------------
let mongoose = require("mongoose");
const { request, response } = require("express");
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
    let courseSchema = mongoose.Schema({
        _id:Number,
        cname:String,
        cdescription:String,
        camount:Number
    });
    let courseModel = mongoose.model("Course",courseSchema);
//--------------------------------------------------------

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\html\\index.html");
});

app.get("/addcourse",(request,response)=> {
    response.sendFile(__dirname+"\\html\\add_course.html");
});

app.post("/add_Course",(request,response)=> {
    let getCourse = request.body;
    // CREATE reference with model 
        let newCourse = new courseModel({
            _id:getCourse.courseid,
            cname:getCourse.coursename,
            cdescription:getCourse.description,
            camount:getCourse.amount});

        courseModel.insertMany(newCourse,(err,result)=> {
            if(!err){
                console.log(result)
            } else {
                console.log(err)
            }
        });
        response.sendFile(__dirname+"\\html\\index.html");
    
});

app.get("/updatecourse",(request,response)=> {
    response.sendFile(__dirname+"//html//update_course.html");
});

app.get("/update_Course",(request,response)=> { 
    let id = request.query['courseid'];
    let amount = request.query['newAmount'];
    courseModel.updateOne({"_id":id},{$set:{"camount":amount}},(err,result)=> {
        if(!err){
            console.log(result)
            if(result.modifiedCount>0 || result.matchedCount>0){
                    console.log("Product updated successfully")
            }else {
                    console.log("Product didn't update");
            }
        }else {
            console.log(err);
        }
    })
    response.sendFile(__dirname+"\\html\\index.html");
})

app.get("/deletecourse",(request,response)=> {
    response.sendFile(__dirname+"\\html\\delete_course.html");
});

app.get("/delete_Course",(request,response)=> {
    let id = request.query['courseid'];
    courseModel.deleteOne({"_id":id},(err,result)=> {
        if(!err){
            if(result.deletedCount>0){
                console.log("Record deleted successfully");
            } else {
                console.log("Record not present");
            }
        } else {
            console.log(err)
        }
    });
    response.sendFile(__dirname+"\\html\\index.html");
});

app.get("/fetchcourse",(request,response)=> {
    response.sendFile(__dirname+"\\html\\fetch_course.html");
});

app.get("/fetch_Course",(request,response)=> {
    let tableStr="";
    let tableStart=`</br><div>
            <h2 style="margin:10px;">Course Information</h2>   
            <table border="1" class="table" style="margin:10px;">
            <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Course Name</th>
            <th scope="col">Description</th>
            <th scope="col">Course Amount</th>
          </tr>`;
    let tableEnd=`</table> </div>`;
    let tableMiddle="";

    courseModel.find({},(err,data)=> {
        if(!err){
            data.forEach(course=> {
                tableMiddle += "<tr><td>"+
                course._id+ "</td> <td>"+
                course.cname+"</td> <td>"+
                course.cdescription+"</td> <td>"+
                course.camount+"</td> </tr>";
            })
            tableStr=tableStart+tableMiddle+tableEnd;
            response.send(tableStr);
        } else {
            console.log(err);
        }
    
    })
}) 

});//end database function
app.listen(9090,()=>console.log("Server running on port number 9090"))