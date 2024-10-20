

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