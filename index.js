const FORM_HTML = document.getElementsByClassName("beverage").item(0).outerHTML;
const REMOVE_BUTTONS = document.getElementsByClassName(
    "delete-beverage-button"
);

const beverages = document.getElementsByClassName("beverage");

let buttonAdd = document
    .getElementsByClassName("add-button")
    .item(0).parentElement;

document
    .getElementsByClassName("add-button")
    .item(0)
    .addEventListener("click", () => addBeverage());

function addBeverage() {
    let form = FORM_HTML.replace(
        /(name=)("\S*")/g,
        (match, p1, p2) => `${p1}${p2.slice(0, -1) + `-${beverages.length}"`}`
    );
    buttonAdd.insertAdjacentHTML("beforebegin", form);
    document
        .getElementsByClassName("beverage-count")
        .item(beverages.length - 1).innerHTML = `Напиток №${beverages.length}`;

    let button = REMOVE_BUTTONS.item(beverages.length - 1);
    addRemoveButton(button, button.parentElement.parentElement);
}

function addRemoveButton(element, elementRemove) {
    element.addEventListener("click", () => elementRemove.remove());
}
