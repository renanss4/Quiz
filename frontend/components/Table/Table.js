import { TableItem } from "./TableItem/TableItem.js";

export function Table(headers = [], rows = []) {
  const table = document.createElement("table");
  table.classList.add("table");

  const theadElement = document.createElement("thead");
  const tbodyElement = document.createElement("tbody");

  table.appendChild(theadElement);
  table.appendChild(tbodyElement);

  // Cria o cabeçalho da tabela
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  theadElement.appendChild(headerRow);

  // Cria as linhas da tabela
  rows.forEach((row) => {
    const rowElement = TableItem(row);
    tbodyElement.appendChild(rowElement);
  });

  return table;
}
