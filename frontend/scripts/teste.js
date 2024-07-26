import { Box } from "../components/Box/Box.js";
import { Button } from "../components/Button/Button.js";
import { Card } from "../components/Card/Card.js";
import { CardItem } from "../components/CardItem/CardItem.js";
import { Dialog } from "../components/Dialog/Dialog.js";
import { Header } from "../components/Header/Header.js";
import { Input } from "../components/Input/Input.js";
import { Optional } from "../components/Optional/Optional.js";
import { Select } from "../components/Select/Select.js";
import { Sidebar } from "../components/SideBar/Sidebar.js";
import { SidebarItem } from "../components/SideBar/SidebarItem/SidebarItem.js";
import { Table } from "../components/Table/Table.js";
import { Tag } from "../components/Tag/Tag.js";
import { Toaster } from "../components/Toaster/Toaster.js";

function teste() {
  alert("Você clicou no botão!");
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  const boxTestMain = Box({
    children: [
      Optional({
        text: "Opcional 1",
        info: "Informação 1",
      }),
      Button({
        type: "default",
        size: "normal",
        imgSrc: "../assets/create.svg",
        text: "Teste 1",
        onClick: teste,
      }),
      Button({
        type: "outline",
        size: "full",
        text: "Teste 2",
        onClick: teste,
      }),
      Button({
        type: "destructive",
        size: "mid",
        text: "Teste 3",
        onClick: teste,
      }),
      Button({
        type: "destructive-outline",
        text: "Teste 4",
        onClick: teste,
      }),
      Button({
        type: "link",
        text: "Teste 5",
        link: "#",
      }),
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
      Dialog({
        type: "confirm",
        title: "Teste 1",
        message: "fusyiahdidsioçad",
      }),
      Dialog({
        type: "alert",
        title: "Teste 2",
        message: "fusyiahdidsioçad",
      }),
      Dialog({
        type: "toaster",
        title: "Teste 3",
        message: "fusyiahdidsioçad",
      }),
      Header({
        title: "Título",
        subtitle: "Subtítulo",
      }),
      Header({
        title: "Título",
        subtitle: "Subtítulo",
        btnBack: true,
        linkBack: "#",
      }),
      Tag({
        text: "Tag 1",
      }),
      Tag({
        text: "Tag 2",
      }),
      Table({
        headers: ["Nome", "Idade", "Sexo", "Tags", "Ações"],
        rows: [
          [
            "João",
            20,
            "Masculino",
            Tag({ text: "Tag 1" }),
            Button({ type: "link", text: "Editar", link: "#" }),
            Button({ type: "link", text: "Excluir", link: "#" }),
          ],
          [
            "Maria",
            25,
            "Feminino",
            Tag({ text: "Tag 4" }),
            Button({ type: "link", text: "Editar", link: "#" }),
            Button({ type: "link", text: "Excluir", link: "#" }),
          ],
        ],
      }),
      Input({
        type: "text",
        label: "Nome",
        placeholder: "Digite seu nome",
        name: "name",
      }),
      Input({
        type: "password",
        label: "Senha",
        placeholder: "Digite sua senha",
        name: "password",
      }),
      Input({
        type: "email",
        label: "Email",
        placeholder: "Digite seu email",
        name: "email",
      }),
      Select({
        id: "select",
        name: "select",
        required: true,
        options: [
          { value: "1", label: "Opção 1" },
          { value: "2", label: "Opção 2" },
          { value: "3", label: "Opção 3" },
        ],
        value: "2",
      }),
    ],
  });
  body.appendChild(boxTestMain);
});
