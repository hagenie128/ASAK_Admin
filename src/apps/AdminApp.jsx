import { Route, Routes, useLocation } from "react-router-dom";
import OrderListPage from "../pages/admin/OrderListPage.jsx";
import LoginPage from "../pages/admin/LoginPage.jsx";
import OrderDetailPage from "../pages/admin/OrderDetailPage.jsx";
import OrderManagementPreview from "../pages/admin/OrderManagementPreview.jsx";
import SoldOutManagePage from "../pages/admin/SoldOutManagePage.jsx";
import MenuManagePage from "../pages/admin/MenuManagePage.jsx";
import MenuEditPage from "../pages/admin/MenuEditPage.jsx";
import PaymentMethodPage from "../pages/admin/PaymentMethodPage.jsx";
import SalesSummaryPage from "../pages/admin/SalesSummaryPage.jsx";
import DailySalesPage from "../pages/admin/DailySalesPage.jsx";
import MonthlySalesPage from "../pages/admin/MonthlySalesPage.jsx";
import DashboardPage from "../pages/admin/DashboardPage.jsx";
import UiStatePreviewPage from "../pages/admin/UiStatePreviewPage.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

/*
 * 현재 코드 역할: 앱 셸 + 라우트 조립.
 * 사이드바는 components/admin/AdminSidebar가 소유하며 Figma Admin/Navbar(227:5009)를 따른다.
 * "/"는 Figma SCR-009 Live Order로, 사이드바의 "주문 현황" 버튼이 이 경로를 가리킨다.
 * 이 파일이 직접 처리하면 안 되는 상태: 주문/품절/매출 데이터, Draft, KPI 계산
 */

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
  const { pathname } = useLocation();

  // SCR-009 정적 프리뷰는 Figma의 전체 폭 top-bar 레이아웃을 그대로 보여 줍니다.
  // TODO: 실제 관리자 라우팅 정책이 확정되면 이 분기를 canonical /orders/live 경로로 옮깁니다.
  if (pathname === "/") return <OrderListPage />;
  if (pathname === "/login") return <LoginPage />;
  if (pathname.startsWith("/ui-preview/")) {
    return <Routes><Route path="/ui-preview/:screen/:state" element={<UiStatePreviewPage />} /></Routes>;
  }

  const staticPages = {
    "/dashboard": <DashboardPage />,
    "/orders": <OrderManagementPreview />,
    "/sold-out": <SoldOutManagePage />,
    "/menus": <MenuManagePage />,
    "/menus/new": <MenuEditPage />,
    "/menus/edit": <MenuEditPage />,
    "/payment-methods": <PaymentMethodPage />,
    "/sales": <SalesSummaryPage />,
    "/sales/monthly": <MonthlySalesPage />,
    "/sales/daily": <DailySalesPage />,
  };

  if (staticPages[pathname]) {
    return <AdminLayout>{staticPages[pathname]}</AdminLayout>;
  }

  // 남은 경로는 Figma의 공통 셸 안에서 처리한다. 사이드바를 여기서 다시 그리지 않는다.
  return (
    <AdminLayout>
      <Routes>
        <Route path="*" element={<AdminScreen title="페이지를 찾을 수 없습니다" screenId="404" />} />
      </Routes>
    </AdminLayout>
  );
}
