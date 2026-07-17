import { NavLink, Route, Routes } from "react-router-dom";

/*
 * [학습] AdminApp 인라인 책임 — 지금은 아래가 한 파일에 섞여 있다.
 * 1) 네비게이션 메타(menus)
 * 2) Sidebar UI (aside)
 * 3) Routes 정의
 * 4) 화면 Placeholder (AdminScreen)
 *
 * 분리 계획 (완성 구현 금지, Figma 승인 후):
 * - menus/path → constants/routes.js
 * - aside → layouts/AdminLayout + components/admin/AdminSidebar + AdminHeader
 * - 각 Route element → pages/admin/* 실제 Page (지금은 AdminScreen 유지)
 * - AdminScreen → 개발용 임시. 프로덕션 Page로 교체 시 삭제 후보
 *
 * Figma Component 연결 후보: AdminLayout, Sidebar, Header
 * 현재 코드 역할: 앱 셸 + 라우트 임시 조립
 * 최종 명칭 확인 필요: "/" 주문 현황이 Live Order인지 Dashboard인지
 * Figma 승인 후 연결할 Props: Layout children, nav items
 * 이 파일이 직접 처리하면 안 되는 상태: 주문/품절/매출 데이터, Draft, KPI 계산
 */

// Keep navigation metadata in one place so a new admin feature adds its URL,
// sidebar entry, and screen identifier together.
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
