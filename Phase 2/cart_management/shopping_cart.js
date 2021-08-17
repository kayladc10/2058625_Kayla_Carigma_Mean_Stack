var productAdd = []; //create array for input of product info
var totalCost = 0; //create variable for total cost amount 
var quantityAmount = 0; //create counter for quantity
var productNumber = -1;
function addToCart(id) {
    console.log("id name: " + id);
    var productName = "";
    var productPrice = 0;
    var productQuantity = 0;
    if (id == "blueberryprod") {
        productName = document.getElementById("blueberryname").textContent;
        productQuantity = Number(document.getElementById("blueberryqty").value);
        productPrice = 14.00;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "cherryprod") {
        productName = document.getElementById("cherryname").textContent;
        productQuantity = Number(document.getElementById("cherryqty").value);
        productPrice = 13.75;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "lemonprod") {
        productName = document.getElementById("lemonname").textContent;
        productQuantity = Number(document.getElementById("lemonqty").value);
        productPrice = 16.00;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "shooflyprod") {
        productName = document.getElementById("shooflyname").textContent;
        productQuantity = Number(document.getElementById("shooflyqty").value);
        productPrice = 12.50;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "peachprod") {
        productName = document.getElementById("peachname").textContent;
        productQuantity = Number(document.getElementById("peachqty").value);
        productPrice = 15.50;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "pumpkinprod") {
        productName = document.getElementById("pumpkinname").textContent;
        productQuantity = Number(document.getElementById("pumpkinqty").value);
        productPrice = 11.30;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "appleprod") {
        productName = document.getElementById("applename").textContent;
        productQuantity = Number(document.getElementById("appleqty").value);
        productPrice = 12.75;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "pecanprod") {
        productName = document.getElementById("pecanname").textContent;
        productQuantity = Number(document.getElementById("pecanqty").value);
        productPrice = 17.80;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    else if (id == "blackberryprod") {
        productName = document.getElementById("blackberryname").textContent;
        productQuantity = Number(document.getElementById("blackberryqty").value);
        productPrice = 14.35;
        productNumber += 1;
        console.log("Name: " + productName + " Price $" + productPrice + " Quantity: " + productQuantity);
    }
    // multiply quantity and proce before pushing
    var productCost = productQuantity * productPrice;
    //create object to place product name and price in
    var prodObj = { numIndex: productNumber, name: productName, price: productPrice, quantity: productQuantity, totalprice: productCost };
    // push product name and price object to array
    productAdd.push(prodObj);
    // store in local storage
    localStorage.setItem("productArray", JSON.stringify(productAdd));
    //CART SIZE EQUAL TO ARRAY LENGTH
    document.getElementById("cartsize").innerHTML = productAdd.length.toString();
    //console.log("Test product array: with name is " + productAdd[0].name)
    //console.log("Test index number: " + productAdd[productNumber].numIndex)
}
function displayTable() {
    var product = localStorage.getItem("productArray");
    var productJson = JSON.parse(product);
    console.log("Test item: " + productJson[1].name);
    console.log("Test item price: " + productJson[1].price);
    var insertContent = "";
    for (var i = 0; i < productJson.length; i++) {
        insertContent +=
            "<tr>\n            <td>" + productJson[i].name + "</td> \n            <td>" + productJson[i].price + "</td>\n            <td>" + productJson[i].quantity + "</td> \n            <td>" + productJson[i].totalprice + "</td> \n        </tr>";
    }
    document.getElementById("checkoutTable").innerHTML = insertContent;
    displayTotalAmount();
}
function displayTotalAmount() {
    var amountTotal = localStorage.getItem("productArray");
    var totalJson = JSON.parse(amountTotal);
    for (var i = 0; i < totalJson.length; i++) {
        totalCost += parseFloat(totalJson[i].totalprice);
    }
    var totalStr = "Total Amount: $" + totalCost;
    document.getElementById("totalAmountDis").innerHTML = totalStr;
}
function deleteProduct(id) {
    var getItem = localStorage.getItem("productArray");
    var productJson = JSON.parse(getItem);
    for (var i = 0; i < productJson.length; i++) {
        if (productJson[i].name == document.getElementById("blueberryname").textContent && id == "blueberrydel") {
            productJson.splice(i, 5);
            //console.log("index to delete blueberry: " +getJson[i].numIndex);   
        }
        else if (productJson[i].name == document.getElementById("cherryname").textContent && id == "cherrydel") {
            productJson.splice(i, 5);
            //console.log("index to delete cherry: " +getJson[i].numIndex); 
        }
        else if (productJson[i].name == document.getElementById("lemonname").textContent && id == "lemondel") {
            productJson.splice(i, 5);
            //console.log("index to delete lemon: " +getJson[i].numIndex); 
        }
        else if (productJson[i].name == document.getElementById("shooflyname").textContent && id == "shooflydel") {
            productJson.splice(i, 5);
            //console.log("index to delete shoofly: " +getJson[i].numIndex); 
        }
        else if (productJson[i].name == document.getElementById("peachname").textContent && id == "peachdel") {
            productJson.splice(i, 5);
            //console.log("index to delete peach: " +getJson[i].numIndex); 
        }
        else if (productJson[i].name == document.getElementById("pumpkinname").textContent && id == "pumpkindel") {
            productJson.splice(i, 5);
            //console.log("index to delete pumpkin: " +getJson[i].numIndex); 
        }
        else if (productJson[i].name == document.getElementById("applename").textContent && id == "appledel") {
            productJson.splice(i, 5);
            //console.log("index to delete apple: " +getJson[i].numIndex); 
        }
        else if (productJson[i].name == document.getElementById("pecanname").textContent && id == "pecandel") {
            productJson.splice(i, 5);
            //console.log("index to delete pecan: " +getJson[i].numIndex); 
        }
        else if (productJson.name == document.getElementById("blackberryname").textContent && id == "blackberydel") {
            productJson.splice(i, 5);
            //console.log("index to delete blackberry: " +getJson[i].numIndex); 
        }
    }
    //UPDATE CART SIZE EQUAL TO ARRAY LENGTH
    document.getElementById("cartsize").innerHTML = productAdd.length.toString();
}
