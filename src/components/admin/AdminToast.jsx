/*
 * Figma Shared/Toast (145:2 / 158:24049)
 * tone: success | error | warning | info | loading
 * size: default | longMessage (message 있으면 long)
 */
import dismissIcon from "../../assets/figma/icon-dismiss.svg";

export default function AdminToast({
  open = true,
  tone = "success",
  title = "알림 메시지",
  message,
  onClose,
}) {
  if (!open) return null;

  const isLong = Boolean(message);

  return (
    <div
      className={`admin-toast admin-toast--${tone}${isLong ? " admin-toast--long" : ""}`}
      role="status"
    >
      <span className="admin-toast__icon" aria-hidden="true" />
      <div className="admin-toast__text">
        <p className="admin-toast__title">{title}</p>
        {isLong ? <p className="admin-toast__message">{message}</p> : null}
      </div>
      {typeof onClose === "function" ? (
        <button
          type="button"
          className="admin-toast__close"
          aria-label="닫기"
          onClick={onClose}
        >
          <img src={dismissIcon} alt="" width={20} height={20} />
        </button>
      ) : null}
    </div>
  );
}
