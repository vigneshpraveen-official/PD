

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
        }
    
        checkForMedicines();
    };