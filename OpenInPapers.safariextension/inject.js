window.addEventListener('keydown', checkKeyDown, false);
window.addEventListener('keyup', checkKeyUp, false);

function checkKeyDown(event)
{
    switch(event.keyCode)
    {
		case 17:
			safari.self.tab.dispatchMessage('ctrlStatusUpdate', true);
		break;
		case 80:
            safari.self.tab.dispatchMessage("openInPapersViaKeyboardShortcut", true);
        break;
        default:
        // do nothing
    }
}

function checkKeyUp(event)
{
	if(event.keyCode == 17)
	{
		safari.self.tab.dispatchMessage('ctrlStatusUpdate', false);
	}
}
