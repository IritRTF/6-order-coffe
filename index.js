let beverageCount = 1;

function addBeverage() {
    beverageCount++;
    const newBeverage = document.getElementById('beverage-1').cloneNode(true);
    newBeverage.id = 'beverage-' + beverageCount;
    newBeverage.querySelector('.beverage-count').innerText = 'Напиток №' + beverageCount;

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Удалить';
    closeButton.classList.add('add-button');
    closeButton.onclick = function () {
        removeBeverage(newBeverage.id);
    };

    newBeverage.appendChild(closeButton);
    document.querySelector('.beverage-forms').appendChild(newBeverage);
}
function handleDrinkSelection(selectElement) {
  const milkCheckboxField = document.getElementById('milk-checkbox-field');

  if (selectElement.value === 'турецкий кофе') {
      milkCheckboxField.style.display = 'none';
  } else {
      milkCheckboxField.style.display = 'block';
  }
}

function removeBeverage(id) {
    const beverageForm = document.getElementById(id);
    if (document.querySelectorAll('.beverage').length > 1) {
        beverageForm.parentNode.removeChild(beverageForm);
    }
}

function submitOrder() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function processOrder() {
    const orderTime = document.getElementById('order-time').value;
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    if (orderTime < currentTime) {
        document.getElementById('order-time').style.border = '2px solid red';
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее.');
    } else {
        closeModal();
        displayOrderInfo();
    }
}

function displayOrderInfo() {
    const drinkCount = document.querySelectorAll('.beverage').length;
    const modalContent = document.getElementById('modal');
    const drinkCountText = `Вы заказали ${drinkCount} напитк${getRussianPluralForm(drinkCount)}`;
    document.getElementById('drink-count').innerText = drinkCountText;

    const tableContent = document.getElementById('order-table');
    tableContent.innerHTML = '<tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th><th>Пожелания</th></tr>';

    document.querySelectorAll('.beverage').forEach((beverage, index) => {
        const drinkName = beverage.querySelector('[name="drink"]').value;
        const milkType = beverage.querySelector('[name="milk"]').checked ? 'обычное' : '';
        const additionalInfo = beverage.querySelector('textarea').value;
        const wishesBold = highlightWishes(additionalInfo);

        tableContent.innerHTML += `<tr><td>${drinkName}</td><td>${milkType}</td><td>${wishesBold}</td><td>${additionalInfo}</td></tr>`;
    });
}
function handleDrinkSelection(selectElement) {
  const milkCheckboxField = document.getElementById('milk-checkbox-field');
  const noteTurkishCoffee = document.getElementById('note-turkish-coffee');

  if (selectElement.value === 'турецкий кофе') {
      milkCheckboxField.style.display = 'none';
      noteTurkishCoffee.style.display = 'block';
  } else {
      milkCheckboxField.style.display = 'block';
      noteTurkishCoffee.style.display = 'none';
  }
}

function getRussianPluralForm(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return '';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'а';
    } else {
        return 'ов';
    }
}

function highlightWishes(text) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно',];
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        text = text.replace(regex, `<b>${keyword}</b>`);
    });
    return text;
}
