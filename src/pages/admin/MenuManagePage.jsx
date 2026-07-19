/*
 * SCR-016 / Menu Management / Default (Figma node 134:12137)
 *
 * 좌측 목록(980) + 우측 상세 패널(700)의 정적 UI만 담는다.
 * 메뉴 조회, 검색, 카테고리 필터, 등록·수정·삭제는 이후 메뉴 query/mutation이 소유한다.
 */
import ricottaImage from "../../assets/figma/soldout-ricotta.png";
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

export default function MenuManagePage() {
  return (
    <section className="menu-management">
      <AdminTopHeader
        crumb="Admin / 메뉴 관리"
        title="메뉴 관리"
        description="상품 기본정보 / 가격 / 카테고리 / 옵션그룹 / 노출여부를 관리하세요."
      />

      <div className="menu-management__workspace">
      <div className="menu-management__list">
        <div className="menu-management__toolbar">
          <div className="menu-management__tabs">
            <button type="button" disabled className="is-selected">전체</button><button type="button" disabled>샐러드</button><button type="button" disabled>포케볼</button><button type="button" disabled>랩&롤</button><button type="button" disabled>음료</button>
          </div>
          <label className="menu-management__search">
            <span className="sr-only">메뉴명 검색</span>
            <i aria-hidden="true" />
            <input value="" placeholder="메뉴명 검색" readOnly disabled />
          </label>
        </div>

        <div className="menu-management__grid">
          <article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article><article className="admin-menu-card"><img src={ricottaImage} alt="" /><div><strong>MENU</strong><b>9,300</b></div></article>
        </div>
      </div>

      {/* Menu-Detail-Panel (134:12167) — 700 폭, 내부 스크롤 */}
      <aside className="menu-detail-panel">
        <div className="menu-detail-panel__scroll">
          <header className="menu-detail__header">
            <div>
              <h2>기본 정보</h2>
              <p>등록된 상품의 상세 정보 및 노출 설정을 보여줍니다.</p>
            </div>
            <div className="menu-detail__actions">
              <button type="button" disabled className="is-delete">삭제</button>
              <button type="button" disabled className="is-edit">수정</button>
            </div>
          </header>

          <section className="menu-detail-card menu-detail-basic">
            <div className="menu-detail-basic__top">
              <img src={ricottaImage} alt="" />
              <div className="menu-detail-basic__info">
                <div className="menu-detail-basic__name">
                  <strong>케이준 쉬림프 샐러드</strong>
                  <span className="menu-detail-badge">판매중</span>
                </div>
                <p>
                  <span>카테고리</span>
                  <b>샐러드</b>
                </p>
                <p className="menu-detail-basic__price">
                  <span>판매 가격</span>
                  <b>9,900원</b>
                </p>
              </div>
            </div>
            <div className="menu-detail-basic__desc">
              <span>메뉴 설명</span>
              <p>탱글탱글한 새우와 바삭한 케이준 시즈닝이 어우러진 신선한 프리미엄 샐러드입니다.</p>
            </div>
          </section>

          <section className="menu-detail-card menu-detail-ingredients">
            <header>
              <h3>기본 재료</h3>
              <span>지정된 정량 정보</span>
            </header>

            <div className="menu-detail-ingredients__group">
              <p className="menu-detail-legend menu-detail-legend--core">핵심 재료</p>
              <div className="menu-ingredient-row menu-ingredient-row--core">
                <strong>케이준 쉬림프</strong>
                <b>5개 · 기본 포함 · 제거 불가</b>
              </div>
            </div>

            <div className="menu-detail-ingredients__group">
              <p className="menu-detail-legend menu-detail-legend--base">베이스 재료</p>
              <div className="menu-ingredient-row menu-ingredient-row--base">
                <strong>로메인</strong>
                <b>80g · 기본 포함 · 제거 불가</b>
              </div>
            </div>

            <div className="menu-detail-ingredients__group">
              <p className="menu-detail-legend menu-detail-legend--plain">일반 기본 재료</p>
              <div className="menu-ingredient-chips">
                <span>방울토마토 <i>30g</i></span><span>옥수수 <i>30g</i></span><span>크루통 <i>30g</i></span>
              </div>
            </div>
          </section>

          <section className="menu-detail-card menu-detail-options">
            <h3>옵션 그룹</h3>
            <div className="menu-detail-options__grid">
              <article><div><strong>드레싱</strong><em>필수</em></div><p>추천 : 레몬허브 드레싱</p></article><article><div><strong>베이스</strong><em>필수</em></div><p>추천 : 레몬허브 드레싱</p></article><article><div><strong>토핑</strong><em>필수</em></div><p>추천 : 레몬허브 드레싱</p></article><article><div><strong>소스</strong><em>필수</em></div><p>추천 : 레몬허브 드레싱</p></article><article><div><strong>사이드</strong><em>필수</em></div><p>추천 : 레몬허브 드레싱</p></article><article><div><strong>음료</strong><em>필수</em></div><p>추천 : 레몬허브 드레싱</p></article>
            </div>
          </section>

          <section className="menu-detail-card menu-detail-nutrition">
            <header>
              <h3>영양 정보</h3>
              <span>정량 기준 자동 분석</span>
            </header>
            <div className="menu-detail-nutrition__grid">
              <div><span>칼로리</span><b>320 kcal</b></div><div><span>단백질</span><b>18 g</b></div><div><span>탄수화물</span><b>25 g</b></div><div><span>지방</span><b>15 g</b></div><div><span>나트륨</span><b>580 mg</b></div>
            </div>
          </section>

          <section className="menu-detail-tags">
            <article>
              <h3>알레르기 정보</h3>
              <div>
                <span>갑각류</span><span>우유</span><span>대두</span><span>밀</span>
              </div>
            </article>
            <article>
              <h3>태그 설정</h3>
              <div>
                <span className="menu-tag menu-tag--best">BEST</span>
                <span className="menu-tag menu-tag--new">NEW</span>
                <span className="menu-tag menu-tag--vegan">Vegan</span>
              </div>
            </article>
          </section>
        </div>
      </aside>
      </div>
    </section>
  );
}
