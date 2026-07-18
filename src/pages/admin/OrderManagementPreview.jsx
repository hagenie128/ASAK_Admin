const orders = [
  ["#20250212-001", "2025.02.12 14:23", "포장", "오리엔탈 우삼겹 샐러드 외 1", "2", "15,800원", "접수", "결제완료"],
  ["#20250212-002", "2025.02.12 14:25", "매장", "연어 스테이크 샐러드", "1", "14,500원", "준비중", "결제완료"],
  ["#20250212-003", "2025.02.12 14:28", "매장", "베이컨 아보카도 샐러드", "1", "9,800원", "완료", "결제완료"],
  ["#20250212-004", "2025.02.12 14:30", "매장", "우삼겹 볶음밥", "1", "11,200원", "접수", "결제대기"],
  ["#20250212-005", "2025.02.12 14:32", "포장", "닭가슴살 샐러드", "2", "18,400원", "취소", "환불"],
  ["#20250212-006", "2025.02.12 14:35", "매장", "쉬림프 샐러드 샷 2", "3", "25,600원", "준비중", "결제완료"],
  ["#20250212-007", "2025.02.12 14:38", "포장", "목살 스테이크 밀볼", "1", "12,500원", "완료", "결제완료"],
  ["#20250212-008", "2025.02.12 14:40", "매장", "단호박 무스 샐러드", "1", "8,500원", "접수", "결제완료"],
  ["#20250212-009", "2025.02.12 14:42", "포장", "두부 소보로 샐러드", "1", "9,200원", "완료", "결제완료"],
  ["#20250212-010", "2025.02.12 14:45", "매장", "리코타 치즈 샐러드", "1", "10,800원", "준비중", "결제완료"],
];

const statusClass = { 접수: "received", 준비중: "preparing", 완료: "complete", 취소: "cancelled" };

export default function OrderManagementPreview() {
  return (
    <section className="order-management">
      <header className="order-management__header">
        <small>Admin / 주문 관리</small>
        <h1>주문 관리</h1>
        <p>주문 원본 데이터 조회, 상태 변경, 결제 상태 확인을 관리하세요.</p>
      </header>
      <div className="order-management__filters">
        {["주문 상태", "결제 상태", "주문 유형"].map((label) => <button disabled key={label} type="button">{label}⌄</button>)}
        <button disabled type="button">날짜 선택</button>
        <input aria-label="주문 검색" disabled placeholder="주문번호 / 메뉴명 검색" readOnly />
        <button className="order-management__search" disabled type="button">조회</button>
      </div>
      <div className="order-management__body">
        <div className="order-management__table-wrap">
          <table className="order-management__table">
            <thead><tr>{["주문번호", "주문일시", "주문유형", "메뉴 요약", "총 수량", "주문금액", "주문상태", "결제상태"].map((label) => <th key={label}>{label}</th>)}</tr></thead>
            <tbody>{orders.map((order) => <tr key={order[0]}>{order.map((cell, index) => <td key={`${order[0]}-${index}`}>{index === 6 ? <span className={`order-status order-status--${statusClass[cell]}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody>
          </table>
          <div className="order-management__pagination" aria-label="페이지네이션">‹ <b>1</b> <span>2</span> <span>3</span> <span>4</span> <span>5</span> ›</div>
        </div>
        <aside className="order-management__detail">
          <h2>주문 상세</h2>
          <dl><div><dt>주문번호</dt><dd>20250212-001</dd></div><div><dt>주문일시</dt><dd>2025.02.12 14:23</dd></div><div><dt>결제수단</dt><dd>신용카드 (현대 4421)</dd></div></dl>
          {[1, 2, 3].map((item) => <div className="order-management__item" key={item}><strong>오리엔탈 우삼겹 샐러드</strong><span>1개　<b>12,800원</b></span><small>옵션: 베이스 추천, 드레싱 발사믹 | 제외: 글루텐, 토마토</small></div>)}
          <section><h3>요청사항</h3><p>요청사항 없음</p></section>
          <div className="order-management__total"><strong>총 결제 금액</strong><b>0원</b></div>
          <footer><button disabled type="button">닫기</button><button disabled type="button">환불</button><button disabled type="button">영수증 출력</button></footer>
        </aside>
      </div>
    </section>
  );
}
