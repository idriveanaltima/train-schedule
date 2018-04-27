$(document).ready( function () {

  var config = {
    apiKey: "AIzaSyCliVOrML9NDv_Dzn6xAW5oKbILEhv-UB4",
    authDomain: "train-schedule-9be2f.firebaseapp.com",
    databaseURL: "https://train-schedule-9be2f.firebaseio.com",
    projectId: "train-schedule-9be2f",
    storageBucket: "train-schedule-9be2f.appspot.com",
    messagingSenderId: "683715306318"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
 

  $("form").on("click", "#submit", function () {
    var train = $("#train").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val().trim();
    var frequency = $("#frequency").val().trim();

  database.ref().push({
      trainName: train,
      destination: destination,
      time: time,
      frequency: frequency,
    });
  });

function getTrains () {

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val())

  // Store everything into a variable.
  var getTrainName = childSnapshot.val().trainName;
  var getDestination = childSnapshot.val().destination;
  var getTime = childSnapshot.val().time;
  var getFrequency = childSnapshot.val().frequency;


  $("#trainInfo > tbody").append("<tr><td>" + getTrainName+ "</td><td>" + getDestination + "</td><td>" +
  getFrequency + "</td><td>" + getTime + "</td><td> add info </td><td>");
});
};
getTrains()
});