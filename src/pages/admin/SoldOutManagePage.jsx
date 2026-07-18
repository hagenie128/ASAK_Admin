/* SCR-011 / Sold-out Management: static visual handoff only. */
import carrotImage from "../../assets/figma/soldout-carrot.png";
import chickenImage from "../../assets/figma/soldout-chicken.png";
import lettuceImage from "../../assets/figma/soldout-lettuce.png";
import pastaImage from "../../assets/figma/soldout-pasta.png";
import ricottaImage from "../../assets/figma/soldout-ricotta.png";
import salmonImage from "../../assets/figma/soldout-salmon.png";
import sandwichImage from "../../assets/figma/soldout-sandwich.png";
import tomatoImage from "../../assets/figma/soldout-tomato.png";

// Local mock data. Fetching, moving selected items, and saving belong to the future adapter.
const availableItems = [
  ["리코타 샐러드", "샐러드", ricottaImage, true], ["연어 포케볼", "샐러드", salmonImage],
  ["수비드 치킨 샐러드", "샐러드", chickenImage], ["토마토 파스타", "웜볼", tomatoImage],
  ["트러플 버섯 파스타", "웜볼", pastaImage], ["바질 치킨 샌드위치", "샌드위치", sandwichImage],
  ["연어 아보카도 랩", "랩", salmonImage], ["닭가슴살 또띠아 랩", "랩", chickenImage],
  ["오늘의 스프", "사이드", tomatoImage], ["레몬 에이드", "음료", ricottaImage],
  ["콜드브루", "음료", pastaImage], ["그릭 요거트", "사이드", sandwichImage],
];
const soldOutItems = [
  ["리코타 샐러드", "샐러드", ricottaImage], ["토마토 파스타", "웜볼", tomatoImage],
  ["바질 치킨 샌드위치", "샌드위치", sandwichImage], ["콜드브루", "음료", pastaImage],
];

function ItemCard({ item, isSoldOut = false }) {
  const [name, category, image, checked] = item;
  return <article className={`sold-out-card${isSoldOut ? " sold-out-card--active" : ""}`}>
    <div className="sold-out-card__image"><img src={image} alt="" /><input type="checkbox" checked={Boolean(checked || isSoldOut)} readOnly disabled aria-label={`${name} 선택`} /></div>
    <div className="sold-out-card__info"><strong>{name}</strong><span>{category}</span></div>
  </article>;
}

export default function SoldOutManagePage() {
  return <section className="sold-out-management">
    <header className="sold-out-management__header"><small>Admin / 품절 관리</small><h1>품절 관리</h1><p>메뉴, 재료, 옵션의 판매 상태를 관리하세요.</p></header>
    <div className="sold-out-management__workspace">
      <section className="sold-out-board" aria-label="판매 항목">
        <div className="sold-out-board__controls"><div className="sold-out-tabs" aria-label="항목 유형">{["메뉴", "재료", "옵션 선택지"].map((label, index) => <button key={label} type="button" disabled className={index === 0 ? "is-selected" : ""}>{label}</button>)}</div><label className="sold-out-search"><span className="sr-only">이름으로 검색</span><input value="" placeholder="이름으로 검색..." readOnly disabled /><span aria-hidden="true">⌕</span></label></div>
        <div className="sold-out-chips" aria-label="카테고리">{["전체", "샐러드", "샌드위치", "웜볼", "랩", "사이드", "음료"].map((category, index) => <button key={category} type="button" disabled className={index === 0 ? "is-selected" : ""}>{category}</button>)}</div>
        <div className="sold-out-board__title"><strong>전체 항목</strong><span>12</span></div><div className="sold-out-grid">{availableItems.map((item) => <ItemCard key={item[0]} item={item} />)}</div>
      </section>
      <div className="sold-out-management__transfer" aria-label="항목 이동"><button type="button" disabled aria-label="품절 목록으로 이동">→</button><button type="button" disabled aria-label="전체 항목으로 이동">←</button></div>
      <section className="sold-out-board sold-out-board--selected" aria-label="품절 항목"><div className="sold-out-board__selected-heading"><div><strong>품절 목록</strong><span>4</span></div><button type="button" disabled>전체 해제</button></div><p className="sold-out-board__hint">품절 처리할 항목을 선택하세요.</p><div className="sold-out-grid sold-out-grid--selected">{soldOutItems.map((item) => <ItemCard key={item[0]} item={item} isSoldOut />)}</div><div className="sold-out-save-bar"><span><b>Changed</b> 3</span><button type="button" disabled>저장</button></div></section>
    </div>
    <aside className="sold-out-promo" aria-hidden="true"><img className="sold-out-promo__lettuce" src={lettuceImage} alt="" /><img className="sold-out-promo__carrot" src={carrotImage} alt="" /></aside>
  </section>;
}
