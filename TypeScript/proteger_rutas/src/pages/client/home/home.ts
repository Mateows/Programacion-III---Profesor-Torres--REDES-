import { checkAuthUser, logout } from "../../../utils/auth";

const buttonLogout = document.getElementById("logoutButton");
const userEmailSpan = document.getElementById("userEmail");
const toast = document.getElementById("cartToast");

buttonLogout?.addEventListener("click", logout);

const user = checkAuthUser(
  "../../auth/login/login.html",
  "../../admin/home/home.html",
  "client"
);

if (user && userEmailSpan) {
  userEmailSpan.textContent = user.email;
}

// Filtro interactivo de categorías
const categoryButtons = document.querySelectorAll<HTMLButtonElement>(".category-btn");
const productCards = document.querySelectorAll<HTMLElement>(".product-card");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.category ?? "todos";

    productCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      if (category === "todos" || cardCategory === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Feedback al agregar al carrito
const cartButtons = document.querySelectorAll<HTMLButtonElement>(".btn-add-cart");
cartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (toast) {
      toast.style.display = "block";
      window.setTimeout(() => {
        toast.style.display = "none";
      }, 1500);
    }
  });
});
