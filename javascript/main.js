$(document).ready(function () {

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
  var getTrainName;
  var getDestination;
  var startTime;
  var frequency;
  var minutesAway;
  var nextTrain;

  $("form").on("click", "#submit", function () {
    var trainInput = $("#train").val().trim();
    var destinationInput = $("#destination").val().trim();
    var timeInput = $("#time").val().trim();
    var frequencyInput = $("#frequency").val().trim();

    database.ref().push({
      trainName: trainInput,
      destination: destinationInput,
      time: timeInput,
      frequency: frequencyInput
    });
  });


  database.ref().on("child_added", function (childSnapshot) {

    getTrainName = childSnapshot.val().trainName;
    getDestination = childSnapshot.val().destination;
    startTime = childSnapshot.val().time;
    frequency = childSnapshot.val().frequency;

    calculateTrainInfo();

    $("#trainInfo > tbody").append("<tr><td>" + getTrainName + "</td><td>" + getDestination + "</td><td>" +
      frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td>");

  });

  function calculateTrainInfo() {

    var start = moment(startTime, "HH:mm")
    var differenceInTimes = moment().diff(start, "minutes");
    var remainder = differenceInTimes % frequency
    minutesAway = frequency - remainder
    var nextTrainTime = moment().add(minutesAway, "minutes");
    nextTrain = moment(nextTrainTime).format("hh:mm A")
    return {
      minutesAway,
      nextTrain
    }
  }
});