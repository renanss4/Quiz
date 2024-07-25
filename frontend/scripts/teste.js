import { Box } from "../components/Box/Box.js";
import { Button } from "../components/Button/Button.js";
import { Card } from "../components/Card/Card.js";
import { CardItem } from "../components/CardItem/CardItem.js";
import { Dialog } from "../components/Dialog/Dialog.js";
import { Header } from "../components/Header/Header.js";
import { Input } from "../components/Input/Input.js";
import { Optional } from "../components/Optional/Optional.js";
import { Select } from "../components/Select/Select.js";
import { Option } from "../components/Select/Option/Option.js";
import { Sidebar } from "../components/SideBar/Sidebar.js";
import { SidebarItem } from "../components/SideBar/SidebarItem/SidebarItem.js";
import { Table } from "../components/Table/Table.js";
import { TableItem } from "../components/Table/TableItem/TableItem.js";
import { Tag } from "../components/Tag/Tag.js";
import { Toaster } from "../components/Toaster/Toaster.js";

function teste() {
  alert("Você clicou no botão!");
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  const boxTestMain = Box({
    children: [
      // Button({
      //   type: "default",
      //   size: "normal",
      //   imgSrc: "../assets/create.svg",
      //   text: "Teste 1",
      //   onClick: teste,
      // }),
      // Button({
      //   type: "outline",
      //   size: "full",
      //   text: "Teste 2",
      //   onClick: teste,
      // }),
      // Button({
      //   type: "destructive",
      //   size: "mid",
      //   text: "Teste 3",
      //   onClick: teste,
      // }),
      // Button({
      //   type: "destructive-outline",
      //   text: "Teste 4",
      //   onClick: teste,
      // }),
      // Button({
      //   type: "link",
      //   text: "Teste 5",
      //   link: "#",
      // }),
      Toaster({
        iconSrc: "../assets/success.svg",
        type: "success",
        title: "Sucesso!",
        message: "Tal ação foi realizada com sucesso.",
        onClose: teste,
      }),
      Toaster({
        iconSrc: "../assets/warning.svg",
        type: "warning",
        title: "Atenção!",
        message: "Esta é uma mensagem informativa.",
        onClose: teste,
      }),
    ],
  });
  body.appendChild(boxTestMain);
});
