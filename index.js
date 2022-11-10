let countBeverage = 1;
// let orderHTML = ''

// let btnAdd = document.getElementById('btn-add');
let btnAdd = document.querySelector('.add-button');
let btnClose = document.getElementsByClassName('close-field'); //коллекция всех кнопок "закрытия", автообновление

btnAdd.addEventListener('click', ()=> {
    countBeverage ++;
    let listBeverage = document.querySelector('.list-beverages');
    let el = document.querySelector('.list-beverages__item');
    let elClone = el.cloneNode(true);
    let seqNum = elClone.querySelector('.sequence-number');
    seqNum.innerHTML = countBeverage;
    listBeverage.insertAdjacentElement('beforeend', elClone);
    // btnClose = document.getElementsByClassName('close-field');
    addEventBtnClose();
    // console.log(btnClose);
});

function addEventBtnClose() {
    let listBeverage = document.querySelector('.list-beverages');
    for(let i =0; i < btnClose.length; i++){
        thisEl = btnClose[i];
        thisEl.addEventListener('click', (el)=> {
            // alert('hi');
            if(countBeverage > 1) {
                console.log(countBeverage);
                countBeverage--;
                thisElBtn = el.target;

                console.log(thisElBtn);

                let parent = thisElBtn.parentNode;
                console.log(parent);

                console.log(parent.parentNode);
                listBeverage.remove(parent.parentNode);
            }
        });
    }
}
