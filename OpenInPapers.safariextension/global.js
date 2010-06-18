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
        url = event.target.contextMenu.tab.browserWindow.url;
        title = event.target.contextMenu.tab.browserWindow.title;
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
    safari.application.activeBrowserWindow.activeTab.url = 'papers://url/'+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
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
        openURLinPapers(safari.application.activeBrowserWindow.activeTab.url,
                        safari.application.activeBrowserWindow.activeTab.title);
    }
}
