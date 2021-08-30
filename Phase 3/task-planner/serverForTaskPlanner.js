// THESE TASKS NEED TO WRITE TO A JSON FILE AND DELETE FROM THE FILE
const http = require("http");
let url = require("url");
let taskArr = [];
let addTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Planner</title>
</head>
<body>
<h2>Add Task</h2>
<form action="addEmployeeTask">
    <label>Employee ID: </label>
    </br>
    <input type="text" name="eid"/>
    </br>
    <label>Task ID: </label>
    </br>
    <input type="text" name="taskid"/>
    </br>
    <label>Task: </label>
    </br>
    <textarea type="text" name="task"></textarea>
    </br>
    <label>Deadline: </label>
    </br>
    <input type="date" name="taskdate"/>
    </br>
    <input type="submit" value="Add Task"/>
    </br>
</form>
    <a href="DeleteTask">Delete Task</a>|
    <a href="ListTask">List Task</a>  
</body>
</html>
`
let deleteTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Task</title>
</head>
<body>
    <h2>Delete Task</h2>
    <form action="deleteTask">
    <label>Task ID: </label>
    </br>
    <input type="text" name="taskid"/>
    </br>
    <input type="submit" value="Delete Task"/>
    </br>
    </form>
    <a href="AddTask">Add Task</a>|
    <a href="ListTask">List Task</a>
</body>
</html>
`
let listTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List Tasks</title>
</head>
<body>
    <h2>List Tasks</h2>
    <form action="listTask">
    </br>
    <input type="submit" value="List Task(s)"/>
    </br>
    </form>
    </br>
    <a href="AddTask">Add Task</a>|
    <a href="DeleteTask">Delete Task</a>
</body>
</html>
`
let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    //response.setHeader('Content-Type', 'text/html'); 
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == "/AddTask"){
                response.write(addTask);
        }else if(urlInfo.path == "/DeleteTask"){
            response.write(deleteTask);
        }else if(urlInfo.path == "/ListTask"){
            response.write(listTask);
        }else if(urlInfo.pathname == "/addEmployeeTask"){  
             let empInput = urlInfo.query;
             let fs = require("fs");
             let info = {empID:empInput.eid, empTaskID:empInput.taskid, empTask:empInput.task, empDate:empInput.taskdate};
             taskArr.push(info);
             let infoString = JSON.stringify(taskArr);    // converting object to string 
             fs.writeFileSync("task.json",infoString);
             console.log("Data store in file");
             response.write(addTask);
        }else if(urlInfo.pathname == "/deleteTask"){
            response.write(deleteTask);
            let empInput = urlInfo.query;
            let fs = require("fs");
            let testSync = fs.readFileSync("task.json");
            let infoString = testSync.toString();
                    let empJson = JSON.parse(infoString);
                    let result = empJson.findIndex(e=>e.empTaskID == empInput.taskid);
                    if(result == -1){
                        console.log("Task ID does not exist...");
                        response.write(`</br><h3 style="color:red">Task ID does NOT exist...please try again!</h3>`)
                    } else{
                        empJson.splice(result,1);
                        infoString=JSON.stringify(empJson);
                        fs.writeFileSync("task.json",infoString);
                        response.write(`</br><h3 style="color:green">Task has been deleted.</h3>`);
                    }

        } else if(urlInfo.pathname == "/listTask"){
            response.writeHead(200,{"content-type":"text/html"});
            response.write(listTask);
            let tableStr="";
            let tableStart=`</br><div>
            <h2 style="margin:10px;">Tasks of Employees</h2>   
            <table border="1" class="table" style="margin:10px;">
            <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Employee Task ID</th>
            <th scope="col">Employee Task</th>
            <th scope="col">Task Deadline</th>
          </tr>`;
            let tableEnd=`</table> </div>`;
            let tableMiddle="";
            let empJson=[];
            let fs = require("fs");
            let testSync = fs.readFileSync("task.json");
            //console.log("With readFilesync: "+testSync.toString());
            let infoString = testSync.toString();
            empJson = JSON.parse(infoString);
            //console.log("Turn to Json obj: "+empJson);
            for (let i=0; i < empJson.length; i++){
                tableMiddle += "<tr><td>"+
                empJson[i].empID+ "</td> <td>"+
                empJson[i].empTaskID+"</td> <td>"+
                empJson[i].empTask+"</td> <td>"+
                empJson[i].empDate+"</td> </tr>";
            }
            tableStr=tableStart+tableMiddle+tableEnd;
            //console.log("After fs file: "+tableStr);
            debugger;
            response.write(tableStr);
            debugger;
            response.end();    
        }
        else {
            response.write(addTask);  
        }
    }
    response.end();
})

server.listen(9090,()=>console.log("Server running on port number 9090"));

