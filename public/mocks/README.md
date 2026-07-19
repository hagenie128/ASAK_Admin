# 관리자 Mock 데이터

정본: `asak-admin-data.json`  
접근: `src/mocks/adminMockRepository.js`만 사용

## 규모 (대량 보강)

| 영역 | 규모 |
|------|------|
| 주문 | **160건+** · RECEIVED/PREPARING/COMPLETED/CANCELLED · PAID/READY/FAILED/REFUNDED · 매장/포장 · 옵션/제외재료 |
| Live | **수십 건** 카드 (narrow/wide, exclude/plus/drink/side) |
| Dashboard | 최근주문 20 · 상태 4종 카운트 |
| 품절 | 판매중 다수 + 품절 메뉴 30 + 재료/세트 |
| 메뉴 | 키오스크 메뉴 전체 동기화 (+ 비활성 일부) |
| 결제수단 | 8종 |
| 매출 일별 | **7월 31일** |
| 매출 월별 | **12개월** |
| 매출 기간 | today / week / month / **empty** / **partial** |
| 로그인 | admin / kitchen / viewer + invalid |

## 사용 예

```js
import {
  getAdminOrders,
  getAdminOrderById,
  getSalesSummary,
  getLiveOrders,
  getDailySales,
  getMonthlySales,
} from "@/mocks/adminMockRepository";

getAdminOrders();
getAdminOrders({ empty: true });
getSalesSummary("empty");
getSalesSummary("partial");
getDailySales();
```

규모 숫자는 JSON `scenarios` 키 참고.
