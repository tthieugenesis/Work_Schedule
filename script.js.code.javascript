document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('schedule-grid');
    const employeeFilter = document.getElementById('employee-filter');
    const shiftFilter = document.getElementById('shift-filter');
    let allData = [];
    let allEmployees = [];

    async function loadData() {
        const response = await fetch('data.csv');
        const csvText = await response.text();
        
        // Parse CSV to JSON
        const lines = csvText.trim().split('\\n');
        const headers = lines[0].split(',').map(h => h.trim());
        allData = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            let entry = {};
            headers.forEach((header, i) => {
                entry[header] = values[i];
            });
            return entry;
        });

        populateFilters();
        renderGrid();
    }

    function populateFilters() {
        const employees = [...new Set(allData.map(item => item['Nhân viên']))].sort();
        allEmployees = employees;
        employees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp;
            option.textContent = emp;
            employeeFilter.appendChild(option);
        });
    }

    function renderGrid() {
        const selectedEmployee = employeeFilter.value;
        const selectedShift = shiftFilter.value;

        const filteredData = allData.filter(item => 
            (selectedEmployee === 'all' || item['Nhân viên'] === selectedEmployee) &&
            (selectedShift === 'all' || item['Ca làm việc'] === selectedShift)
        );

        const dates = [...new Set(filteredData.map(item => item['Ngày']))].sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')));
        const employees = selectedEmployee === 'all' ? allEmployees : [selectedEmployee];

        gridContainer.innerHTML = ''; // Clear previous grid
        gridContainer.style.gridTemplateColumns = `120px repeat(${employees.length}, 1fr)`;

        // Create headers
        gridContainer.appendChild(createCell('Ngày / Nhân viên', 'header-cell'));
        employees.forEach(emp => gridContainer.appendChild(createCell(emp, 'header-cell')));

        // Create rows
        dates.forEach(date => {
            gridContainer.appendChild(createCell(date, 'header-cell')); // Date header
            employees.forEach(emp => {
                const shiftEntry = filteredData.find(d => d['Ngày'] === date && d['Nhân viên'] === emp);
                const shiftText = shiftEntry ? shiftEntry['Ca làm việc'] : '';
                const cell = createCell(shiftText, 'grid-cell');
                if (shiftText) {
                    cell.classList.add(`shift-${shiftText.toLowerCase()}`);
                }
                gridContainer.appendChild(cell);
            });
        });
    }

    function createCell(text, className) {
        const cell = document.createElement('div');
        cell.className = className;
        cell.textContent = text;
        return cell;
    }

    employeeFilter.addEventListener('change', renderGrid);
    shiftFilter.addEventListener('change', renderGrid);

    loadData();
});