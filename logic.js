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
  $("#submitbtn").on("click", function(){
    var Train = $("#Train").val().trim();
    var Destination = $("#Destination").val().trim();
    var firstTrain = $("#FirstTime").val().trim();
    var frequency = $("#Frequency").val().trim();
  
  


var first1 = moment(first, 'HH:mm')
var add = first1.add(frequency, 'm')


    var next = moment().add(away, "m").format("hh:mm A");
    var converted_next = moment().diff(moment.unix(next), "minutes");
    var tRemainder = moment().diff(moment.unix(next), "minutes") % frequency ;
    var away = frequency + tRemainder;
    var now = moment([]).valueOf()
    var arrival= now + frequency
    

    databaseref.ref().push({
      Train:Train,
      Location:Location,
      frequency:frequency,
      dateAdded:dateAdded,
      next:away,
      away:away
    });
  });

  databaseref.ref().on("child_added", function(childSnapshot){
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().Train);
      console.log(childSnapshot.val().Location);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().next);
      console.log(childSnapshot.val().away);
      appendToTable( childSnapshot.val().Train, childSnapshot.val().role, childSnapshot.val().startDate, childSnapshot.val().monthlyRate, childSnapshot.val().months, childSnapshot.val().billed)

  });

});
  



