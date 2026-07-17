/*
 * 화면: Menu Management 목록 SCR-016
 * 현재 Page 파일: MenuManagePage.jsx
 * 현재 Route: "/menus" → 아직 AdminScreen
 * 필요한 데이터: 메뉴 목록 (카테고리·이름·가격·판매상태)
 * 상태 소유 후보: 검색/카테고리 필터 = Page 또는 목록 Hook / 편집 Form은 MenuEditPage
 * API 호출 후보 위치: api (메뉴 API 계약 확정 후) — 목록 Hook
 * Adapter 필요 여부: 계약 확정 후 menuAdapter 후보 (아직 파일 미생성 — 추측 고정 금지)
 * Hook 분리 필요 여부: 목록과 편집 Form 상태 분리 필수
 * 공통 Component 후보: PageHeader, FilterBar, DataTable, Loading/Empty/Error
 * Figma Component 연결 후보: PageHeader, FilterBar, DataTable
 * 최종 명칭 확인 필요: MenuManage vs MenuList
 * Figma 승인 후 연결할 Props: rows, query, onCreate, onEdit
 * 이 파일이 직접 처리하면 안 되는 상태: 편집 Form 입력 전체, Validation 메시지 소유를 테이블에 넣기
 * 아직 구현하면 안 되는 부분: 완성 목록 JSX, 이미지 업로드 UI
 *
 * TODO 1: MenuEditPage로 등록/수정 진입 경로만 연결
 * TODO 2: API-011 필드 계약 확정 전 mock 필드 고정 금지
 */

export default function MenuManagePage() {
  return null;
}
