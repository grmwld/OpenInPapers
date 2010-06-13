function performCommand(event)
{
    if (event.command === "openInPapers")
    {
        openURLinPapers(event.target.browserWindow.activeTab.url,
                        event.target.browserWindow.activeTab.title);
    }
}

function openURLinPapers(url, title)
{
    safari.application.activeBrowserWindow.activeTab.url = 'papers://url/'+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
}

function validateCommand(event)
{
    if (event.command === "openInPapers")
    {
        // Disable the button if there is no URL loaded in the tab.
        event.target.disabled = !event.target.browserWindow.activeTab.url;
    }
}

// function handleKeypress(e)
// {
//     if (e.keyCode !== 223) return;
//     activeTab = safari.application.BrowserWindow.activeTab;
//     openURLinPapers(activeTab.url, activeTab.title);
// }
 
safari.application.addEventListener("command", performCommand, true);
safari.application.addEventListener("validate", validateCommand, true);
// window.addEventListener("keypress", handleKeypress);