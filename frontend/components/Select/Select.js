import { Option } from "./Option/Option.js";

export function Select({
  id,
  name,
  required = false,
  options = [],
  value,
  placeholder = "Selecione uma opção",
  onChange = () => {},
}) {
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

    // console.log(optionConfig);
    // console.log(option);
    select.appendChild(option);
  });

  // Adiciona o evento onChange
  select.addEventListener("change", onChange);

  // Adiciona a classe de estilo
  select.classList.add("select");

  // Retorna o elemento select
  return select;
}
