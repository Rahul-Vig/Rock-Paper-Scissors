var config = {
  apiKey: "AIzaSyDD6DSclgvVoekyqfD-zJHwRknoxKRwtvA",
  authDomain: "rock-paper-scissors-3b576.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-3b576.firebaseio.com",
  projectId: "rock-paper-scissors-3b576",
  storageBucket: "rock-paper-scissors-3b576.appspot.com",
  messagingSenderId: "806223795778"
};
firebase.initializeApp(config);

var database = firebase.database();

var choices = ["rock", "paper", "scissors"];
var player1Choice;
var player2Choice;
var p1Picked = false;
var p2Picked = false;

database.ref().on(
  "value",
  function(snapshot) {
    console.log(snapshot.val().player1);
    console.log(snapshot.val().player2);
    if (p1Picked === true && p2Picked === true) {
      if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "paper" && player2Choice === "rock") ||
        (player1Choice === "scissors" && player2Choice === "paper")
      ) {
        $(".game-text").html("Player 1 Wins<br>");
        gameOver();
      } else if (player1Choice === player2Choice) {
        $(".game-text").html("It's a Tie<br>");
        gameOver();
      } else {
        $(".game-text").html("Player 2 Wins<br>");
        gameOver();
      }
    }
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

$(".player1Choices").on("click", function() {
  console.log($(event.target).attr("alt"));
  player1Choice = $(event.target).attr("alt");
  $(".game-text").html("Player 1 has picked their choice");
  p1Picked = true;
  if (p1Picked === true && p2Picked === true) {
    database.ref().set({
      player1: player1Choice,
      player2: player2Choice
    });
  }
});

$(".player2Choices").on("click", function() {
  console.log($(event.target).attr("alt"));
  player2Choice = $(event.target).attr("alt");
  $(".game-text").html("Player 2 has picked their choice");
  p2Picked = true;
  if (p1Picked === true && p2Picked === true) {
    database.ref().set({
      player1: player1Choice,
      player2: player2Choice
    });
  }
});

function gameOver() {
  var p1Picked = false;
  var p2Picked = false;
  player1Choice = undefined;
  player2Choice = undefined;
  var gameOverBtn = $("<button>");
  gameOverBtn.attr("type", "submit");
  gameOverBtn.attr("id", "reset");
  gameOverBtn.text("Reset Game");
  $(".game-text").append(gameOverBtn);
}

$(document).on("click", "#reset", function() {
  $(".game-text").html("ROCK, PAPER, SCISSORS SAYS SHOOT");
  if (p1Picked === false && p2Picked === false) {
    database.ref().set({
      player1: undefined,
      player2: undefined
    });
  }
});
