let homeScore = 0;
let awayScore = 0;
let inning = 1;
let gameover = false;

$(document).ready(function(){

    let takeMeOut = document.createElement("audio");
    takeMeOut.setAttribute("src", "./assets/sounds/TakeMeOutToTheBallgame-DocWatson.mp3");

    $(".play-music").on("click", function(){
        takeMeOut.play();
    })

    $(".pause-music").on("click", function(){
        takeMeOut.pause();
    })


    $("#play-ball").on('click', function() {
        $("#game-board").removeClass("game-board-hidden");
    })

    clearBalls = () => {
        $("#ball-one").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-two").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-three").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-four").removeClass('counter-dot').addClass('counter-dot-empty');
    }

    clearStrikes = () => {
        $("#strike-one").addClass("counter-dot-empty").removeClass('counter-dot');
        $("#strike-two").addClass("counter-dot-empty").removeClass('counter-dot');
        $("#strike-three").addClass("counter-dot-empty").removeClass('counter-dot');
    }

    resetCount = () => {
        clearBalls();
        clearStrikes();
    }

    clearBases = () => {
        if($("#first-base").hasClass("base-on")){
            $("#first-base").addClass("base").removeClass("base-on");
            }
            if($("#second-base").hasClass("base-on")){
            $("#second-base").addClass("base").removeClass("base-on");
            }
            if($("#third-base").hasClass("base-on")){
            $("#third-base").addClass("base").removeClass("base-on");
            }
            if($("#home-plate").hasClass("base-on")){
            $("#home-plate").addClass("base").removeClass("base-on");
    }
}

    setInning = () => {
        $("#inning-number").html(inning);
    }

    setInning();

    seventhInningStrech = () => {
        if(inning == 7){
            alert("seventh Inning stretch!");
                takeMeOut.play()
            }
        }
    

    

    gameOverTopOfNinth = () => {
        if(inning == 9 && homeScore > awayScore){
            alert("Home Team Wins!");
            $('button').prop('disabled', true);
            gameover= true;
        }
    }

    gameOverBottomOfNinth = () => {
        if(inning == 9 && homeScore < awayScore){
            alert("away team wins!");
            $('button').prop('disabled', true);
            gameover = true;
        }else if(inning == 9 && homeScore > awayScore){
            alert("home Team wins! Walk off?");
            $('button').prop('disabled', true);
            gameover = true
        }
    }

    extraInnings = () => {
        if(inning > 9 && homeScore > awayScore){
            alert("Home team wins in extra innings!");
            $('button').prop('disabled', true);
        }else if(inning > 9 && homeScore < awayScore){
            alert("Away team wins in extra innings");
            $("button").prop("disabled", true);
        }
    }

    walkoff = () => {
        if(inning >=9 && $("#triangle-bottom-empty").hasClass("full") && homeScore > awayScore){
            alert("Walk off win by the home team!");
            $("button").prop("disabled", true); 
        }
    }

    setHomeScore = () => {
        $("#home-score").html(homeScore);
    }
    setHomeScore();

    setAwayScore = () => {
        $("#away-score").html(awayScore);
    }
    setAwayScore();

    addRunnerFirst = () => {
        $("#first-base").addClass("base-on").removeClass("base");
        resetCount();
    }
    addRunnerSecond = () => {
        $("#second-base").addClass("base-on").removeClass("base");
        resetCount();
    }

    addRunnerThird = () => {
        $("#third-base").addClass("base-on").removeClass("base");
        resetCount();
    }

    addRunnerHome = () => {
        $("#home-plate").addClass("base-on").removeClass("base");
        resetCount();
    }

    removeRunnerFirst = () => {
        $("#first-base").addClass("base").removeClass("base-on");
        resetCount();
    }

    removeRunnerSecond = () => {
        $("#second-base").addClass("base").removeClass("base-on");
        resetCount();
    }

    removeRunnerThird = () => {
        $("#third-base").addClass("base").removeClass("base-on");
        resetCount();

    }
    removeRunnerHome = () => {
        $("#home-plate").addClass("base").removeClass("base-on");
        resetCount();
    }

    addRun = () => {
        if($("#home-plate").hasClass("base-on") && $("#triangle-top-empty").hasClass("full")){
            console.log("run for away team");
            awayScore += 1
            $("#away-score").html(awayScore);
            setTimeout(function(){
                $("#home-plate").removeClass("base-on").addClass("base")
            }, 1000)
        } else if($("#home-plate").hasClass("base-on") && $("#triangle-bottom-empty").hasClass("full")){
            console.log("run for home team");
            homeScore += 1
            walkoff();
            $("#home-score").html(homeScore);
            setTimeout(function(){
                $("#home-plate").removeClass("base-on").addClass("base")
            }, 1000)
    }}

    inningChange = () => {
        $("#out-one").removeClass('counter-dot').addClass("counter-dot-empty")
        $("#out-two").removeClass('counter-dot').addClass("counter-dot-empty")
        $("#out-three").removeClass('counter-dot').addClass("counter-dot-empty");
        if($("#triangle-top-empty").hasClass("full")){
            seventhInningStrech();
            gameOverTopOfNinth();
            console.log(gameover);
            if(gameover == false){
                $("#triangle-top-empty").addClass("triangle-top-empty").removeClass("full");
                $("#triangle-bottom-empty").addClass("full").removeClass("triangle-bottom-empty");
                clearBases();
            }else{
                return;
            }
        }else if($("#triangle-top-empty").hasClass("triangle-top-empty")){
            gameOverBottomOfNinth();
            console.log(gameover)
            if(gameover == false){
                extraInnings();
                $("#triangle-top-empty").addClass("full").removeClass("triangle-top-empty")
                $("#triangle-bottom-empty").addClass("triangle-bottom-empty").removeClass("full");
                inning += 1
                $("#inning-number").html(inning);
                setInning();
                clearBases();
            }else{
                return;
            }
        }
    }

    $("#add-ball").click(function(){
        if($('#ball-one').hasClass('counter-dot-empty')) {
            console.log("Ball 1")
            $("#ball-one").removeClass('counter-dot-empty').addClass("counter-dot")
        }else if($('#ball-two').hasClass('counter-dot-empty')){
            console.log("Ball 2")
            $("#ball-two").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#ball-three').hasClass('counter-dot-empty')){
            console.log("Ball 3")
            $("#ball-three").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#ball-four').hasClass('counter-dot-empty')){
            console.log("Ball 4")
            $("#ball-four").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                if($("#first-base").hasClass("base")){
                addRunnerFirst();
                }else if($("#second-base").hasClass("base")){
                addRunnerSecond();
                }else if($("#third-base").hasClass("base")){
                addRunnerThird();
                }else if($("#home-plate").hasClass("base")){
                $("#home-plate").addClass("base-on").removeClass("base");
                }
            }, 1000)
            setTimeout(function(){
            clearBalls();
            clearStrikes();
            addRun();
            }, 1000)
        }
    })

    $("#add-strike").click(function(){
        if($('#strike-one').hasClass('counter-dot-empty')) {
            console.log("Strike 1")
            $("#strike-one").removeClass('counter-dot-empty').addClass("counter-dot")
        }else if($('#strike-two').hasClass('counter-dot-empty')){
            console.log("Strike 2")
            $("#strike-two").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#strike-three').hasClass('counter-dot-empty')){
            console.log("Strike 3")
            $("#strike-three").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls();
                if($('#out-one').hasClass('counter-dot-empty')) {
                    console.log("Out 1")
                    $("#out-one").removeClass('counter-dot-empty').addClass("counter-dot")
                }else if($('#out-two').hasClass('counter-dot-empty')){
                    console.log("Out 2")
                    $("#out-two").removeClass('counter-dot-empty').addClass("counter-dot");
                }else if($('#out-three').hasClass('counter-dot-empty')){
                    console.log("Out 3")
                    $("#out-three").removeClass('counter-dot-empty').addClass("counter-dot");
                    inningChange();
                }
            },1000)
        }
    })

    $("#add-out").click(function(){
        if($('#out-one').hasClass('counter-dot-empty')) {
            console.log("Out 1")
            $("#out-one").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls(); 
            }, 1000)
            
        }else if($('#out-two').hasClass('counter-dot-empty')){
            console.log("Out 2")
            $("#out-two").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls(); 
            }, 1000)
        }else if($('#out-three').hasClass('counter-dot-empty')){
            console.log("Out 3")
            $("#out-three").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls(); 
            }, 1000);
            setTimeout(function(){
                inningChange()
            }, 1000)

        }
    })
    
    $("#single").click(function(){
        if($("#first-base").hasClass("base")){
            addRunnerFirst();
            }else if($("#second-base").hasClass("base")){
            addRunnerSecond();
            }else if($("#third-base").hasClass("base")){
            addRunnerThird();
            }else if($("#home-plate").hasClass("base")){
            addRunnerHome();
            addRun();
    }})

    $("#double").click(function(){
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerSecond();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerSecond();
            addRunnerThird();
            removeRunnerFirst();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerSecond();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
        }

        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerThird();
            addRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerThird();
            addRunnerSecond();
            addRunnerHome();
            addRun();
        }
    })

    $("#triple").click(function(){
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerThird();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            addRun();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            removeRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            removeRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            removeRunnerSecond();
            addRunnerThird();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
        }
    })

    $("#home-run").click(function(){
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
            alert("Grand Slam!!!!")
        }
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
    })
})

var homeInput = document.getElementById("home-team-search");

homeInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("home-search-button").click();
    }
});

var awayInput = document.getElementById("away-team-search");

awayInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("away-search-button").click();
    }
});

$("#home-search-button").on("click", function(){
    event.preventDefault();
    let searchedHomeTeam = $("#home-team-search").val().trim().toLowerCase();
    if(searchedHomeTeam =="yankees" || searchedHomeTeam =="new york yankees"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/yankees.png")
    }else if(searchedHomeTeam == "red sox" || searchedHomeTeam =="boston" || searchedHomeTeam == "boston red sox"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/redSox.png")
    }else if(searchedHomeTeam == "tigers" || searchedHomeTeam =="detroit" || searchedHomeTeam == "detroit tigers"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/tigers.png")
    }else if(searchedHomeTeam == "pirates" || searchedHomeTeam =="pittsburgh" || searchedHomeTeam == "pittsburgh pirates"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/pirates.png")
    }else if(searchedHomeTeam == "giants" || searchedHomeTeam =="san fransisco" || searchedHomeTeam == "san fransisco giants"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/giants.png")
    }else if(searchedHomeTeam == "braves" || searchedHomeTeam =="atlanta" || searchedHomeTeam == "atlanta braves"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/braves.png")
    }else if(searchedHomeTeam == "twins" || searchedHomeTeam =="minnesota" || searchedHomeTeam == "minnesota twins"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/twins.png")
    }else{
    setHomeTeam(searchedHomeTeam);
}})

$("#away-search-button").on("click", function(){
    event.preventDefault();
    let searchedAwayTeam = $("#away-team-search").val().trim().toLowerCase();
    if(searchedAwayTeam =="yankees" || searchedAwayTeam =="new york yankees"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/yankees.png")
    }else if(searchedAwayTeam == "red sox" || searchedAwayTeam =="boston" || searchedAwayTeam == "boston red sox"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/redSox.png")
    }else if(searchedAwayTeam == "tigers" || searchedAwayTeam =="detroit" || searchedAwayTeam == "detroit tigers"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/tigers.png")
    }else if(searchedAwayTeam == "pirates" || searchedAwayTeam =="pittsburgh" || searchedAwayTeam == "pittsburgh pirates"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/pirates.png")
    }else if(searchedAwayTeam == "giants" || searchedAwayTeam =="san fransisco" || searchedAwayTeam == "san fransisco giants"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/giants.png")
    }else if(searchedAwayTeam == "braves" || searchedAwayTeam =="atlanta" || searchedAwayTeam == "atlanta braves"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/braves.png")
    }else if(searchedAwayTeam == "twins" || searchedAwayTeam =="minnesota" || searchedAwayTeam == "minnesota twins"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/twins.png")
    }else{
    setAwayTeam(searchedAwayTeam);
}})

function setAwayTeam(awayTeam){
    
    let queryTeam = awayTeam
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/teams?search=" + queryTeam,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-baseball.p.rapidapi.com",
            "x-rapidapi-key": "77ea7439bemshbd256fafb717067p139b8ejsn9c8d1de46d29"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#away-image").attr("src", response.response[0].logo)
    });}

function setHomeTeam(homeTeam){
let queryTeam = homeTeam
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidapi.p.rapidapi.com/teams?search=" + queryTeam,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-baseball.p.rapidapi.com",
		"x-rapidapi-key": "77ea7439bemshbd256fafb717067p139b8ejsn9c8d1de46d29"
	}
};

$.ajax(settings).done(function (response) {
    console.log(response);
    $("#home-image").attr("src", response.response[0].logo)
});}