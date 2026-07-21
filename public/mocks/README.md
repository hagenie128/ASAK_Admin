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

---

## 페이지별 JSON 바인딩 현황 — 하드코딩 vs mock 연결

> 각 페이지에서 **현재 하드코딩**으로 박혀 있는 데이터를 **JSON의 어떤 필드로 교체해야 하는지** 대조표.
> ✅ = 이미 hook/repository로 연결됨, ❌ = 하드코딩 → 연결 필요

### 1) `LiveOrderPreview.jsx` → `getLiveOrders()`

| 화면 요소 | 현재 | JSON 바인딩 |
|-----------|------|-------------|
| 주문 카드 목록 | ✅ `getLiveOrders().data.content` | — |
| 완료/취소 액션 | ✅ `completeOrder()` / `cancelOrder()` | — |
| 상단 날짜/시간 | ✅ `new Date()` 실시간 | — |
| 좌우 화살표 페이징 | ❌ disabled 고정 | 추후 페이징 구현 시 |

### 2) `OrderListPage.jsx` → `getAdminOrders()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 주문 테이블 행 | ✅ hook 연결 | `data.content[]` |
| 페이지네이션 | ✅ `usePagination` | `data.content.length` |
| 빈 목록 시나리오 | ✅ `{ empty: true }` | `data.content = []` |
| 필터 (상태/유형) | ❌ disabled 고정 | `orderStatus`, `orderType` 필터링 구현 필요 |
| 날짜 범위 필터 | ❌ disabled 고정 | `createdAt` 기준 필터링 구현 필요 |

### 3) `OrderDetailPage.jsx` → `getAdminOrderById(id)`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 주문 기본정보 | ✅ hook 연결 | `data.orderNo`, `orderType`, `createdAt`, `totalPrice` |
| 품목 목록 | ✅ | `data.items[]` → `menuName`, `quantity`, `unitPrice`, `optionItems[]`, `excludedIngredients[]` |
| 환불 버튼 | ✅ `refundAdminOrder()` | `paymentStatus === "PAID"` 일 때만 활성 |
| 영수증 출력 | ✅ `printAdminOrderReceipt()` | `paymentStatus === "PAID"` 일 때만 활성 |
| 404 처리 | ✅ | `success: false, status: 404` envelope |

### 4) `DashboardPage.jsx` → `getDashboard()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| KPI 카드 | ✅ `useDashboard` | `data.kpis[]` → `label`, `value`, `display` |
| 날짜 라벨 | ✅ | `data.dateLabel` |
| 최근 주문 | ✅ | `data.recentOrders[]` → `orderNo`, `orderType`, `menuSummary`, `totalPrice`, `orderStatus`, `createdAtLabel` |
| 상태 요약 바 | ✅ | `data.statusSummary[]` → `label`, `count`, `tone` |
| 매장/포장 카운트 | ✅ | `data.orderTypeSummary` → `eatIn`, `takeOut` |
| 품절 알림 | ✅ | `data.inventoryAlerts[]` → `label`, `badge`, `tone` |
| 주간 매출 차트 | ✅ | `data.weeklySales[]` → `label`, `amount`, `barHeight`, `isCurrent` |
| 전주 대비 증감 | ❌ `"—"` 하드코딩 | JSON에 전주 데이터 없음 → `buildWeeklyTrendStats()`에서 계산 로직 추가 필요 |

### 5) `SoldOutManagePage.jsx` → `getSoldOutCatalog()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 판매 항목 그리드 | ✅ `useSoldOutDraft` | `data.available[]` |
| 품절 목록 그리드 | ✅ | `data.soldOut[]` |
| 카테고리 필터칩 | ✅ | `available[].category` 에서 동적 생성 |
| 이동(→/←) 버튼 | ✅ | draft 선택 상태 기반 |
| 저장 | ✅ `saveSoldOutCatalog()` | — |
| 탭 (메뉴/재료/옵션) | ❌ disabled, 첫 번째만 선택 | `targetType` 기반 탭 필터링 구현 필요 |
| 검색 | ❌ disabled | `name` 기반 검색 구현 필요 |

### 6) `PaymentMethodPage.jsx` → `getPaymentMethods()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 결제수단 행 | ✅ `usePaymentMethodDraft` | `data[]` → `methodId`, `name`, `description`, `isActive`, `sortOrder` |
| 토글 ON/OFF | ✅ | `isActive` 드래프트 토글 |
| 순서 변경 (↑↓) | ✅ | `sortOrder` 재계산 |
| 미리보기 | ✅ | `activePreviewRows` (isActive 필터) |
| 저장 | ✅ `savePaymentMethods()` | — |
| 결제 정책 카드 | ❌ 하드코딩 상수 | JSON에 해당 데이터 없음 → 정적 유지 or mock 추가 |
| `isMaintenance` 표시 | ❌ 미구현 | `data[].isMaintenance` → 점검중 뱃지/비활성 처리 필요 |

### 7) `MenuManagePage.jsx` → `getAdminMenus()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 메뉴 카드 그리드 | ❌ **하드코딩** 8개 반복 | `data.content[]` → `menuId`, `name`, `price`, `categoryName`, `isSoldOut`, `isActive` |
| 카테고리 탭 | ❌ disabled 고정 | `categoryName` unique 값으로 탭 동적 생성, 필터 구현 필요 |
| 검색 | ❌ disabled | `getAdminMenus({ keyword })` 연결 필요 |
| 상세 패널 (우측) | ❌ **전체 하드코딩** | JSON에 상세 필드 없음 → mock 추가 or 정적 유지 후 실API 대응 |
| 수정/삭제 버튼 | ❌ disabled | stub 함수 필요 |

### 8) `SalesSummaryPage.jsx` → `getSalesSummary(period)`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 기간 탭 (오늘/이번주/이번달) | ❌ disabled 하드코딩 | `getSalesSummary(period)` → `period` 파라미터로 전환 구현 필요 |
| 날짜 범위 | ❌ `"2025.02.01 ~ 2025.02.28"` 하드코딩 | `data.dateRange` |
| KPI 카드 | ❌ 상수 배열 하드코딩 | `data.kpis[]` → `label`, `display`, `delta`, `deltaLabel` |
| 시간대별 차트 | ❌ 상수 배열 | `data.chartBars[]` |
| 결제수단 비중 | ❌ 상수 배열 | `data.paymentShare[]` → `label`, `percent`, `fill` |
| 주문 유형 비중 | ❌ 상수 배열 | `data.orderShare[]` → `label`, `percent`, `fill` |
| 인기 메뉴 랭킹 | ❌ 상수 배열 | `data.ranking[]` → `rank`, `name`, `count`, `amount` |
| 일자별 매출 테이블 | ❌ 상수 배열 | → `getDailySales()` 연결 or summary에 포함 필요 |

### 9) `DailySalesPage.jsx` → `getDailySales()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 날짜 이동 (‹ ›) | ❌ disabled | `data.rows[]`의 `date` 기반으로 선택 날짜 변경 구현 필요 |
| KPI 카드 | ❌ 전체 하드코딩 | 선택 날짜의 `rows[i]` → `orderCount`, `totalAmount`, `avgAmount` + 전일 대비 delta 계산 |
| 시간대별 차트 | ❌ 상수 | JSON에 시간대별 데이터 없음 → mock에 `hourlyBars` 추가 or 정적 유지 |
| 결제수단별/주문유형별 비중 | ❌ 상수 | JSON에 일별 breakdown 없음 → mock 추가 or 정적 유지 |
| 메뉴 판매 순위 | ❌ 상수 | JSON에 일별 ranking 없음 → mock 추가 or 정적 유지 |
| 시간대별 상세 테이블 | ❌ 상수 | JSON에 hourly 데이터 없음 → mock 추가 or 정적 유지 |

### 10) `MonthlySalesPage.jsx` → `getMonthlySales()`

| 화면 요소 | 현재 | JSON 필드 |
|-----------|------|-----------|
| 연도 이동 (‹ ›) | ❌ disabled | `data.year` 기반 → 현재 1년분만 있으므로 비활성 유지 가능 |
| 월 누적 KPI | ❌ 전체 하드코딩 | 선택 월의 `rows[i]` → `orderCount`, `totalAmount`, `avgAmount` |
| 일별 매출 차트 | ❌ 상수 | → `getDailySales().data.rows[]`에서 해당 월 필터 후 barHeight 계산 |
| 평일 vs 주말 | ❌ 상수 | `getDailySales().data.rows[]`의 `date`로 요일 판별 후 계산 |
| 일별 주문 수 미니차트 | ❌ 상수 | `getDailySales().data.rows[]` 의 `orderCount` |
| 일자별 상세 테이블 | ❌ 상수 | `getDailySales().data.rows[]` 필터 |
| 인기 메뉴 랭킹 | ❌ 상수 | JSON에 월별 ranking 없음 → mock 추가 or 정적 유지 |

---

## mock 데이터 부족 목록 — 추가 필요한 JSON 필드

구현 시 JSON에 데이터가 없어서 **mock 추가가 필요한** 항목:

| 필요 데이터 | 쓰는 화면 | 제안 JSON 경로 |
|-------------|-----------|----------------|
| 메뉴 상세 (재료, 옵션그룹, 영양정보, 알레르기, 태그) | `MenuManagePage` 우측 패널 | `menus.data.content[].detail` |
| 일별 시간대별 매출 (`hourlyBars`) | `DailySalesPage` 차트 | `sales.daily.data.hourly[date][]` |
| 일별 결제수단/주문유형 breakdown | `DailySalesPage` 비중 카드 | `sales.daily.data.breakdown[date]` |
| 일별 메뉴 랭킹 | `DailySalesPage` 순위 | `sales.daily.data.ranking[date][]` |
| 월별 메뉴 랭킹 | `MonthlySalesPage` 순위 | `sales.monthly.data.ranking[month][]` |
| 대시보드 전주 매출 합계 (증감 계산용) | `DashboardPage` 전주대비 | `dashboard.data.prevWeekTotal` |

> **판단 기준**: mock에 없는 데이터는 **정적 유지 (하드코딩)** 하고, 해당 화면의 TODO에 "실API 대응 시 교체" 주석을 남기는 것도 방법.  
> 하지만 "날짜 변경 조건까지 구현" 기준이면 **mock 추가가 필수**인 항목이 있음 (위 표에서 `DailySalesPage` 날짜 이동, `MonthlySalesPage` 월 선택 등).
