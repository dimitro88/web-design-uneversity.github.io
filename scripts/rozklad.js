const date = document.getElementById('date');
const findButton = document.getElementById('find-timetable-button');
const select = document.getElementById('slct');
const tableContainer = document.getElementById('table-container');
let createTableFunction;


findButton.addEventListener('click', ({ target }) => {
    console.log(date.value);
}, false);

date.addEventListener('input', ({ target }) => {
    target.value.length === 0 ? findButton.disabled = true : findButton.disabled = false;
}, false);

async function getRes(res) {
    return await res;
}

async function getItemsFromDB() {
    const result = await fetch(`http://localhost:3000/time-table?date=${date.value}`, {
        method: 'GET',
        headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json'
        },
    })
        .then(res => getRes(res.json()));
    select.style.visibility = 'visible';
    const stations = result.reduce((accum, item) => {
        const { station } = item;
        accum[station] === undefined ? accum[station] = [item] : accum[station].push(item);
        return accum;
    }, {})
    for(station in stations) {
        let option = document.createElement('option');
        option.value = station;
        option.innerHTML = station;
        select.appendChild(option);
    }
    return function(selectedItem) {
        return stations[selectedItem];
    }
}

async function wrapperFuncion(station = undefined) {
    if(station === undefined) {
        createTableFunction = await getItemsFromDB();
    } else {
        if(tableContainer.children[0])tableContainer.removeChild(tableContainer.children[0]);
        const items = createTableFunction(station);
        const table = document.createElement('table');
        const header = ['Номер', 'Маршрут', 'Прибуття', 'Зупинка', 'Відправлення']
        let trHead = document.createElement('tr');
        header.forEach(title => {
            let th = document.createElement('th');
            th.innerHTML = title;
            th.value = title;
            trHead.appendChild(th);
        })
        table.appendChild(trHead);
        items.forEach(item => {
            let tr = document.createElement('tr');
            for(field in item) {
                if(field !== "station"){
                    let td = document.createElement('td');
                    td.innerHTML = item[field];
                    td.value = item[field];
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        })
        tableContainer.appendChild(table);
    };
}