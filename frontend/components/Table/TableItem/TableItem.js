export function TableItem(rowData) {
  const tableRow = document.createElement("tr");

  rowData.forEach((data) => {
    const tableData = document.createElement("td");
    if (data instanceof HTMLElement) {
      tableData.appendChild(data);
    } else {
      tableData.textContent = data;
    }
    tableRow.appendChild(tableData);
  });

  return tableRow;
}
