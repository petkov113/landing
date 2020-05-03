import Siema from "siema";

//#region burger menu
const burgerBtn = document.getElementById("btn");
const menu = document.querySelector(".nav__menu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});
//#endregion

//#region menu highlighting
const links = [...document.querySelectorAll(".nav__link")];
const sections = [...document.querySelectorAll("section")].map(
  (section, index) => ({
    index,
    name: section.id,
    start: section.offsetTop - 50,
    end: section.offsetTop + section.offsetHeight - 50
  })
);

let activeLink;

const selectLink = () => {
  let currentSection = sections.find(
    section => section.start <= scrollY && section.end > scrollY
  );

  if (currentSection) {
    if (activeLink === links[currentSection.index]) return;
    if (activeLink) activeLink.classList.remove("active");
    activeLink = links[currentSection.index];
    activeLink.classList.add("active");
  }
};

document.addEventListener("DOMContentLoaded", selectLink);
document.addEventListener("scroll", selectLink);
//#endregion

//#region gallery
const portfolio = document.querySelector(".portfolio");
const gallery = new Siema({ loop: true });
const images = document.querySelectorAll('.gallery-img'); 
const nodes = [...images];

portfolio.addEventListener("click", event => {
  const item = event.target.closest(".gallery__item");
  const closeBtn = event.target.closest(".carousel__button-back");

  if (item) {
    const selectedCategory = item.dataset.category;
    const filteredNodes = nodes.filter(node => node.dataset.category === selectedCategory)
    portfolio.style.transform = "translateX(-50%)";
    filteredNodes.forEach(node => gallery.append(node));
    gallery.remove(0); 
  }

  if (closeBtn) {
    portfolio.style.transform = "translateX(0)";
    const items = gallery.innerElements;
    for (let i in items) gallery.remove(i);
  }
});
//#endregion