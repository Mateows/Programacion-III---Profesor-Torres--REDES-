import{g as m}from"./navigate-CgFj1yLa.js";/* empty css              */import{l as d,c as r}from"./main-C2Y14KtS.js";const e=document.getElementById("logoutButton"),o=document.getElementById("adminEmail"),n=document.getElementById("usersTableBody");e==null||e.addEventListener("click",d);const s=r("../../auth/login/login.html","../../client/home/home.html","admin");s&&o&&(o.textContent=s.email);if(n){const l=m();n.innerHTML=l.map((t,a)=>`
    <tr>
      <td>${a+1}</td>
      <td><strong>${t.email}</strong></td>
      <td><span class="role-tag role-tag--${t.role}">${t.role}</span></td>
      <td><span style="color: #4ade80;">● Activo</span></td>
    </tr>
  `).join("")}
