chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'log') {
    console.log(`[${message.type}] ${message.message}`);
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id }, () => {
    if (chrome.runtime.lastError) {
      console.error('无法打开侧边栏:', chrome.runtime.lastError.message);
    }
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-side-panel') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.sidePanel.open({ tabId: tabs[0].id }, () => {
          if (chrome.runtime.lastError) {
            console.error('无法打开侧边栏:', chrome.runtime.lastError.message);
          }
        });
      }
    });
  }
});
