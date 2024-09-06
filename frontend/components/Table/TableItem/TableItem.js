export function TableItem(rowData, onClick = null) {
  const tableRow = document.createElement("tr");

  // Adiciona evento de clique na linha da tabela se a função onClick for passada
  if (onClick) {
    tableRow.style.cursor = "pointer"; // Indicador visual de que a linha é clicável
    tableRow.onclick = onClick;
  }

  if (Array.isArray(rowData)) {
    // Verificação para garantir que rowData seja um array
    rowData.forEach((data) => {
      const tableData = document.createElement("td");
      if (data instanceof HTMLElement) {
        tableData.appendChild(data);
      } else {
        tableData.textContent = data;
      }
      tableRow.appendChild(tableData);
    });
  }

  return tableRow;
}
