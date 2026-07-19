// Figma Shared/ConfirmDialog와 Admin/ModalActionBar 정적 UI 뼈대.
// 관리자 확인 대화상자 자리.
export default function AdminConfirmDialog() {
  return (
    <div className="admin-confirm-layer" role="presentation">
      <section className="admin-confirm" role="dialog" aria-modal="true">
        <h2>확인이 필요합니다</h2>
        <p>상태별 안내 문구가 표시되는 영역입니다.</p>
        <div className="admin-confirm__actions">
          <button type="button" disabled>취소</button>
          <button type="button" className="is-primary" disabled>확인</button>
        </div>
      </section>
    </div>
  );
}
