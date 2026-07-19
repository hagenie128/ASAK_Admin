import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

/* SCR-008 / Dashboard / Default */
export default function DashboardPage() {
  return (
    <section className="admin-dashboard" aria-label="대시보드 정적 미리보기">
      <AdminTopHeader crumb="Admin / 대시보드" title="대시보드" description="오늘의 매출 현황 및 핵심 지표"><div className="admin-dashboard__date"><b>오늘</b><span>2026.07.10</span></div></AdminTopHeader>
      <div className="admin-dashboard__kpis"><article><span>오늘 매출</span><strong>392,500원</strong></article><article><span>결제 승인</span><strong>36건</strong></article><article><span>객단가</span><strong>10,903원</strong></article><article><span>현재 대기 주문</span><strong>1건</strong></article></div>
      <div className="admin-dashboard__middle">
        <section className="dashboard-panel dashboard-orders"><h2>최근 주문</h2><div className="dashboard-orders__table"><div className="dashboard-orders__head"><span>주문번호</span><span>유형</span><span>메뉴</span><span>금액</span><span>상태</span><span>시간</span></div>
          <div className="dashboard-orders__row"><b>A-003</b><span>포장</span><span>로스트닭다리살 샐러드</span><span>9,900원</span><em className="dashboard-status dashboard-status--waiting">대기</em><span>오전 9:05</span></div>
          <div className="dashboard-orders__row"><b>A-1024</b><span>매장</span><span>로스트닭다리살 샐러드 외 3건</span><span>128,800원</span><em className="dashboard-status dashboard-status--preparing">조리중</em><span>오후 12:48</span></div>
          <div className="dashboard-orders__row"><b>A-001</b><span>포장</span><span>탄단지 샐러디</span><span>11,400원</span><em className="dashboard-status dashboard-status--complete">완료</em><span>오후 1:03</span></div>
        </div></section>
        <section className="dashboard-panel dashboard-status-summary"><h2>주문 상태 요약</h2>
          <div className="dashboard-status-summary__row"><p><span>대기</span><b>1건</b></p><i><em className="dashboard-status-fill dashboard-status-fill--waiting" style={{ width: "6.9915254237%" }} /></i></div>
          <div className="dashboard-status-summary__row"><p><span>조리중</span><b>1건</b></p><i><em className="dashboard-status-fill dashboard-status-fill--preparing" style={{ width: "12.0762711864%" }} /></i></div>
          <div className="dashboard-status-summary__row"><p><span>완료</span><b>1건</b></p><i><em className="dashboard-status-fill dashboard-status-fill--complete" style={{ width: "80.9322033898%" }} /></i></div>
          <div className="dashboard-order-type"><div><span>매장</span><b>1건</b></div><div><span>포장</span><b>2건</b></div></div>
        </section>
      </div>
      <div className="admin-dashboard__bottom">
        <section className="dashboard-panel dashboard-inventory"><h2>품절 / 재고 알림</h2><div className="dashboard-inventory__row"><span>타코 쉬림프 포케볼</span><b className="dashboard-badge dashboard-badge--danger">품절</b></div><div className="dashboard-inventory__row"><span>아보카도 추가</span><b className="dashboard-badge dashboard-badge--normal">기본</b></div><div className="dashboard-inventory__row"><span>추가 품절 없음</span><b className="dashboard-badge dashboard-badge--normal">기본</b></div><p className="dashboard-inventory__note">품절 항목은 키오스크에서 자동 비활성화됩니다</p></section>
        <section className="dashboard-panel dashboard-trend"><h2>매출 추이 요약</h2><div className="dashboard-trend__chart"><div><i style={{ height: "113px" }} /><span>8일</span></div><div><i style={{ height: "102px" }} /><span>9일</span></div><div><i style={{ height: "137px" }} /><span>10일</span></div><div><i style={{ height: "124px" }} /><span>—</span></div><div><i className="is-current" style={{ height: "136px" }} /><span>—</span></div></div><div className="dashboard-trend__stats"><div><span>이번 주 매출</span><b>1,186,900원</b></div><div><span>일 평균</span><b>395,633원</b></div><div><span>전주 대비</span><b className="is-down">↓ 17.0%</b></div></div></section>
      </div>
    </section>
  );
}
