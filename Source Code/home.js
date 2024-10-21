

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

    document.querySelector('.medicines-list').appendChild(newMedicineItem);
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

window.onload = function() {
    loadMedicinesFromStorage();
    initializeDateButtons();
    checkForMedicines();
};
