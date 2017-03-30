var config = {
  apiKey: "AIzaSyB6JgxLwSLkSFLVij6_N65wSWnxyhSVKzY",
  authDomain: "train-schedule-cc560.firebaseapp.com",
  databaseURL: "https://train-schedule-cc560.firebaseio.com",
  storageBucket: "train-schedule-cc560.appspot.com",
  messagingSenderId: "830516563728"
};
firebase.initializeApp(config);

// Variables
  var trainName;
  var destination;
  var firstTrain;
  var frequency;
  var nextArrival;
  var minutesAway;

// Retrieve values from form
  $("#add-train").on("click", function() {
    event.preventDefault();
      trainName = $("#train-input").val();
      destination = $("#destination-input").val();
      firstTrain = $("#first-input").val();
      frequency = $("#frequency-input").val();
    console.log($("#train-input").val());
    console.log($("#destination-input").val());
    console.log($("#first-input").val());
    console.log($("#frequency-input").val());
        //Push to Firebase
          firebase.database().ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
          });
  });
