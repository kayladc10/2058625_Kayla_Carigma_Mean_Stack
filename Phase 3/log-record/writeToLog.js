    let readline= require("readline-sync");

    let firstname = readline.question("Please enter your first name: ");
    let lastname = readline.question("Please enter your last name: ");
    let gender = readline.question("Please enter your gender: ");
    let age = readline.questionInt("Please enter your age: ");
    let email = readline.questionEMail("Please enter your email address: ")
    let date = new Date();
    debugger;

    let user = {fname:firstname, lname:lastname, ugender:gender, uage:age, uemail:email, udate:date};
    let userString = JSON.stringify(user);    // converting object to string 
    debugger;
    let fs = require("fs");
    fs.writeFileSync("userlog.json",userString,{flag:"a+"},(err)=> {    
        if(!err){
            console.log("Data append and store in json file");
        }
    });
    debugger;




