function getTableStringFromSelection(selection) {
  if(selection.baseNode){
    var tableNode = getTableNodeRecur(selection.baseNode)
    if(tableNode){
      return tableNode.outerHTML
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
      return node.parentElement
    } else if(node.parentElement.localName == 'body'){
      console.log("No table found in document");
      return null
    } else {
      return getTableNodeRecur(node.parentElement)
    }
  } else {
    console.log("No table from selection");
    return null
  }
}

// console.log(document.getSelection());
var tableNodeString = getTableStringFromSelection(document.getSelection())
console.log("Table node: ", tableNodeString);

chrome.runtime.sendMessage({
  type: 'delivery',
  tableNode: tableNodeString
}, function(response){
  console.log("Background says \"" + response.message + "\"");
})
