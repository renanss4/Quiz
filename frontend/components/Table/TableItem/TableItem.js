export function TableItem(rowData) {
  const tableRow = document.createElement("tr");

  rowData.forEach((data) => {
    const tableData = document.createElement("td");
    tableData.textContent = data;
    tableRow.appendChild(tableData);
  });

  return tableRow;
}
