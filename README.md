# COMP-2800-Team-DTC-09-UrbaCrop

Guide for new contributors

This document will tell you what you need to start making your own changes
to UrbaCrop.

This README file will tell you all the software and dependencies you need to
install, as well as troubleshoot common problems.

A link to our UrbaCrop version 1.0 testing plan will be provided.

## Section 1 - Necessary Installations

### Section 1.1 - Necessary languages
In addition to HTML/CSS/JavaScript (available to you with no installation needed), UrbaCrop primarly uses node.js.

The team used node version 14.15.4. While most versions from the same period should work, if you want to guarantee compatability you can choose your version of node manually at https://nodejs.org/en/download/releases/

Simply scroll down and select version 14.15.4 and follow the installation manager.

### Section 1.2 - IDEs
While most IDEs should be sufficient to work on UrbaCrop, the UrbaCrop team used Visual Studio Code Version 1.56.2

The version can be downloaded directly at https://code.visualstudio.com/updates/v1_56

### Section 1.3 - Databases
UrbaCrop uses a NoSQL database, namely MongoDB. To install the version of
mongoose that we used, simply go to the terminal and run

npm i mongoose@5.12.10

You may also find it helpful to (optionally) download a desktop verson of MongoDB.

https://www.mongodb.com/try/download/compass

If you want the version we used (1.26.1) and it is not available in the dropdown menu bar, click on "archived releases" and you will see the option to download older versions

### Section 1.4 - Other software

UrbaCrop requires ejs to be able to use and render ejs files. We used version 3.1.2. To install that specific version, go to the terminal and run 

npm install ejs@3.1.2


UrbaCrop requires express to enable online hosting of the app. We used version 4.17.1. To install that specific version, go to the terminal and run 

npm install express@4.17.1


UrbaCrop requires express-session to manage user sessions. express-session is middleware and does not come automatically bundled with express and must be installed seperately. We used version 1.17.2. To install that specific version, go to the terminal and run 

npm install express@1.17.2

UrbaCrop requires mongoose to enable MongoDB functionality. To install version 5.12.10, go to the terminal and type

npm install mongoose@5.12.10

You may find nodemon helpful while developing, but is not required. Any version should work, but if you want what we used then run

npm install nodemon@2.0.7

## Section 2 - 3rd party APIs and Frameworks

We used Bootstrap quite heavily for UrbaCrop. To use it on any page that you add, simply put

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

in the <head> section of your ejs file.

Also place

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8"
  crossorigin="anonymous"></script> 

just before your closing body tag.

## Section 3 - API keys
We used the Google Maps 3rd party API.



## Section 4 - Installation order and location

Installation order does not matter. For installation location, simply use the default that occurs when you run the npm install terminal commands.

## Section 5 - Configuration Instructions

To connect to mongoDBCompass, please ensure the following line of code is in app.js: 

mongodb+srv://userTest:userTestPassword@cluster0.o4dh9.mongodb.net/UserTest?retryWrites=true&w=majority

As it contains the log-in credentials for mongoDB.

The password for the servers (Heroku) is intentionally not given for security.
Should you want to deploy any changes, please email Ryan Odribege at rodribege@my.bcit.ca

## Section 6 - Testing Plan

Please consult the official UrbaCrop testing plan at 

https://docs.google.com/spreadsheets/d/16gd4VDKGGMVFIkUrDqRxciQFtwp9ZEmU/edit#gid=1518399296

Feel free to add your own!
