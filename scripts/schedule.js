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
  var minutesAway; // Train
  var hour;
  var minutes; // Clock

// Retrieve values from form
  $("#add-train").on("click", function() {
    event.preventDefault();
      trainName = $("#train-input").val();
      destination = $("#destination-input").val();
      firstTrain = $("#first-input").val();
      frequency = $("#frequency-input").val();

// Push to Firebase
          firebase.database().ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
          });

//Clear HTML values
  trainName = $("#train-input").val("");
  destination = $("#destination-input").val("");
  firstTrain = $("#first-input").val("");
  frequency = $("#frequency-input").val("");

  });

// Clock function
  function setClock() {
  $("#timeClock").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }
// Display clock
  setInterval(setClock, 1000);

// Listen for children added & perform time conversion
  firebase.database().ref().on("child_added", function(snapshot) {
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTrain = snapshot.val().firstTrain;
    frequency = snapshot.val().frequency;

// Convert time (see comments below)
  firstTrain = moment(firstTrain, 'hh:mm a');
  nextArrival = firstTrain.format('hh:mm a');
    while (moment(nextArrival, 'hh:mm a').isBefore(moment(), 'hh:mm a'))
    {
      nextArrival = moment(nextArrival, 'hh:mm a').add(frequency, "minutes").format('hh:mm a');
    };
     minutesAway = Math.ceil(moment.duration(moment(nextArrival, "HH:mm a").diff(moment(), "HH:mm a")).asMinutes());

// Append submitted data into new table row
    $(".scheduleData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency +
    "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});

// Line 59: Pass firstTrain value into moment, and format to hour, minutes, and AM/PM
// Line 60: Set nextArrival to the value of firstTrain and format. This is necessary since the value of firstTrain
// Line 60: remains static due to value submitted.
// Line 61: Run a while loop if the time of the first train (nextArrival) IS BEFORE the current time.
// Line 63: WHILE the nextArrival is < current time, add the frequency value until nextArrival is > current time.
// Line 65: Assign difference between nextArrival and current time to minutesAway.
// Line 66: Using Math.ceil to round milliseconds up, and asMinutes() to format to minutes.
// Line 68: Append submitted data to table.
