
const jsonFile = "assets/data/data.json";

async function initializeMenu() {
  const menuItems = await fetch(jsonFile)
  .then(res => res.json())


  const menuContainer = document.querySelector(".menus");

  function generateMenu(menuItems) {
    return menuItems
      .map(item => {
        // console.log(item)
        const hasChildren = item.children && item.children.length > 0;
        console.log(hasChildren)
        const submenu = hasChildren
          ? `<div class="submenu" style="display: none; padding-left:10px">${generateMenu(item.children)}</div>`
          : "";
       // console.log(submenu)

        return `
          <div class="menu-item">
            <button class="toggle-button">+</button>
            <span>${item.label}</span>
            ${submenu}
          </div>
        `;
      })
      .join("");
     
  }

  menuContainer.innerHTML = generateMenu(menuItems);


  menuContainer.addEventListener("click", event => {
    if (event.target.classList.contains("toggle-button")) {
      const button = event.target;
      const submenu = button.nextElementSibling.nextElementSibling;

      if (submenu) {
        const isVisible = submenu.style.display === "block";
        submenu.style.display = isVisible ? "none" : "block";
        button.textContent = isVisible ? "+" : "-";
      }
    }
  });
}

initializeMenu();
