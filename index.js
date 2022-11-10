let countBeverage = 1;

let btnAdd = document.querySelector('.add-button');
let btnClose = document.getElementsByClassName('close-field'); //коллекция всех кнопок "закрытия", автообновление
let seqNum = document.getElementsByClassName('sequence-number');

addEventBtnClose(btnClose.item(0)); //назначает onclick на самую первую кнопку, не убирать

btnAdd.addEventListener('click', ()=> {
    countBeverage ++;
    // console.log(countBeverage);
    let el = document.getElementsByClassName('beverage');
    let elClone = createNextField(el);

    el.item(el.length - 1).insertAdjacentElement('afterend', elClone);
    addEventBtnClose(btnClose.item(btnClose.length - 1))
});

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
    for(let i = 0; i < arr.length; i++){
        let attribute = arr[i].getAttribute('name');
        attribute = attribute.replace('-1', `-${countBeverage}`); 
        console.log(attribute);
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
