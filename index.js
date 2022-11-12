let fieldset = document.querySelector('fieldset');
let clone = fieldset.cloneNode(true);
let lastFieldSet = fieldset
let button = document.querySelector(".add-button")
button.onclick = OnClick

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function OnClick(){
    insertAfter(clone,lastFieldSet)
    lastFieldSet = clone;
    clone = lastFieldSet.cloneNode(true)
}