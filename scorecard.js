
function DataTableView(parentElement, className, headers, keyName) {
    this.container = document.createElement('table');
    this.container.classList.add(className);


    var headerWrapper = document.createElement('thead');
    var headerRow = document.createElement("tr");

	this.colKeyMap = {};
	this.cols = [];

    var keyHeaderCell = document.createElement("th");
    keyHeaderCell.innerHTML = keyName;
    headerRow.appendChild(keyHeaderCell);
	this.colKeyMap[keyName] = 0;
	this.cols.push(keyHeaderCell)

    for (var i = 0; i < headers.length; i++) {
		var headerText = headers[i];
        var headerCell = document.createElement("th");
        headerCell.innerHTML = headerText;
        headerRow.appendChild(headerCell);
		this.colKeyMap[headerText] = i+1;
		this.cols.push(headerCell);
    }
    headerWrapper.appendChild(headerRow);
    this.container.appendChild(headerWrapper);

    this.tableBody = document.createElement('tbody');

	this.rowKeyMap = {};
	this.rows = [];


    this.container.appendChild(this.tableBody);

    parentElement.appendChild(this.container);
	this.parentElement = parentElement;

}
DataTableView.prototype.createRow = function (key) {
	var newRowElement = document.createElement('tr');
	var newRow = [];
	for(var i = 0; i < this.cols.length; i++) {
		var columnText = this.cols[i];
		var newCellElement = document.createElement('td');
		if(i === 0) {
			newCellElement.innerHTML = key;
		}
		newRowElement.appendChild(newCellElement);
		newRow.push(newCellElement);
	}
	this.tableBody.appendChild(newRowElement);
	var rowIndex = this.rows.length;
	this.rows.push(newRow);
	this.rowKeyMap[key] = rowIndex;
};
DataTableView.prototype.setCell = function (rowKey, colKey, value) {
	var rowIndex = this.rowKeyMap[rowKey];
	var colIndex = this.colKeyMap[colKey];
	this.rows[rowIndex][colIndex].innerHTML = value;
};
DataTableView.prototype.detach = function() {
	this.parentElement.removeChild(this.container)
};
