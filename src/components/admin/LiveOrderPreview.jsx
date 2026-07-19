import asakSLogo from "../../assets/figma/asak-s-logo.svg";
import plusIcon from "../../assets/figma/icon-order-plus.svg";
import excludeIcon from "../../assets/figma/icon-order-exclude.svg";
import chipBagIcon from "../../assets/figma/icon-order-side.svg";
import drinkIcon from "../../assets/figma/icon-order-drink.svg";

/**
 * Figma SCR-009 / Live Order / Detail Open (235:6361) ?뺤쟻 ?꾨━酉?
 * JSON 遺덈윭?ㅺ린, 二쇰Ц 議고쉶, 寃쎄낵 ?쒓컙 怨꾩궛, ?곹깭 蹂寃? TTS 諛쒖넚? ?섎룄?곸쑝濡?援ы쁽?섏? ?딆뒿?덈떎.
 */

const MENU_OPTIONS = [
  { label: "?좊씪?쇰눊", tone: "exclude", icon: excludeIcon },
  { label: "?꾨낫移대룄", tone: "plus", icon: plusIcon },
  { label: "item name", tone: "side", icon: chipBagIcon },
  { label: "item name", tone: "drink", icon: drinkIcon },
];

const previewOrders = [
  { number: "#1325", type: "留ㅼ옣", total: "2000", wide: false },
  { number: "#248", type: "留ㅼ옣", total: "0", wide: false },
  { number: "#2318", type: "留ㅼ옣", total: "0", wide: false },
  { number: "#2518", type: "?ъ옣", total: "0", wide: true },
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
          <span>踰좎씠??:</span>
          <b>異붿쿇</b>
        </p>
        <p className="figma-order-menu__dressing">
          <span>?쒕젅??:</span>
          <b>諛쒖궗誘?/b>
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
  const takeout = order.type === "?ъ옣";

  return (
    <article
      className={`figma-order-card${order.wide ? " figma-order-card--wide" : ""}`}
      aria-label={`${order.number} 二쇰Ц 誘몃━蹂닿린`}
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
          <span>珥앹븸</span>
          <strong>
            {order.total}
            <em>??/em>
          </strong>
        </div>
        <div className="figma-order-card__actions">
          <button disabled type="button">
            痍⑥냼
          </button>
          <button disabled type="button">
            ?꾨즺 ?몄텧
          </button>
        </div>
      </footer>
    </article>
  );
}

export default function LiveOrderPreview() {
  return (
    <section className="live-order-preview" aria-label="二쇰Ц ?꾪솴 ?뺤쟻 ?꾨━酉? data-figma-node="235:6361">
      <header className="live-order-preview__topbar" data-figma-node="235:6372">
        <div className="live-order-preview__logo" aria-label="ASAK" data-figma-node="235:6378">
          <img alt="ASAK" src={asakSLogo} />
        </div>
        <div className="live-order-preview__heading" data-figma-node="235:6373">
          <div className="live-order-preview__title-group">
            <h1>二쇰Ц ?꾪솴</h1>
            <p>議곕━ ?꾨즺 泥섎━ ??TTS ?뚮┝??諛쒖넚?⑸땲??/p>
          </div>
          <time>?꾩옱 ?쒓컖: 14:30:15</time>
        </div>
      </header>

      <main className="live-order-preview__content" data-figma-node="3065:67538">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="?댁쟾 二쇰Ц">
          ??        </button>

        <div className="live-order-preview__board">
          {previewOrders.map((order) => (
            <FigmaOrderCard key={order.number} order={order} />
          ))}
        </div>

        <button type="button" className="live-order-preview__arrow" disabled aria-label="?ㅼ쓬 二쇰Ц">
          ??        </button>
      </main>
    </section>
  );
}
