//initialize firebase
var config = {
    apiKey: "AIzaSyCtXGuwDgR_pnDuxC4rf3yHq2pDtPTysXI",
    authDomain: "train-schadule-project.firebaseapp.com",
    databaseURL: "https://train-schadule-project.firebaseio.com/",
    storageBucket: "train-schadule-project.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  $("#subtn").on("click" , function(){
    event.preventDefault();
    //grab user input
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();
    //object to hold the data
    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      };
    // Uploads employee data to the database
    database.ref().push(newTrain);
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
    alert("Train successfully added");
    
  });

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tarinName = childSnapshot.val().name;
    var tarinDestination = childSnapshot.val().destination;
    var tarinStart = childSnapshot.val().firstTrain;
    var tarinFrequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(tarinStart, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tarinFrequency;
    var minutesAway = tarinFrequency - tRemainder;
    var arrivalNext = moment().add(minutesAway, "minutes");
    var nextArrival = moment(arrivalNext).format("HH:mm A");
  
    // Train Info
    console.log(tarinName);
    console.log(tarinDestination);
    console.log(tarinStart);
    console.log(tarinFrequency);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<th>").text(tarinName),
      $("<td>").text(tarinDestination),
      $("<td>").text(tarinFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#traintbl > tbody").append(newRow);
  });