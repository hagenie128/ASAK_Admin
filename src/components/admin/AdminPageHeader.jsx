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
