function calculateTotalEmployees() {
  // Get all superior rows that represent individual employees
  const individualEmployees = document.querySelectorAll('.superior-row');

  // Get the element with id "total" where the total number of employees will be displayed
  const totalElement = document.getElementById('total');

  // Set the content of the "total" element to the calculated total
  totalElement.textContent = individualEmployees.length;
}

// Call the calculateTotalEmployees function to calculate the initial total on page load
document.addEventListener('DOMContentLoaded', () => {
  calculateTotalEmployees();
});
  
document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.querySelector('.dashboard');
    const mainContent = document.querySelector('.main-content');
    const logo = document.querySelector('.header img');
  
    logo.addEventListener('click', function() {
      dashboard.classList.toggle('active');
      mainContent.classList.toggle('active');
    });  
});

function searchEmployees() {
  const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
  const superiorRows = document.querySelectorAll('.superior-row');

  if (searchInput === '') {
    resetTable();
    // If the search input is empty, reset the table to its original state
  } else {
    superiorRows.forEach((superiorRow) => {
      const superiorName = superiorRow.querySelector('td:nth-child(2)').innerText.trim().toLowerCase();
      const superiorPosition = superiorRow.querySelector('td:nth-child(3)').innerText.trim().toLowerCase();
      const superiorMname = superiorRow.querySelector('td:nth-child(4)').innerText.trim().toLowerCase();
      const superiorDepartment = superiorRow.querySelector('td:nth-child(5)').innerText.trim().toLowerCase();
      const superiorEmail = superiorRow.querySelector('td:nth-child(6)').innerText.trim().toLowerCase();
      const superiorNumber = superiorRow.querySelector('td:nth-child(7)').innerText.trim().toLowerCase();
      const superiorGender = superiorRow.querySelector('td:nth-child(8)').innerText.trim().toLowerCase();
      const superiorSupName = superiorRow.querySelector('td:nth-child(9)').innerText.trim().toLowerCase();

      const subordinateRow = getNextValidSubordinateRow(superiorRow);
      const subordinateCells = subordinateRow ? subordinateRow.querySelectorAll('td') : null;

      // Check if the search input is found in any cell of the superior row
      const foundInSuperior =
        superiorName.includes(searchInput) ||
        superiorPosition.includes(searchInput) ||
        superiorMname.includes(searchInput) ||
        superiorDepartment.includes(searchInput) ||
        superiorEmail.includes(searchInput) ||
        superiorNumber.includes(searchInput) ||
        superiorSupName.includes(searchInput) ||
        superiorGender === searchInput ;

      // Check if the search input is found in any cell of the subordinate row
      let foundInSubordinate = false;
      if (subordinateCells) {
        subordinateCells.forEach((cell) => {
          const cellContent = cell.innerText.trim().toLowerCase();
          if (cellContent.includes(searchInput)) {
            foundInSubordinate = true;
          }
        });
      }

      // Show or hide the rows based on the search input
      if (foundInSuperior || foundInSubordinate) {
        // For superior row
        superiorRow.style.display = 'table-row';
        if (subordinateRow) subordinateRow.style.display = 'table-row';

        // If there is a subordinate table, show it
        if (subordinateRow) {
          subordinateRow.classList.remove('hide');
          subordinateRow.style.display = 'table-row';
        }

        // Add the "hide" class to the non-matching rows
        superiorRow.classList.toggle('hide', !foundInSuperior);
        if (subordinateRow) {
          subordinateRow.classList.toggle('hide', !foundInSubordinate);
        }
      } else {
        // Hide the rows if not found
        superiorRow.style.display = 'none';
        if (subordinateRow) subordinateRow.style.display = 'none';

        // Hide the subordinate table
        if (subordinateRow) {
          subordinateRow.classList.add('hide');
          subordinateRow.style.display = 'none';
        }
      }
    });
  }
}


// Helper function to get the next valid subordinate row
function getNextValidSubordinateRow(superiorRow) {
  let nextRow = superiorRow.nextElementSibling;
  while (nextRow && !nextRow.classList.contains('subordinate-row')) {
    nextRow = nextRow.nextElementSibling;
  }
  return nextRow;
}

// Helper function to check if subordinate table contains the search input
function subordinateTableContainsInput(subordinateTable, searchInput) {
  if (!subordinateTable) return false;
  const tableContent = subordinateTable.innerText.trim().toLowerCase();
  return tableContent.includes(searchInput);
}

function resetTable() {
  const superiorRows = document.querySelectorAll('.superior-row');
  const subordinateRows = document.querySelectorAll('.subordinate-row');

  // Show all superior rows and remove the 'expanded' class from them
  superiorRows.forEach((superiorRow) => {
    superiorRow.style.display = 'table-row';
    superiorRow.classList.add('expanded');
    superiorRow.classList.remove('active');
    superiorRow.classList.remove('hide'); // Show all superior rows
  });

  // Hide all subordinate rows and add the 'collapsed' class to them
  subordinateRows.forEach((subordinateRow) => {
    subordinateRow.style.display = 'none';
    subordinateRow.classList.add('collapsed');
    subordinateRow.classList.remove('hide'); // Show all superior rows
  });

  // Clear the search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
  }
}

// Add event listener to the search input to call the searchEmployees function
document.getElementById('search-input').addEventListener('input', searchEmployees);

// Use DOMContentLoaded event to ensure the searchEmployees function runs after the HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Call searchEmployees function to handle initial hiding and show only matched rows on page load
  searchEmployees();
});

function addUpArrowIcons() {
  // Get all superior rows with subordinates
  const superiorRows = document.querySelectorAll('.superior-row');

  // Loop through each superior row
  superiorRows.forEach(superiorRow => {
    // Find the Employee ID element
    const employeeIDElement = superiorRow.querySelector('td');

    // Check if the row has subordinates
    const hasSubordinates = superiorRow.dataset.hasSubordinates === 'true';

    // Check if the Employee ID already has an up arrow icon
    if (!employeeIDElement.querySelector('.icon-arrow')) {
      // Create the up arrow icon element
      const upArrowIcon = document.createElement('span');
      upArrowIcon.className = 'icon-arrow';
      upArrowIcon.textContent = hasSubordinates ? '\u2191' : ''; // Unicode character for the up arrow

      // Add the up arrow icon next to the Employee ID
      employeeIDElement.appendChild(upArrowIcon);
    }

    // Set the cursor to "default" if no subordinates, otherwise "pointer"
    superiorRow.style.cursor = hasSubordinates ? 'pointer' : 'default';

    // Add the class "no-arrow-cursor" to rows without subordinates
    if (!hasSubordinates) {
      superiorRow.classList.add('no-arrow-cursor');
    } else {
      // Add the class "has-arrow" to rows with arrows
      superiorRow.classList.add('has-arrow');
    }

    // Add click event listener to toggle the active class and subordinate rows
    superiorRow.addEventListener('click', () => {
      superiorRow.classList.toggle('active');

      // Find the corresponding "subordinate-row"
      const subordinateRow = superiorRow.nextElementSibling;

      // Toggle the display of the "subordinate-row" element
      if (subordinateRow) {
        subordinateRow.style.display = subordinateRow.style.display === 'table-row' ? 'none' : 'table-row';
      }
    });
  });
}

// Call the function to add up arrow icons and set cursor
addUpArrowIcons();


// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');
const employee_table = document.querySelector('#table');

const toPDF = function (employee_table) {
    const html_code = `
    <link rel="stylesheet" href="style.css">
    <main class="table" >${employee_table.innerHTML}</main>
    `;

    const new_window = window.open();
    new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
}

pdf_btn.onclick = () => {
    toPDF(employee_table);
}

// 4. Converting HTML table to JSON

function convertToJSON() {
  // Clone the table to a new temporary table to remove the arrow icons
  const tempTable = employee_table.cloneNode(true);

  // Remove the arrow icons from the temporary table
  const arrowIcons = tempTable.querySelectorAll('.icon-arrow');
  arrowIcons.forEach(icon => icon.remove());

  const superiorRows = tempTable.querySelectorAll('.superior-row');

  const employeesData = [];

  superiorRows.forEach((superiorRow) => {
    const empID = superiorRow.querySelector('td:first-child').innerText;
    const subordinates = superiorRow.nextElementSibling;
    const subIDs = [];

    if (subordinates && subordinates.classList.contains('subordinate-row')) {
      const subRows = subordinates.querySelectorAll('.superior-row');
      subRows.forEach((subRow) => {
        const subID = subRow.querySelector('td:first-child').innerText;
        subIDs.push(subID);
      });
    }

    const fullName = superiorRow.querySelector('td:nth-child(2)').innerText;
    const position = superiorRow.querySelector('td:nth-child(3)').innerText;
    const department = superiorRow.querySelector('td:nth-child(5)').innerText;
    const email = superiorRow.querySelector('td:nth-child(6) a').getAttribute('href').replace('mailto:', '');
    const phoneNumber = superiorRow.querySelector('td:nth-child(7) strong').innerText;
    const gender = superiorRow.querySelector('td:nth-child(8)').innerText.trim();

    const employee = {
      EMPID: empID,
      subID: subIDs,
      FullName: fullName,
      Position: position,
      Department: department,
      Email: email,
      PhoneNumber: phoneNumber,
      Gender: gender,
    };

    employeesData.push(employee);
  });

  return JSON.stringify(employeesData, null, 2);
}

function downloadFile(data, format, filename) {
  const blob = new Blob([data], { type: `text/${format}` });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  a.click();
  window.URL.revokeObjectURL(url);
}

const json_btn = document.getElementById('toJSON');

json_btn.onclick = () => {
  const jsonData = convertToJSON();
  downloadFile(jsonData, 'json', 'Employees');
};


// 5. Converting HTML table to CSV File
function toCSV(table) {
  // Clone the table to a new temporary table to remove the arrow icons
  const tempTable = table.cloneNode(true);

  // Remove the arrow icons from the temporary table
  const arrowIcons = tempTable.querySelectorAll('.icon-arrow');
  arrowIcons.forEach(icon => icon.remove());

  const superiorRows = tempTable.querySelectorAll('.superior-row');
  const headers = ['Emp#ID', 'Full Name', 'Position', 'Department', 'Email', 'Phone Number', 'Gender', 'subID'];

  const data = [];

  superiorRows.forEach(superiorRow => {
    const empID = superiorRow.querySelector('td:first-child').innerText;
    const subordinates = superiorRow.nextElementSibling;
    const subIDs = [];

    if (subordinates && subordinates.classList.contains('subordinate-row')) {
      const subRows = subordinates.querySelectorAll('.superior-row');
      subRows.forEach(subRow => {
        const subID = subRow.querySelector('td:first-child').innerText;
        subIDs.push(subID);
      });
    }

    const fullName = superiorRow.querySelector('td:nth-child(2)').innerText;
    const position = superiorRow.querySelector('td:nth-child(3)').innerText;
    const department = superiorRow.querySelector('td:nth-child(5)').innerText;
    const email = superiorRow.querySelector('td:nth-child(6) a').getAttribute('href').replace('mailto:', '');
    const phoneNumber = superiorRow.querySelector('td:nth-child(7) strong').innerText;
    const gender = superiorRow.querySelector('td:nth-child(8)').innerText.trim();

    // Wrap subIDs in double quotes to preserve structure
    const subIDsString = subIDs.length > 0 ? `"${subIDs.join(', ')}"` : '';

    data.push([empID, fullName, position, department, email, phoneNumber, gender, subIDsString]);
  });

  const csvContent = [headers.join(','), ...data.map(row => row.join(','))].join('\n');
  return csvContent;
}

function downloadFile(data, format, filename) {
  const blob = new Blob([data], { type: `text/${format}` });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  a.click();
  window.URL.revokeObjectURL(url);
}

const csv_btn = document.getElementById('toCSV');

csv_btn.onclick = () => {
  const csvData = toCSV(employee_table);
  downloadFile(csvData, 'csv', 'Employees');
};

function addManagerNames() {
  const superiorRows = document.querySelectorAll('.superior-row');

  superiorRows.forEach((superiorRow) => {
    const superiorName = superiorRow.querySelector('td:nth-child(2)').innerText.trim();
    const managerColumn = superiorRow.querySelector('td:nth-child(4)');

    // If the "Manager" column is empty (null or an empty string), set it to "Manager"
    if (!managerColumn.innerText.trim()) {
      managerColumn.innerText = "Manager";
    }

    const subordinates = superiorRow.nextElementSibling;

    if (subordinates && subordinates.classList.contains('subordinate-row')) {
      const subordinateRows = subordinates.querySelectorAll('.superior-row');

      subordinateRows.forEach((subordinateRow) => {
        const subordinateManagerColumn = subordinateRow.querySelector('td:nth-child(4)');

        // If the subordinate has a superior, update the "Manager" column with the superior's name
        subordinateManagerColumn.innerText = superiorName !== "Manager" ? superiorName : "Manager";

        // Add a click event listener to the "Manager" column
        subordinateManagerColumn.addEventListener('click', () => {
          // Get the manager name to search for
          const managerName = subordinateManagerColumn.innerText.trim();

          // Perform the search for the manager's name
          searchEmployees(managerName);
        });
      });
    }
    // Add a click event listener to the "Manager" column in the superior row
    managerColumn.addEventListener('click', () => {
      // Get the manager name to search for
      const managerName = managerColumn.innerText.trim();

      // Fill the search input with the manager's name
      document.getElementById('search-input').value = managerName;

      // Perform the search for the manager's name
      searchEmployees(managerName);
      if (managerName === "Boss") {
        // If the highest manager is clicked, reset the search input
        addManagerNames(resetTable());
      }
    });
  });
}

// Call the function to add manager names to subordinate rows
addManagerNames();


function populateSuperiorNames() {
  const tableRows = document.querySelectorAll('.table__body tr');

  function findSupervisors(row, supervisors = []) {
    const dataIndex = row.getAttribute('data-index');
    if (!dataIndex) return supervisors; // Stop if data-index is missing

    const supervisorName = row.querySelector('td:nth-child(2)').textContent;
    supervisors.unshift(supervisorName);

    const parentIndex = dataIndex.split(',').slice(0, -1).join(',');
    const parentRow = document.querySelector(`tr[data-index="${parentIndex}"]`);

    if (!parentRow) return supervisors; // Stop if the parent row is not found

    return findSupervisors(parentRow, supervisors);
  }

  for (const row of tableRows) {
    const supervisors = findSupervisors(row);
    if (supervisors.length > 1) {
      const superiorNamesCell = row.querySelector('.superior-names');
      if (superiorNamesCell) {
        superiorNamesCell.textContent = supervisors.join(' , ');
      }
    }
  }
}

// Call the function to populate the superior-names column with the supervisors for each subordinate row
populateSuperiorNames();