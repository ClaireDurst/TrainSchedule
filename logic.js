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

var databaseref = firebase.database();
$(document).ready(function(){
  $("#submit").on("click", function(){
    Train = $("#Trainname").val().trim();
    Destination = $("#Destination").val().trim();
    firstTrain = $("#FirstTime").val().trim();
    Frequency = $("#Frequency").val().trim();

var first1 = moment(firstTrain, 'HH:mm')
var add = first1.add(Frequency, 'm')


    var next = moment().add(away, "m").format("hh:mm A");
    var converted_next = moment().diff(moment.unix(next), "minutes");
    var tRemainder = moment().diff(moment.unix(next), "minutes") % Frequency ;
    var away = Frequency + tRemainder;
    var now = moment([]).valueOf()
    var arrival= now + Frequency


    databaseref.ref().push({
      Train:Train,
      Destination:Destination,
      Frequency:Frequency,
      Next:Next,
      Away:Away
    });
  });

  databaseref.ref().on("child_added", function(childSnapshot){
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().Train);
      console.log(childSnapshot.val().Destination);
      console.log(childSnapshot.val().Frequency);
      console.log(childSnapshot.val().Next);
      console.log(childSnapshot.val().Away);
      appendToTable( childSnapshot.val().Train, childSnapshot.val().Destination, childSnapshot.val().Frequency, childSnapshot.val().Next, childSnapshot.val().Away);

  });

});
