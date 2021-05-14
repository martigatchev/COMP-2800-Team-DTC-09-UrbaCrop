const { render } = require("ejs");
const express = require("express");



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

app.get("/landing.html", (req, res)=> res.render("landing"));
app.get("/about_us.html", (req, res)=> res.render("about_us"));
app.get("/garden_map.html", (req, res)=> res.render("garden_map"));
app.get("/gardener_profile.html", (req, res)=> res.render("gardener_profile"));
app.get("/gardeners_list.html", (req, res)=> res.render("gardeners_list"));

