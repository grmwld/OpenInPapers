safari.application.addEventListener("command", performCommand, true);
safari.application.addEventListener("validate", validateCommand, true);
safari.application.addEventListener("message", handleMessage, false);


function performCommand(event)
{
    thisTab = safari.application.activeBrowserWindow.activeTab;
    
    if (event.command === "openInPapers")
    {
        title = thisTab.title;
        if (event.userInfo && event.userInfo.selection)
        {
            title = event.userInfo.selection;
        }
        openURLinPapers(thisTab.url, title);
    }
    else if (event.command === "openLinkInPapers")
    {
        openURLinPapers(event.userInfo.href,
                        event.userInfo.selection);
    }
}


function openURLinPapers(url, title)
{
    safari.application.activeBrowserWindow.activeTab.url = 'papers://url/'+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
}


function validateCommand(event)
{
    if (!safari.application.activeBrowserWindow.activeTab.url)
    {
        event.target.disabled = true;
    }
    else
    {
        if (event.command === "openInPapers")
        {
            event.target.disabled = event.userInfo.hasLink;
        }
        else if (event.command === "openLinkInPapers")
        {
            event.target.disabled = !event.userInfo.hasLink;
        }
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
