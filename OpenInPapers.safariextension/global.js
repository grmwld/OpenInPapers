safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("validate", validateCommand, false);
safari.application.addEventListener("message", handleMessage, false);


function performCommand(event)
{   
    if (event.command === "openInPapers")
    {
        url = event.target.browserWindow.activeTab.url;
        title = event.target.browserWindow.activeTab.title;
    }
    else if (event.command === "openInPapersMenu")
    {
        url = safari.application.activeBrowserWindow.activeTab.url;
        title = safari.application.activeBrowserWindow.activeTab.title;
        if (event.userInfo)
        {
            title = event.userInfo.selection;
        }
    }
    else if (event.command === "openLinkInPapers")
    {
        url = event.userInfo.href;
        title = event.userInfo.selection;
    }
    
    openURLinPapers(url, title);
}


function openURLinPapers(url, title)
{
    papersURL = 'papers://url/' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    safari.application.activeBrowserWindow.activeTab.url = papersURL;
}


function validateCommand(event)
{
    if (event === "openInPapers")
    {
        event.target.disabled = !event.target.browserWindow.activeTab.url;
    }
    if (event.command === "openInPapersMenu")
    {
        event.target.disabled = event.userInfo.hasLink;
    }
    if (event.command === "openLinkInPapers")
    {
        event.target.disabled = !event.userInfo.hasLink;
    }
}


function handleMessage(event)
{
    if (event.name == 'openInPapersViaKeyboardShortcut')
    {
        url = event.target.browserWindow.activeTab.url;
        title = event.target.browserWindow.activeTab.title;
        
        if (event.message)
        {
            title = event.message;
        }
        
        openURLinPapers(url, title);
    }
}
