// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url) {
//     console.log(tab.url,'--------------------');
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"),
//     });
//   }
// });

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  console.log(url,'--------------------');
  // use `url` here inside the callback because it's asynchronous!
});