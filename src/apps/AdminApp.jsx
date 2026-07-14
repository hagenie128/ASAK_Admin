import { NavLink, Route, Routes } from "react-router-dom";

const menus = [
  ["/", "주문 현황", "SCR-009"],
  ["/sold-out", "품절 관리", "SCR-011"],
  ["/menus", "메뉴 관리", "SCR-016"],
  ["/payment-methods", "결제수단", "SCR-018"],
  ["/sales", "매출", "SCR-019"],
];

function AdminScreen({ title, screenId }) {
  return (
    <section className="admin-screen">
      <p className="screen-id">{screenId}</p>
      <h1>{title}</h1>
      <p>ASAK 운영을 위한 관리자 전용 화면입니다.</p>
      <div className="empty-state">화면 기능은 일정에 따라 이 앱 안에서 독립적으로 구현합니다.</div>
    </section>
  );
}

export default function AdminApp() {
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <strong className="brand">ASAK Admin</strong>
        <nav aria-label="관리자 메뉴">
          {menus.map(([path, label]) => <NavLink key={path} to={path} end={path === "/"}>{label}</NavLink>)}
        </nav>
      </aside>
      <main className="admin-main">
        <Routes>
          {menus.map(([path, title, screenId]) => <Route key={path} path={path} element={<AdminScreen title={title} screenId={screenId} />} />)}
          <Route path="*" element={<AdminScreen title="페이지를 찾을 수 없습니다" screenId="404" />} />
        </Routes>
      </main>
    </div>
  );
}
