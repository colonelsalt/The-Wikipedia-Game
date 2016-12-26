var pages_visited = [];
var difficulty = 4;

chrome.runtime.onConnect.addListener(function(port)
{
    console.assert(port.name == "background");
    // receives url of current page from content script
    port.onMessage.addListener(function (current_page)
    {
        if (current_page == "GAME_OVER")
        {
            console.log("Game reset!");
            pages_visited = [];
        }
        else
        {
            pages_visited.push(current_page);
            port.postMessage(pages_visited.length);
            console.log(pages_visited);
        }
    }
    );
});