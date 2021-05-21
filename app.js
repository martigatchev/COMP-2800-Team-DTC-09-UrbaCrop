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
app.get("/about_us", (req, res)=> res.render("about_us"));
app.get("/garden_map.html", (req, res)=> res.render("garden_map"));
app.get("/gardener_profile", (req, res)=> res.render("gardener_profile"));
app.get("/gardener_profile_garden", (req, res)=> res.render("gardener_profile_garden"));
app.get("/gardener_profile_profile", (req, res)=> res.render("gardener_profile_profile"));
app.get("/gardeners_list", (req, res)=> {
    userInfo.find({view: 'gardener'}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("gardeners_list", {arrayOfGardeners: docs});
        }
    })
    
});

app.post("/gardeners_list", (req, res) => {
    console.log(req.body);

    userInfo.find({view: 'gardener', lastName: req.body.gardenerLastName}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("gardeners_list", {arrayOfGardeners: docs});
        }
    })

})

app.get("/login", (req, res) => res.render("login"))
app.get("/signup", (req, res) => res.render("sign_up"));
app.post("/signup", (req, res) => {
    console.log(req.body)       // Remove this line at the end.

    userInfo.findOne({username: req.body.signupUsername}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('found:' + docs);
            if (docs != null)  {
                console.log(docs.username + ' already exists in the DB');
                res.redirect('/signup');
            }
            else {
                let user = new userInfo({firstName: req.body.signupFirstName, lastName: req.body.signupLastName, 
                    email: req.body.signupEmail, username: req.body.signupUsername, password: req.body.signupPassword, 
                    phoneNumber: req.body.signupPhoneNumber, houseNumber: req.body.signupHouseNumber, 
                    postalCode: req.body.signupPostalCode, address: req.body.signupAddress, city: req.body.signupCity,
                    view: req.body.signupOption});

                user.save({firstName: req.body.signupFirstName, lastName: req.body.signupLastName, 
                    email: req.body.signupEmail, username: req.body.signupUsername, password: req.body.signupPassword, 
                    phoneNumber: req.body.signupPhoneNumber, houseNumber: req.body.signupHouseNumber, 
                    postalCode: req.body.signupPostalCode, address: req.body.signupAddress, city: req.body.signupCity,
                    view: req.body.signupOption})

                .then(result => {
                    console.log(result)
                    res.redirect('/login');
                })
                .catch(error => console.error(error))
            }
        }
    })
})

app.post("/login", (req, res) => {
    console.log(req.body)       // Remove this line at the end.
    userInfo.findOne({username: req.body.loginUsername}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('found:' + docs);
            if (docs == null)  {
                console.log("can't find user" + docs);
                res.redirect('/login');
            }
            else {
                if (req.body.loginPassword == docs.password) {
                    console.log('successful login! User:' + docs.username);
                    if (docs.view == 'gardener') {
                        res.redirect('/gardener_profile_profile');
                    }
                    else {
                        res.redirect('/gardeners_list');
                    }
                }
                else {
                    console.log('Password does not match the username');
                    res.redirect('/login');
                }
            }
        }
    })
})

