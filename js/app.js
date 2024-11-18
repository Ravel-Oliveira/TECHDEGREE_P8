const url = 'https://randomuser.me/api/?results=12&inc=name,location,email,phone,picture,nat';
const section = document.getElementById('content');
const search = document.getElementById('searchBox');
let employeeData;


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



search.addEventListener('input', () => {
    searchBox()
});

function fetchEmployee(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            employeeData = data.results;
            displayEmployees(employeeData);
        })
};
fetchEmployee(url);