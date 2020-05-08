var gamePattern = [] ;
var userClickedPattern = [] ;
var buttonColours = ["red" , "blue" , "green" , "yellow"];
var flag=false  ;
var level = 0;

$(document).keypress(function(){
  if(!flag){
    $("h1").text("level "+ level);
    nextSequence();
    flag=true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id") ;
  userClickedPattern.push(userChosenColour) ;
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function startOver(){
  level=0;
  gamePattern=[];
  flag = false ;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game over! Press any key to restart .");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("level "+ level);
  var randomNumber=Math.floor(Math.random() * 4) ;
  var randomChosenColour = buttonColours[randomNumber] ;
  gamePattern.push(randomChosenColour) ;
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100) ;
}
