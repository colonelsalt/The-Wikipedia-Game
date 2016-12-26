var total_clicks = 5;
var rem_clicks = total_clicks;
var gameover_sound = new Audio();
var victory_sound = new Audio();
gameover_sound.src = chrome.extension.getURL("lose_sound.mp3");
victory_sound.src = chrome.extension.getURL("win_sound.wav");
var game_won = false;
var game_over = false;

var port = chrome.runtime.connect({name: "background"});

if (window.location.href == "https://en.wikipedia.org/wiki/Adolf_Hitler")
{
    $('#mw-head').append("<div style='background-color: #3fb543;'><img style='float:left; max-width:40px; padding-top:10px; padding-left:15px;' src=" + chrome.extension.getURL("icon.png") + "><h1 style='padding: 10px; padding-left:15px; color:white; margin-left:15px; font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#fec503; font-size: 20px;'>JA! YOU WIN!<button style='margin-left:20px; color:black; font-size:15px;'><a id='playagain' href='https://en.wikipedia.org/wiki/Special:Random'>Play again?</a></button></h1></div>");
    port.postMessage("GAME_OVER");
    game_won = true;
    victory_sound.play();
}
port.postMessage(window.location.href);
port.onMessage.addListener(function(num_clicks)
{
    console.log("Received num_clicks from background.js!" + num_clicks);
    rem_clicks = total_clicks - num_clicks;
    
    if (rem_clicks <= 0 && !game_won)
    {
        // game over
        $('#mw-head').append("<div style='background-color:#8e1212'><img style='float:left; max-width:40px; padding-top:10px; padding-left:15px;' src=" + chrome.extension.getURL("icon.png") + "><h1 style='padding: 10px; padding-left:15px; color:white; margin-left:15px; font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#fec503; font-size: 20px;'>YOU LOSE!<button style='margin-left:20px; color:black; font-size:15px;'><a id='playagain' href='https://en.wikipedia.org/wiki/Special:Random'>Play again?</a></button></h1></div>");
        port.postMessage("GAME_OVER");
        game_over = true;
        gameover_sound.play();
    }
    
    if (!game_won && !game_over)
    {
        $('#mw-head').append("<div style='background-color: #222222;'><img style='float:left; max-width:40px; padding-top:10px; padding-left:15px;' src=" + chrome.extension.getURL("icon.png") + "><h1 style='padding: 10px; padding-left:15px; color:white; margin-left:15px; font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #fec503; font-size: 20px;'>Remaining clicks: " + rem_clicks + "<small style='padding-left:20px; color:#8f9db5; font-size:10px;'>The Wikipedia Game</small></h1></div>");
        console.log("appending header...");
    }
    
});    


// disable Wikipedia search functionality
var search_clicked = false;

$('#simpleSearch').click(function()
{
    if (!search_clicked)
    {
        var search_field = document.getElementsByTagName("input")[0];
        search_field.remove();
        $('#simpleSearch').append("NO CHEATING, SILLY!");
        search_clicked = true;
    }
}
);

// reset game if "play again" button pressed
$('#play_again').click(function()
{
    port.postMessage("GAME_OVER");
    game_over = false;
    game_won = false;
    
}
);

// disable CTRL+F search
window.addEventListener("keydown",function (e) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        alert("NO CTRL+F FOR YOU!");
        e.preventDefault();
    }
})