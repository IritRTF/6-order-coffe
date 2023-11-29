let beverageCount = 1;
let beverageCounter = 1;
let deleteButton = document.querySelector('.delete-button');
let textArea = document.querySelector('.text-area');

const addButton = document.querySelector('.add-button');
const modalWindow = document.querySelector('.modal-window');
const modalWindowContent = document.querySelector('.modal-window-content');
const modalWindowButton = document.querySelector('.submit-button');


const translation = {'espresso': 'Эспрессо', 
'capuccino': 'Капучино', 
'cacao': 'Какао',
'usual': 'обычное',
'no-fat': 'обезжиренное',
'soy': 'соевое',
'coconut': 'кокосовое',
'whipped cream': 'взбитые сливки',
'marshmallow': 'зефирки',
'chocolate': 'шоколад',
'cinnamon': 'корица'}


function defineEnding(number, words) {  
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

function addBeverage() {
    ++beverageCounter;
    ++beverageCount;
    document.querySelector('.add-button').insertAdjacentHTML('beforebegin', `
    <fieldset class="beverage" id="${beverageCounter}">
    <button type="button" class="delete-button" id="${beverageCounter}"><img src="delete cross.svg"></button>
    <h4 class="beverage-count">Напиток №${beverageCounter}</h4>
    <label class="field">
      <span class="label-text">Я буду</span>
      <select>
        <option value="espresso">Эспрессо</option>
        <option value="capuccino" selected>Капучино</option>
        <option value="cacao">Какао</option>
      </select>
    </label>
    <div class="field">
      <span class="checkbox-label">Сделайте напиток на</span>
      <label class="checkbox-field">
        <input type="radio" name="milk${beverageCounter}" value="usual" checked />
        <span>обычном молоке</span>
      </label>
      <label class="checkbox-field">
        <input type="radio" name="milk${beverageCounter}" value="no-fat" />
        <span>обезжиренном молоке</span>
      </label>
      <label class="checkbox-field">
        <input type="radio" name="milk${beverageCounter}" value="soy" />
        <span>соевом молоке</span>
      </label>
      <label class="checkbox-field">
        <input type="radio" name="milk${beverageCounter}" value="coconut" />
        <span>кокосовом молоке</span>
      </label>
    </div>
    <div class="field additionaly${beverageCounter}">
      <span class="checkbox-label">Добавьте к напитку:</span>
      <label class="checkbox-field">
        <input type="checkbox" name="options" value="whipped cream" />
        <span>взбитых сливок</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" name="options" value="marshmallow" />
        <span>зефирок</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" name="options" value="chocolate" />
        <span>шоколад</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" name="options" value="cinnamon" />
        <span>корицу</span>
      </label>
    </div>
    <div class="text-output">
        <textarea class="text-area" cols="20" rows="2"></textarea>
        <p></p>
    </div>
  </fieldset>`);
  const deleteButtons = document.getElementsByClassName('delete-button')
  Array.from(deleteButtons).forEach(function(deleteButton) {
    deleteButton.addEventListener('click', deleteBevarage);
  });
  const textAreas = document.getElementsByClassName('text-area');
  Array.from(textAreas).forEach(function(textArea) {
    textArea.addEventListener('keyup', printWishes);
  });
}

function deleteBevarage(event) {
  if (beverageCount > 1) {
    const fieldsetID = event.target.parentNode.id;
    document.getElementById(fieldsetID).remove();
    --beverageCount;
  }
}

function showModalWindow(event) {
  event.preventDefault();
  modalWindow.style.display = 'block';
  modalWindowContent.style.display = 'inline';
  for (let fieldset of document.querySelectorAll('fieldset')) {
    const beverageType = translation[fieldset.querySelector('select').value];
    let milkType;
    for (const radioButton of document.querySelectorAll(`input[name="milk${fieldset.id}"]`)) {
      if (radioButton.checked) {
        milkType = translation[radioButton.value];
      }
    }
    let additionaly = [];
    for (const checkBox of document.querySelectorAll(`.additionaly${fieldset.id} .checkbox-field input`)) {
      if (checkBox.checked) {
        additionaly.push(translation[checkBox.value]);
      }
    }
    document.querySelector('.table').insertAdjacentHTML('beforeend', `
    <tr>
      <td>${beverageType}</td>
      <td>${milkType}</td>
      <td>${additionaly.join(', ')}</td>
    </tr>`)
  };
  modalWindowContent.querySelector('p').textContent = `Вы заказали ${beverageCount} ` + defineEnding(beverageCount, ['напиток', 'напитка', 'напитков']);
}

function hideModalWindow() {
  modalWindow.style.display = 'none';
  modalWindowContent.style.display = 'none';
}

function printWishes(event) {
  let inputText = event.target.value;
  const attentionWords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
  for (const word of attentionWords) {
    inputText = inputText.replace(new RegExp(word, 'i'), `<b>$&</b>`)
  };
  event.target.nextSibling.nextSibling.innerHTML = inputText;
}

addButton.addEventListener('click', addBeverage);
deleteButton.addEventListener('click', deleteBevarage);
modalWindowButton.addEventListener('click', showModalWindow);
modalWindowContent.addEventListener('click', hideModalWindow);
textArea.addEventListener('keyup', printWishes);