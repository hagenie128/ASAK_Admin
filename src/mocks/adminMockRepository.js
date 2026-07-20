/**
 * 관리자 mock 공급 경계.
 * 화면/Page는 JSON을 직접 import하지 말고 이 모듈만 사용한다.
 * 이후 실 API가 붙으면 여기만 client 호출로 바꾸면 된다.
 *
 * 필드·props 사전: public/mocks/README.md
 *   getLiveOrders      → liveOrders.data.content[]     (§1 Live 카드)
 *   getAdminOrders     → orders.data.content[]         (§2 목록)
 *   getAdminOrderById  → 주문 1건 / 404 envelope       (§2 상세)
 *   getDashboard       → dashboard.data                (§3)
 *   getSoldOutCatalog  → soldOut.data                  (§4)
 *   getAdminMenus      → menus.data.content[]          (§5)
 *   getPaymentMethods  → paymentMethods.data[]         (§6)
 *   getSalesSummary    → sales.summary (+ period)      (§7)
 *   getDailySales      → sales.daily.data              (§7)
 *   getMonthlySales    → sales.monthly.data            (§7)
 */
// TODO: 품절·결제수단·주문상태 PATCH/저장 stub + 실패 fixture 추가 (WBS2-037~040)
import adminMock from "../../public/mocks/asak-admin-data.json";

function clone(value) {
  return structuredClone(value);
}

export function getAdminMockMeta() {
  return clone(adminMock.meta);
}

export function getAdminScenarios() {
  return clone(adminMock.scenarios);
}

/** 주문 목록 (빈 목록이 필요하면 { empty: true }) */
export function getAdminOrders({ empty = false } = {}) {
  const envelope = clone(adminMock.orders);
  if (empty) {
    envelope.data = {
      content: [],
      totalElements: 0,
    };
  }
  return envelope;
}

export function getAdminOrderById(orderId) {
  const list = adminMock.orders.data.content;
  const found = list.find((order) => order.orderId === Number(orderId));
  if (!found) {
    return {
      success: false,
      status: 404,
      code: "ADMIN_ORDER_NOT_FOUND",
      message: "주문을 찾을 수 없습니다.",
      data: null,
    };
  }
  return {
    success: true,
    status: 200,
    code: "ADMIN_ORDER_DETAIL_SUCCESS",
    message: "주문 상세 조회 성공",
    data: clone(found),
  };
}

export function getLiveOrders() {
  return clone(adminMock.liveOrders);
}

export function getDashboard() {
  return clone(adminMock.dashboard);
}

export function getSoldOutCatalog() {
  return clone(adminMock.soldOut);
}

export function getPaymentMethods() {
  return clone(adminMock.paymentMethods);
}

export function getAdminMenus({ keyword = "", onlyActive } = {}) {
  const envelope = clone(adminMock.menus);
  let rows = envelope.data.content;
  if (keyword) {
    const q = String(keyword).toLowerCase();
    rows = rows.filter((row) => row.name.toLowerCase().includes(q));
  }
  if (onlyActive === true) {
    rows = rows.filter((row) => row.isActive);
  }
  if (onlyActive === false) {
    rows = rows.filter((row) => !row.isActive);
  }
  envelope.data.content = rows;
  envelope.data.totalElements = rows.length;
  return envelope;
}

/** period: today | week | month */
export function getSalesSummary(period = "month") {
  const envelope = clone(adminMock.sales.summary);
  const selected = envelope.data.periods[period] || envelope.data.periods.month;
  envelope.data = {
    period,
    ...selected,
    availablePeriods: Object.keys(adminMock.sales.summary.data.periods),
  };
  return envelope;
}

export function getDailySales() {
  return clone(adminMock.sales.daily);
}

export function getMonthlySales() {
  return clone(adminMock.sales.monthly);
}
