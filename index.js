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
        // doTable();
        modalWindow.style.display = 'block';
        overlay.style.display = 'block';
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

    let table= document.querySelector('#table')
    header="<table><tr><th>Напиток</td><th>Молоко</th><th>Дополнительно</th></tr>"



    e=document.getElementsByTagName('option')
    let len = e.length;
    firstRow=[]
    for(let i = 0; i < len; i++){ 
        
        elemnt=document.getElementsByTagName('option') [i];
        if (elemnt.selected===true)
            firstRow.push("<td>"+elemnt.text + " </td>");
    }

    e=document.getElementsByClassName('milk')
    len = e.length;
    secondRow=[]
    for(let i = 0; i < len; i++){ 
        elemnt=e[i]; 
        if (elemnt.checked==true)
            secondRow.push("<td>"+elemnt.value + " </td>");
    }

    e=document.getElementsByClassName('toping')
    len = e.length;
    thirdRow=[]
    listTop=""
    for(let i = 1; i < len+1; i++){ 
        elemnt=e[i-1]; 
        if (elemnt.checked==true)
            listTop+=elemnt.value+"<br>"
        if (i%4==0){
            thirdRow.push("<td>"+listTop + " </td>");
            listTop=""}
    }

    main=""
    len = firstRow.length;
   
    for(let i = 0; i < len; i++){ 
        main+="<tr>"+firstRow[i]+secondRow[i]+thirdRow[i]+"</tr>"
    }
    
    foother="</table>";
    
    table.innerHTML= header+main+foother;

}
function addEventBtnClose(btn) {
    btn.addEventListener('click', (el)=> {
        if(countBeverage > 1) {
            // console.log(countBeverage);
            thisElBtn = el.target;
            // console.log(thisElBtn);
            let parent = thisElBtn.parentNode;
            // console.log(parent);
            parent.parentNode.removeChild(parent);
            countBeverage--;
            // console.log(countBeverage);
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
    // Не соблюдают измененную последовательность
    for(let i = 0; i < arr.length; i++){
        let attribute = arr[i].getAttribute('name');
        attribute = attribute.replace('-1', `-${deadСountBeverage}`); 
        // console.log(attribute);
        arr[i].setAttribute('name', attribute) 
        // console.log(input.getAttribute('name'));
    }
}

function updateSeqNum() {
    let len = seqNum.length;
    for(let i = 0; i < len; i++){
        seqNum[i].innerHTML = i + 1;
        // console.log(countBeverageы);
    }
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

dateSelector()
function dateSelector() {
    let time = document.querySelector('.take-time-input');
    let submit = document.querySelector('.submit-modal-window');
    let modalWindow = document.querySelector('.modal-window');
    let overlay = document.querySelector('.overlay');
    
    submit.addEventListener('click', ()=> {
        let currentTime = new Date();
        let selectedHours = Number(String(time.value).split(':')[0])
        let selectedMinutes = Number(String(time.value).split(':')[1])
        let selectedTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), selectedHours, selectedMinutes, 0);
        //Вернуться потом
        let formOrderData = new FormData(document.querySelector('.form-order'));
        let timeOrder = formOrderData.get('take-time');
        // console.log(formOrderData.get('take-time'));
        // console.log(`${selectedHours}:${selectedMinutes}`);
        // console.log(`${currentTime.getHours() < timeOrder.split(':')[0] }:${currentTime.getMinutes()}`);
        //Не работает) мб оставим как было?
        // if(`${selectedHours}:${selectedMinutes}`)
        if(selectedTime < currentTime){
            time.style.borderColor = 'red';
            alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
        }
        else{
            time.style.borderColor = 'green';
            modalWindow.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
}

// createTable();

function createTable() {
    let submit = document.querySelector('.submit-button');
    submit.addEventListener('click', ()=> {
        let drinks = document.querySelector('#drinks-amount');
        let forms = document.forms;
        getFormData(forms, drinks);
    });
}

function getFormData (forms, where) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    where.insertAdjacentElement('afterend', table);
    // tabel.create
    for(let i = 0; i < forms.length - 1; i++) {
        let formData = new FormData(forms[i]);

        for(let [name, value] of formData) {
            console.log(`${name} = ${value}`);
        }
    }
}