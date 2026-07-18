/*
 * Figma Component 연결 후보: Sidebar
 * 현재 코드 역할: 관리자 좌측 네비게이션 Presentational
 * 최종 명칭 확인 필요: Sidebar vs AdminSidebar (파일명 Rename 보류)
 * Figma 승인 후 연결할 Props: items[{ path, label }], currentPath, brandLabel
 * 이 파일이 직접 처리하면 안 되는 상태: Route 등록, 권한 가드, 화면 데이터
 *
 * 참고: 지금은 AdminApp 인라인 nav가 실제 동작 중. 이 파일은 미연결 뼈대.
 *
 * TODO 1: constants/routes 또는 menus 배열을 props로만 받는다
 * TODO 2: NavLink는 여기 두되, path 상수 소유권은 routes.js
 */

import { NavLink } from "react-router-dom";

const navSymbols = {
  "/": "▦",
  "/dashboard": "⌂",
  "/orders": "☷",
  "/sold-out": "◫",
  "/menus": "◉",
  "/payment-methods": "▣",
  "/sales": "⌁",
};

export default function AdminSidebar({ items }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand" aria-label="ASAK Admin">ASAK</div>
      <nav className="admin-sidebar__nav" aria-label="관리자 메뉴">
        {items.map(({ path, label }) => (
          <NavLink key={path} end={path === "/"} to={path}>
            <span aria-hidden="true">{navSymbols[path] ?? "•"}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <span className="admin-sidebar__footer">관리자 화면 UI 미리보기</span>
    </aside>
  );
}
