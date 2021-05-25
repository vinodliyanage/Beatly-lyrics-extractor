async function fetchLyrics(url) {
    try {
        return fetch(url).then((res) => res.text());
    } catch (e) {
        console.error(e)
        return null;
    }
 
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onActivated.addListener(async info => {
    const tab = await chrome.tabs.get(info.tabId);
    
    const isAzlyrics = tab.url.startsWith('*://*.azlyrics.com/*');
    isAzlyrics 
      ? chrome.action.enable(tab.tabId) 
      : chrome.action.disable(tab.tabId);
  });
});

chrome.runtime.onMessage.addListener(({ url }, sender, sendResponse) => {
  console.log("im in background", url);
  fetchLyrics(url).then((textHTML) => {
    sendResponse({ textHTML: textHTML || null});
  });
  return true;
});

