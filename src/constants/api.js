/*
 * Figma Component 연결 후보: (해당 없음)
 * 현재 코드 역할: /api/admin 경로·path builder 상수
 * 최종 명칭 확인 필요: path가 canonical과 일치하는지
 * Figma 승인 후 연결할 Props: 해당 없음
 * 이 파일이 직접 처리하면 안 되는 상태: HTTP, UI
 *
 * BACKEND 연동 후: docs/api-integration 경로를 상수로만 옮긴다 (임의 path 창작 금지).
 * 이번 mock 범위 제외: 실 API URL/DTO 확정 전 추측 작성 금지.
 */

export const ADMIN_API_PATH_HINTS = {
  orders: "/api/admin/orders",
  orderStatus: "/api/admin/orders/{id}/status",
  soldOutItems: "/api/admin/sold-out-items",
  // 메뉴·결제수단·매출은 문서상 "별도 계약 확정 후"
};
