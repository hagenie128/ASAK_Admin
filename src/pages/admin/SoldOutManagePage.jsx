/*
 * 화면: Sold-out Management SCR-011
 * 현재 Page 파일: SoldOutManagePage.jsx
 * 현재 Route: "/sold-out" → 아직 AdminScreen (이 파일 미연결)
 * 필요한 데이터: MENU/INGREDIENT/OPTION_ITEM 품절 목록, reasonType
 * 상태 소유 후보: useSoldOutDraft (serverRows vs draftRows, isDirty)
 * API 호출 후보 위치: api/admin sold-out — SoldOutToggle 안에서 호출 금지(사건만 상위로)
 * Adapter 필요 여부: soldOutAdapter
 * Hook 분리 필요 여부: 예 (원본/Draft/저장 실패 복구)
 * 공통 Component 후보: PageHeader, FilterBar, DataTable, SoldOutToggle, SaveBar, ConfirmDialog, Loading/Empty/Error
 * Figma Component 연결 후보: FilterBar, DataTable, SaveBar, SoldOutToggle
 * 최종 명칭 확인 필요: path `/sold-out` vs canonical `/soldOut`
 * Figma 승인 후 연결할 Props: rows, typeFilter, isDirty, onToggle, onSave
 * 이 파일이 직접 처리하면 안 되는 상태: Live Order 상태 변경, Preview가 서버를 직접 수정
 * 아직 구현하면 안 되는 부분: 완성 토글 UI/CSS, 일괄 품절 픽셀 디자인
 *
 * TODO 1: 서버 원본 hydrate → Draft 편집 → save/fail 시 입력 유지
 * TODO 2: 요청 중 중복 토글 방지
 */

export default function SoldOutManagePage() {
  return null;
}
