

const buttons = document.querySelectorAll('.date-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    window.onload = function() {
        loadMedicinesFromStorage();
        initializeDateButtons();
        function checkForMedicines() {
            const medicineItems = document.querySelectorAll('.medicine-item');
            const noMedicineDiv = document.querySelector('.no_medicine');
            if (medicineItems.length === 0) {
                noMedicineDiv.style.display = 'block';
            } else {
                noMedicineDiv.style.display = 'none';
            }

            
        }
    
        checkForMedicines();
    };

    // Function to load existing medicines from localStorage and display them
function loadMedicinesFromStorage() {
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    medicines.forEach(medicine => {
        displayMedicineItem(medicine);
    });
}

// Function to display a medicine item
function displayMedicineItem(medicine) {
    let newMedicineItem = document.createElement('div');
    newMedicineItem.classList.add('medicine-item');

    newMedicineItem.innerHTML = `
        <p class="medicine-name">${medicine.medicineName}</p>
        <div class="medicine-details">
            ${medicine.medicineTime.map(time => `<span class="medicine-time">${time}</span>`).join('')}
            <span class="medicine-food">${medicine.beforeFood ? 'Before Food' : 'After Food'}</span>
        </div>
    `;

    document.querySelector('.medicines-list').appendChild(newMedicineItem);
}

// Load medicines from localStorage on page load
// window.onload = loadMedicinesFromStorage;


function formatDate(date) {
    const options = { day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options).toLowerCase();
}

function initializeDateButtons() {
    const dateButtons = document.querySelectorAll('.date-btn');
    const today = new Date();
    dateButtons.forEach((button, index) => {
        const currentDate = new Date();
        // const currentDate = new Date(today);
        // const currentDate = today;
        currentDate.setDate(today.getDate() + index);
        button.innerText = formatDate(currentDate);
    });
}
// window.onload = initializeDateButtons;