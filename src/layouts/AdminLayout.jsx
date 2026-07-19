/*
 * Figma Component 연결 후보: AdminLayout
 * 현재 코드 역할: Sidebar + Header + 본문(children) 셸. AdminApp 인라인 aside/main을 여기로 옮길 자리.
 * 최종 명칭 확인 필요: AdminLayout
 * Figma 승인 후 연결할 Props: children, (선택) headerSlot, sidebarSlot
 * 이 파일이 직접 처리하면 안 되는 상태: Routes 정의, Page 데이터 fetch, 로그인 API
 *
 * 데이터 흐름:
 *   main.jsx → AdminApp → (예정) AdminLayout → Outlet/children Page
 *
 * TODO 1: AdminApp의 aside/main 마크업을 이 파일로 이동 (동작 동일 유지)
 * TODO 2: AdminSidebar / AdminHeader를 슬롯으로 조립
 * TODO 3: 완성 픽셀 CSS는 Figma 승인 후
 */

import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-app">
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}
