import asakSLogo from "../../assets/svg/logo-S.svg";
import plusIcon from "../../assets/figma/icon-order-plus.svg";
import excludeIcon from "../../assets/figma/icon-order-exclude.svg";
import chipBagIcon from "../../assets/figma/icon-order-side.svg";
import drinkIcon from "../../assets/figma/icon-order-drink.svg";
import { getLiveOrders } from "../../mocks/adminMockRepository.js";

/* SCR-009 / Live Order / Default
 * mock props: getLiveOrders().data.content[]
 *   order: orderId, orderNo, orderTypeLabel, wide, elapsedSec, totalPrice, menus[]
 *   menu:  menuName, quantity, base, dressing, options[{ label, tone }]
 *   tone:  exclude | plus | drink | side
 * 전체 표: public/mocks/README.md
 */
// TODO: loading / empty / error 상태 분리 (WBS2-044)

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

function StaticMenuCard({ menu }) {
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

function StaticOrderCard({ order }) {
  const number = order.orderNo;
  const type = order.orderTypeLabel;
  const wide = Boolean(order.wide);
  const menus = order.menus ?? [];

  return (
    <article
      className={`figma-order-card${wide ? " figma-order-card--wide" : ""}`}
      aria-label={`${number} 주문 미리보기`}
    >
      <header className="figma-order-card__header">
        <strong>{number}</strong>
        <time>{order.elapsedSec != null ? `${order.elapsedSec}초` : "00:00:00"}</time>
      </header>
      <span
        className={`figma-order-card__type${type === "포장" ? " figma-order-card__type--takeout" : ""}`}
      >
        {type}
      </span>
      <div className="figma-order-card__menus">
        {menus.map((menu, index) => (
          <StaticMenuCard key={`${order.orderId}-${index}`} menu={menu} />
        ))}
      </div>
      <footer className="figma-order-card__footer">
        <div className="figma-order-card__total">
          <span>총액</span>
          <strong>
            {(order.totalPrice ?? 0).toLocaleString()}
            <em>원</em>
          </strong>
        </div>
        <div className="figma-order-card__actions">
          <button disabled type="button">
            취소
          </button>
          <button disabled type="button">
            완료 처리
          </button>
        </div>
      </footer>
    </article>
  );
}

export default function LiveOrderPreview() {
  const orders = getLiveOrders().data.content;

  return (
    <section
      className="live-order-preview"
      aria-label="주문 현황 정적 미리보기"
      data-figma-node="235:6361"
    >
      <header className="live-order-preview__topbar" data-figma-node="235:6372">
        <div className="live-order-preview__logo" aria-label="ASAK">
          <img alt="ASAK" src={asakSLogo} />
        </div>
        <div className="live-order-preview__heading">
          <div className="live-order-preview__title-group">
            <h1>주문 현황</h1>
            <p>조리 완료 처리 및 TTS 알림을 관리합니다.</p>
          </div>
          <time>현재 시각: {new Date().toLocaleTimeString()}</time>
        </div>
      </header>
      <main className="live-order-preview__content">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="이전 주문">
          ‹
        </button>
        <div className="live-order-preview__board">
          {orders.map((order) => (
            <StaticOrderCard key={order.orderId} order={order} />
          ))}
        </div>
        <button type="button" className="live-order-preview__arrow" disabled aria-label="다음 주문">
          ›
        </button>
      </main>
    </section>
  );
}
