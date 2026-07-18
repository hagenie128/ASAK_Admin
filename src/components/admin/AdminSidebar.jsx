import { NavLink } from "react-router-dom";
import adminLogo from "../../assets/figma/asak-admin-logo.svg";
import adminMark from "../../assets/figma/asak-s-logo.svg";
import dashboardIcon from "../../assets/figma/icon-nav-dashboard.svg";
import ordersIcon from "../../assets/figma/icon-nav-orders.svg";
import salesIcon from "../../assets/figma/icon-nav-sales.svg";
import menuIcon from "../../assets/figma/icon-nav-menu.svg";
import soldOutIcon from "../../assets/figma/icon-nav-soldout.svg";
import paymentIcon from "../../assets/figma/icon-nav-payment.svg";

// Figma의 20px 네비게이션 자산을 경로에만 매핑한다. 라우팅이나 권한은 이 컴포넌트가 소유하지 않는다.
const navIcons = {
  "/": ordersIcon,
  "/dashboard": dashboardIcon,
  "/orders": ordersIcon,
  "/sold-out": soldOutIcon,
  "/menus": menuIcon,
  "/payment-methods": paymentIcon,
  "/sales": salesIcon,
};

export default function AdminSidebar({ items }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand" aria-label="ASAK Admin"><img className="admin-sidebar__brand-full" alt="ASAK" src={adminLogo} /><img className="admin-sidebar__brand-mark" alt="ASAK" src={adminMark} /></div>
      <nav className="admin-sidebar__nav" aria-label="관리자 메뉴">
        {items.map(({ path, label }) => (
          <NavLink key={path} end={path === "/"} to={path}>
            <img alt="" aria-hidden="true" src={navIcons[path]} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <span className="admin-sidebar__footer">관리자 화면 UI 미리보기</span>
    </aside>
  );
}
