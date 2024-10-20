

const buttons = document.querySelectorAll('.date-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    window.onload = function() {
        function checkForMedicines() {
            const medicineItems = document.querySelectorAll('.medicine-item');
            const noMedicineDiv = document.querySelector('.no_medicine');
            if (medicineItems.length === 0) {
                noMedicineDiv.style.display = 'block';
            } else {
                noMedicineDiv.style.display = 'none';
            }

            initializeDateButtons();
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
// window.onload = initializeDateButtons;

    document.getElementById('add_medicine_btn').addEventListener('click', function() {
        let medicineName = prompt("Enter the medicine name:");
    
        if (!medicineName) {
            alert("Medicine name cannot be empty!");
            return;
        }
    
        let consumeTime = '';
        consumeTime += confirm("Will you take this medicine in the Morning?") ? 'Morning,' : '';
        consumeTime += confirm("Will you take this medicine in the Evening?") ? 'Evening,' : '';
        consumeTime += confirm("Will you take this medicine at Night?") ? 'Night,' : '';
    
        if (!consumeTime) {
            alert("You must select at least one time for taking the medicine!");
            return;
        }
    
        consumeTime = consumeTime.slice(0, -1);
    
        let beforeAfterFood = confirm("Should the medicine be taken Before Food?") ? "Before Food" : "After Food";
    
        let newMedicineItem = document.createElement('div');
        newMedicineItem.classList.add('medicine-item');
        
        newMedicineItem.innerHTML = `
            <p class="medicine-name">${medicineName}</p>
            <div class="medicine-details">
                ${consumeTime.split(',').map(time => `<span class="medicine-time">${time}</span>`).join('')}
                <span class="medicine-food">${beforeAfterFood}</span>
            </div>
        `;
    
        document.querySelector('.medicines-list').insertBefore(newMedicineItem, document.querySelector('.add_medicine'));
    
        alert("New medicine added successfully!");
    });
    