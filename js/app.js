const url = 'https://randomuser.me/api/?results=12&inc=name,location,email,phone,picture,nat';
const section = document.getElementById('content');
let employeeData;


function displayEmployees(data) {
    data.map((employee, index) => {
        const card = document.createElement('div');
        card.className = 'employee-box';
        card.setAttribute('data-index', index);
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


function fetchEmployee(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            employeeData = data.results;
            // console.log(employeeData);
            displayEmployees(employeeData);
        })
};

fetchEmployee(url);
