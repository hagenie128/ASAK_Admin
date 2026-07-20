import { NavLink, useNavigate } from "react-router-dom";
import adminLogo from "../../assets/svg/logo-L.svg";
import adminMark from "../../assets/svg/logo-S.svg";
import dashboardIcon from "../../assets/figma/icon-nav-dashboard.svg";
import ordersIcon from "../../assets/figma/icon-nav-orders.svg";
import salesIcon from "../../assets/figma/icon-nav-sales.svg";
import menuIcon from "../../assets/figma/icon-nav-menu.svg";
import soldOutIcon from "../../assets/figma/icon-nav-soldout.svg";
import paymentIcon from "../../assets/figma/icon-nav-payment.svg";
import caretDownIcon from "../../assets/figma/icon-nav-caret-down.svg";
import signOutIcon from "../../assets/figma/icon-nav-signout.svg";
import promoLettuce from "../../assets/figma/promo-lettuce.png";
import promoCarrot from "../../assets/figma/promo-carrot.png";
import { logoutAdmin } from "../../auth/adminSession.js";

/*
 * Figma: Admin/Navbar (227:5009, 240×1080)
 * 메뉴 라벨은 Figma, 경로는 이 프로젝트 라우트.
 *
 * mock/세션: logoutAdmin() → /login  (주문·매출 JSON 안 씀)
 * Props: 없음 (NavLink + handleLogout)
 * 경로 표: src/STRUCTURE_GUIDE.md
 */
export default function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutAdmin();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand" aria-label="ASAK Admin">
        <img className="admin-sidebar__brand-full" alt="ASAK" src={adminLogo} />
        <img className="admin-sidebar__brand-mark" alt="ASAK" src={adminMark} />
      </div>

      <nav className="admin-sidebar__nav" aria-label="관리자 메뉴">
        <NavLink end to="/dashboard"><img alt="" aria-hidden="true" src={dashboardIcon} /><span>Home</span></NavLink>
        <NavLink end to="/orders"><img alt="" aria-hidden="true" src={ordersIcon} /><span>주문 관리</span></NavLink>
        <div className="admin-sidebar__group"><div className="admin-sidebar__group-row"><NavLink end to="/sales"><img alt="" aria-hidden="true" src={salesIcon} /><span>매출 관리</span></NavLink><button type="button" className="admin-sidebar__caret-button" aria-expanded="true" aria-label="매출 관리 하위 메뉴" disabled><img className="admin-sidebar__caret is-open" alt="" aria-hidden="true" src={caretDownIcon} /></button></div><NavLink className="admin-sidebar__subitem" to="/sales/daily"><span>일별 매출</span></NavLink><NavLink className="admin-sidebar__subitem" to="/sales/monthly"><span>월별 매출</span></NavLink></div>
        <NavLink end to="/menus"><img alt="" aria-hidden="true" src={menuIcon} /><span>메뉴 관리</span></NavLink>
        <NavLink end to="/sold-out"><img alt="" aria-hidden="true" src={soldOutIcon} /><span>항목 품절 관리</span></NavLink>
        <NavLink end to="/payment-methods"><img alt="" aria-hidden="true" src={paymentIcon} /><span>결제수단 설정</span></NavLink>
      </nav>

      <div className="admin-sidebar__promo">
        <div className="admin-sidebar__promo-art" aria-hidden="true">
          <img className="admin-sidebar__promo-lettuce" alt="" src={promoLettuce} />
          <img className="admin-sidebar__promo-carrot" alt="" src={promoCarrot} />
        </div>
        <p className="admin-sidebar__promo-text">현재 진행 중인 주문 상태를 한눈에 확인하세요.</p>
        <NavLink className="admin-sidebar__promo-cta" end to="/">
          주문 현황
        </NavLink>
      </div>

      <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
        <img alt="" aria-hidden="true" src={signOutIcon} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
