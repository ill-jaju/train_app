//global variables

var train = "";
var destination = "";
var time = "";
var frequency = "";

//firebase init
var config = {
    apiKey: "AIzaSyA2mDT-x7-ebfk--nodKNKNwOgsoaoT8EA",
    authDomain: "trainapp-e3e2a.firebaseapp.com",
    databaseURL: "https://trainapp-e3e2a.firebaseio.com",
    projectId: "trainapp-e3e2a",
    storageBucket: "",
    messagingSenderId: "557662817580"
};
firebase.initializeApp(config);

var database = firebase.database(); //creates variable to store firebase info

//event handlers

$("#add-train").on("click", function(event) { //submit button
    event.preventDefault();
    //takes in user input from form
    train = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    time = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    //debug
    console.log(train);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    database.ref().push({ //pushes user input from form to firebase reference
        train: train,
        destination: destination,
        time: time,
        frequency: frequency
    });

    database.ref().on("child_added", function(childSnapshot) { //attaches event handler for database

        //adds data to tableOutout
        $("#tableOutput").append("<tr> <td>" + childSnapshot.val().train + " </td><td> " + childSnapshot.val().destination +
            " </td><td> " + childSnapshot.val().time + "</td><td></td><td> " + childSnapshot.val().frequency + " </td><td></td></tr>");
    });

});
