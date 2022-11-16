//не работает
class Form {
    constructor() {
        this.countBeverage = 1;
        this.deadСountBeverage = 1; //Не изменяется при удалении элемента

        this.btnClose = document.getElementsByClassName('close-field');
        this.seqNum = document.getElementsByClassName('sequence-number');
    }

    addEventListener() {
        let btnAdd = document.querySelector('.add-button');
        let btnClose = document.getElementsByClassName('close-field');

        btnAdd.addEventListener('click', ()=> {
            this.countBeverage ++;
            this.deadСountBeverage ++;
            // console.log(countBeverage);
            let el = document.getElementsByClassName('beverage');
            let elClone = this.createNextField(el);
        
            el.item(el.length - 1).insertAdjacentElement('afterend', elClone);
            this.addEventBtnClose(btnClose.item(btnClose.length - 1))
        });
    }

    addEventBtnClose(btn) {
        btn.addEventListener('click', (el)=> {
            if(this.countBeverage > 1) {
                // console.log(countBeverage);
                console.log(el);
                thisElBtn = el.target;
                console.log(thisElBtn);
                let parent = thisElBtn.parentNode;
                // console.log(parent);
                parent.parentNode.removeChild(parent);
                this.countBeverage--;
                // console.log(countBeverage);
                this.updateSeqNum();
            }
        });
    }

    createNextField(el) {
        let elClone = el.item(0).cloneNode(true);
        let seqNum = elClone.querySelector('.sequence-number');
        seqNum.innerHTML = this.countBeverage;
    
        let inputs = elClone.querySelectorAll('input');
        let selecters = elClone.querySelectorAll('select');
        this.renumberAttribute(inputs);
        this.renumberAttribute(selecters);
    
        return elClone;
    }

    renumberAttribute(arr){
        // Не соблюдают измененную последовательность
        for(let i = 0; i < arr.length; i++){
            let attribute = arr[i].getAttribute('name');
            attribute = attribute.replace('-1', `-${this.deadСountBeverage}`); 
            console.log(attribute);
            arr[i].setAttribute('name', attribute) 
            // console.log(input.getAttribute('name'));
        }
    }

    updateSeqNum() {
        let len = seqNum.length;
        for(let i = 0; i < len; i++){
            seqNum[i].innerHTML = i + 1;
            // console.log(countBeverageы);
        }
    }
}

let form = new Form();
form.addEventBtnClose(form.btnClose.item(0));
form.addEventListener();