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

links.forEach(link => {
  if(link.href === location.href) activeLink = link;
  else return;
  activeLink.classList.add('active')
})

document.addEventListener("scroll", () => {
  let currentSection = sections.find(
    section => section.start <= scrollY && section.end > scrollY
  );
  if (currentSection) {
    if (activeLink === links[currentSection.index]) return;
    else {
      activeLink.classList.remove("active");
      activeLink = links[currentSection.index];
    }
    activeLink.classList.add("active");
  }
});
