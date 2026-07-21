import { useState } from "react";
import plusIcon from "../../assets/figma/icon-order-plus.svg";
import excludeIcon from "../../assets/figma/icon-order-exclude.svg";
import chipBagIcon from "../../assets/figma/icon-order-side.svg";
import drinkIcon from "../../assets/figma/icon-order-drink.svg";
import { getLiveOrders, completeOrder, cancelOrder } from "../../mocks/adminMockRepository.js";
import AdminSidebar from "./AdminSidebar.jsx";
import { formatCurrency } from "../../utils/currency.js";
import { formatDate, formatTime } from "../../utils/date.js";

/* SCR-009 / Live Order — getLiveOrders() */
export default function LiveOrderPreview() {
  const [orders, setOrders] = useState(getLiveOrders().data.content);

  const handleOrder = (orderId, action) => {
    if (action === "complete") {
      completeOrder(orderId);
    } else if (action === "cancel") {
      if (!confirm("주문을 취소하시겠습니까?")) return;
      cancelOrder(orderId);
    }
    setOrders(getLiveOrders().data.content);
  };

  const visibleOrders = orders.filter(
    (order) => order.orderStatus !== "COMPLETED" && order.orderStatus !== "CANCELLED",
  );

  return (
    <section className="live-order-preview" aria-label="주문 현황" data-figma-node="235:6361">
      <header className="live-order-preview__topbar" data-figma-node="235:6372">
        <AdminSidebar model="logo" />
        <div className="live-order-preview__heading">
          <div className="live-order-preview__title-group">
            <h1>주문 현황</h1>
            <p>조리 완료 처리 및 TTS 알림을 관리합니다.</p>
          </div>
          <time>
            {formatDate(new Date())}
            {"  |  "}
            {formatTime(new Date())}
          </time>
        </div>
      </header>
      <main className="live-order-preview__content">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="이전 주문">
          ‹
        </button>
        {visibleOrders.length > 0 ? (
          <div className="live-order-preview__board">
            {visibleOrders.map((order) => (
              <OrderCard key={order.orderId} order={order} onAction={handleOrder} />
            ))}
          </div>
        ) : (
          <div className="live-order-preview__board">
            <p>주문이 없습니다.</p>
          </div>
        )}
        <button type="button" className="live-order-preview__arrow" disabled aria-label="다음 주문">
          ›
        </button>
      </main>
    </section>
  );
}

function optionIcon(tone) {
  if (tone === "exclude") return excludeIcon;
  if (tone === "plus") return plusIcon;
  if (tone === "drink") return drinkIcon;
  return chipBagIcon;
}

function optionClass(tone) {
  if (tone === "exclude") return "figma-order-option figma-order-option--exclude";
  if (tone === "plus") return "figma-order-option figma-order-option--plus";
  if (tone === "drink") return "figma-order-option figma-order-option--drink";
  return "figma-order-option figma-order-option--side";
}

function MenuCard({ menu }) {
  const options = menu?.options ?? [];

  return (
    <section className="figma-order-menu">
      <div className="figma-order-menu__header">
        <div className="figma-order-menu__title">
          <strong>{menu?.menuName || "menu name"}</strong>
          <span>{menu?.quantity ?? 0}</span>
        </div>
        <p className="figma-order-menu__base">
          <span>베이스:</span>
          <b>{menu?.base || "추천"}</b>
        </p>
        <p className="figma-order-menu__dressing">
          <span>드레싱:</span>
          <b>{menu?.dressing || "발사믹"}</b>
        </p>
      </div>
      {options.length > 0 ? (
        <div className="figma-order-menu__options">
          <ul>
            {options.map((option) => (
              <li key={`${option.tone}-${option.label}`} className={optionClass(option.tone)}>
                <i aria-hidden="true">
                  <img alt="" src={optionIcon(option.tone)} />
                </i>
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function OrderCard({ order, onAction }) {
  const menus = order.menus ?? [];

  return (
    <article
      className={`figma-order-card${order.wide ? " figma-order-card--wide" : ""}`}
      aria-label={`${order.orderNo} 주문 미리보기`}
    >
      <header className="figma-order-card__header">
        <strong>{order.orderNo}</strong>
        <time>{order.elapsedSec != null ? `${order.elapsedSec}초` : "00:00:00"}</time>
      </header>
      <span
        className={`figma-order-card__type${order.orderTypeLabel === "포장" ? " figma-order-card__type--takeout" : ""}`}
      >
        {order.orderTypeLabel}
      </span>
      <div className="figma-order-card__menus">
        {menus.map((menu, index) => (
          <MenuCard key={`${order.orderId}-${index}`} menu={menu} />
        ))}
      </div>
      <footer className="figma-order-card__footer">
        <div className="figma-order-card__total">
          <span>총액</span>
          <strong>{formatCurrency(order.totalPrice ?? 0)}</strong>
        </div>
        <div className="figma-order-card__actions">
          <button type="button" onClick={() => onAction(order.orderId, "cancel")}>
            취소
          </button>
          <button type="button" onClick={() => onAction(order.orderId, "complete")}>
            완료 처리
          </button>
        </div>
      </footer>
    </article>
  );
}
