/*
 * 품절 토글 (SCR-011)
 *
 * mock row: getSoldOutCatalog().data.available[] | soldOut[]
 *   targetType, targetId, name, isSoldOut
 * Props 후보: target, isSoldOut, disabled, onToggle
 * 저장/롤백은 useSoldOutDraft — 토글에서 API 직접 호출 금지
 * 표: public/mocks/README.md §4
 */
export default function SoldOutToggle() {
  return null;
}
