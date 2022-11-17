let beverages = document.getElementsByClassName("beverage");

document.querySelector("form").prepend(Beverage(1, 1));

let totalBeverageCount = 1;
document.querySelector(".add-button").addEventListener("click", function() {
    beverages[beverages.length - 1].after(Beverage(beverages.length + 1, ++totalBeverageCount));
});

document.querySelector(".submit-button").addEventListener("click", function() {
    document.querySelector(".modal-wrapper").style.display = "flex";
    document.querySelector(".beverage-count").textContent = "Вы заказали " + beverageDeclension(beverages.length);
    let tableBody = document.querySelector(".beverages-table tbody");
    tableBody.innerHTML = "";
    for (let b of beverages) {
        tableBody.append(toTableRow(b));
    }
});

function beverageDeclension(count) {
    if (count % 10 === 1 && !(count % 100 === 11))
        return `${count} напиток`;
    else if (count % 10 > 1 && count % 10 < 5 && (count % 100 < 12 || count % 100 > 14))
        return `${count} напитка`;
    else
        return `${count} напитков`;
}

let localizationDir = {
    "espresso": "Эспрессо",
    "capuccino": "Капучино",
    "cacao": "Какао",
    "usual": "обычное",
    "no-fat": "обезжиренное",
    "soy": "соевое",
    "coconut": "кокосовое",
    "whipped cream": "взбитые сливки",
    "marshmallow": "зефир",
    "chocolate": "шоколад",
    "cinnamon": "корица"
};

function toTableRow(beverage) {
    let row = document.createElement("tr");

    let type = row.insertCell();
    for (let coffeeType of beverage.querySelectorAll(".coffee-type option")) {
        if (coffeeType.selected) type.textContent = localizationDir[coffeeType.value];
    }

    let milk = row.insertCell();
    for (let milkType of beverage.querySelectorAll(".coffee-milk input")) {
        if (milkType.checked) milk.textContent = localizationDir[milkType.value];
    }

    let options = row.insertCell();
    options.textContent = Array.from(beverage.querySelectorAll(".coffee-options input"))
        .filter(c => c.checked)
        .map(c => localizationDir[c.value])
        .join(", ");

    let wishes = row.insertCell();
    wishes.innerHTML = beverage.querySelector(".coffee-wishes .textarea-duplicate").innerHTML;

    return row;
}

document.querySelector(".close-button").addEventListener("click", function() {
    document.querySelector(".modal-wrapper").style.display = "none";
});

function removeBeverage(event) {
    if (beverages.length > 1) {
        event.currentTarget.parentNode.remove();
        refreshBeveragesNumbers();
    }
}

function refreshBeveragesNumbers() {
    Array.from(beverages)
        .forEach((e, i) => e.querySelector(".beverage-number").textContent = `Напиток №${i + 1}`);
}

function duplicate(event) {
    event.target.parentNode.querySelector(".textarea-duplicate").innerHTML = event.target.value
        .replace(/срочно|быстрее|побыстрее|скорее|поскорее|очень нужно/gi, match => `<b>${match}</b>`)
}

document.querySelector(".checkout-button").addEventListener("click", function() {
    let timeField = document.getElementById("time-field");
    let time = timeField.value.split(":");
    if ((+time[0] * 60 + +time[1]) < (new Date().getHours() * 60 + new Date().getMinutes())) {
        timeField.style.borderColor = "red";
        alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее")
    } else {
        timeField.style.borderColor = "black";
        document.querySelector(".modal-wrapper").style.display = "none";
    }
})

function Beverage(number, id) {
    let beverage = document.createElement("fieldset");
    beverage.className = "beverage";
    beverage.innerHTML = `<h4 class="beverage-number">Напиток №${number}</h4>
        <button class="remove-button" onclick="removeBeverage(event)">X</button>
        <label class="field coffee-type">
            <span class="label-text">Я буду</span>
            <select name="beverage-type-${id}">
                <option value="espresso">Эспрессо</option>
                <option value="capuccino" selected>Капучино</option>
                <option value="cacao">Какао</option>
            </select>
        </label>
        <div class="field coffee-milk">
            <span class="checkbox-label">Сделайте напиток на</span>
            <label class="checkbox-field">
                <input type="radio" name="milk-${id}" value="usual" checked/>
                <span>обычном молоке</span>
            </label>
            <label class="checkbox-field">
                <input type="radio" name="milk-${id}" value="no-fat"/>
                <span>обезжиренном молоке</span>
            </label>
            <label class="checkbox-field">
                <input type="radio" name="milk-${id}" value="soy"/>
                <span>соевом молоке</span>
            </label>
            <label class="checkbox-field">
                <input type="radio" name="milk-${id}" value="coconut"/>
                <span>кокосовом молоке</span>
            </label>
        </div>
        <div class="field coffee-options">
            <span class="checkbox-label">Добавьте к напитку:</span>
            <label class="checkbox-field">
                <input type="checkbox" name="options-${id}" value="whipped cream"/>
                <span>взбитых сливок</span>
            </label>
            <label class="checkbox-field">
                <input type="checkbox" name="options-${id}" value="marshmallow"/>
                <span>зефирок</span>
            </label>
            <label class="checkbox-field">
                <input type="checkbox" name="options-${id}" value="chocolate"/>
                <span>шоколад</span>
            </label>
            <label class="checkbox-field">
                <input type="checkbox" name="options-${id}" value="cinnamon"/>
                <span>корицу</span>
            </label>
        </div>
        <div class="field coffee-wishes">
            <label> И еще вот что: <br>
                <textarea name="textarea-${id}" oninput="duplicate(event)"></textarea>
                <br><span class="textarea-duplicate"></span>
            </label>
        </div>`;
    return beverage;
}