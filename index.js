beverages_set = document.querySelector(".beverages-set")

function returnDelFunc(el) {
    return () => {
        if (beverages_set.children.length != 1)
        {
            el.parentNode.remove()
            numberRedistribution()
        }
    }
}

for (let child of document.querySelectorAll('.delete-button'))
    child.onclick = returnDelFunc(child)

textarea = document.querySelector('.field textarea')
textarea.oninput = function () {
    document.querySelector('.you-textarea').innerHTML = addTegs(textarea.value)
}

close_button = document.querySelector('.close-button')
submit_button = document.querySelector('.next-button')
result_window = document.querySelector('.modal-wrapper')
close_button.onclick = () => {
    console.log(close_button.parentNode.parentNode)
    close_button.parentNode.parentNode.style.display='none'
}
submit_button.addEventListener("click", () => {
    result_window.querySelector('.count-beverage').innerHTML = `Вы заказали ${beverages_set.children.length} ${PluralizeСount(beverages_set.children.length)}`
    result_window.style.display='flex'
    let array = objectifyForm(Array.from(new FormData(document.querySelector('form'))))
    result_window.querySelector('.count-beverage').after(getInfo(array))
})

document.querySelector('.add-button').onclick = () => {
    let beverage = document.querySelector('.beverage').cloneNode(true);

    setNumberBeverage(beverage, beverages_set.children.length + 1)

    delete_button = beverage.querySelector('.delete-button')
    delete_button.onclick = returnDelFunc(delete_button)

    textarea = beverage.querySelector('.field textarea')
    textarea.oninput = function () {
        beverage.querySelector('.you-textarea').innerHTML = addTegs(textarea.value)
    }

    document.querySelector(".beverages-set").appendChild(beverage)
}

function numberRedistribution() {
    let i = 1
    for (let beverage of document.querySelectorAll('.beverage'))
    {
        setNumberBeverage(beverage, i)
        i += 1
    }
}

function setNumberBeverage(beverage, number) {
    beverage.querySelector('.beverage-count').innerHTML = `Напиток №${number}`
    let inputs = beverage.querySelectorAll('[name]')
    for (let input of inputs) //Добавляем идентификатор в каждое поле name
        input.name = `${input.name.split('-')[0]}-${number}`
}

function PluralizeСount(count) {
    if (count % 100 < 11 || count % 100 > 14)
    {
        if (count % 10 == 1) return "напиток";
        if (count % 10 > 1 && count % 10 < 5) return "напитка";
    }
    return "напитков";
}

function getInfo(dict) {
    let array = dict.map(el => Object.values(el))
    const table = document.createElement('table');
    table.className = "table";

    table.innerHTML += Object.keys(dict[0]).map(x => `<td>${dict_en_to_rus[x]}</td>`).join``;
    table.innerHTML += array.map(e => 
        `<tr>${e.map(x => `<td>${x.split(', ')
            .map(el => dict_en_to_rus[el] === undefined ? el : dict_en_to_rus[el])
            .join(', ')
        }</td>`).join``}</tr>`
    ).join``;
    return table;
}

function objectifyForm(formArray) {
    let returnArray = new Array(beverages_set.children.length).fill(1).map(x => new Object({coffetype: '', milk: '', options: '', comment: ''}));
    for (let i = 0; i < formArray.length; i++){
        let beverage = formArray[i]
        let paran_name = beverage[0].split('-')[0]
        let id = beverage[0].split('-')[1] - 1

        if (returnArray[id][paran_name] === '') returnArray[id][paran_name] = beverage[1]
        else returnArray[id][paran_name] += `, ${beverage[1]}`
    }
    return returnArray;
}

function addTegs(iput_str){
    words = ["срочно", "побыстрее", "быстрее", "поскорее", "скорее", "очень нужно"]
    for (let i in words){
        iput_str = iput_str.replace(new RegExp(`${words[i]}`, 'i'), `<b>$&</b>`)
    }
    return iput_str
}

let dict_en_to_rus = {
    'coffetype': 'Напиток',
    'milk': 'Молоко',
    'options': 'Дополнительно',
    'comment': 'И еще вот что',

    'espresso': 'Эспрессо',
    'capuccino': 'Капучино',
    'cacao': 'Какао',

    'usual': 'Обычное',
    'no-fat': 'Обезжиренное',
    'soy': 'Соевое',
    'coconut': 'Какосовое',

    'whipped cream': 'Взбитые сливки',
    'marshmallow': 'Зефир',
    'chocolate': 'Шоколад',
    'cinnamon': 'Корица',
}

let Hour
let Minutes

let my_Hour 
let my_Minutes

let submit_button_2 = document.querySelector('.submit-button')
let time = document.querySelector('.time')
time.style.border = 'solid red'

submit_button_2.onclick = () => {
    let Data = new Date();
    Hour = Number(Data.getHours())
    Minutes = Number(Data.getMinutes())

    my_Hour = Number(time.value.split(':')[0])
    my_Minutes = Number(time.value.split(':')[1])

    console.log(Data)
    console.log(time.value)

    if (my_Hour < Hour || (my_Hour = Hour && my_Minutes < Minutes)) {
        console.log(my_Hour < Hour || (my_Hour = Hour && my_Minutes < Minutes))
        time.style.border = 'solid red'
        alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее")
    }
    else {
        time.style.border = 'solid grin'
    }
}

time.oninput = () => {
    let Data = new Date();
    Hour = Number(Data.getHours())
    Minutes = Number(Data.getMinutes())

    my_Hour = Number(time.value.split(':')[0])
    my_Minutes = Number(time.value.split(':')[1])


    if (my_Hour < Hour || (my_Hour = Hour && my_Minutes < Minutes)) {
        time.style.border = 'solid red'
    }
    else {
        time.style.border = 'solid green'
    }
}