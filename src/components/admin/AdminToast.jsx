/*
 * Figma Shared/Toast
 *
 * Props 후보: open, tone?: "success"|"error"|"info", message, onClose?
 * JSON mock과 무관
 */
export default function AdminToast() {
  return (
    <div className="admin-toast" role="status">
      <p>처리가 완료되었습니다.</p>
    </div>
  );
}
