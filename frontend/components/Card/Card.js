import { CardItem } from "./CardItem/CardItem.js";
import { Button } from "../Button/Button.js";

export function Card({
  type = "default",
  title = "Suas Tentativas.",
  cardItems = [],
  onClick = null,
  tittleBtn = "Reiniciar",
}) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const stylesByType = {
    default: "card-default",
  };
  const cardClass = stylesByType[type];
  cardElement.classList.add(cardClass);

  cardElement.appendChild(titleElement);

  cardItems.forEach((item) => {
    const cardItem = CardItem(item);
    cardElement.appendChild(cardItem);
  });

  if (!cardItems.length) {
    const emptyElement = document.createElement("p");
    emptyElement.classList.add("empty");
    emptyElement.textContent = "Nenhuma tentativa realizada.";
    cardElement.appendChild(emptyElement);
  }

  if (onClick) {
    const button = Button({
      text: tittleBtn,
      onClick,
    });
    cardElement.appendChild(button);
  }

  return cardElement;
}
