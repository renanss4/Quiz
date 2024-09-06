import { TableItem } from "./TableItem/TableItem.js";

export function Table({ headers = [], rows = [], rowClickHandler = null }) {
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
    // Aqui você deve garantir que cada item em rows é um array
    const rowElement = Array.isArray(row.data)
      ? TableItem(
          row.data,
          rowClickHandler ? () => rowClickHandler(row.id) : null
        )
      : TableItem(row);
    tbodyElement.appendChild(rowElement);
  });

  return table;
}
