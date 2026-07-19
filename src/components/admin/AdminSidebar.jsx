import { useState } from "react";
import { NavLink } from "react-router-dom";
import adminLogo from "../../assets/figma/asak-admin-logo.svg";
import adminMark from "../../assets/figma/asak-s-logo.svg";
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

/*
 * Figma: Admin/Navbar (227:5009, 240×1080) — 화면마다 instance로 반복 사용된다.
 * 메뉴 구성/순서/라벨은 Figma 원본을 그대로 따른다. 라우팅 경로만 이 프로젝트 것으로 매핑했다.
 * 이 컴포넌트는 네비게이션 표시만 소유한다. 인증, 로그아웃 요청, 권한 판정은 여기서 처리하지 않는다.
 */
const navItems = [
  { path: "/dashboard", label: "Home", icon: dashboardIcon },
  { path: "/orders", label: "주문 관리", icon: ordersIcon },
  {
    // 매출 관리 자체가 매출 요약 화면이고, 하위에 일별/월별이 붙는다.
    path: "/sales",
    label: "매출 관리",
    icon: salesIcon,
    children: [
      { path: "/sales/daily", label: "일별 매출" },
      { path: "/sales/monthly", label: "월별 매출" },
    ],
  },
  { path: "/menus", label: "메뉴 관리", icon: menuIcon },
  { path: "/sold-out", label: "항목 품절 관리", icon: soldOutIcon },
  { path: "/payment-methods", label: "결제수단 설정", icon: paymentIcon },
];

export default function AdminSidebar() {
  // Figma의 매출 관리 그룹은 펼쳐진 상태가 기본이다. 표시 상태만 다루며 데이터와 무관하다.
  const [salesOpen, setSalesOpen] = useState(true);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand" aria-label="ASAK Admin">
        <img className="admin-sidebar__brand-full" alt="ASAK" src={adminLogo} />
        <img className="admin-sidebar__brand-mark" alt="ASAK" src={adminMark} />
      </div>

      <nav className="admin-sidebar__nav" aria-label="관리자 메뉴">
        {navItems.map((item) =>
          item.children ? (
            <div className="admin-sidebar__group" key={item.label}>
              <div className="admin-sidebar__group-row">
                <NavLink end to={item.path}>
                  <img alt="" aria-hidden="true" src={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
                <button
                  type="button"
                  className="admin-sidebar__caret-button"
                  aria-expanded={salesOpen}
                  aria-label={`${item.label} 하위 메뉴 ${salesOpen ? "접기" : "펼치기"}`}
                  onClick={() => setSalesOpen((open) => !open)}
                >
                  <img
                    className={`admin-sidebar__caret${salesOpen ? " is-open" : ""}`}
                    alt=""
                    aria-hidden="true"
                    src={caretDownIcon}
                  />
                </button>
              </div>
              {salesOpen &&
                item.children.map((child) => (
                  <NavLink className="admin-sidebar__subitem" key={child.path} to={child.path}>
                    <span>{child.label}</span>
                  </NavLink>
                ))}
            </div>
          ) : (
            <NavLink key={item.path} end={item.path === "/"} to={item.path}>
              <img alt="" aria-hidden="true" src={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ),
        )}
      </nav>

      {/* Figma의 Promotional Banner. 야채 일러스트는 카드 위쪽으로 넘쳐 보이는 것이 원본 의도다. */}
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

      {/* 로그아웃 요청은 인증 구현 시 연결한다. 지금은 표시 전용이라 비활성으로 둔다. */}
      <button type="button" className="admin-sidebar__logout" disabled>
        <img alt="" aria-hidden="true" src={signOutIcon} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
