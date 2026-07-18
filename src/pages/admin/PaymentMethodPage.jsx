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

import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import StaticToggle from "../../components/admin/StaticToggle.jsx";

const methods = [
  ["💳", "카드 / 삼성페이 결제", "신용 · 체크카드"],
  ["K", "카카오페이 결제", "모바일 간편결제"],
];

export default function PaymentMethodPage() {
  return (
    <section className="admin-page admin-page--narrow">
      <AdminPageHeader title="결제 수단" description="키오스크에서 노출할 결제 수단을 관리합니다." actionLabel="저장하기" />
      <div className="admin-method-list">
        {methods.map(([icon, title, description]) => (
          <article key={title} className="admin-method-row">
            <span className="admin-method-row__icon">{icon}</span>
            <div><strong>{title}</strong><small>{description}</small></div>
            <div className="admin-method-row__controls"><button type="button" disabled>↑</button><button type="button" disabled>↓</button><StaticToggle /></div>
          </article>
        ))}
      </div>
      <div className="admin-save-bar"><span>저장하지 않은 변경 사항이 있습니다.</span><button type="button" disabled>저장하기</button></div>
    </section>
  );
}
