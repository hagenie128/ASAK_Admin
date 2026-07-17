/*
 * Figma Component 연결 후보: (해당 없음 — API 모듈)
 * 현재 코드 역할: 주문·품절 등 관리자 HTTP 함수 모음
 * 최종 명칭 확인 필요: 함수명 fetchOrders 등 (계약 후)
 * Figma 승인 후 연결할 Props: 해당 없음
 * 이 파일이 직접 처리하면 안 되는 상태: UI 상태, unwrap 중복(중앙은 client.js)
 *
 * 호출 위치 후보: hooks (useLiveOrders, useSoldOutDraft) — Page/Presentational 직접 호출 비권장
 * docs/06-api-integration.md 힌트:
 *   GET /api/admin/orders
 *   PATCH /api/admin/orders/{id}/status
 *   GET/PATCH /api/admin/sold-out-items
 * TODO 1: apiClient + unwrapResponse만 사용
 * TODO 2: 경로 문자열은 constants/api.js로
 * TODO 3: 응답 필드 추측으로 DTO 고정 금지
 */

// export async function fetchOrders() { ... }  // 미구현
