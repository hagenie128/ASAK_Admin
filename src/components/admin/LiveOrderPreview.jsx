import asakSLogo from "../../assets/figma/asak-s-logo.svg";
import plusIcon from "../../assets/figma/icon-plus.svg";
import chipBagIcon from "../../assets/figma/icon-chip-bag.svg";
import drinkIcon from "../../assets/figma/icon-drink.svg";

/**
 * Figma SCR-009의 정적 프리뷰입니다.
 * JSON 불러오기, 주문 조회, 경과 시간 계산, 상태 변경, TTS 발송은 의도적으로 구현하지 않습니다.
 */
function OrderCardPlaceholder() {
  return (
    <article className="live-order-card" aria-label="주문 카드 플레이스홀더">
      <header className="live-order-card__header">
        <strong>#----</strong>
        <span>--:--:--</span>
      </header>
      <span className="live-order-card__type">주문 방식</span>

      <div className="live-order-card__items">
        <section className="live-order-item">
          <div className="live-order-item__title">
            <strong>메뉴 이름</strong>
            <span>0</span>
          </div>
          <p>베이스: 선택 전</p>
          <p>드레싱: 선택 전</p>
          <ul><li>＋ 옵션 플레이스홀더</li></ul>
        </section>
        <section className="live-order-item live-order-item--placeholder">
          <p>주문 데이터가 연결되면 메뉴 항목이 표시됩니다.</p>
        </section>
      </div>

      <button type="button" className="live-order-card__cta" disabled>
        조리 완료
      </button>
      {/* TODO: JSON 로드 → API adapter → 상태 전이 → TTS 발송 → 목록 갱신을 구현합니다. */}
    </article>
  );
}

const previewOrders = [
  { number: "#1325", type: "매장", total: "2000원" },
  { number: "#248", type: "매장", total: "0원" },
  { number: "#2318", type: "매장", total: "0원" },
  { number: "#2518", type: "포장", total: "0원" },
];

function FigmaOrderCard({ order }) {
  return (
    <article className="figma-order-card" aria-label={`${order.number} 주문 미리보기`}>
      <header className="figma-order-card__header">
        <strong>{order.number}</strong>
        <time>00:00:00</time>
      </header>
      <span className={`figma-order-card__type${order.type === "포장" ? " figma-order-card__type--takeout" : ""}`}>
        {order.type}
      </span>
      <div className="figma-order-card__menus">
        {[0, 1, 2].map((itemIndex) => (
          <section className="figma-order-menu" key={itemIndex}>
            <div className="figma-order-menu__title"><strong>menu name</strong><span>1</span></div>
            <p>베이스 : 추천</p>
            <p>드레싱 : 발사믹</p>
            <div className="figma-order-menu__options">
              {['할라피뇨', '아보카도', 'item name', 'item name'].map((option, optionIndex) => {
                const icon = optionIndex < 2 ? plusIcon : optionIndex === 2 ? chipBagIcon : drinkIcon;
                return (
                <span key={`${itemIndex}-${optionIndex}`} className={`figma-order-option figma-order-option--${optionIndex}`}>
                  <i><img alt="" src={icon} /></i>{option}
                </span>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <footer className="figma-order-card__footer">
        <div><span>총액</span><strong>{order.total}</strong></div>
        <div className="figma-order-card__actions">
          <button disabled type="button">취소</button>
          <button disabled type="button">완료 호출</button>
        </div>
      </footer>
    </article>
  );
}

export default function LiveOrderPreview() {
  return (
    <section className="live-order-preview" aria-label="주문 현황 정적 프리뷰">
      <header className="live-order-preview__topbar">
        <div className="live-order-preview__logo" aria-label="ASAK">
          <img alt="ASAK" src={asakSLogo} />
        </div>
        <div className="live-order-preview__heading">
          <h1>주문 현황</h1>
          <p>조리 완료 처리 시 TTS 알림이 발송됩니다</p>
        </div>
        <time>현재 시각: 14:30:15</time>
      </header>

      <main className="live-order-preview__content">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="이전 주문">
          ‹
        </button>

        <div className="live-order-preview__board">
          {previewOrders.map((order) => <FigmaOrderCard key={order.number} order={order} />)}
        </div>

        <button type="button" className="live-order-preview__arrow" disabled aria-label="다음 주문">
          ›
        </button>
      </main>
    </section>
  );
}
