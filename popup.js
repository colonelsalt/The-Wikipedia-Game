var port = chrome.runtime.connect({name: "background"});

$('#playgame').click(function()
{
    console.log("Telling background.js to reset game...");
    port.postMessage("GAME_OVER");
});