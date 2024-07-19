import { CardItem } from "../CardItem/CardItem.js";
import { Button } from "../Button/Button.js";

export function Card({
  type = "empty",
  title = "Suas Tentativas.",
  cardItems = [],
}) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const titleCard = document.createElement("h2");
  titleCard.textContent = title;
  cardElement.appendChild(titleCard);

  const stylesByType = {
    empty: "card-empty",
    attempts: "card-attempts",
    answers: "card-answers",
    template: "card-template",
  };

  const cardClass = stylesByType[type];
  cardElement.classList.add(cardClass);

  if (type === "empty") {
    const p = document.createElement("p");
    p.textContent = "Você não possui nenhuma tentativa.";
    cardElement.appendChild(p);
  } else {
    cardItems.forEach((item) => {
      const cardItem = CardItem(item);
      cardElement.appendChild(cardItem);
    });

    if (type === "answers") {
      const finishButton = Button({
        type: "default",
        text: "Finalizar",
        onClick: () => {
          console.log("Finalizar");
        },
      });
      cardElement.appendChild(finishButton);
    } else if (type === "template") {
      const retakeButton = Button({
        type: "outline",
        text: "Refazer",
        onClick: () => {
          console.log("Refazer");
        },
      });
      cardElement.appendChild(retakeButton);
    }
  }

  return cardElement;
}
