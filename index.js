const addButton = document.querySelector('.add-button');
const submitButton = document.querySelector('.submit-button');
const dialog = document.querySelector('#dialog')
const removeButton = dialog.querySelector('.remove-button');
const modalWindowContent = document.querySelector('.modal-content');

addButton.addEventListener("click", () => {
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    let headerText = newForm.querySelector("h4").innerHTML;
    let newDrinkNumber = headerText.slice(headerText.indexOf("№") + 1, headerText.length) - -1;
    newForm.querySelector("h4").innerHTML = `Напиток №${newDrinkNumber}`;
    for (let radio of newForm.querySelectorAll("input[type=radio]")) { radio.name = "milk" + newDrinkNumber; }
    forms[forms.length - 1].after(newForm);
});

function defineEnding(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
  }


function showModalWindow(event) {
    event.preventDefault();
    const beverageForms = document.getElementsByClassName('beverage');
    let beverageCount = 0;
    for (let i = 0; i < beverageForms.length; i++) {
       const beverageSelection = beverageForms[i].querySelector('input[type=radio]:checked');
       if (beverageSelection) {
         beverageCount++;
       }
    }
    document.querySelector("#dialog").showModal();
    modalWindowContent.querySelector('p').textContent = `Вы заказали ${beverageCount} ${defineEnding(beverageCount, ['напиток', 'напитка', 'напитков'])}`;
    
   }

function removeBeverageForm(e) {
 const beverageForms = document.getElementsByClassName('beverage');
 if (beverageForms.length > 1) {
    e.target.parentNode.remove();
 }
}

removeButton.addEventListener('click', () => { dialog.close(); });
submitButton.addEventListener('click', showModalWindow)
