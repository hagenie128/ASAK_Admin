/**
 * Figma SCR-009의 정적 프리뷰입니다.
 * JSON 불러오기, 주문 조회, 경과 시간 계산, 상태 변경, TTS 발송은 의도적으로 구현하지 않습니다.
 */
function OrderCardPlaceholder() {
  return (
    <article className="live-order-card" aria-label="주문 카드 플레이스홀더">
      <header className="live-order-card__header">
        <strong>#----</strong>
        <span>--:--:--</span>
      </header>
      <span className="live-order-card__type">주문 방식</span>

      <div className="live-order-card__items">
        <section className="live-order-item">
          <div className="live-order-item__title">
            <strong>메뉴 이름</strong>
            <span>0</span>
          </div>
          <p>베이스: 선택 전</p>
          <p>드레싱: 선택 전</p>
          <ul><li>＋ 옵션 플레이스홀더</li></ul>
        </section>
        <section className="live-order-item live-order-item--placeholder">
          <p>주문 데이터가 연결되면 메뉴 항목이 표시됩니다.</p>
        </section>
      </div>

      <button type="button" className="live-order-card__cta" disabled>
        조리 완료
      </button>
      {/* TODO: JSON 로드 → API adapter → 상태 전이 → TTS 발송 → 목록 갱신을 구현합니다. */}
    </article>
  );
}

export default function LiveOrderPreview() {
  return (
    <section className="live-order-preview" aria-label="주문 현황 정적 프리뷰">
      <header className="live-order-preview__topbar">
        <div className="live-order-preview__logo" aria-label="ASAK">S</div>
        <div className="live-order-preview__heading">
          <h1>주문 현황</h1>
          <p>조리 완료 처리 시 TTS 알림이 발송됩니다</p>
        </div>
        <time>현재 시각: 14:30:15</time>
      </header>

      <main className="live-order-preview__content">
        <button type="button" className="live-order-preview__arrow" disabled aria-label="이전 주문">
          ‹
        </button>

        <div className="live-order-preview__board">
          <OrderCardPlaceholder />
          <OrderCardPlaceholder />
          <OrderCardPlaceholder />
          <OrderCardPlaceholder />
        </div>

        <button type="button" className="live-order-preview__arrow" disabled aria-label="다음 주문">
          ›
        </button>
      </main>
    </section>
  );
}
