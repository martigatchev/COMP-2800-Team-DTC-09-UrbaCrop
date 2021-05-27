 // Example starter JavaScript for disabling form submissions if there are invalid fields
// let mongoose = require('mongoose');
// let url = 'mongodb+srv://userTest:userTestPassword@cluster0.o4dh9.mongodb.net/UserTest?retryWrites=true&w=majority';
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
// let userInfo = require('./models/userInfo');
// let db = mongoose.connection;

 (function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        var loginPassword = document.getElementById('loginPassword');
        var loginUsername = document.getElementById('loginUsername');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }

            userInfo.findOne({username: loginUsername.value}, (err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('found:' + docs);
                    var usernameErrorDiv = document.getElementById('usernameErrorMessage');
                    var passwordErrorDiv = document.getElementById('passwordErrorMessage');
                    if (docs != null)  {
                        console.log(docs.username + ' already exists in the DB');
                        event.preventDefault();
                        event.stopPropagation();
                        passwordErrorDiv.innerHTML = "";
                        if (usernameErrorDiv.innerHTML === "") {
                            let node = document.createTextNode ("*Username doesn't exist.");
                            usernameErrorDiv.appendChild(node);
                            usernameErrorDiv.style.color = "red";
                        }
                    }
                    else {
                        usernameErrorDiv.innerHTML = "";
                        if (loginPassword != docs.password) {
                            event.preventDefault();
                            event.stopPropagation();
                            if (passwordErrorDiv.innerHTML === "") {
                                let node = document.createTextNode ('*Incorrect password.');
                                passwordErrorDiv.appendChild(node);
                                passwordErrorDiv.style.color = "red";
                            }
                        }
                    }
                }
            });

            form.classList.add('was-validated');
        }, false);
        });
    }, false);
    })();
    