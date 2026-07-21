/*
 * SCR-011 / Sold-out Management
 * getSoldOutCatalog() → useSoldOutDraft
 */
import { useMemo, useState } from "react";
import chickenImage from "../../assets/figma/soldout-chicken.png";
import pastaImage from "../../assets/figma/soldout-pasta.png";
import ricottaImage from "../../assets/figma/soldout-ricotta.png";
import salmonImage from "../../assets/figma/soldout-salmon.png";
import sandwichImage from "../../assets/figma/soldout-sandwich.png";
import tomatoImage from "../../assets/figma/soldout-tomato.png";
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";
import AdminPagination from "../../components/admin/AdminPagination.jsx";
import { soldOutRowKey, useSoldOutDraft } from "../../hooks/useSoldOutDraft.js";
import { usePagination } from "../../hooks/usePagination.js";
import { toast } from "../../utils/toast.js";

const TABS = ["메뉴", "재료", "옵션 선택지"];
const SOLD_OUT_PAGE_SIZE = 12;

const IMAGE_BY_KEY = {
  chicken: chickenImage,
  pasta: pastaImage,
  ricotta: ricottaImage,
  salmon: salmonImage,
  sandwich: sandwichImage,
  tomato: tomatoImage,
};

function ItemCard({ item, checked, onToggle, soldOut = false }) {
  const image = IMAGE_BY_KEY[item.imageKey] ?? chickenImage;

  return (
    <article
      className={`sold-out-card${checked ? " is-checked" : ""}`}
      role="checkbox"
      aria-checked={checked}
      aria-label={`${item.name} 선택`}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="sold-out-card__image">
        <img src={image} alt="" />
        <input type="checkbox" checked={checked} readOnly tabIndex={-1} aria-hidden="true" />
      </div>
      <div className="sold-out-card__info">
        <strong>{item.name}</strong>
        <div className="sold-out-card__chips">
          <span className="sold-out-chip">{item.category}</span>
          {soldOut ? <span className="sold-out-chip sold-out-chip--danger">품절</span> : null}
        </div>
      </div>
    </article>
  );
}

export default function SoldOutManagePage() {
  const draft = useSoldOutDraft();
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = useMemo(() => {
    const names = new Set(draft.available.map((row) => row.category).filter(Boolean));
    return ["전체", ...names];
  }, [draft.available]);

  const filteredAvailable = useMemo(() => {
    if (selectedCategory === "전체") return draft.available;
    return draft.available.filter((row) => row.category === selectedCategory);
  }, [draft.available, selectedCategory]);

  const availablePage = usePagination(filteredAvailable, { pageSize: SOLD_OUT_PAGE_SIZE });
  const soldOutPage = usePagination(draft.soldOut, { pageSize: SOLD_OUT_PAGE_SIZE });

  function handleCategoryChange(name) {
    setSelectedCategory(name);
    availablePage.resetPage();
  }

  async function handleSave() {
    const result = await draft.save();
    if (result.success) {
      toast.success(result.message || "저장되었습니다.");
    } else {
      toast.error(result.message || "저장에 실패했습니다.");
    }
  }

  if (draft.status === "loading") {
    return (
      <section className="sold-out-management">
        <AdminTopHeader crumb="Admin / 품절 관리" title="품절 관리" description="불러오는 중…" />
      </section>
    );
  }

  return (
    <section className="sold-out-management" data-figma-node="241:14211">
      <AdminTopHeader
        crumb="Admin / 품절 관리"
        title="품절 관리"
        description="메뉴, 재료, 옵션의 판매 상태를 관리하세요."
      />
      <div className="sold-out-management__workspace">
        <AvailablePanel
          items={availablePage.pageItems}
          totalCount={availablePage.totalElements}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedKeys={draft.selectedAvailable}
          onToggle={draft.toggleAvailableSelect}
          pagination={availablePage}
        />
        <div className="sold-out-transfer" aria-label="항목 이동">
          <button
            type="button"
            className="is-primary"
            disabled={!draft.canMoveToSoldOut}
            aria-label="품절 목록으로 이동"
            onClick={draft.moveToSoldOut}
          >
            →
          </button>
          <button
            type="button"
            disabled={!draft.canMoveToAvailable}
            aria-label="전체 항목으로 이동"
            onClick={draft.moveToAvailable}
          >
            ←
          </button>
        </div>
        <SoldOutPanel
          items={soldOutPage.pageItems}
          totalCount={soldOutPage.totalElements}
          dirtyCount={draft.dirtyCount}
          canSave={draft.canSave}
          isSaving={draft.isSaving}
          selectedKeys={draft.selectedSoldOut}
          onToggle={draft.toggleSoldOutSelect}
          onSelectPage={draft.selectSoldOutPage}
          onClearSelection={draft.clearSoldOutSelection}
          onSave={handleSave}
          pagination={soldOutPage}
        />
      </div>
    </section>
  );
}

function AvailablePanel({
  items,
  totalCount,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedKeys,
  onToggle,
  pagination,
}) {
  return (
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
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === selectedCategory ? "is-selected" : ""}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="sold-out-panel__title">
        <strong>전체 항목</strong>
        <span>{totalCount}</span>
      </div>

      <div className="sold-out-grid">
        {items.map((item) => {
          const key = soldOutRowKey(item);
          return (
            <ItemCard
              key={key}
              item={item}
              checked={selectedKeys.has(key)}
              onToggle={() => onToggle(key)}
            />
          );
        })}
      </div>

      <AdminPagination
        className="sold-out-panel__pagination"
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalElements={pagination.totalElements}
        onPageChange={pagination.goToPage}
      />
    </section>
  );
}

function SoldOutPanel({
  items,
  totalCount,
  dirtyCount,
  canSave,
  isSaving,
  selectedKeys,
  onToggle,
  onSelectPage,
  onClearSelection,
  onSave,
  pagination,
}) {
  const hasSelection = selectedKeys.size > 0;

  function handleToggleAll() {
    if (hasSelection) {
      onClearSelection();
      return;
    }
    onSelectPage(items);
  }

  return (
    <section className="sold-out-panel sold-out-panel--selected" aria-label="품절 항목">
      <div className="sold-out-panel__controls sold-out-panel__controls--selected">
        <div className="sold-out-panel__title">
          <strong>품절 목록</strong>
          <span>{totalCount}</span>
        </div>
        <button
          type="button"
          className="sold-out-clear"
          disabled={!hasSelection && items.length === 0}
          onClick={handleToggleAll}
        >
          {hasSelection ? "전체 해제" : "전체 선택"}
        </button>
      </div>

      <div className="sold-out-grid">
        {items.map((item) => {
          const key = soldOutRowKey(item);
          return (
            <ItemCard
              key={key}
              item={item}
              soldOut
              checked={selectedKeys.has(key)}
              onToggle={() => onToggle(key)}
            />
          );
        })}
      </div>

      <AdminPagination
        className="sold-out-panel__pagination"
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalElements={pagination.totalElements}
        onPageChange={pagination.goToPage}
      />

      <div className="sold-out-save">
        <span className="sold-out-save__badge">변경사항 {dirtyCount}건</span>
        <button type="button" disabled={!canSave} onClick={onSave}>
          {isSaving ? "저장 중…" : "변경사항 저장"}
        </button>
      </div>
    </section>
  );
}
