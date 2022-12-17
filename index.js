const form = document.getElementById('choiceForm');
const coffeeAddingFieldset = document.querySelector('.beverage');
const addCoffeeButton = document.querySelector('.add-button');
const addCoffeeButtonContainer = document.getElementById('add-button-container');

const beverageList = document.getElementsByClassName('beverage');
const beverageCount = document.querySelector('.beverage-count');

const orderSuccessModal = document.getElementById('orderSuccess');
const amountOrderText = document.getElementById('amountOrder');
const resultTable = document.getElementById('resultTable');
const closeModalButton = document.getElementById('closeModal');

const milkMap = {
    usual: 'обычное',
    noFat: 'обезжиренное',
    soy: 'соевое',
    coconut: 'кокосовое',
};

const drinkMap = {
    espresso: 'эспрессо',
    cappuccino: 'капучино',
    cacao: 'какао',
};

const additivesMap = {
    whippedCream: 'взбитые сливки',
    marshmallow: 'зефирки',
    chocolate: 'шоколад',
    cinnamon: 'корица',
};
let coffeeCount = 1;

addCoffeeButton.addEventListener('click', () => {
    const newCoffeeAddingFieldset = coffeeAddingFieldset.cloneNode(true);
    const beverageCount = newCoffeeAddingFieldset.querySelector('.beverage-count');

    coffeeCount++;
    newCoffeeAddingFieldset.querySelectorAll('.milk-radio')
        .forEach(button => button.setAttribute('name', `milk${coffeeCount}`));
    newCoffeeAddingFieldset.querySelector('.drink-select').setAttribute('name', `drink${coffeeCount}`);
    newCoffeeAddingFieldset.querySelectorAll('.optional-check')
        .forEach(button => button.setAttribute('name', `options${coffeeCount}`));

    beverageCount.textContent = `Напиток №${coffeeCount}`;
    form.insertBefore(newCoffeeAddingFieldset, addCoffeeButtonContainer);

    checkDeleteBtnsAvailability();
});

form.addEventListener('click', (e) => {
    if (beverageList.length > 1 && e.target.id === 'delete-coffee-btn') {
        e.target.parentNode.remove();
        coffeeCount--;
    }

    checkDeleteBtnsAvailability();
});

document.getElementById('orderSuccess').style.display = 'none';

form.addEventListener('submit', (e) => {
    console.log(form.elements.options1[0]);
    e.preventDefault();

    amountOrderText.textContent = `Вы заказали ${beverageList.length} ${getRightWord(beverageList.length)}`;

    resultTable.innerHTML = '';
    document.querySelectorAll('.beverage').forEach((beverage, index) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        let optionalValues = [];

        td1.textContent = drinkMap[form.elements[`drink${index + 1}`].value];
        td2.textContent = milkMap[form.elements[`milk${index + 1}`].value];
        document.querySelectorAll(`[name=${`options${index + 1}`}]`).forEach(el => {
            if (el.checked) {
                optionalValues.push(additivesMap[el.value]);
            }
        });
        td3.textContent = optionalValues.join(', ');

        tr.appendChild(td1);       
        tr.appendChild(td2);
        tr.appendChild(td3); 

        resultTable.appendChild(tr);
    });

    setModalVisible(true);
    closeModalButton.addEventListener('click', () => {
        setModalVisible(false);
    });
});


function checkDeleteBtnsAvailability() {
    if (beverageList.length > 1) {
        setDeleteBtnsStateDisabled(false);
    } else {
        setDeleteBtnsStateDisabled(true);
    }
}

function setDeleteBtnsStateDisabled(value) {
    const deleteButtonList = document.querySelectorAll('.delete-btn');
    deleteButtonList.forEach(btn => btn.disabled = value);
}

function setModalVisible(isVisible) {
    orderSuccessModal.style.display = isVisible ? 'block' : 'none';
}

function getRightWord(count) {
    const numberEnd = count % 10;

    if (numberEnd === 1) {
        return 'напиток';
    } else if (numberEnd === 2) {
        return 'напитка';
    }

    return 'напитков';
}
