/* SCR-016 메뉴 목록 (탭·검색·그리드) */
import ricottaImage from "../../assets/figma/soldout-ricotta.png";
import { formatCurrency } from "../../utils/currency.js";
import AdminAsyncState from "./AdminAsyncState.jsx";
import AdminSearchInput from "./AdminSearchInput.jsx";

export default function MenuListPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  keyword,
  onKeywordChange,
  menus,
  selectedMenuId,
  onSelectMenu,
  onCreate,
  pagination = null,
}) {
  return (
    <div className="menu-management__list">
      <div className="menu-management__toolbar">
        <div className="menu-management__tabs">
          {categories.map((label) => (
            <button
              key={label}
              type="button"
              className={label === selectedCategory ? "is-selected" : ""}
              onClick={() => onCategoryChange(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="menu-management__toolbar-right">
          <label className="menu-management__search">
            <span className="sr-only">메뉴명 검색</span>
            <i aria-hidden="true" />
            <AdminSearchInput
              className="admin-search-input--embedded"
              value={keyword}
              placeholder="메뉴명 검색"
              onChange={(next) => onKeywordChange(next)}
            />
          </label>
          {onCreate ? (
            <button type="button" className="menu-management__create" onClick={onCreate}>
              신규 메뉴
            </button>
          ) : null}
        </div>
      </div>
      <div className="menu-management__grid">
        {menus.length === 0 ? (
          <AdminAsyncState
            status="empty"
            layout="inline"
            title="조건에 맞는 메뉴가 없습니다"
            description="카테고리·검색어를 바꿔 보세요."
          />
        ) : (
          menus.map((menu) => (
            <article
              key={menu.menuId}
              className={`admin-menu-card${menu.menuId === selectedMenuId ? " is-selected" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={menu.menuId === selectedMenuId}
              onClick={() => onSelectMenu(menu.menuId)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectMenu(menu.menuId);
                }
              }}
            >
              <img src={menu.detail?.imageUrl || ricottaImage} alt="" />
              <div>
                <strong>{menu.name}</strong>
                <b>{formatCurrency(menu.price)}</b>
              </div>
            </article>
          ))
        )}
      </div>
      {pagination}
    </div>
  );
}
