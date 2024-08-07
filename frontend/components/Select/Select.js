import { Option } from "./Option/Option.js";

export function Select({
  id,
  name,
  required = false,
  options = [],
  value,
  placeholder = "Selecione uma opção",
  onChange = () => {},
  label = ""
}) {
  // Cria o container para o select e o label
  const container = document.createElement("div");
  container.classList.add("select-container");

  // Cria o elemento select
  const select = document.createElement("select");

  // Define o id
  select.id = id;

  // Define o name
  select.name = name;

  // Define se é obrigatório
  select.required = required;

  // Adiciona a opção de placeholder
  if (placeholder) {
    const placeholderOption = Option({
      value: "",
      text: placeholder,
      disabled: true,
      selected: !value,
    });
    select.appendChild(placeholderOption);
  }

  // Adiciona as opções
  options.forEach((optionConfig) => {
    const option = Option({
      value: optionConfig.value,
      text: optionConfig.label,
      selected: optionConfig.value === value,
      disabled: optionConfig.value === "",
    });
    select.appendChild(option);
  });

  // Adiciona o evento onChange
  select.addEventListener("change", onChange);

  // Adiciona a classe de estilo
  select.classList.add("select");

  // Define o label
  if (label) {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", select.id);
    labelElement.textContent = label;
    labelElement.classList.add("select-label");
    container.appendChild(labelElement);
  }

  // Adiciona o select ao container
  container.appendChild(select);

  // Retorna o container
  return container;
}
