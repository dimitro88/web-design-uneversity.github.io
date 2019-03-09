const name = document.getElementById('name');
const surname = document.getElementById('surname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const form = document.getElementById('send-form');

const regExpForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpForPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

email.addEventListener("input", ({ target }) => {
    RegExp(regExpForEmail).test(target.value) ? target.setCustomValidity("") : target.setCustomValidity("Некоректний імейл!");
}, false);

name.addEventListener("input", ({ target }) => {
    target.value.length > 1 ? target.setCustomValidity("") : target.setCustomValidity("Ім'я повинно бути довше за 1 символ!");
    target.value.length < 20 ? target.setCustomValidity("") : target.setCustomValidity("Ім'я надто довге!");
}, false);

surname.addEventListener("input", ({ target }) => {
    target.value.length > 1 ? target.setCustomValidity("") : target.setCustomValidity("Прізвище повинно бути довше за 1 символ!");
    target.value.length < 20 ? target.setCustomValidity("") : target.setCustomValidity("Прізвище надто довге!");
}, false);

phone.addEventListener("input", ({ target }) => {
    RegExp(regExpForPhone).test(target.value) ? target.setCustomValidity("") : target.setCustomValidity("Некоректний номер телефону!");
}, false);

async function sendForm(event) {
    event.preventDefault();
    const data = {};
    Array.from(form.elements).forEach(element => {
        if(element.type === 'text')data[element.name] = element.value;
    });
    const result = await fetch(`http://localhost:3000/send-message`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => data);
    console.log(result);
}
