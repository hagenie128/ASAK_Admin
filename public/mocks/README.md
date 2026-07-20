# 관리자 Mock 데이터

정본: `asak-admin-data.json`  
접근: `src/mocks/adminMockRepository.js`만 사용 (Page에서 JSON 직접 import 금지)

공통 Envelope:

```text
{ success, status, code, message, data }
```

---

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

---

## Repository → 화면 연결표

| Getter | JSON 경로 | 쓰는 화면 / 컴포넌트 | `data`에서 꺼내는 것 |
|--------|-----------|----------------------|----------------------|
| `getLiveOrders()` | `liveOrders` | `LiveOrderPreview` · OrderList(Live) | `data.content[]` |
| `getAdminOrders()` | `orders` | 주문 관리 목록 | `data.content[]` · `{ empty: true }`면 빈 목록 |
| `getAdminOrderById(id)` | `orders` 검색 | 주문 상세 | `data` = 주문 1건 또는 404 envelope |
| `getDashboard()` | `dashboard` | DashboardPage | `data` 전체 |
| `getSoldOutCatalog()` | `soldOut` | SoldOutManagePage | `data.available[]` · `data.soldOut[]` |
| `getAdminMenus()` | `menus` | MenuManagePage | `data.content[]` |
| `getPaymentMethods()` | `paymentMethods` | PaymentMethodPage | `data[]` (배열) |
| `getSalesSummary(period)` | `sales.summary` | SalesSummaryPage | period 병합된 `data` |
| `getDailySales()` | `sales.daily` | DailySalesPage | `data.rows[]` · `data.totals` |
| `getMonthlySales()` | `sales.monthly` | MonthlySalesPage | `data.rows[]` |

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

---

## 필드 / props 사전 (바인딩용)

> 화면 연결할 때 **이 표만 보고** props를 맞춘다. JSON 전체를 다시 열어보지 않아도 된다.  
> 금액 정본 목표는 `totalAmount`이나, **현재 mock은 `totalPrice`** → adapter에서 맞출 예정 (`IMPLEMENTATION_PLAN.md`).

### 1) Live 주문 카드 — `getLiveOrders().data.content[]`

`LiveOrderPreview` → `StaticOrderCard` / `StaticMenuCard`가 쓰는 값.

| 필드 | 타입 | 화면에서 | 비고 |
|------|------|----------|------|
| `orderId` | number | `key` | 필수 |
| `orderNo` | string | 카드 헤더 큰 번호 | 예: `"#1400"` |
| `displayNo` | string | (예비) | 숫자만 `"1400"` |
| `orderType` | string | — | `EAT_IN` / `TAKE_OUT` |
| `orderTypeLabel` | string | 매장/포장 뱃지 | `"매장"` / `"포장"` → 포장이면 `--takeout` |
| `totalPrice` | number | 총액 | `toLocaleString()` |
| `orderStatus` | string | (예비) | `RECEIVED` / `PREPARING` / … |
| `createdAt` | string | (예비) | ISO |
| `elapsedSec` | number | 경과 초 표시 | `null`이면 `00:00:00` |
| `wide` | boolean | `figma-order-card--wide` | 메뉴 많으면 true |
| `menus[]` | array | 메뉴 카드들 | 아래 |

**`menus[]` 한 줄**

| 필드 | 타입 | 화면에서 |
|------|------|----------|
| `menuName` | string | 메뉴명 |
| `quantity` | number | 수량 |
| `base` | string | 베이스 |
| `dressing` | string | 드레싱 |
| `options[]` | array | 옵션 칩 |

**`options[]` 한 줄**

| 필드 | 타입 | 화면에서 |
|------|------|----------|
| `label` | string | 칩 텍스트 |
| `tone` | string | 아이콘·CSS | `exclude` / `plus` / `drink` / `side` |

컴포넌트 props 매핑:

```text
LiveOrderPreview
  orders = getLiveOrders().data.content
  → StaticOrderCard({ order })
       order.orderNo, order.orderTypeLabel, order.wide,
       order.elapsedSec, order.totalPrice, order.menus, order.orderId
       → StaticMenuCard({ menu })
            menu.menuName, menu.quantity, menu.base, menu.dressing, menu.options
            option.label, option.tone
```

---

### 2) 주문 목록·상세 — `getAdminOrders().data.content[]`

| 필드 | 타입 | 화면에서 |
|------|------|----------|
| `orderId` | number | 상세 키 / 라우트 |
| `orderNo` | string | 목록 번호 |
| `orderType` | string | `EAT_IN` / `TAKE_OUT` |
| `totalPrice` | number | 금액 |
| `orderStatus` | string | 주문 상태 뱃지 |
| `paymentStatus` | string | 결제 상태 (`PAID`/`READY`/`FAILED`/…) |
| `paymentMethod` | string | 결제수단명 (비어 있을 수 있음) |
| `createdAt` | string | 시각 |
| `itemCount` | number | 품목 수 |
| `menuSummary` | string | 한 줄 요약 |
| `requestNote` | string | 요청사항 |
| `items[]` | array | 상세 품목 |

**`items[]`**

| 필드 | 타입 |
|------|------|
| `menuId` | number |
| `menuName` | string |
| `quantity` | number |
| `unitPrice` | number |
| `optionItems[]` | `{ optionItemId, name, quantity }` |
| `excludedIngredients[]` | `{ ingredientId, name }` |

Live(`menus`+`tone`)와 목록(`items`+`optionItems`) **모양이 다름** → 같은 adapter로 억지 합치지 말 것.

---

### 3) 대시보드 — `getDashboard().data`

| 필드 | 내용 |
|------|------|
| `dateLabel` | 날짜 라벨 |
| `kpis[]` | `{ label, value, display }` |
| `recentOrders[]` | `{ orderNo, orderType, menuSummary, totalPrice, orderStatus, createdAtLabel }` |
| `statusSummary[]` | `{ label, count, tone }` · tone: waiting/preparing/complete/cancelled |
| `orderTypeSummary` | `{ eatIn, takeOut }` |
| `inventoryAlerts[]` | `{ label, badge, tone }` |
| `weeklySales[]` | `{ label, amount, barHeight, isCurrent? }` |

---

### 4) 품절 — `getSoldOutCatalog().data`

| 필드 | 내용 |
|------|------|
| `available[]` / `soldOut[]` | 같은 row 스키마 |

**row**

| 필드 | 타입 |
|------|------|
| `targetType` | `MENU` / 재료·세트 등 |
| `targetId` | number |
| `name` | string |
| `category` | string |
| `isSoldOut` | boolean |
| `imageKey` | string |
| `price` | number |

---

### 5) 메뉴 — `getAdminMenus().data.content[]`

| 필드 | 타입 |
|------|------|
| `menuId` | number |
| `categoryId` | number |
| `categoryName` | string |
| `name` | string |
| `price` | number |
| `isSoldOut` | boolean |
| `isActive` | boolean |

필터: `getAdminMenus({ keyword, onlyActive })`

---

### 6) 결제수단 — `getPaymentMethods().data[]`

| 필드 | 타입 |
|------|------|
| `methodId` | string |
| `name` | string |
| `description` | string |
| `isActive` | boolean |
| `isMaintenance` | boolean |
| `sortOrder` | number |

---

### 7) 매출

**`getSalesSummary(period)`** — period: `today` \| `week` \| `month` \| `empty` \| `partial`  
반환 `data`: `{ period, label, dateRange, kpis, chartBars, paymentShare, orderShare, ranking, availablePeriods }`

**`getDailySales().data`**

| 필드 | 내용 |
|------|------|
| `from` / `to` | 기간 |
| `rows[]` | `{ date, orderCount, totalAmount, avgAmount }` |
| `totals` | 합계 객체 |

**`getMonthlySales().data`**

| 필드 | 내용 |
|------|------|
| `year` | number |
| `rows[]` | `{ month, orderCount, totalAmount, avgAmount }` |

---

## 자주 헷갈리는 점

| 이슈 | 어떻게 |
|------|--------|
| Live vs 주문목록 필드가 다름 | Live는 UI 카드용(`menus`/`tone`), 목록은 API형(`items`/`optionItems`) |
| `totalPrice` vs `totalAmount` | mock= `totalPrice`, 정본 목표=`totalAmount` → adapter |
| `paymentStatus`에 `PAID` | 정본은 READY/APPROVED/FAILED — adapter에서 정규화 |
| Envelope unwrap | `api/client.js`만 (repository는 envelope 통째 반환) |

규모 숫자는 JSON `scenarios` / `meta` 키 참고.
