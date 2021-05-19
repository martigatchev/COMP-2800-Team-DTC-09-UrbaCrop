const { render } = require("ejs");
const express = require("express");
const mongoose = require('mongoose');

let url = 'mongodb+srv://userTest:userTestPassword@cluster0.o4dh9.mongodb.net/UserTest?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
let userInfo = require('./models/userInfo');
let db = mongoose.connection;

db.once('open', function() {
    console.log('Connection was succesfull');
})

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

app.get("/login", (req, res) => res.render("login"))
app.get("/signup", (req, res) => res.render("sign_up"));
app.post("/signup", (req, res) => {
    console.log(req.body)
    console.log(req.body.signupUsername)
    console.log(req.body.signupPassword)
    let user = new userInfo({username: req.body.signupUsername, password: req.body.signupPassword});
    user.save({username: req.body.signupUsername, password: req.body.signupPassword})
    .then(result => {
        console.log(result)
        res.redirect('/login');
    })
    .catch(error => console.error(error))
})

