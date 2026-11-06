import { checkAuthUser, logout } from "../../../utils/auth";
import { getUsers } from "../../../utils/localStorage";

const buttonLogout = document.getElementById("logoutButton");
const adminEmailSpan = document.getElementById("adminEmail");
const tableBody = document.getElementById("usersTableBody");

buttonLogout?.addEventListener("click", logout);

const user = checkAuthUser(
  "../../auth/login/login.html",
  "../../client/home/home.html",
  "admin"
);

if (user && adminEmailSpan) {
  adminEmailSpan.textContent = user.email;
}

if (tableBody) {
  const users = getUsers();
  tableBody.innerHTML = users
    .map(
      (u, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${u.email}</strong></td>
      <td><span class="role-tag role-tag--${u.role}">${u.role}</span></td>
      <td><span style="color: #4ade80;">● Activo</span></td>
    </tr>
  `
    )
    .join("");
}
