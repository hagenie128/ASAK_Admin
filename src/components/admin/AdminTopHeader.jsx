/*
 * Figma top-header (241:14215) — Admin 공통 페이지 상단바
 * breadcrumb 12 Medium / title 28 Bold / description 14 Regular, gap 6
 */
export default function AdminTopHeader({ crumb, title, description, children }) {
  return (
    <header className="admin-top-header" data-figma-node="241:14215">
      <div className="admin-top-header__text">
        {crumb ? <p className="admin-top-header__crumb">{crumb}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="admin-top-header__desc">{description}</p> : null}
      </div>
      {children ? <div className="admin-top-header__aside">{children}</div> : null}
    </header>
  );
}
