

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

function loadMedicinesFromStorage() {
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    medicines.forEach(medicine => {
        displayMedicineItem(medicine);
    });
}

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

    document.querySelector('.medicines-list').insertBefore(newMedicineItem, document.querySelector('.add_medicine'));
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
        displayMedicineItem(medicine);
        newMedicineItemForm.remove();
    });
});


    