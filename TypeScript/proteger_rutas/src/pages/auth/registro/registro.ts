import type { IUser } from "../../../types/IUser";
import { addUser, getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("register-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const message = document.getElementById("message");

if (
  !(form instanceof HTMLFormElement) ||
  !(emailInput instanceof HTMLInputElement) ||
  !(passwordInput instanceof HTMLInputElement) ||
  !(confirmPasswordInput instanceof HTMLInputElement) ||
  !(message instanceof HTMLElement)
) {
  throw new Error("No se pudo inicializar el formulario de registro.");
}

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (password !== confirmPasswordInput.value) {
    message.className = "auth-message auth-message--error";
    message.textContent = "Las contraseñas no coinciden.";
    return;
  }
  if (getUsers().some((user) => user.email === email)) {
    message.className = "auth-message auth-message--error";
    message.textContent = "Ya existe una cuenta con ese email.";
    return;
  }

  const user: IUser = { email, password, role: "client" };
  addUser(user);
  saveUser(user);

  message.className = "auth-message auth-message--success";
  message.textContent = "Cuenta creada. Ingresando al menú...";
  form.reset();

  window.setTimeout(() => {
    navigate("../../client/home/home.html");
  }, 350);
});
