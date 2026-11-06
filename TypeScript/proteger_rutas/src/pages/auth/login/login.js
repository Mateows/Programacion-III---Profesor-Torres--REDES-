import { getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
if (!(form instanceof HTMLFormElement) ||
    !(emailInput instanceof HTMLInputElement) ||
    !(passwordInput instanceof HTMLInputElement) ||
    !(message instanceof HTMLElement)) {
    throw new Error("No se pudo inicializar el formulario de login.");
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const user = getUsers().find((candidate) => candidate.email === email && candidate.password === password);
    if (!user) {
        message.className = "auth-message auth-message--error";
        message.textContent = "Email o contraseña incorrectos.";
        return;
    }
    saveUser(user);
    message.className = "auth-message auth-message--success";
    message.textContent = "¡Ingreso correcto! Redirigiendo...";
    window.setTimeout(() => {
        navigate(user.role === "admin"
            ? "../../admin/home/home.html"
            : "../../client/home/home.html");
    }, 250);
});
