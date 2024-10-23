function checkForReports() {
    const reportItems = document.querySelectorAll('.report-item');
    const noReportDiv = document.querySelector('.no_report');
    if (reportItems.length === 0) {
        noReportDiv.style.display = 'block';
    } else {
        noReportDiv.style.display = 'none';
    }
}

function loadReportsFromStorage() {
    let reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.forEach((report, index) => {
        displayReportItem(report, index);
    });
    checkForReports();
}

function displayReportItem(report, index) {
    let newReportItem = document.createElement('div');
    newReportItem.classList.add('report-item');

    newReportItem.innerHTML = `
        <p><strong>${report.doctor}</strong> from <strong>${report.hospital}</strong></p>
        <p>Issue: ${report.issue}</p>
        <button class="remove-report" data-index="${index}">Remove</button>
        <div class="report-time">
            <a href="medicines.html"> <img src="icons/pill.png" alt="Medicine Icon"> </a>
            <span>${report.date}, ${report.time}</span>
        </div>
    `;

    document.querySelector('.report-list').insertBefore(newReportItem, document.querySelector('.add_report'));
    newReportItem.querySelector('.remove-report').addEventListener('click', function() {
        removeReport(index);
    });
}

function removeReport(index) {
    let reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(reports));
    document.querySelector('.report-list').innerHTML = ''; // Clear the list
    loadReportsFromStorage(); // Reload the updated list
}

// Event listener for the "Add Report" button
document.getElementById('add_report_btn').addEventListener('click', function() {
    let newReportItemForm = document.createElement('div');
    newReportItemForm.classList.add('report-item'); // Use same class as the existing report items

    // Form fields to input details
    newReportItemForm.innerHTML = `
        <input id="doctorName" class="report-doctor" type="text" name="doctorName" placeholder="Doctor Name">
        <input id="hospitalName" class="report-hospital" type="text" name="hospitalName" placeholder="Hospital Name">
        <input id="issueName" class="report-issue" type="text" name="issueName" placeholder="Issue">
        <div class="report-time">
            <label for="reportDate">Date:</label>
            <input id="reportDate" type="date">
            <label for="reportTime">Time:</label>
            <input id="reportTime" type="time">
        </div>
        <button id="newReportItemForm_submit" class="newReportItemForm_submit">Submit</button>
    `;

    document.querySelector('.report-list').insertBefore(newReportItemForm, document.querySelector('.add_report'));
    document.getElementById('newReportItemForm_submit').addEventListener('click', function() {
        let doctor = document.getElementById('doctorName').value;
        let hospital = document.getElementById('hospitalName').value;
        let issue = document.getElementById('issueName').value;
        let date = document.getElementById('reportDate').value;
        let time = document.getElementById('reportTime').value;

        // Store the new report details in an object
        let report = {
            doctor,
            hospital,
            issue,
            date,
            time
        };

        // Get the existing reports from localStorage and add the new one
        let reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.push(report);
        localStorage.setItem('reports', JSON.stringify(reports));

        // Display the new report item
        displayReportItem(report, reports.length - 1);
        checkForReports(); // Check whether there are reports to hide the 'no_report' message
        newReportItemForm.remove(); // Remove the form after submission
    });
});

// Load the stored reports and check on window load
window.onload = function() {
    loadReportsFromStorage();
    checkForReports();
};
