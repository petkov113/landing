import Siema from "siema";

// burger menu
const burgerBtn = document.getElementById("btn");
const menu = document.querySelector(".nav__menu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});

// menu highlighting
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

// gallery
const portfolio = document.querySelector(".portfolio");
const gallery = new Siema({
  loop: true
});

portfolio.addEventListener("click", event => {
  let item = event.target.closest(".gallery__item");
  let closeBtn = event.target.closest(".carousel__button-back");

  if (item) {
    let category = item.dataset.category;
    portfolio.style.transform = "translateX(-50%)";
    let nodes = document.querySelectorAll(`img[data-category="${category}"]`);

    console.log("Что суём:", nodes);
    nodes.forEach(pic => gallery.append(pic));
    console.log("Засовываем все:", gallery.innerElements);
    gallery.remove(0);
    console.log("Удаляем первый:", gallery.innerElements);
  }

  if (closeBtn) {
    portfolio.style.transform = "translateX(0)";
    const items = (gallery.innerElements);
    for (let i = 0; i < items.length; i++) {
      gallery.remove(i)
    }
   }
})
