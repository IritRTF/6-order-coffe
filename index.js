let countBeverage = 1;
let deadСountBeverage = 1;

let btnAdd = document.querySelector('.add-button');
let btnClose = document.getElementsByClassName('close-field');
let seqNum = document.getElementsByClassName('sequence-number');

addEventBtnClose(btnClose.item(0)); //назначает onclick на самую первую кнопку, не убирать
addEventListener();
addEventBtnSubmit();
textareaBolder();
// Склонение слов
function num_word(value, words){  
	value = Math.abs(value) % 100; 
	let num = value % 10;
	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num == 1) return words[0]; 
	return words[2];
}

function addEventBtnSubmit() {
    let btnSubmit = document.querySelector('.submit-button');
    let modalWindow = document.querySelector('.modal-window');
    let overlay = document.querySelector('.overlay');
    let drinks = document.querySelector('#drinks-amount');
    let closeButton = document.querySelector('.close-modal-window');

    btnSubmit.addEventListener('click', ()=> {
        console.log(drinks);
        drinks.innerHTML = "Вы заказали " + countBeverage + " " + num_word(countBeverage, ["напиток", "напитка", "напитков", "напитков"]) +"!";
        let display = modalWindow.style.display;
        // console.log(display);
        doTable();
        modalWindow.style.display = 'flex';
        overlay.style.display = 'flex';
    });

    closeButton.addEventListener('click', ()=> {
        modalWindow.style.display = 'none';
        overlay.style.display = 'none';
    })
}

function addEventListener() {
    btnAdd.addEventListener('click', ()=> {
        countBeverage ++;
        deadСountBeverage ++;
        // console.log(countBeverage);
        let el = document.getElementsByClassName('beverage');
        let elClone = createNextField(el);
    
        el.item(el.length - 1).insertAdjacentElement('afterend', elClone);
        addEventBtnClose(btnClose.item(btnClose.length - 1))
        textareaBolder();
    });
}
function doTable(){
    let tableHTML="<table><tr><th>Напиток</td><th>Молоко</th><th>Дополнительно</th><th>Пожелания</th></tr>"
    let options = document.getElementsByTagName('option');
    let milks = document.getElementsByClassName('milk');
    let texts = document.getElementsByClassName('text-display');
    let topings = document.getElementsByClassName('toping');
    let firstRow = [];
    let secondRow = [];
    let thirdRow = [];
    let fourthRow = [];
    let toppingList = "";

    for(let i = 0; i < options.length; i++)
        if (options[i].selected === true)
            firstRow.push("<td>" + options[i].text + "</td>");

    for(let i = 0; i < milks.length; i++)
        if (milks[i].checked === true)
            secondRow.push("<td>" + milks[i].value + "</td>");

    for(let i = 1; i < topings.length + 1; i++){
        element = topings[i-1];
        if (element.checked === true)
            toppingList += element.value + "<br>"
        if (i % 4 == 0){
            thirdRow.push("<td>" + toppingList + " </td>");
            toppingList = "";
        }
    }
    
    for(let i = 0; i < texts.length; i++)
        fourthRow.push("<td>" + texts[i].innerHTML + "</td>");
    
    for(let i = 0; i < firstRow.length; i++)
        tableHTML += "<tr>" + firstRow[i]+secondRow[i]+thirdRow[i]+fourthRow[i] + "</tr>"

    document.querySelector('#table').innerHTML = tableHTML + "</table>";
    
}

function addEventBtnClose(btn) {
    btn.addEventListener('click', (el)=> {
        if(countBeverage > 1) {
            thisElBtn = el.target;
            let parent = thisElBtn.parentNode;
            parent.parentNode.removeChild(parent);
            countBeverage--;
            updateSeqNum();
        }
    });
}

function createNextField(el) {
    let elClone = el.item(0).cloneNode(true);
    let seqNum = elClone.querySelector('.sequence-number');
    seqNum.innerHTML = countBeverage;
    let inputs = elClone.querySelectorAll('input');
    let selecters = elClone.querySelectorAll('select');
    renumberAttribute(inputs);
    renumberAttribute(selecters);
    return elClone;
}

function renumberAttribute(arr){
    for(let i = 0; i < arr.length; i++){
        let attribute = arr[i].getAttribute('name');
        attribute = attribute.replace('-1', `-${deadСountBeverage}`); 
        arr[i].setAttribute('name', attribute) 
    }
}

function updateSeqNum() {
    let len = seqNum.length;
    for(let i = 0; i < len; i++)
        seqNum[i].innerHTML = i + 1;
}

function textareaBolder(){
    textarea = document.getElementsByClassName('textarea-more');
    textDisplay = document.getElementsByClassName('text-display');
    for (let i = 0; i < textDisplay.length; i++)
    {   
        textarea[i].addEventListener('input', ()=> {
        text = textarea[i].value; 
        text = text.replaceAll("поскорее", "<b>поскорее</b>").replaceAll("Поскорее", "<b>Поскорее</b>");
        text = text.replaceAll("побыстрее", "<b>побыстрее</b>").replaceAll("Побыстрее", "<b>Побыстрее</b>");
        text = text.replaceAll("скорее", "<b>скорее</b>").replaceAll("Скорее", "<b>Скорее</b>");
        text = text.replaceAll("срочно", "<b>срочно</b>").replaceAll("Срочно", "<b>Срочно</b>");
        text = text.replaceAll("быстрее", "<b>быстрее</b>").replaceAll("Быстрее", "<b>Быстрее</b>");
        text = text.replaceAll("очень нужно", "<b>очень нужно</b>").replaceAll("Очень нужно", "<b>Очень нужно</b>");
        textDisplay[i].innerHTML = text;
        })
    }
}