let formCount = 1;
let ordcount = 1;

const naming ={
    "espresso": "Эспрессо",
    "capuccino": "Капучино",
    "cacao": "Какао",
    "usual": "Обычное",
    "no-fat": "Обезжиренное",
    "soy": "Соевое",
    "coconut": "Кокосовое",
    "whipped cream": "Взбитые сливки",
    "marshmallow": "Зефирки",
    "chocolate": "Шоколад",
    "cinnamon": "Корица"
};


document.querySelector('#input-wishes').addEventListener('input' ,(event) =>  {replaseMarkers(event)});

document.querySelector(".add-button").addEventListener('click', () => {
    ordcount++;
    let fieldSets = document.querySelectorAll(".beverage");
    let newForm = fieldSets[fieldSets.length - 1].cloneNode(true); 
    let wishes = newForm.querySelector('#input-wishes');
    wishes.value = '';
    newForm.querySelector('.wish').innerHTML = '';
    wishes.addEventListener('input' ,(event) =>  {replaseMarkers(event)});

    for (let form of newForm.querySelectorAll('input[type=radio]')) {
        form.name = `milk${ordcount}`;
    }
    newForm.querySelector('h4').innerHTML = `Напиток №${++formCount}`;  
    fieldSets[fieldSets.length - 1].after(newForm);
});

const markers =['скорее' , 'Скорее' , 'быстрее', 'срочно', 'очень нужно' , 'Быстрее', 'Срочно', 'Очень нужно'];

function replaseMarkers(event){
    let content = event.target.value;
    for (let word of markers){
        content = content.replace(word , `<b>${word}</b>`);
    }
    event.target.parentElement.querySelector('.wish').innerHTML = `${content}`;
}

document.addEventListener('click',(event) => {
    if (formCount > 1 && event.target.classList.contains('close-button')) {
        formCount--;
        ordcount--;
        event.target.parentElement.remove(); 
        for (let [order , item] of document.querySelectorAll('fieldset').entries()){
            item.querySelector('h4').innerHTML = `Напиток №${order + 1}`;
        }     
    }
});

const keyWord = ['напиток' , 'напитка', 'напитков'];
function getPhrase(count){
    if (count == 1) return keyWord[0];
    if (count == 0) return keyWord[2];
    else return (count > 1 && count < 5) ? keyWord[1] : keyWord[2];  
}

document.querySelector(".submit-button").addEventListener('click', () => {
    let window = document.querySelector(".modal-overlay");
    window.style.display = 'block';
    let modal = document.querySelector(".modal-info");
    let count =  (ordcount < 21)?getPhrase(ordcount):getPhrase(ordcount%10);
    modal.innerHTML = `<p>Вы заказали ${ordcount} ${count}</p>`;
    let modalTable = document.createElement('table');
    modalTable.innerHTML = '<tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th><th>Пожелания</th></tr>';
    modalTable.classList.add('modal-table');
    makeTable(modalTable);
    modal.append(modalTable);
});

document.querySelector('#beverage-time').addEventListener('focus' ,  (event) => {
    event.target.classList.remove('eror');
});

document.querySelector(".submit-modal").addEventListener('click', () => {
    timeInput = document.querySelector('#beverage-time');
    let time =  timeInput.value.split(':').map((x) => Number(x));
    const currentTime = [new Date().getHours(),new Date().getMinutes()].map((x) => Number(x));
    if (currentTime[0]>time[0] || currentTime[1]>time[1] ){
        timeInput.classList.add('eror');
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее!');
    }
    else document.querySelector(".modal-overlay").style.display = 'none';
});


function makeTable(modalTable){
    for (let beverage of document.querySelectorAll(".beverage")){
        let infoRow = modalTable.querySelector('tbody').insertRow();
        for (let item of getDrinkInfo(beverage)){
            infoRow.insertCell().append(document.createTextNode(item.toString()));
        }
    }
}


function getDrinkInfo(beverage){
    let add =  Array.from(beverage.querySelectorAll('input[type=checkbox]:checked')).map((x) => naming[x.value]);
    let milk = naming[beverage.querySelectorAll('input[type=radio]:checked')[0].value];
    let type = naming[
        beverage.querySelector('#drink-type').options[beverage.querySelector('#drink-type').selectedIndex].value
    ];
    let wishes = beverage.querySelector('#input-wishes').value;
    return [type , milk , add , wishes];
}

document.querySelector(".close-button-modal").addEventListener('click', () => {
    document.querySelector(".modal-overlay").style.display = 'none';
});



