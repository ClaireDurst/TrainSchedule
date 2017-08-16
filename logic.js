  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNzlVovjF3JGewcUDMqw0ebpXP_cGkzAk",
    authDomain: "train-schedule-1318b.firebaseapp.com",
    databaseURL: "https://train-schedule-1318b.firebaseio.com",
    projectId: "train-schedule-1318b",
    storageBucket: "train-schedule-1318b.appspot.com",
    messagingSenderId: "1018134796350"
  };
  firebase.initializeApp(config);

  var Train;
  var Destination;
  var Frequency;
  var Next = " ";
  var Away = " ";

function appendToTable(Train, Destination, Frequency, Next, Away){
  var $table = $("#trainTable");
  var $tableRow = $("<tr>");
  $tableRow.append("<td>" + Train + "</td>");
  $tableRow.append("<td>" + Destination + "</td>");
  $tableRow.append("<td>" + Frequency + "</td>");
  $tableRow.append("<td>" + Next + "</td>");
  $tableRow.append("<td>" + Away + "</td>");
  $table.append($tableRow);
}
// now = moment().format('HH:mm')
// time= "16:15"
// next = moment(time,"HH:mm").format("HH:mm")
// var converted_next = moment(next, "HH:mm").diff(moment(now, "HH:mm"))
// console.log(moment(converted_next).format("m"))
var database = firebase.database();
$(document).ready(function(){
  $("#submit").on("click", function(){
    event.preventDefault();

    Train = $("#Trainname").val().trim();
    Destination = $("#Destination").val().trim();
    firstTrain = $("#FirstTime").val().trim();
    frequency = parseInt($("#Frequency").val().trim());

    var converted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(converted), "minutes");

    var howLong = diffTime % frequency;

    minsAway = frequency - howLong;

    nextArrival = moment().add(minsAway, "minutes").format("HH:mm");

    // push information to Firebase
    database.ref().push({
        Train: Train,
        Destination: Destination,
        Frequency: frequency,
        Next: nextArrival,
        Away: minsAway

    });
  });

  database.ref().on("child_added", function(childSnapshot){
      // Log everything that's coming out of snapshot
      // console.log(childSnapshot.val().Train);
      // console.log(childSnapshot.val().Destination);
      // console.log(childSnapshot.val().Frequency);
      // console.log(childSnapshot.val().Next);
      // console.log(childSnapshot.val().Away);
      appendToTable( childSnapshot.val().Train, childSnapshot.val().Destination, childSnapshot.val().Frequency, childSnapshot.val().Next, childSnapshot.val().Away);

  });

});
