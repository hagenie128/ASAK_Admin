# 요구사항·화면 매핑

| 기능 | 화면 파일 힌트 | API 힌트 | 완료 기준 |
| --- | --- | --- | --- |
| 로그인 | `pages/admin/LoginPage.jsx` | 인증 API 확정 필요 | 비인증 접근 차단 |
| 주문 목록 | `OrderListPage`, `OrderTable` | API-007 | 필터·loading·empty·error |
| 주문 상세/상태 | `OrderDetailPage`, `OrderStatusBadge` | API-007/008 | 상태 변경 반영 |
| 품절 관리 | `SoldOutManagePage`, `SoldOutToggle` | API-009/010 | 대상별 품절 상태 반영 확인 |
| 메뉴 관리 | `MenuManagePage`, `MenuEditPage` | API-011/012 | 폼 검증 |
| 결제수단 | `PaymentMethodPage` | API-013/014 | 활성화·정렬 |
| 매출 | `SalesSummaryPage`, `SalesChart` | API-015 | 기간별 요약 |

## Canonical contract relationship

- Status: Needs Review — current Admin Frontend expected shape.
- Canonical routes and API decisions: [ASAK docs](../../../ASAK/docs/README.md) and [Canonical Contract Decisions](../../../ASAK/docs/governance/CANONICAL_CONTRACT_DECISIONS.md).
- Canonical Admin routes use `/orders/live`, `/soldOut`, and `/paymentMethods`; existing assumptions are not changed here.
- Adapter/Backend DTO confirmation is required before implementation.
