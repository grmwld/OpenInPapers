safari.application.addEventListener("command", performCommand, true);
safari.application.addEventListener("validate", validateCommand, true);
safari.application.addEventListener("message", handleMessage, false);

var ctrlStatusGlobal = false;

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
        event.target.disabled = !event.target.browserWindow.activeTab.url;
    }
}

function handleMessage(event)
{
    console.log(event.name);
    console.log(event.message);
    
    if (event.name == 'openInPapersViaKeyboardShortcut')
    {
        if (ctrlStatusGlobal == true)
        {
            activeTab = safari.application.activeBrowserWindow.activeTab;
            openURLinPapers(activeTab.url, activeTab.title);
        }
    }
    else if(event.name == 'ctrlStatusUpdate')
    {
        ctrlStatusGlobal = event.message;
    }
}
