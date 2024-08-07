export function Optional({ imgSrc = "../../assets/optional.svg", info }) {
  const element = document.createElement("div");
  element.classList.add("optional");

  const img = document.createElement("img");
  img.setAttribute("src", imgSrc);
  element.appendChild(img);

  const span = document.createElement("span");
  span.textContent = info;
  element.appendChild(span);

  return element;
}
