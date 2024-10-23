
const dateBtns = document.querySelectorAll('.date-navigation .date-btn');

let currentDate = new Date();
function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day < 10 ? '0' + day : day} ${month}`;
}
dateBtns.forEach((btn, index) => {
    let btnDate = new Date(currentDate);
    btnDate.setDate(currentDate.getDate() + index);
    btn.textContent = formatDate(btnDate);
});


const buttons = document.querySelectorAll('.date-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });


    
function checkForMedicines() {
    const medicineItems = document.querySelectorAll('.medicine-item');
    const noMedicineDiv = document.querySelector('.no_medicine');
    if (medicineItems.length === 0) {
        noMedicineDiv.style.display = 'block';
    } else {
        noMedicineDiv.style.display = 'none';
    }
}

function loadMedicinesFromStorage() {
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    medicines.forEach((medicine, index) => {
        displayMedicineItem(medicine, index);
    });
    checkForMedicines();
}

function displayMedicineItem(medicine, index) {
    let newMedicineItem = document.createElement('div');
    newMedicineItem.classList.add('medicine-item');

    newMedicineItem.innerHTML = `
        <p class="medicine-name">${medicine.medicineName}</p>
        <button class="remove-medicine" data-index="${index}">Remove</button>
        <div class="medicine-details">
            ${medicine.medicineTime.map(time => `<span class="medicine-time">${time}</span>`).join('')}
            <span class="medicine-food">${medicine.beforeFood ? 'Before Food' : 'After Food'}</span>
        </div>
    `;
    document.querySelector('.medicines-list').insertBefore(newMedicineItem, document.querySelector('.add_medicine'));
    newMedicineItem.querySelector('.remove-medicine').addEventListener('click', function() {
        removeMedicine(index);
    });
}

function removeMedicine(index) {
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    medicines.splice(index, 1);
    localStorage.setItem('medicines', JSON.stringify(medicines));
    document.querySelector('.medicines-list').innerHTML = '';
    loadMedicinesFromStorage();
}

document.getElementById('add_medicine_btn').addEventListener('click', function() {
    let newMedicineItemForm = document.createElement('div');
    newMedicineItemForm.classList.add('medicine-item');
    newMedicineItemForm.innerHTML = `
        <input id="medicineName" class="medicine-name" type="text" name="medicineName" placeholder="Medicine Name">
        <div class="medicine-details">
            <span class="medicine-time">    
                <p>Check the boxes for the time</p>
                <label for="morning"> Morning</label>
                <input type="checkbox" id="morning" name="morning" value="morning">
                
                <label for="evening"> Evening</label>
                <input type="checkbox" id="evening" name="evening" value="evening">
                
                <label for="night"> Night</label>
                <input type="checkbox" id="night" name="night" value="night">
            </span>
            
            <span class="medicine-food">
                <label for="beforeFood"> Before Food?</label>
                <input type="checkbox" id="beforeFood" name="beforeFood" value="beforeFood"><br>
                <button id="newMedicineItemForm_submit" class="newMedicineItemForm_submit">Submit</button>
            </span>
        </div>
    `;

    document.querySelector('.medicines-list').insertBefore(newMedicineItemForm, document.querySelector('.add_medicine'));
    document.getElementById('newMedicineItemForm_submit').addEventListener('click', function() {
        let medicineName = document.getElementById('medicineName').value;
        let medicineTime = [];
        if (document.getElementById('morning').checked) medicineTime.push('Morning');
        if (document.getElementById('evening').checked) medicineTime.push('Evening');
        if (document.getElementById('night').checked) medicineTime.push('Night');
        let beforeFood = document.getElementById('beforeFood').checked;
        let medicine = {
            medicineName,
            medicineTime,
            beforeFood
        };
        let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
        medicines.push(medicine);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        displayMedicineItem(medicine, medicines.length - 1);
        checkForMedicines();
        newMedicineItemForm.remove();
    });
});

window.onload = function() {
    loadMedicinesFromStorage();
    initializeDateButtons();
    checkForMedicines();
};
