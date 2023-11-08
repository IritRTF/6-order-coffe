document.querySelector(".add-button").addEventListener("click", () => {
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    let headerText = newForm.querySelector("h4").innerHTML;
    let newDrinkNumber = headerText.slice(headerText.indexOf("№") + 1, headerText.length) - -1;
    newForm.querySelector("h4").innerHTML = `Напиток №${newDrinkNumber}`;
    for (let radio of newForm.querySelectorAll("input[type=radio]")) { radio.name = "milk" + newDrinkNumber; }
    forms[forms.length - 1].after(newForm);
});

document.querySelector(".submit-button").addEventListener("click", () => {
    document.querySelector("#dialog").showModal();
    let content = document.querySelector(".modal-content");
    let forms = document.querySelectorAll(".beverage");
    content.innerHTML = `Вы заказали ${forms.length} ${declOfEnd(forms.length, ["напиток", "напитка", "напитков",])}`;
    createTable();
    document.querySelector(".remove-dialog").addEventListener("click", () => { document.querySelector("#dialog").close(); });
});

function declOfEnd(num, text_forms) {
    num = Math.abs(num) % 100;
    let num1 = num % 10;
    if (num > 10 && num < 20) return text_forms[2];
    if (num1 > 1 && num1 < 5) return text_forms[1];
    if (num1 == 1) return text_forms[0];
    return text_forms[2];
}

const tableHeaders = ["Напиток", "Молоко", "Дополнительно"];

function createTable() {
    let table = document.querySelector("table");
    table.innerHTML = "";
    let header = document.createElement("tr");
    header.classList.add("order-cell");
    for (let headerStr of tableHeaders) {
        let column = document.createElement("th");
        column.innerHTML = headerStr;
        column.classList.add("order-cell");
        header.append(column);
    }

    table.append(header);
    for (form of document.querySelectorAll(".beverage")) {
        let str = document.createElement("tr");
        str.classList.add("order-cell");
        let drink = document.createElement("td");
        drink.innerHTML = form.querySelector("option[selected]").innerHTML;
        drink.classList.add("order-cell");
        str.append(drink);
        let milk = document.createElement("td");
        milk.innerHTML = form.querySelector(
            "input[type=radio]:checked + span"
        ).innerHTML;
        milk.classList.add("order-cell");
        str.append(milk);
        let additional = document.createElement("td");
        for (let additionalObj of form.querySelectorAll(
            "input[type=checkbox]:checked + span"
        ))
            additional.innerHTML += `${additionalObj.innerHTML}\n`;
        additional.classList.add("order-cell");
        str.append(additional);
        table.append(str);
    }
}

function remove(target) {
    if (document.querySelectorAll(".beverage").length > 1) target.parentElement.remove();
}