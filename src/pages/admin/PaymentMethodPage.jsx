/*
 * 화면: Payment Methods SCR-018
 * 현재 Page 파일: PaymentMethodPage.jsx
 * 현재 Route: "/payment-methods" → 아직 AdminScreen
 * 필요한 데이터: 결제수단 목록, 활성 여부, 노출 순서
 * 상태 소유 후보: 서버 원본 vs Draft(순서·활성) / Preview는 읽기 전용 파생
 * API 호출 후보 위치: api (API-013/014 계약 후) — Preview에서 저장 호출 금지
 * Adapter 필요 여부: 계약 후
 * Hook 분리 필요 여부: 활성·순서 Draft와 Preview 표시 분리
 * 공통 Component 후보: PageHeader, SaveBar, ConfirmDialog, Loading/Error
 * Figma Component 연결 후보: SaveBar, (키오스크 Preview 프레임 명칭 확인)
 * 최종 명칭 확인 필요: path `/payment-methods` vs canonical `/paymentMethods`
 * Figma 승인 후 연결할 Props: methods, onReorder, onToggleActive, previewProps
 * 이 파일이 직접 처리하면 안 되는 상태: Preview가 실제 저장 상태를 직접 변경
 * 아직 구현하면 안 되는 부분: 완성 드래그 UI/CSS, 키오스크 Preview 픽셀
 *
 * TODO 1: Draft 저장 성공 전에는 Preview가 서버 확정값처럼 보이지 않게 라벨 구분
 * TODO 2: 실패 시 이전 순서·활성 복구
 */

export default function PaymentMethodPage() {
  return null;
}
