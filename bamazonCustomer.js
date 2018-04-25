var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var length = require("length");
var $parseInt = require("parse-int-x").parseInt2018;
var delay = require("delay");
//globals
var item = "";
var price = "";
var qty = "";
var stock = "";

//var stringify = require("json-stable-stringify");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dad8710",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    greeting();
});

function greeting(){
    inquirer.prompt({
        type: "list",
        name: "welcome",
        message: "would you like to make purchase?",
        choices: [
            "yes",
            "no"
        ]
    })
    .then(function(answer){
        switch (answer.welcome) {
            case "yes":
            displayItems();
            break;
        
            case "no":
            console.log("thanks for wasting our time then.");
            connecton.end();
            break;
            
        }
    });
}

function displayItems() {
    var query = "SELECT item_ID, item_name, price FROM products";
    connection.query(query, function(err, res){
        for (var i = 0; i < res.length; i++) {
        var itemList = ("item ID: " + res[i].item_ID + ", item name: " + res[i].item_name + ", unit price: $" + res[i].price);
       
        console.log(itemList);      
        }
        selectItems();  
    });
       
}

function selectItems(){
    inquirer.prompt({
        name: "item",
        type: "input",
        message: "please enter the item ID of what you would like to purchase:"
    })
    .then(function(answer) {
        
        connection.query("SELECT item_ID, item_name, price, stock_qty FROM products WHERE ?", {item_ID: answer.item}, function(err, res){
                if (err) throw err;

               
                for (var i = 0; i < res.length; i++) { 
                    var item = res[i].item_ID;
                    var name = res[i].item_name;     
                    var price = res[i].price;
                    var stock = res[i].stock_qty;

            console.log("Item: " + name + ", price: $" + price + " each");
            }

    //keeps questoin from overlapping with name and price above

       delay(750).then(() => {
           itemQty(item, name, stock);
        });
    });

});

   

//asks quantity and checks stock availability, shows total (price x qty), says items will be shipped to you at address on file (fake).
function itemQty(item, name, stock){
  
    inquirer.prompt({
        type: "list",
        name: "purchase",
        message: "would you like to purchse this item?",
        choices: [
            "yes",
            "no"
        ]
    })    
        .then(function(answer){
        switch (answer.purchase) {
            case "yes":
                getQty(item);
            break;
        
            case "no":
            console.log("please make another selection");
            greetings();
            break;
            
        }
    });

    function getQty(item, stock, name) {
        
        inquirer.prompt({
            name: "qty",
            type: "input",
            message: "please enter the quantity you would like",
        })
        .then(function(value){           

            var qty = $parseInt(value.qty, 10);           
          
            // if (qty > stock) {
            //      console.log("qty: " + qty + ", stock: " + stock);
            //      console.log("sorry, we have insufficient supply of " + name);
            //  } else {
            //     function updateStock(item, stock, name) {
            //         var query = connection.query(
            //             "UPDATE products SET ? WHERE ?",
            //             [
            //                 {
            //                     stock_qty: stock_qty - qty
            //                 },
            //                 {
            //                     item_ID: item
            //                 }
            //             ],
            //             function(err, res) {
                        
            //                 console.log(res.affectedRows + " stock has been update!\n");
                            
                           
            //             }
            //         );
            //     }
            // };  
            purchaseItems(item, qty);         
        });

    function purchaseItems(item, qty){    
        
    connection.query("SELECT item_name, price, stock_qty FROM products WHERE ?", 
    {
        item_ID: item
    }, 
    function(err, res) {
    if (err) throw err;
            
        console.log(qty + " " + res[0].item_name + "s will be mailed to the address we have on file.\n");
        console.log("$" + ((qty * res[0].price).toFixed(2)) + " will be billed to your account. \n");
        delay(750).then(() => {
            console.log("thank you for shopping with Bamazon!");
         });
        

connection.end();
});



}
}
}
}
