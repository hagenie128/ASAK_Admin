import asakSLogo from "../../assets/svg/logo-S.svg";
import plusIcon from "../../assets/figma/icon-order-plus.svg";
import excludeIcon from "../../assets/figma/icon-order-exclude.svg";
import chipBagIcon from "../../assets/figma/icon-order-side.svg";
import drinkIcon from "../../assets/figma/icon-order-drink.svg";

/* SCR-009 / Live Order / Default */
const orderList = adiminMockData?.orderList;
const [order, setOrder] = orderList?.length > 0 ? orderList[0] : null;

function StaticMenuCard() {
  const [menu, setMenu] = order?.menuList?.length > 0 ? order.menuList[0] : null;

  return ( 
    <>
      {}
      <section className="figma-order-menu">
        <div className="figma-order-menu__header">
          <div className="figma-order-menu__title">
            <strong>{menu?.menuName || "menu name"}</strong>
            <span>{menu?.menuNumber || "0"}</span>
          <p className="figma-order-menu__base">
            <span>베이스:</span>
            <b>{menu?.base || "추천"}</b>
          </p>
          <p className="figma-order-menu__dressing">
            <span>드레싱:</span>
            <b>{menu?.dressing || "발사믹"}</b>
          </p>
        </div>
        <div className="figma-order-menu__options">
          <ul>
            <li className="figma-order-option figma-order-option--exclude">
              <i aria-hidden="true">
                <img alt="" src={excludeIcon} />
              </i>
              <span>{menu?.excludeItem || "토마토 제외"}</span>
            </li>
            <li className="figma-order-option figma-order-option--plus">
              <i aria-hidden="true">
                <img alt="" src={plusIcon} />
              </i>
              <span>{menu?.plusItem || "아보카도"}</span>
            </li>
          </ul>
          <ul>
            <li className="figma-order-option figma-order-option--side">
              <i aria-hidden="true">
                <img alt="" src={chipBagIcon} />
              </i>
              <span>{menu?.sideItem || "item name"}</span>
            </li>
            <li className="figma-order-option figma-order-option--drink">
              <i aria-hidden="true">
                <img alt="" src={drinkIcon} />
              </i>
              <span>{menu?.drinkItem || "item name"}</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
function StaticOrderCard({ number, type, wide = false }) {
  return (
    <article
      className={`figma-order-card${wide ? " figma-order-card--wide" : ""}`}
      aria-label={`${number} 주문 미리보기`}
    >
      <header className="figma-order-card__header">
        <strong>{number}</strong>
        <time>00:00:00</time>
      </header>
      <span
        className={`figma-order-card__type${type === "포장" ? " figma-order-card__type--takeout" : ""}`}
      >
        {type}
      </span>
      <div className="figma-order-card__menus">
        <StaticMenuCard />
        <StaticMenuCard />
        <StaticMenuCard />
      </div>
      <footer className="figma-order-card__footer">
        <div className="figma-order-card__total">
          <span>총액</span>
          <strong>
            0<em>원</em>
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
          <time>현재 시각: 14:30:15</time>
        </div>
      </header>
      <main className="live-order-preview__content">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="이전 주문">
          ‹
        </button>
        <div className="live-order-preview__board">
          <StaticOrderCard number="#1325" type="매장" />
          <StaticOrderCard number="#248" type="매장" />
          <StaticOrderCard number="#2318" type="매장" />
          <StaticOrderCard number="#2518" type="포장" wide />
        </div>     
        <button type="button" className="live-order-preview__arrow" disabled aria-label="다음 주문">
          ›
        </button>        
      </main>
    </section>  
  );
}
