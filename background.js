chrome.contextMenus.onClicked.addListener(function(info, tab){
  chrome.tabs.executeScript(tab.id, {file: "getDOM.js"})
})
//
chrome.contextMenus.create({
  title: "Get Table",
  contexts: ['page', 'selection'],
})


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Table node: \n", request.tableNode);
    if (request.type == "delivery")
      sendResponse({message: "Thank You!"});
  });

function getTableFromSelection(selection) {
  if(selection.baseNode){
    var tableNode = getTableNodeRecur(selection.baseNode)
    if(tableNode){
      return tableNode
    } else {
      return null
    }
  } else {
    console.log("No table from selection");
    return null
  }
}

function getTableNodeRecur(node) {
  if(node.parentNode){
    if(node.parentNode.localName == 'table'){
      return node.parentNode
    } else if(node.parentNode.localName == 'body'){
      console.log("No table found in document");
      return null
    } else {
      return getTableNodeRecur(node.parentNode)
    }
  } else {
    console.log("No table from selection");
    return null
  }
}
