import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

/*
 * SCR-010 / Order Management / Default (Figma 134:10630)
 *
 * 화면 캡처와 동일한 정적 마크업만 둔다.
 */
export default function OrderManagementPreview() {
  return (
    <section className="order-management">
      <AdminTopHeader crumb="Admin / 주문 관리" title="주문 관리" description="주문 원본 데이터 조회, 상태 변경, 결제 상태 확인을 관리하세요." />
      <div className="order-management__filters">
        <button disabled type="button">주문 상태⌄</button><button disabled type="button">결제 상태⌄</button><button disabled type="button">주문 유형⌄</button>
        <button disabled type="button">날짜 선택</button><input aria-label="주문 검색" disabled placeholder="주문번호 / 메뉴명 검색" readOnly />
        <button className="order-management__search" disabled type="button">조회</button>
      </div>
      <div className="order-management__body">
        <div className="order-management__table-wrap">
          <table className="order-management__table">
            <thead><tr><th>주문번호</th><th>주문일시</th><th>주문유형</th><th>메뉴 요약</th><th>총 수량</th><th>주문금액</th><th>주문상태</th><th>결제상태</th></tr></thead>
            <tbody>
              <tr><td>#20250212-001</td><td>2025.02.12 14:23</td><td>포장</td><td>오리엔탈 우삼겹 샐러드 외 1</td><td>2</td><td>15,800원</td><td><span className="order-status order-status--received">접수</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-002</td><td>2025.02.12 14:25</td><td>매장</td><td>연어 스테이크 샐러드</td><td>1</td><td>14,500원</td><td><span className="order-status order-status--preparing">준비중</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-003</td><td>2025.02.12 14:28</td><td>매장</td><td>베이컨 아보카도 샐러드</td><td>1</td><td>9,800원</td><td><span className="order-status order-status--complete">완료</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-004</td><td>2025.02.12 14:30</td><td>매장</td><td>우삼겹 볶음밥</td><td>1</td><td>11,200원</td><td><span className="order-status order-status--received">접수</span></td><td>결제대기</td></tr>
              <tr><td>#20250212-005</td><td>2025.02.12 14:32</td><td>포장</td><td>닭가슴살 샐러드</td><td>2</td><td>18,400원</td><td><span className="order-status order-status--cancelled">취소</span></td><td><span className="order-refund">환불</span></td></tr>
              <tr><td>#20250212-006</td><td>2025.02.12 14:35</td><td>매장</td><td>쉬림프 샐러드 샷 2</td><td>3</td><td>25,600원</td><td><span className="order-status order-status--preparing">준비중</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-007</td><td>2025.02.12 14:38</td><td>포장</td><td>목살 스테이크 밀볼</td><td>1</td><td>12,500원</td><td><span className="order-status order-status--complete">완료</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-008</td><td>2025.02.12 14:40</td><td>매장</td><td>단호박 무스 샐러드</td><td>1</td><td>8,500원</td><td><span className="order-status order-status--received">접수</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-009</td><td>2025.02.12 14:42</td><td>포장</td><td>두부 소보로 샐러드</td><td>1</td><td>9,200원</td><td><span className="order-status order-status--complete">완료</span></td><td>결제완료</td></tr>
              <tr><td>#20250212-010</td><td>2025.02.12 14:45</td><td>매장</td><td>리코타 치즈 샐러드</td><td>1</td><td>10,800원</td><td><span className="order-status order-status--preparing">준비중</span></td><td>결제완료</td></tr>
            </tbody>
          </table>
          <div className="order-management__pagination" aria-label="페이지네이션">‹ <b>1</b> <span>2</span> <span>3</span> <span>4</span> <span>5</span> ›</div>
        </div>
        <aside className="order-management__detail">
          <h2>주문 상세</h2><dl><div><dt>주문번호</dt><dd>20250212-001</dd></div><div><dt>주문일시</dt><dd>2025.02.12 14:23:45</dd></div><div><dt>결제수단</dt><dd>신용카드 (현대 4421)</dd></div></dl>
          <div className="order-management__items">
            <div className="order-management__item"><strong>오리엔탈 우삼겹 샐러드</strong><span>1개　<b>12,800원</b></span><small>옵션: 베이스 추천, 드레싱 발사믹 | 제외: 크루통, 토마토</small></div>
            <div className="order-management__item"><strong>오리엔탈 우삼겹 샐러드</strong><span>1개　<b>12,800원</b></span><small>옵션: 베이스 추천, 드레싱 발사믹 | 제외: 크루통, 토마토</small></div>
            <div className="order-management__item"><strong>오리엔탈 우삼겹 샐러드</strong><span>1개　<b>12,800원</b></span><small>옵션: 베이스 추천, 드레싱 발사믹 | 제외: 크루통, 토마토</small></div>
          </div>
          <section><h3>요청사항</h3><p>요청사항 없음</p></section><div className="order-management__total"><strong>총 결제 금액</strong><b>0원</b></div>
          <footer><button disabled type="button">닫기</button><button disabled type="button">환불</button><button disabled type="button">영수증 출력</button></footer>
        </aside>
      </div>
    </section>
  );
}
