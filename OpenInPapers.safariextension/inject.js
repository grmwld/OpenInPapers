window.addEventListener('keydown', checkKeyDown, false);
window.addEventListener('keyup', checkKeyUp, false);

function checkKeyDown(event)
{
    // <ctrl> key press
    if (event.keyCode == 17)
    {
		safari.self.tab.dispatchMessage('ctrlStatusUpdate', true);
	}
	// <p> key press
	else if(event.keyCode == 80)
	{
	    safari.self.tab.dispatchMessage("openInPapersViaKeyboardShortcut", true);
    }
    else
    {
        safari.self.tab.dispatchMessage('ctrlStatusUpdate', false);
    }
}

function checkKeyUp(event)
{
    // <ctrl> key release
	if(event.keyCode == 17)
	{
		safari.self.tab.dispatchMessage('ctrlStatusUpdate', false);
	}
}
