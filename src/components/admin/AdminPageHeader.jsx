/*
 * 간단 페이지 헤더 (placeholder 화면용)
 * Props: title, description?, actionLabel?, onAction?, actionDisabled?
 */
export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionDisabled = false,
}) {
  return (
    <header className="admin-page__header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actionLabel && (
        <button type="button" disabled={actionDisabled || !onAction} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </header>
  );
}
