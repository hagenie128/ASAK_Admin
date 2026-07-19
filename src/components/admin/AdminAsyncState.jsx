// Figma Shared/LoadingState · EmptyState · ErrorState 정적 UI 뼈대.
// 관리자 상태 UI 자리.
export default function AdminAsyncState() {
  return (
    <section className="admin-async-state admin-async-state--loading" role="status">
      <span className="admin-async-state__icon" aria-hidden="true" />
      <h2>불러오는 중입니다</h2>
      <p>상태별 문구가 표시되는 영역입니다.</p>
    </section>
  );
}
