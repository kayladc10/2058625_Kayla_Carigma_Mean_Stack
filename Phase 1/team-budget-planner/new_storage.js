var mainArr = [];

function addData() {

    var clientName = document.getElementById("clientname").value;
    var project = document.getElementById("projectname").value;
    var budget = document.getElementById("budget").value;
 
    let clientObj = {name: clientName, projectName: project, budgetamount: budget};

    mainArr.push(clientObj);

    localStorage.setItem("mainArray", JSON.stringify(mainArr));

    console.log("Testing output name: " + mainArr[0].name);

}

function displayData(){
    let clientObject = localStorage.getItem("mainArray");
    let clientJson = JSON.parse(clientObject);

    var middleTable="";
    var tableContent="";
    var startTable ="<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    var endTable="</table>";

    for (let i=0; i < clientJson.length; i++){
        middleTable += "<tr><td>"+
        clientJson[i].name+ "</td> <td>"+
        clientJson[i].projectName+"</td> <td>"+
        clientJson[i].budgetamount+"</td> </tr>";
    }

    tableContent = startTable+middleTable+endTable;
    document.getElementById("main").innerHTML=tableContent;
}

function displayBudget(){
    let clientObject = localStorage.getItem("mainArray");
    let clientJson = JSON.parse(clientObject);

    var totalBudget = 0;
  
    for (var i=0; i < clientJson.length; i++){
            totalBudget += parseFloat(clientJson[i].budgetamount);
        }

    var totalStr = "Total Budget: $" + totalBudget;

    document.getElementById("main").innerHTML= totalStr;
}

function resetFields(){
    document.getElementById("budgetform").reset();
}
