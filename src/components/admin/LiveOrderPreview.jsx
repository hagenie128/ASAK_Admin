import asakSLogo from "../../assets/figma/asak-s-logo-live.svg";
import plusIcon from "../../assets/figma/icon-order-plus.svg";
import excludeIcon from "../../assets/figma/icon-order-exclude.svg";
import chipBagIcon from "../../assets/figma/icon-order-side.svg";
import drinkIcon from "../../assets/figma/icon-order-drink.svg";

/**
 * Figma SCR-009 / Live Order / Detail Open (235:6361) 정적 프리뷰.
 * JSON 불러오기, 주문 조회, 경과 시간 계산, 상태 변경, TTS 발송은 의도적으로 구현하지 않습니다.
 */

const MENU_OPTIONS = [
  { label: "할라피뇨", tone: "exclude", icon: excludeIcon },
  { label: "아보카도", tone: "plus", icon: plusIcon },
  { label: "item name", tone: "side", icon: chipBagIcon },
  { label: "item name", tone: "drink", icon: drinkIcon },
];

const previewOrders = [
  { number: "#1325", type: "매장", total: "2000", wide: false },
  { number: "#248", type: "매장", total: "0", wide: false },
  { number: "#2318", type: "매장", total: "0", wide: false },
  { number: "#2518", type: "포장", total: "0", wide: true },
];

function OrderMenuCard() {
  return (
    <section className="figma-order-menu">
      <div className="figma-order-menu__header">
        <div className="figma-order-menu__title">
          <strong>menu name</strong>
          <span>1</span>
        </div>
        <p className="figma-order-menu__base">
          <span>베이스 :</span>
          <b>추천</b>
        </p>
        <p className="figma-order-menu__dressing">
          <span>드레싱 :</span>
          <b>발사믹</b>
        </p>
      </div>

      <div className="figma-order-menu__options">
        <ul>
          {MENU_OPTIONS.map((option) => (
            <li key={`a-${option.tone}`} className={`figma-order-option figma-order-option--${option.tone}`}>
              <i aria-hidden="true">
                <img alt="" src={option.icon} />
              </i>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
        <ul>
          {MENU_OPTIONS.map((option) => (
            <li key={`b-${option.tone}`} className={`figma-order-option figma-order-option--${option.tone}`}>
              <i aria-hidden="true">
                <img alt="" src={option.icon} />
              </i>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FigmaOrderCard({ order }) {
  const takeout = order.type === "포장";

  return (
    <article
      className={`figma-order-card${order.wide ? " figma-order-card--wide" : ""}`}
      aria-label={`${order.number} 주문 미리보기`}
      data-figma-node={order.wide ? "3065:67544" : "3065:67541"}
    >
      <header className="figma-order-card__header">
        <strong>{order.number}</strong>
        <time>00:00:00</time>
      </header>

      <span className={`figma-order-card__type${takeout ? " figma-order-card__type--takeout" : ""}`}>
        {order.type}
      </span>

      <div className="figma-order-card__menus">
        {[0, 1, 2].map((itemIndex) => (
          <OrderMenuCard key={itemIndex} />
        ))}
      </div>

      <footer className="figma-order-card__footer">
        <div className="figma-order-card__total">
          <span>총액</span>
          <strong>
            {order.total}
            <em>원</em>
          </strong>
        </div>
        <div className="figma-order-card__actions">
          <button disabled type="button">
            취소
          </button>
          <button disabled type="button">
            완료 호출
          </button>
        </div>
      </footer>
    </article>
  );
}

export default function LiveOrderPreview() {
  return (
    <section className="live-order-preview" aria-label="주문 현황 정적 프리뷰" data-figma-node="235:6361">
      <header className="live-order-preview__topbar" data-figma-node="235:6372">
        <div className="live-order-preview__logo" aria-label="ASAK" data-figma-node="235:6378">
          <img alt="ASAK" src={asakSLogo} />
        </div>
        <div className="live-order-preview__heading" data-figma-node="235:6373">
          <div className="live-order-preview__title-group">
            <h1>주문 현황</h1>
            <p>조리 완료 처리 시 TTS 알림이 발송됩니다</p>
          </div>
          <time>현재 시각: 14:30:15</time>
        </div>
      </header>

      <main className="live-order-preview__content" data-figma-node="3065:67538">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="이전 주문">
          ‹
        </button>

        <div className="live-order-preview__board">
          {previewOrders.map((order) => (
            <FigmaOrderCard key={order.number} order={order} />
          ))}
        </div>

        <button type="button" className="live-order-preview__arrow" disabled aria-label="다음 주문">
          ›
        </button>
      </main>
    </section>
  );
}
