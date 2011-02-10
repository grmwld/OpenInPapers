if (window == window.top)
{
  window.addEventListener('keydown', checkKeyDown, false);
  safari.self.addEventListener("message", handleMessage, false);
  document.addEventListener('contextmenu', getContextMenuEvent)

  var settings = {};

  function handleMessage(event) {
    if (event.name == "settingValueIs") {
      settings[event.message[0]] = event.message[1];
    }
  }

  function checkKeyDown(event) {
    safari.self.tab.dispatchMessage("getSettingValue", "kbshortcut");
    //console.log(settings);
    if (event.ctrlKey && event.keyCode == settings.kbshortcut.toUpperCase().charCodeAt(0)) {
        selection = event.view.document.getSelection().toString().trim();
        safari.self.tab.dispatchMessage("openInPapersViaKeyboardShortcut", selection);
    }
  }


  function getContextMenuEvent(event) {
    selection = event.view.document.getSelection().toString().trim();

    userInfo = new Object();

    // hasLink: does the right-click target have an HREF attribute?
    userInfo.hasLink = !(typeof event.target.href == "undefined"); 

    // selection: the selected text or the link text, depending on click target
    userInfo.selection =  userInfo.hasLink ? event.target.innerText : selection;

    // href: the link URL if there is one
    userInfo.href = userInfo.hasLink ? event.target.href : "";

    // add userInfo to the event so it'll be seen by the validate function 
    safari.self.tab.setContextMenuEventUserInfo(event, userInfo);
  }
}
