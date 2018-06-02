// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredDataset to addressData initially
var filteredDataset = dataSet;

//Pagination variables
var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 50;
var numberOfPages = 1;

// Get the number of pages
function getNumberOfPages() {
  return Math.ceil(filteredDataset.length / numberPerPage);
}


// renderTable renders the filteredDataset to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  numberOfPages = getNumberOfPages();

  for (var i = 0; i < filteredDataset.length; i++) {
    // Get get the current address object and its fields
    var uforecord = filteredDataset[i];
    var fields = Object.keys(uforecord);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = uforecord[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterdate = $dateInput.value.trim();

  // Set filteredDataset to an array of all addresses whose "state" matches the filter
  filteredDataset = dataSet.filter(function(uforecord) {
    var uforecorddate = uforecord.datetime;

    // If true, add the address to the filteredDataset, otherwise don't add it to filteredDataset
    return uforecorddate === filterdate;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
