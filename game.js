var buttonColours = ["red", "blue", "green", "yellow"]; // Array of all the colours.

var gamePattern = []; // An empty array which would be consisting of all the next sequences.

var userClickedPattern = []; // An empty array to store the pattern in which the user clicks on the buttons.

var started = false; // Indicates that the game has not started yet.

var level = 0; // By default the level is 0.

$(document).keydown(function() { // When any key is pressed for the first time, it calls the nextSequence() function.

  if (!started) {

    $("#level-title").text("Level " + level);

    nextSequence();

    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // Getting the colour of the button on which the user has clicked.

  userClickedPattern.push(userChosenColour); // Pushing that colour to the user Clicked Pattern array.

  playSound(userChosenColour); // Function called to play the sound of the colour user has chosen.

  animatePress(userChosenColour); // Function called to animate the button.

  checkAnswer(userClickedPattern.length-1); // Passing the last button pressed by the user to check if it is right.
})


function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){ // Checking if it actually matches with the Game Pattern.
    console.log("Success!");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {  // When the user finishes all the patterns, we generate a new sequence with a delay.
        nextSequence();
      }, 1000);
    }
  }

  else{
    console.log("Failed!");

    playSound("wrong"); // Playing the sound for wrong button pressed.

    $("body").addClass("game-over"); // Adding the class game-over for the effect.

    $("#level-title").text("Game Over!Press any key to Restart."); // Changing the text.

    setTimeout(function(){
      $("body").removeClass("game-over"); // Removing the class after 200ms.
    }, 200);



    startOver();
  }
}

function nextSequence() {

  userClickedPattern = []; // When the function is called, we need to start with an empty array.

  level++; // Whenever nextSequence() is called we increment the value of the level.

  $("#level-title").text("Level " + level); // Changing the text to the corresponding level.

  var randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0 and 3 (both inclusive).

  var randomChosenColor = buttonColours[randomNumber]; // Random Number is used to choose the colour.

  gamePattern.push(randomChosenColor); // That chosen colour is now pushed inside the game Pattern Array.

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // Animating the button of the chosen colour.

  playSound(randomChosenColor); // Function called to play the sound of the next colour randomly chosen.

  animatePress(randomChosenColor); // Function called to animate the button.
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Function to play the sounds of the respective colours.
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed"); // Adding the pressed class.

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"); // Timing the animation.
  }, 100);
}

function startOver(){ // Restructing everything.

  level = 0;

  gamePattern = [];

  started = false;
}
