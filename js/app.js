const url = 'https://randomuser.me/api/?results=12';
const section = document.getElementById('content');
const search = document.getElementById('searchBox');
const overlay = document.getElementById('overlay');
const employeeOverlay = document.getElementById('employeeWrapper');
const closeBtn = document.getElementById('close');
let employeeData = [];


// fetch employees function
function displayEmployees(data) {
    data.map((employee, index) => {
        const card = document.createElement('div');
        card.className = 'employee-box';
        card.setAttribute('data-index', index);
        card.setAttribute('data-name', `${employee.name.first} ${employee.name.last}`);
        section.appendChild(card);
        card.innerHTML = `
        <img src=${employee.picture.large} alt=${employee.name.first} profile picture>
            <div class="info-wrapper">
                <h3>${employee.name.first} ${employee.name.last}</h3>
                <p>${employee.email}</p>
                <p>${employee.location.city}</p>
            </div>
        `
    })
}


// Search function
function searchBox() {
    let searchValue = search.value.toUpperCase();
    let employees = document.getElementsByClassName('employee-box');
    let boxData

    for (let i = 0; i < employees.length; i++) {
        boxData = employees[i].getAttribute('data-name')
        if (boxData.toUpperCase().indexOf(searchValue) > -1) {
            employees[i].style.display = "";
        } else {
            employees[i].style.display = "none";
        }
    }
}

//overlay function
function openOverlay() {
    overlay.className = '';
}


search.addEventListener('input', () => {
    searchBox()
});

function fetchEmployee(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            employeeData = data.results;
            displayEmployees(employeeData);
            // return employeeData;
        })
};

// async function fetchEmployee(url) {
//     const res = await fetch(url);
//     const data = await res.json();
//     const result = await data.results;
//     displayEmployees(result);
//     employeeData = [...result];
//     console.log(employeeData);
//     return employeeData;
// };


section.addEventListener('click', (evt) => {
    const e = evt.target;
    if (e.className == 'employee-box' || e.parentElement.className == 'employee-box' || e.parentElement.parentElement.className == 'employee-box') {
        const index = e.closest('.employee-box').dataset.index;
        const birthday = employeeData[index].dob.date.slice(0, 10);
        const day = birthday.slice(8, 10);
        const month = birthday.slice(5, 7);
        const year = birthday.slice(0, 4);
        employeeOverlay.innerHTML = `
            <img src="${employeeData[index].picture.large}" alt="${employeeData[index].name.first} profile picture">
            <h3>${employeeData[index].name.first} ${employeeData[index].name.last}</h3>
            <p>${employeeData[index].email}</p>
            <p>${employeeData[index].location.city}</p>
            <div id="extraInfo">
                <p>${employeeData[index].phone}</p>
                <p>${employeeData[index].location.street.number} ${employeeData[index].location.street.name}, ${employeeData[index].location.state} ${employeeData[index].location.postcode}</p>
                <p>Birthday: ${day}/${month}/${year}</p>
            </div>
        `;
        overlay.className = '';
    };
})

document.getElementById('close').addEventListener('click', (evt) => {
    const e = evt.target;
    console.log(e);
    overlay.className = 'hidden';
})


fetchEmployee(url);
console.log(employeeData);