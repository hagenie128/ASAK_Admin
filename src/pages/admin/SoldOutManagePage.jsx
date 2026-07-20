/*
 * SCR-011 / Sold-out Management / Default (Figma node 134:11863)
 * 좌우 패널 정적 UI. draft/저장은 useSoldOutDraft 소유.
 *
 * mock: getSoldOutCatalog().data
 *   available[] | soldOut[] 동일 row:
 *     targetType, targetId, name, category, isSoldOut, imageKey, price
 * 표: public/mocks/README.md §4
 */
// TODO: getSoldOutCatalog + useSoldOutDraft로 draft/저장, 실패 시 롤백 (WBS2-038)
import chickenImage from "../../assets/figma/soldout-chicken.png";
import pastaImage from "../../assets/figma/soldout-pasta.png";
import ricottaImage from "../../assets/figma/soldout-ricotta.png";
import salmonImage from "../../assets/figma/soldout-salmon.png";
import sandwichImage from "../../assets/figma/soldout-sandwich.png";
import tomatoImage from "../../assets/figma/soldout-tomato.png";
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

const TABS = ["메뉴", "재료", "옵션 선택지"];
const CHIPS = ["전체", "샐러드", "샌드위치", "웜볼", "랩", "사이드", "음료"];

// [이름, 카테고리, 이미지, 선택여부]
const availableItems = [
  ["리코타 샐러드", "샐러드", ricottaImage, true],
  ["연어 포케볼", "샐러드", salmonImage, false],
  ["그릭 샐러드", "샐러드", tomatoImage, true],
  ["치킨 클럽 샌드위치", "샌드위치", sandwichImage, false],
  ["에그 베네딕트", "샌드위치", chickenImage, false],
  ["불고기 웜볼", "웜볼", pastaImage, false],
  ["치킨 시저 랩", "랩", salmonImage, false],
  ["고구마 프라이", "사이드", sandwichImage, false],
  ["오렌지 주스", "음료", ricottaImage, false],
];

const soldOutItems = [
  ["레몬에이드", "음료", tomatoImage],
  ["바질 페스토 파스타", "웜볼", pastaImage],
  ["베이컨 랩", "랩", salmonImage],
  ["퀴노아 샐러드", "샐러드", sandwichImage],
];

function ItemCard({ name, category, image, checked = false, soldOut = false }) {
  return (
    <article className={`sold-out-card${checked ? " is-checked" : ""}`}>
      <div className="sold-out-card__image">
        <img src={image} alt="" />
        <input type="checkbox" checked={checked || soldOut} readOnly disabled aria-label={`${name} 선택`} />
      </div>
      <div className="sold-out-card__info">
        <strong>{name}</strong>
        <div className="sold-out-card__chips">
          <span className="sold-out-chip">{category}</span>
          {soldOut && <span className="sold-out-chip sold-out-chip--danger">품절</span>}
        </div>
      </div>
    </article>
  );
}

export default function SoldOutManagePage() {
  return (
    <section className="sold-out-management" data-figma-node="241:14211">
      <AdminTopHeader
        crumb="Admin / 품절 관리"
        title="품절 관리"
        description="메뉴, 재료, 옵션의 판매 상태를 관리하세요."
      />

      <div className="sold-out-management__workspace">
        <section className="sold-out-panel" aria-label="판매 항목">
          <div className="sold-out-panel__controls">
            <div className="sold-out-tabs" aria-label="항목 유형">
              {TABS.map((label, index) => (
                <button key={label} type="button" disabled className={index === 0 ? "is-selected" : ""}>
                  {label}
                </button>
              ))}
            </div>
            <label className="sold-out-search">
              <span className="sr-only">이름으로 검색</span>
              <input value="" placeholder="이름으로 검색..." readOnly disabled />
              <i aria-hidden="true" />
            </label>
          </div>

          <div className="sold-out-chips" aria-label="카테고리">
            {CHIPS.map((category, index) => (
              <button key={category} type="button" disabled className={index === 0 ? "is-selected" : ""}>
                {category}
              </button>
            ))}
          </div>

          <div className="sold-out-panel__title">
            <strong>전체 항목</strong>
            <span>12</span>
          </div>

          <div className="sold-out-grid">
            {availableItems.map(([name, category, image, checked]) => (
              <ItemCard key={name} name={name} category={category} image={image} checked={checked} />
            ))}
          </div>
        </section>

        <div className="sold-out-transfer" aria-label="항목 이동">
          <button type="button" disabled className="is-primary" aria-label="품절 목록으로 이동">
            →
          </button>
          <button type="button" disabled aria-label="전체 항목으로 이동">
            ←
          </button>
        </div>

        <section className="sold-out-panel sold-out-panel--selected" aria-label="품절 항목">
          <div className="sold-out-panel__controls sold-out-panel__controls--selected">
            <div className="sold-out-panel__title">
              <strong>품절 목록</strong>
              <span>4</span>
            </div>
            <button type="button" disabled className="sold-out-clear">
              전체 해제
            </button>
          </div>

          <div className="sold-out-grid">
            {soldOutItems.map(([name, category, image]) => (
              <ItemCard key={name} name={name} category={category} image={image} soldOut />
            ))}
          </div>

          <div className="sold-out-save">
            <span className="sold-out-save__badge">변경사항 3건</span>
            <button type="button" disabled>
              변경사항 저장
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
