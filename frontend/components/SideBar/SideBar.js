import { SidebarItem } from "./SidebarItem/SidebarItem.js";

export function Sidebar({ itens = [] }) {
  const nav = document.createElement("nav");
  nav.classList.add("sidebar");

  const menu = document.createElement("ul");
  menu.classList.add("menu");

  // Adiciona o logo (header)
  const logo = SidebarItem({
    iconSrc: "../assets/logo1.svg",
    link: "#",
    local: "header",
  });
  logo.classList.add("logo");
  // console.log(logo);
  //   const header = document.createElement("div");
  //   header.classList.add("header");
  //   const headerItens = [
  //     { iconSrc: "../assets/logo1.svg", link: "#" },
  //     { iconSrc: "../assets/logo2.svg", link: "#" },
  //   ];

  //   headerItens.forEach((item) => {
  //     const li = document.createElement("li");
  //     const sidebarItem = SideBarItem({ ...item, local: "header" });
  //     li.appendChild(sidebarItem);
  //     header.appendChild(li);
  //   });

  // Adiciona os itens principais (main)

  // main
  const main = document.createElement("div");
  main.classList.add("main");
  itens.forEach((item) => {
    const li = document.createElement("li");
    const sidebarItem = SidebarItem(item);
    li.appendChild(sidebarItem);
    main.appendChild(li);
  });

  // footer
  const footer = document.createElement("div");
  footer.classList.add("footer");
  const footerItens = [
    { iconSrc: "../assets/psswd.svg", text: "Trocar senha", link: "#" },
    { iconSrc: "../assets/logout.svg", text: "Encerrar sessão", link: "#" },
  ];

  footerItens.forEach((item) => {
    const li = document.createElement("li");
    const sidebarItem = SidebarItem({ ...item, local: "footer" });
    li.appendChild(sidebarItem);
    footer.appendChild(li);
  });

  // Adiciona os elementos ao nav
  nav.appendChild(logo);
  menu.appendChild(main);
  menu.appendChild(footer);
  nav.appendChild(menu);
  return nav;
}
