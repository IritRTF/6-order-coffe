let orderNumber = 0;
let ordersCounter = 0;

const form = document.getElementById('form');
const addButton = document.querySelector('.add-button');
const doneButton = document.querySelector('.submit-button');
const closePopupButton = document.querySelector('.popup_close');
const body = document.querySelector('body');

const coffeeTypes = {
    capuccino: 'Капучино',
    espresso: 'Эспрессо',
    cacao: 'Какао',
};

const milks = {
    usual: 'обычное',
    no_fat: 'обезжиренное',
    soy: 'соевое',
    coconut: 'кокосовое',
};

const options = {
    whippedCream: 'взбитые сливки',
    marshmallow: 'зефирки',
    chocolate: 'шоколад',
    cinnamon: 'корица',
};

addButton.addEventListener('click', createNewOrder);
doneButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

function createNewOrder(defaultEvent) {
    if (defaultEvent) defaultEvent.preventDefault();
    orderNumber += 1;
    ordersCounter += 1;
    document.querySelector('.add-button').insertAdjacentHTML(
        'beforebegin',
        `<fieldset name="order${orderNumber}" class="beverage" id="order${orderNumber}">
    <h4 class="beverage-count">Напиток №${ordersCounter}</h4>
    <label class="field">
      <span class="label-text">Я буду</span>
      <select class="coffeetype" name="cofeetype${orderNumber}">
        <option value="espresso">Эспрессо</option>
        <option value="capuccino" selected>Капучино</option>
        <option value="cacao">Какао</option>
      </select>
    </label>
    <div class="field">
      <span class="checkbox-label">Сделайте напиток на</span>
      <label class="checkbox-field">
        <input type="radio" name="milk${orderNumber}" value="usual" checked />
        <span>обычном молоке</span>
      </label>
      <label class="checkbox-field">
        <input type="radio" name="milk${orderNumber}" value="no-fat" />
        <span>обезжиренном молоке</span>
      </label>
      <label class="checkbox-field">
        <input type="radio" name="milk${orderNumber}" value="soy" />
        <span>соевом молоке</span>
      </label>
      <label class="checkbox-field">
        <input type="radio" name="milk${orderNumber}" value="coconut" />
        <span>кокосовом молоке</span>
      </label>
    </div>
    <div class="field">
      <span class="checkbox-label">Добавьте к напитку:</span>
      <label class="checkbox-field">
        <input type="checkbox" name="options${orderNumber}" value="whipped cream" />
        <span>взбитых сливок</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" name="options${orderNumber}" value="marshmallow" />
        <span>зефирок</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" name="options${orderNumber}" value="chocolate" />
        <span>шоколад</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" name="options${orderNumber}" value="cinnamon" />
        <span>корицу</span>
      </label>
    </div>
    <button type="button" class="delete" id="del-order${orderNumber}"></button>
  </fieldset>`
    );
    let id = orderNumber;
    document
        .querySelector(`#del-order${orderNumber}`)
        .addEventListener('click', (e) => {
            e.preventDefault();
            if (ordersCounter === 1) return;
            document.querySelector(`#order${id}`).remove();
            ordersCounter -= 1;
            for (const [index, fieldset] of document
                .querySelectorAll('fieldset')
                .entries()) {
                fieldset.querySelector(
                    '.beverage-count'
                ).innerHTML = `Напиток №${index + 1}`;
            }
        });
}

function createOrdersTable(ordersData) {
    let table = `<table>
                  <tr>
                    <th>Напиток</th>
                    <th>Молоко</th>
                    <th>Дополнительно</th>
                  </tr>`;
    for (let order of ordersData) {
        table = table.concat(`<tr>
                      <td>${coffeeTypes[order.coffeeType]}</td>
                      <td>${milks[order.milk]}</td>
                      <td>${order.options
                          .map((option) => options[option])
                          .join(', ')}</td>
                    </tr>`);
    }
    table = table.concat('</table>');
    console.log(ordersData);
    return table;
}

function openPopup(defaultEvent) {
    defaultEvent.preventDefault();
    document.querySelector('.popup_order').insertAdjacentHTML(
        'afterbegin',
        `<h1 class="popup_heading">Вы заказали ${ordersCounter} ${incline(
            ordersCounter
        )}</h1>
            ${createOrdersTable(getOrdersData())}`
    );

    document.querySelector('.popup').classList.add('open');
}

function getOrdersData() {
    const data = [];
    for (let fieldset of form.querySelectorAll('fieldset')) {
        data.push(getDataFromFiedset(fieldset));
    }
    return data;
}

function getDataFromFiedset(fieldset) {
    const coffeeType = fieldset.querySelector('.coffeetype');
    const optionsSelectors = {
        whippedCream: 'input[value="whipped cream"]:checked',
        marshmallow: 'input[value="marshmallow"]:checked',
        chocolate: 'input[value="chocolate"]:checked',
        cinnamon: 'input[value="cinnamon"]:checked',
    };
    const options = [];
    for (let option of Object.entries(optionsSelectors)) {
        if (fieldset.querySelector(option[1])?.value) {
            options.push(option[0]);
        }
    }
    return {
        coffeeType: coffeeType.options[coffeeType.selectedIndex].value,
        milk: fieldset
            .querySelector('input[type="radio"]:checked')
            .value.replace('-', '_'),
        options: options,
    };
}

function closePopup(defaultEvent) {
    defaultEvent.preventDefault();
    document.querySelector('.popup_order').innerHTML = '';
    document.querySelector('.popup').classList.remove('open');
}

function incline(count) {
    let mod = count % 20;
    if (mod === 1) return 'напиток';
    if (2 <= mod && mod <= 4) return 'напитка';
    return 'напитков';
}

function isChecked(inputTypeCheckbox) {
    return inputTypeCheckbox ? true : false;
}

createNewOrder(undefined);
