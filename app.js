const { render } = require("ejs");
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');

let url = 'mongodb+srv://userTest:userTestPassword@cluster0.o4dh9.mongodb.net/UserTest?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
let userInfo = require('./models/userInfo');
let landlordGardenInfo = require('./models/landlordGardenInfo');
let gardenerGardenInfo = require('./models/gardenerGardenInfo');
let db = mongoose.connection;

db.once('open', function() {
    console.log('Connection was succesfull');
})

let app = express();
    app.use(express.urlencoded({extended: true}));
    app.use("/scripts", express.static('scripts'));
    app.use("/data", express.static('data'));
    app.use("/public", express.static('public')); 
    app.use("/styles", express.static("styles"));
    app.use("/images", express.static("images"));
    app.use("/favicon_package", express.static("favicon_package"));
    app.set("view engine", "ejs");

    app.use(session({
        secret: 'abcxyzasdfggfdsa',
        resave: true,
        rolling: true,
    }));

    
let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Running on port " + PORT);
});
app.get("/about_us", (req, res) => {
    if(req.session.username) {
        res.render("about_us");
    } else {
        res.redirect('/');
    }
});
app.get("/garden_map.html", (req, res) => {
    if(req.session.username) {
        res.render("garden_map");
    } else {
        res.redirect('/');
    }
});
app.get("/gardener_profile_garden", (req, res) => {
    if(req.session.username) {
        gardenerGardenInfo.find({user: req.session.username}, (err, docs) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('found:' + docs);
                res.render("gardener_profile_garden", {userFirstName: req.session.firstName, userLastName: req.session.lastName,
                userImg: req.session.imgURL, gardensArray: docs});
            }
        })
    } else {
        res.redirect('/');
    }
});


app.post("/addNewGarden", (req, res) => {
    console.log(req.body);
    
    gardenerGardenInfo.findOne({user: req.session.username, gardenName: req.body.gardenName}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('found:' + docs);
            if (docs != null)  {
                console.log(docs.user + docs.gardenName + ' already exists in the DB');
                alert('The garden you are trying to add already exists in your gardens!');
                res.redirect('/gardener_profile_profile');
            }
            else {
                let plantArray = [];
                if(req.body.fruits == '') {
                    plantArray.push("fruits");
                }
                if(req.body.herb == '') {
                    plantArray.push("herb");
                }
                if(req.body.flowers == '') {
                    plantArray.push("flowers");
                }
                if(req.body.trees == '') {
                    plantArray.push("trees");
                }
                if(req.body.vegetables == '') {
                    plantArray.push("vegetables");
                }
                let gardenerGarden = new gardenerGardenInfo({user: req.session.username, gardenName: req.body.gardenName, photo: req.body.gardenImgURL,
                gardenType: plantArray, size: req.body.size, about: req.body.comment});

                gardenerGarden.save({user: req.session.username, gardenName: req.body.gardenName, photo: req.body.gardenImgURL,
                    gardenType: plantArray, size: req.body.size, about: req.body.comment})
                .then(result => {
                    console.log(result)
                    res.redirect('/gardener_profile_garden');
                })
                .catch(error => console.error(error))
            }
        }
    })
});



app.get("/gardener_profile_profile", (req, res) => {
    if(req.session.username) {
        res.render("gardener_profile_profile", {userFirstName: req.session.firstName, userLastName: req.session.lastName, userImg: req.session.imgURL})
    } else {
        res.redirect('/');
    }
});
app.get("/policies", (req, res) => {
    if(req.session.username) {
        res.render("policy_page")
    } else {
        res.redirect('/');
    }
});
app.get("/gardeners_list", (req, res)=> {
    if(req.session.username) {
        userInfo.find({view: 'gardener'}, (err, docs) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("gardeners_list", {arrayOfGardeners: docs});
            }
        })
    } else {
        res.redirect('/');
    }
});
app.post("/gardeners_list", (req, res) => {
    if(req.session.username) {
        console.log(req.body);

        userInfo.find({view: 'gardener', lastName: req.body.gardenerLastName}, (err, docs) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("gardeners_list", {arrayOfGardeners: docs});
            }
        })
    } else {
        res.redirect('/');
    }
})

// 3 variables to handle error messages for login and signup page.
let UEM = ""; // username error message for login page.
let PEM = ""; // password error message for login page.
let SUEM = ""; // username error message for sign up page.

app.get("/", (req, res) => res.render("login", {usernameErrorMessage: UEM, passwordErrorMessage: PEM}))
app.get("/signup", (req, res) => res.render("sign_up", {signupUsernameErrorMessage: SUEM}));
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
                SUEM = "Username already exists.";
                res.redirect('/signup');
            }
            else {
                SUEM = "";
                let user = new userInfo({firstName: req.body.signupFirstName, lastName: req.body.signupLastName, 
                    email: req.body.signupEmail, username: req.body.signupUsername, password: req.body.signupPassword, 
                    phoneNumber: req.body.signupPhoneNumber, houseNumber: req.body.signupHouseNumber, 
                    postalCode: req.body.signupPostalCode, address: req.body.signupAddress, city: req.body.signupCity,
                    view: req.body.signupOption, imgURL: ""});

                user.save({firstName: req.body.signupFirstName, lastName: req.body.signupLastName, 
                    email: req.body.signupEmail, username: req.body.signupUsername, password: req.body.signupPassword, 
                    phoneNumber: req.body.signupPhoneNumber, houseNumber: req.body.signupHouseNumber, 
                    postalCode: req.body.signupPostalCode, address: req.body.signupAddress, city: req.body.signupCity,
                    view: req.body.signupOption, imgURL: ""})

                .then(result => {
                    console.log(result)
                    res.redirect('/');
                })
                .catch(error => console.error(error))
            }
        }
    })
})

app.post("/", (req, res) => {
    console.log(req.body)       // Remove this line at the end.
    userInfo.findOne({username: req.body.loginUsername}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('found:' + docs);
            if (docs == null)  {
                console.log("can't find user" + docs);
                PEM = "";
                UEM = "Username doesn't exist.";
                res.redirect('/');
            }
            else {
                UEM = "";
                if (req.body.loginPassword == docs.password) {
                    console.log('successful login! User:' + docs.username);
                    req.session.username = docs.username;
                    req.session.firstName = docs.firstName;
                    req.session.lastName = docs.lastName;
                    req.session.view = docs.view;
                    req.session.imgURL = docs.imgURL;
                    req.session.cookie.maxAge = 10 * 60 * 1000;
                    if (docs.view == 'gardener') {
                        res.redirect('/gardener_profile_profile');
                    }
                    else {
                        res.redirect('/gardeners_list');
                    }
                }
                else {
                    console.log('Password does not match the username');
                    PEM = 'Password does not match the username';
                    res.redirect('/');
                }
            }
        }
    })
})

app.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect('/'));
})





// The next app.use should be the last line of code on this page.
app.use(function (req, res) {
    res.status(404).render('404error.ejs');
});
