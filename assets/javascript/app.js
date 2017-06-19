$(document).ready(function() {
    //global variables

    var train = "";
    var destination = "";
    var time = "";
    var frequency = "";

    //moment js variables
    var timeConverted = "";
    var currentTime = "";
    var diffTime = "";
    var timeApart = "";
    var timeUntillTrain = "";
    var nextTrain = "";
    var nextTrainFormat = "";

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

        //moment js calculations
        var timeConverted = moment(time, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(timeConverted), "minutes");
        var timeApart = diffTime % frequency;
        var timeUntillTrain = frequency - timeApart;
        var nextTrain = moment().add(timeUntillTrain, "minutes");
        var nextTrainFormat = moment(nextTrain).format("hh:mm a");
        //debug
        console.log(train);
        console.log(destination);
        console.log(time);
        console.log(frequency);
        console.log(timeConverted);
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
        console.log(timeApart);
        console.log("MINUTES UNTILL TRAIN: " + timeUntillTrain);
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

        if (train !== "" && destination !== "" && time !== "" && frequency !== "") { //makes sure all blanks are filled

            database.ref().push({ //pushes user input to firebase reference
                train: train,
                destination: destination,
                time: time,
                frequency: frequency,
                timeUntillTrain: timeUntillTrain,
                nextTrainFormat: nextTrainFormat
            });

            database.ref().on("child_added", function(childSnapshot) { //attaches event handler for database

                //adds data to tableOutout
                $("#tableOutput").append("<tr> <td>" + childSnapshot.val().train + " </td><td> " + childSnapshot.val().destination +
                    " </td><td> " + childSnapshot.val().frequency + "</td><td> " + childSnapshot.val().nextTrainFormat + "</td><td> " + childSnapshot.val().timeUntillTrain + " </td></tr>"
                );
            });
        }
    });

    var interval = setInterval(function() {
        var momentNow = moment();
        $('.clock').html(momentNow.format('hh:mm:ss A'));
    }, 100);
});
