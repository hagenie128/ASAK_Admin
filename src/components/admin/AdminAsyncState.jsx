/*
 * Figma Shared/LoadingState · EmptyState · ErrorState 뼈대 (WBS2-044~045)
 *
 * Props 후보 (연결 시):
 *   status: "loading" | "empty" | "error"
 *   title?, message?, onRetry?
 * 데이터 JSON과 무관 — 각 Page의 listStatus / query 상태만 받음
 */
// TODO: loading / empty / error props 분기 후 각 Page에 적용 (WBS2-044~045)
export default function AdminAsyncState() {
  return (
    <section className="admin-async-state admin-async-state--loading" role="status">
      <span className="admin-async-state__icon" aria-hidden="true" />
      <h2>불러오는 중입니다</h2>
      <p>상태별 문구가 표시되는 영역입니다.</p>
    </section>
  );
}
