"strict mode";

const username = document.querySelector(".username");

const password = document.querySelector(".password");
const login = document.querySelector(".login");
const showBal = document.querySelector(".show-bal");
const nav = document.querySelector("nav");
const menuBAr = document.querySelector(".menu-bar");
const closeBar = document.querySelector(".close-bar");
// /////////////////
//////open bar
menuBAr.addEventListener("click", function () {
  nav.style.transition = "all 2s";
  nav.classList.toggle("translate-nav");
});
///////////////close
closeBar.addEventListener("click", function () {
  nav.style.transition = "all 2s";
  nav.classList.toggle("translate-nav");
});
