const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/myDatabase');

let User = require("./userModel");

let db = mongoose.connection;

db.once('open', function() {
    console.log("Connection was successful!");
})

let user1 = new User({username:"Ryan", password:"123"});
let user2 = new User({username:"Ben", password:"321"});
let user3 = new User({username:"Rocko", passwnord:"123"});
let user4 = new User({username:"Danny", password:"OH BOB SAGET"});
let user5 = new User({username:"Tito", password:"BadMommaJamma"});


// Here's how to save records in the DB:

// user1.save().
//     then(record => console.log(record)).
//     catch(error => console.log(error));

// user2.save().
//     then(record => console.log(record)).
//     catch(error => console.log(error));

// user3.save().
//     then(record => console.log(record)).
//     catch(error => console.log(error));

// user4.save().
//     then(record => console.log(record)).
//     catch(error => console.log(error));

// user5.save().
//     then(record => console.log(record)).
//     catch(error => console.log(error));

User.find()
    .then(records => console.log(records)).
    catch(error => console.log(error));


let app = express();
    app.use(express.urlencoded({extended: true}));
    app.use("/public", express.static('public')); 
    app.use("/styles", express.static("styles"));
    app.use("/images", express.static("images"));
    app.use("/favicon_package", express.static("favicon_package"));
    app.set("view engine", "ejs");

    
let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Running on port " + PORT);
});

app.get("/", (req, res)=> res.render("landing"));
app.get("/about_us.html", (req, res)=> res.render("about_us"));
app.get("/garden_map.html", (req, res)=> res.render("garden_map"));
app.get("/gardener_profile.html", (req, res)=> res.render("gardener_profile"));
app.get("/gardeners_list.html", (req, res)=> res.render("gardeners_list"));

