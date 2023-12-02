
var colors=["red", "blue", "green", "yellow"];
var gamepattern=[];
var level=0;
var index=0;
var newcolor;
var pressedColor;
var highscore=0;

function randomInt(max){
    return Math.floor(Math.random() * max)+1;
}

function reset(){
    $("h1[id='level-title']").text("Game Over! Press A Key to Restart");
    $("h1").after("<h2 class=highscore'>HighScore "+highscore+"</h2>");
    level = 0;
    index = 0;
    gamepattern=[];
}

$(document).on("click", "button[id='myreset']", function () {
    $(this).remove()
    level = 0;
    index = 0;
    highscore=0;
    gamepattern=[];
    $("h1").after("<button id='myreset'>reset</button>");
    next();
  });

$(document).on("keypress",function(event){
    if(event.key=='a' && level==0){
        $("h2").remove();
        $("button[id='myreset']").remove();
        $("h1").after("<button id='myreset'>reset</button>");
        next()       
    }
    if(event.key=='r' && level!=0){
        $("#myreset").click();
    }
}
)
function next(){
    level=level +1;
    $("h1[id='level-title']").text("Level "+level);
    newcolor=colors[randomInt(3)];
    gamepattern.push(newcolor);
    animateButton(newcolor);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function animateButton(color) {
    $("#" + color).fadeIn(500).fadeOut(500).fadeIn(500);
}

$("div[type='button']").on("click",function(){
    if(level != 0){
        pressedColor=$(this).attr("id");
        animatePress(pressedColor);
        checkanswer(pressedColor);
    }   
})

function checkanswer(pressedColor){
    if(pressedColor===gamepattern[index]){
        index = index +1;
        if(index === gamepattern.length){
            index=0;
            next();
        }
    }
    else{
        if(level>highscore){
            highscore=level;
        }
        reset();
    }
}





