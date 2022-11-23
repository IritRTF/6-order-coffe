document.addEventListener('click', e => {
    if (e.target.className !== 'tex') {
        return
    }
    qwe = e.target.id
    document.getElementById(qwe).oninput = function (s) {
        w = e.target.value.split(' ');
        w.forEach(function (item, i, w) {
            if (item === "срочно" || item === "быстрее" || item === "побыстрее" || item === "скорее" || item === "поскорее" || item === "очень нужно") {
                w[i] = w[i].bold()

            }
        });
        //console.log(e.target,e.target.value)
        w = w.join(' ')
        //.replace(/Dav(?:e|id) срочно|быстрее|побыстрее|скорее|  |очень нужно/ig, `${e.target.value.bold()}`)

        document.querySelector(`#poj${qwe.substr(4)}`).innerHTML = `Ваши пожелания: ${w}`;
    };
})


// `"срочно"`, `"быстрее"` / `"побыстрее"`, `"скорее"` / `"поскорее"`, `"очень нужно"`

function add_nap() {
    let dop = 0
    count = document.getElementsByClassName('beverage').length + 1;
    let parent_drink = document.querySelector('.beverage')
    let drink2 = parent_drink.cloneNode(true)
    drink2.querySelector('.beverage-count').innerHTML = `Напиток №${count}`;
    drink2.id = `id ${count}`
    drink2.querySelectorAll('.selec').forEach((milk) => {
        milk.name = `selec${count}`
    })
    drink2.querySelector('.tex').id = `text${count}`
    drink2.querySelector('.tex').name = `te${count}`
    drink2.querySelector('.pojel').id = `poj${count}`
    drink2.querySelectorAll('.rad').forEach((milk) => {
        milk.name = `rad${count}`
    })
    drink2.querySelectorAll('.check').forEach((opt) => {
        dop += 1
        opt.name = `check${count}.${dop}`
    })
    document.querySelector('.nap').append(drink2)
}

function del_nap(qwe) {
    if (document.querySelectorAll('.beverage').length === 1) {
        return
    }
    qwe.closest('.beverage').remove()

    count = 0
    document.querySelectorAll('.beverage-count').forEach((s) => {
        count += 1

        s.innerHTML = `Напиток №${count}`;

    })

    count = 0
    let dop = 0
    document.querySelectorAll('.beverage').forEach((s) => {
        count += 1
        s.querySelectorAll('.tex').forEach((milk) => {
            milk.id = `text${count}`
        })
        s.querySelectorAll('.tex').forEach((milk) => {
            milk.name = `te${count}`
        })
        s.querySelectorAll('.pojel').forEach((milk) => {
            milk.id = `poj${count}`
        })
        s.querySelectorAll('.selec').forEach((milk) => {
            milk.name = `selec${count}`
        })
        s.querySelectorAll('.rad').forEach((milk) => {
            milk.name = `rad${count}`
        })
        s.querySelectorAll('.check').forEach((milk) => {
            dop += 1
            milk.name = `check${count}.${dop}`
        })
        s.id = `id ${count}`
    })
}


var modal = document.getElementById("myModal")
var btn = document.getElementById("myBtn")
var span = document.getElementsByClassName("close")[0]

btn.onclick = function () {
    modal.style.display = "block"
    modal.querySelector('.napi').innerHTML = `"Вы заказали ${num_word(document.getElementsByClassName('beverage').length)}"`

    const {form} = document.forms;

    function ret(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());

        newTr = document.createElement("tr");
        let flag = 0

        console.log(values)
        for (i in values) {

            if (i.substr(0, 5) === 'selec') {
                flag = 0
                newTr = document.createElement("tr");
                newTd = document.createElement("td");
                newTd.innerHTML = values[i];
                newTr.append(newTd)
                document.querySelector('.tablee').append(newTr)

            } else {
                if (i.substr(0, 5) === 'check' && flag === 1) {
                    newTd.innerHTML += ', ' + values[i]
                } else {
                    if (i.substr(0, 2) === 'te' && prov !== 'check') {
                        console.log(prov)
                        newTd = document.createElement("td");
                        newTd.innerHTML = '';
                        newTr.append(newTd)

                    }

                    if (i.substr(0, 5) === 'check') {
                        flag = 1
                    }
                    prov = i.substr(0, 5)
                    newTd = document.createElement("td");
                    newTd.innerHTML = values[i];
                    newTr.append(newTd)
                    document.querySelector('.tablee').append(newTr)

                }
            }
        }
    }

    form.addEventListener('submit', ret)
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

words = ['Напиток', 'Напитка', 'Напитков']

function num_word(value) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return (value + ' ' + words[2]);
    if (num > 1 && num < 5) return (value + ' ' + words[1]);
    if (num == 1) return (value + ' ' + words[0]);
    return (value + ' ' + words[2]);
}