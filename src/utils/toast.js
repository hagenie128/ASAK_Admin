// 경량 토스트. AdminToast 컴포넌트 CSS(.admin-toast) 재사용.

function show(message, tone = "success") {
  const el = document.createElement("div");
  el.className = `admin-toast${tone === "error" ? " admin-toast--error" : ""}`;
  el.setAttribute("role", "status");
  el.innerHTML = `<p>${message}</p>`;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 2800);
}

export const toast = {
  success: (message) => show(message, "success"),
  error: (message) => show(message, "error"),
};
