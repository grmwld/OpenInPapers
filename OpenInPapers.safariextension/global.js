safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("validate", validateCommand, false);
safari.application.addEventListener("message", handleMessage, false);


function performCommand(event) {
  if (event.command === "openInPapers") {
    var url = event.target.browserWindow.activeTab.url;
    var title = event.target.browserWindow.activeTab.title;
  }
  else if (event.command === "openInPapersMenu") {
    var url = safari.application.activeBrowserWindow.activeTab.url;
    var title = safari.application.activeBrowserWindow.activeTab.title;
    if (event.userInfo) {
      title = event.userInfo.selection;
    }
  }
  else if (event.command === "openLinkInPapers") {
    var url = event.userInfo.href;
    var title = event.userInfo.selection;
  }
  openURLinPapers(url, title);
}


function openURLinPapers(url, title) {
  var papersURL = 'papers://url/' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
  safari.application.activeBrowserWindow.activeTab.url = papersURL;
}


function validateCommand(event) {
  if (event.command === "openInPapers") {
    event.target.disabled = !event.target.browserWindow.activeTab.url;
  }
  if (event.command === "openInPapersMenu") {
    event.target.disabled = event.userInfo.hasLink;
  }
  if (event.command === "openLinkInPapers") {
    event.target.disabled = !event.userInfo.hasLink;
  }
}


function handleMessage(event) {
  if (event.name == 'openInPapersViaKeyboardShortcut') {
    url = event.target.browserWindow.activeTab.url;
    title = event.target.browserWindow.activeTab.title;

    if (event.message) {
      title = event.message;
    }
    openURLinPapers(url, title);
  }
  if (event.name == 'getSettingValue') {
    var value = safari.extension.settings.getItem(event.message);
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("settingValueIs", [event.message, value]);
  }
}
