// Figma Shared/Toast — dismissDuration 4000ms, Admin 하단 여백 12px
// CSS: .admin-toast* (styles/admin/shared.css)

const DISMISS_MS = 4000;

function show(title, tone = "success", message) {
  const el = document.createElement("div");
  const isLong = Boolean(message);
  el.className = `admin-toast admin-toast--${tone}${isLong ? " admin-toast--long" : ""}`;
  el.setAttribute("role", "status");

  const icon = document.createElement("span");
  icon.className = "admin-toast__icon";
  icon.setAttribute("aria-hidden", "true");

  const text = document.createElement("div");
  text.className = "admin-toast__text";

  const titleEl = document.createElement("p");
  titleEl.className = "admin-toast__title";
  titleEl.textContent = title;
  text.appendChild(titleEl);

  if (isLong) {
    const messageEl = document.createElement("p");
    messageEl.className = "admin-toast__message";
    messageEl.textContent = message;
    text.appendChild(messageEl);
  }

  const close = document.createElement("button");
  close.type = "button";
  close.className = "admin-toast__close";
  close.setAttribute("aria-label", "닫기");
  close.textContent = "✕";

  const remove = () => {
    el.remove();
    window.clearTimeout(timer);
  };
  close.addEventListener("click", remove);

  el.append(icon, text, close);
  document.body.appendChild(el);
  const timer = window.setTimeout(remove, DISMISS_MS);
}

export const toast = {
  success: (title, message) => show(title, "success", message),
  error: (title, message) => show(title, "error", message),
  warning: (title, message) => show(title, "warning", message),
  info: (title, message) => show(title, "info", message),
  loading: (title, message) => show(title, "loading", message),
};
