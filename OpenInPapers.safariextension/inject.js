(function()
{
    if (window !== window.top) return;
    
    console.log('injected');
    
    var handleKeypress = function(e)
    {
        console.log("Pressed : " + e.keyCode);
        if (e.keyCode !== 223) return;
        safari.self.tab.dispatchMessage("openInPapersViaKeyboardShortcut", window.location.href);
    }
    
    window.addEventListener("keypress", handleKeypress);
})();
