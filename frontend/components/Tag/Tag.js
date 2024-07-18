export function Tag({ value, text }) {
  // Cria o elemento span
  const tag = document.createElement("span");

  // Define o texto da tag
  tag.textContent = text;

  // Define a classe de estilo
  tag.classList.add("tag");

  // Adiciona a propriedade value
  tag.setAttribute("value", value);

  return tag;
}
