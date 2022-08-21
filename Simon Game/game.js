const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(() => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatedPress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`.${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name) {
  let randomAudio = new Audio(`sounds/${name}.mp3`);
  randomAudio.play();
}

function animatedPress(currentColour) {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed"), 1000;
  });
}

function checkAnswer(a) {
  if (userClickedPattern[a] === gamePattern[a]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 2000);
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
