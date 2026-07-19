# 관리자 API 연결 계약 초안

> 상태: 백엔드 구현 전. 이 문서는 함수 구현을 승인하지 않습니다.

## 화면별 연결 후보

| 화면 | Figma 컴포넌트 | API/DTO 확정 전 준비 파일 |
| --- | --- | --- |
| 주문 현황/관리 | OrderCard, DataTableRow, DetailPanel | `api/orders.js`, `types/adminOrder.js`, `adapters/adminOrderAdapter.js` |
| 품절 관리 | SoldOutCard, IngredientCard | `api/soldOut.js`, `types/soldOut.js`, `adapters/soldOutAdapter.js` |
| 결제수단 설정 | PaymentMethodSettingRow, SaveBar | `api/paymentMethods.js`, `types/paymentMethod.js` |
| 매출 | SalesMetricCard, DatePicker | `api/sales.js`, `types/sales.js`, `adapters/salesAdapter.js` |

## 공통 규칙

- Mock과 실제 API는 같은 envelope와 DTO 필드명을 사용한다.
- Page/Component에서 axios를 직접 호출하지 않는다.
- 화면 전용 가공은 adapter에서만 한다.
- 서버 API가 구현되기 전에는 URL·DTO를 추측해 고정하지 않는다.
