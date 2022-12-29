let formsCounter = 1;
let drinksCounter = 1;
let beverages = document.querySelectorAll(".beverage")
let modal = document.getElementById("modalWindow");
let submitButton = document.querySelector(".submit-button");
let span = document.getElementsByClassName("close")[0];

let dic = {
    "espresso": "Эспрессо",
    "capuccino": "Капучино",
    "cacao": "Какао",
    "usual": "Обычное",
    "no-fat": "Обезжиренное",
    "soy": "Соевое",
    "coconut": "Кокосовое",
    "whipped cream": "взбитые сливки",
    "marshmallow": "зефирки",
    "chocolate": "шоколад",
    "cinnamon": "корица"
};

document.querySelector(".add-button").addEventListener('click', () => {
    formsCounter++;
    drinksCounter++;
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    newForm.appendChild(closeButton());
    newForm.querySelector("h4").innerHTML = `Напиток №${drinksCounter}`;
    for (let form of newForm.querySelectorAll('input[type=radio]')) {
        form.name = `milk${drinksCounter}`;
    }
    forms[forms.length - 1].after(newForm);
});

for (let beverage of beverages) {
    beverage.style.position = 'relative';
    let button = closeButton();
    beverage.appendChild(button);
};

document.addEventListener('click', event => {
    if (event.target.id === 'closeButton' && formsCounter > 1) {
        formsCounter--;
        drinksCounter--;
        event.target.parentElement.remove();
        for (const [index, fieldset] of document.querySelectorAll('fieldset').entries()) {
            fieldset.querySelector('.beverage-count').innerHTML = `Напиток №${index + 1}`;
        }
    }
});

function closeButton() {
    let closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.innerHTML = '&#10060;';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '0';
    closeButton.style.top = '0';
    return closeButton;
};

submitButton.onclick = function () {
    modal.style.display = "block";
    const beverages = document.querySelectorAll(".beverage");
    for (let beverage of beverages) {
        let newRow = modal.querySelector('table').querySelector('tbody').insertRow();
        let cellName = newRow.insertCell();
        cellName.appendChild(document.createTextNode(dic[beverage.querySelector('#name').options[beverage.querySelector('#name').selectedIndex].value]));
        let cellMilk = newRow.insertCell();
        cellMilk.appendChild(document.createTextNode(dic[beverage.querySelectorAll('input[type=radio]:checked')[0].value]));
        let cellAddit = newRow.insertCell();
        let selectedOptions = [...beverage.querySelectorAll('input[type=checkbox]:checked')];
        let cellInfo = [];
        for (option of selectedOptions) {
            cellInfo.push(dic[option.value]);
        }
        cellAddit.appendChild(document.createTextNode(cellInfo.join(', ')));
    }
    modal.querySelector('p').textContent = DrinksOrdered();
};

span.onclick = function () {
    modal.style.display = "none";
    modal.querySelector('table').querySelector('tbody').remove();
    modal.querySelector('table').appendChild(document.createElement('tbody'));
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal.querySelector('table').querySelector('tbody').remove();
        modal.querySelector('table').appendChild(document.createElement('tbody'));
    }
};

function DrinksOrdered() {
    const titles = ['напиток', 'напитка', 'напитков'];
    const cases = [2, 0, 1, 1, 1, 2];
    const number = formsCounter;
    let c = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
    return `Вы заказали ${number} ${titles[c]}`;
};