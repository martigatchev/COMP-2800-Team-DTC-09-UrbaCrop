const { render } = require("ejs");
const express = require("express");
const favicon = require('serve-favicon');


let app = express();
    app.use(express.urlencoded({extended: true}));
    app.use("/public", express.static('public')); 
    app.use("/styles", express.static("styles"));
    app.use("/images", express.static("images"));
    app.use(favicon(path.join(__dirname,'public','favicon-package','favicon.ico')));
    app.set("view engine", "ejs");

    
let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Running on port " + PORT);
});

app.get("/", (req, res)=> res.render("index"));

app.get("/gardener_profile", (req, res)=> res.render("gardener_profile"));

app.get("/about_us", (req, res)=> res.render("about_us"));

