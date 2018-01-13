// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCZitk1gOlqCCdg7t6qMDwcVqdodQB80h0",
    authDomain: "train-assignment-419c0.firebaseapp.com",
    databaseURL: "https://train-assignment-419c0.firebaseio.com",
    projectId: "train-assignment-419c0",
    storageBucket: "train-assignment-419c0.appspot.com",
    messagingSenderId: "105944350070"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

 var name = "";
 var destination = "";
 var time = "";
 var frequency = 0;

 // $(document).ready(function(){
       $("#schedule").on("click", function(){  
       });


 // Capture Button Click
   $("#new-train").on("click", function(event) {
     event.preventDefault();

     // Grabbed values from text boxes
     name = $("#train-name").val().trim();
     destination = $("#destination").val().trim();
     time = moment($("#train-time").val().trim(), "hh:mm").format("X");
     frequency = $("#frequency").val().trim();

  
     // Code for handling the push
     database.ref().push({
       name: name,
       destination: destination,
       time: time,
       frequency: frequency,
     });

  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

   });

database.ref().on("child_added", function(snapshot) {
     // storing the snapshot.val() in a variable for convenience
     var sv = snapshot.val();

     // Console.loging the last user's data
     console.log(sv.name);
     console.log(sv.destination);
     console.log(sv.time);
     console.log(sv.frequency);

  var nextArrival = moment().diff(moment(sv.time), "minutes");
  console.log(nextArrival);

  var minutesAway = (nextArrival-sv.frequency);
   
    var markup = "<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency+ "</td><td>" + nextArrival + "</td><td>" + minutesAway +"</td></tr>";
       
       $("#schedule").prepend(markup);
   }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
   });
