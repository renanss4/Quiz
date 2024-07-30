export function SidebarItem({ local = "main", iconSrc = "", text = "", link }) {
  const a = document.createElement("a");
  a.classList.add("sidebar-item");
  a.setAttribute("href", link);

  const icon = document.createElement("img");
  icon.setAttribute("src", iconSrc);
  icon.setAttribute("alt", text);

  const stylesByType = {
    header: "header",
    main: "main",
    footer: "footer",
  };

  a.classList.add(stylesByType[local]);

  a.appendChild(icon);

  if (text) {
    const p = document.createElement("p");
    p.textContent = text;
    a.appendChild(p);
  }

  return a;
}
