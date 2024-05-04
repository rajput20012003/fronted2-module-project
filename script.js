// Fetch student data from the provided URL
async function fetchStudentData() {
    const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
    const data = await response.json();
    return data;
}
  
// Function to populate the table with student data
function populateTable(data) {
    const tableBody = document.querySelector('.table-body');
    const secondTableBody = document.querySelector('.second-table-body');
    tableBody.innerHTML = '';
    secondTableBody.innerHTML = '';
  
    data.forEach((student, index) => {
        const row = `
            <tr>
                <td class="text-center">${index + 1}</td>
                <td>
                    
                    ${student.first_name} ${student.last_name}
                </td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
            </tr>
        `;
        if (student.gender === 'female') {
            secondTableBody.innerHTML += row;
        } else {
            tableBody.innerHTML += row;
        }
    });
}
  
// Function to filter data based on search query
function filterData(data, query) {
    query = query.toLowerCase();
    return data.filter(student => {
        return (
            student.first_name.toLowerCase().includes(query) ||
            student.last_name.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    });
}
  
// Function to sort data by full name in ascending order (A-Z)
function sortByNameAsc(data) {
    return data.sort((a, b) => {
        const nameA = a.first_name + a.last_name;
        const nameB = b.first_name + b.last_name;
        return nameA.localeCompare(nameB);
    });
}
  
// Function to sort data by full name in descending order (Z-A)
function sortByNameDesc(data) {
    return sortByNameAsc(data).reverse();
}
  
// Function to sort data by marks in ascending order
function sortByMarksAsc(data) {
    return data.sort((a, b) => a.marks - b.marks);
}
  
// Function to sort data by passing status
function sortByPassing(data) {
    return data.filter(student => student.passing);
}
  
// Function to sort data by class in ascending order
function sortByClassAsc(data) {
    return data.sort((a, b) => a.class - b.class);
}
  
// Function to handle search button click
function handleSearchButtonClick(data) {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    const filteredData = filterData(data, query);
    populateTable(filteredData);
}
  
// Function to handle sort button click
function handleSortButtonClick(data, criterion) {
    let sortedData;
    switch (criterion) {
        case 'a-z':
            sortedData = sortByNameAsc(data);
            break;
        case 'z-a':
            sortedData = sortByNameDesc(data);
            break;
        case 'marks':
            sortedData = sortByMarksAsc(data);
            break;
        case 'passing':
            sortedData = sortByPassing(data);
            break;
        case 'class':
            sortedData = sortByClassAsc(data);
            break;
        case 'gender':
            
        default:
            sortedData = data;
    }
    populateTable(sortedData);
}
  
// Initialize the page
async function initialize() {
    const data = await fetchStudentData();
    populateTable(data);
  
    const searchButton = document.querySelector('.search-btn');
    searchButton.addEventListener('click', () => handleSearchButtonClick(data));
  
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => handleSortButtonClick(data, button.id));
    });
}
  
// Call initialize function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initialize);
