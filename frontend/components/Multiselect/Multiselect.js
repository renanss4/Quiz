export function Multiselect({
  options = [],
  selectedOptions = [],
  onChange,
  nome = "",
}) {
  // Cria o container para o multiselect
  const multiselect = document.createElement("div");
  multiselect.classList.add("multiselect-container");

  // Adiciona o label se o nome for fornecido
  if (nome) {
    const labelElement = document.createElement("label");
    labelElement.textContent = nome;
    labelElement.classList.add("multiselect-label");
    multiselect.appendChild(labelElement);
  }

  // Cria os checkboxes
  options.forEach((option) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = option.value;
    checkbox.id = option.value;
    checkbox.checked = selectedOptions.includes(option.value);
    checkbox.addEventListener("change", () => {
      const selectedValues = Array.from(
        multiselect.querySelectorAll("input[type=checkbox]:checked")
      ).map((checkbox) => checkbox.value);
      onChange(selectedValues);
    });

    const label = document.createElement("label");
    label.textContent = option.label;
    label.setAttribute("for", option.value);

    const div = document.createElement("div");
    div.classList.add("multiselect-option");

    div.appendChild(checkbox);
    div.appendChild(label);

    // Adiciona o checkbox e seu label ao multiselect
    multiselect.appendChild(div);
    // multiselect.appendChild(label);
  });

  return multiselect;
}
