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

// VARIABLES
 var database = firebase.database();

 var name = "";
 var destination = "";
 var trainTime = "";
 var frequency = 0;

 // $(document).ready(function(){
   $("#schedule").on("click", function(){  
       });


// FUNCTIONS + EVENTS
   $("#add-train").on("click", function(event) {
     event.preventDefault();

     // Grabbed values from text boxes
     name = $("#train-name").val().trim();
     destination = $("#destination").val().trim();
     trainTime = $("#train-time").val().trim();
     frequency = $("#frequency").val().trim();

  console.log(name);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);
  
     // Code for handling the push
     database.ref().push({
       name: name,
       destination: destination,
       trainTime: trainTime,
       frequency: frequency,



     });

  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

  return false;

   });

database.ref().on("child_added", function(snapshot) {
     // storing the snapshot.val() in a variable for convenience
     var sv = snapshot.val();

     // Console.loging the last user's data
     console.log(sv.name);
     console.log(sv.destination);
     console.log(sv.trainTime);
     console.log(sv.frequency);

  var nextArrival = moment(sv.trainTime, 'HH:mm'); 
  var nowMoment = moment();
  // console.log(nextArrival);
  // console.log(nowMoment);


  var minutesFirst = nowMoment.diff(nextArrival, 'minutes');
  var minutesLast = minutesFirst % sv.frequency;
  var minutesAway = sv.frequency - minutesLast;
  console.log(sv.frequency);
  console.log(minutesLast);
  console.log(minutesFirst);

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");
  // console.log(nextArrival);
  // console.log(formatNextArrival);

   
    var markup = "<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency+ "</td><td>" + formatNextArrival + "</td><td>" + minutesAway +"</td></tr>";
       
       $("#schedule").prepend(markup);
   }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
   });
