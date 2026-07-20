/*
 * 간단 페이지 헤더 (placeholder 화면용)
 * Props: title, description?, actionLabel? (버튼은 disabled 시안)
 */
export default function AdminPageHeader({ title, description, actionLabel }) {

  return (
    <header className="admin-page__header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actionLabel && <button type="button" disabled>{actionLabel}</button>}
    </header>
  );
}
