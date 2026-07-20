# ASAK Admin 구조 가이드

> 기준일: **2026-07-20** · 코드 실측 (정적 UI + `adminMockRepository` READY · **Page 연동 0**).  
> 문서 입구: `ASAK/docs/START_HERE.md`  
> WBS: `ASAK/docs/wiki/wbs-v2-2026-07-16.md` **WBS2-033 ~ WBS2-045**  
> 구현 계획: [`../IMPLEMENTATION_PLAN.md`](../IMPLEMENTATION_PLAN.md)  
> UI 맵: [`../docs/ui-implementation-map-2026-07-18.md`](../docs/ui-implementation-map-2026-07-18.md)

## 먼저 결론

관리자 앱은 **Figma 정적 화면까지 연결**되어 있습니다.  
다음 일은 화면을 다시 그리는 것이 아니라 **`adminMockRepository` → 페이지 연결**입니다.

```text
main.jsx
  -> apps/AdminApp.jsx     URL ↔ 페이지 조립
  -> layouts/AdminLayout   사이드바·셸
  -> pages/admin/*.jsx     화면 (지금: 하드코딩 상수)
  -> components/admin/*    재사용 UI
  -> mocks/adminMockRepository.js   ← 다음 연결 지점
  -> api / hooks / adapters         ← 대부분 placeholder
```

## 현재 라우트

| 경로 | 페이지 | SCR | 비고 |
| --- | --- | --- | --- |
| `/` (비로그인) | LoginPage | SCR-015 | **앱 진입점** — 로그인 화면 |
| `/` (로그인 후) | OrderListPage (Live) | SCR-009 | **운영 홈 = 주문 현황** |
| `/login` | LoginPage | SCR-015 | 이미 로그인 시 `/`로 이동 |
| `/dashboard` | DashboardPage | SCR-022 | 사이드바 라벨 "Home" |
| `/orders` | OrderManagementPreview | SCR-010 | 하드코딩 |
| `/sold-out` | SoldOutManagePage | SCR-011 | 하드코딩 |
| `/menus` | MenuManagePage | SCR-016 | 하드코딩 |
| `/menus/new`, `/menus/edit` | MenuEditPage | SCR-017 | placeholder |
| `/payment-methods` | PaymentMethodPage | SCR-018 | disabled |
| `/sales` | SalesSummaryPage | SCR-019 | 하드코딩 |
| `/sales/monthly` | MonthlySalesPage | SCR-020 | 하드코딩 |
| `/sales/daily` | DailySalesPage | SCR-021 | 하드코딩 |
| `/ui-preview/...` | UiStatePreviewPage | — | 상태 시안 (개발용) |

세션: `src/auth/adminSession.js` (localStorage mock). 보호 경로는 비로그인 시 `/login`으로 보낸다.  
Canonical 문서의 `/orders/live`와 코드 `/`(현황)는 아직 불일치 → WBS2-033. **실행 정본은 코드 `/` = 현황**.

`OrderDetailPage`는 import되어 있으나 **라우트 미연결** (WBS2-036).

## 폴더 역할

| 폴더 | 역할 | 현재 |
| --- | --- | --- |
| `pages/admin` | URL 화면 | 정적 UI 위주 |
| `components/admin` | 재사용 UI | Sidebar 등 사용 중 · 일부 placeholder |
| `layouts` | 셸 | AdminLayout 사용 |
| `mocks` | mock 접근 **유일한** 권장 입구 | READY, Page 미사용 |
| `api` | HTTP | placeholder |
| `hooks` | 조회·draft | placeholder |
| `adapters` | DTO → view-model | placeholder |
| `contracts` | 계약 문서 | 참고 |

## 연결할 때 규칙

1. Page에서 JSON/axios **직접 import 금지** → repository 또는 api → adapter.  
2. Envelope unwrap은 `api/client.js`만.  
3. 저장 실패 시 토글/폼 **롤백**.  
4. empty와 error UI를 구분.  
5. 키오스크 Admin 스캐폴드를 여기로 복사해 오지 말 것 (이 저장소가 정본).

## Mock 필드 / props (바인딩 치트시트)

JSON을 다시 뒤지지 말고 여기 → **[`../public/mocks/README.md`](../public/mocks/README.md)** 를 본다.

| 화면 | Getter | 꺼내는 경로 |
| --- | --- | --- |
| Live 현황 카드 | `getLiveOrders()` | `data.content[]` → `order.*` / `menus[]` / `options[].tone` |
| 주문 목록·상세 | `getAdminOrders()` / `ById` | `data.content[]` → `items[]` (Live와 **스키마 다름**) |
| 대시보드 | `getDashboard()` | `data.kpis` · `recentOrders` · `statusSummary` … |
| 품절 | `getSoldOutCatalog()` | `data.available[]` · `data.soldOut[]` |
| 메뉴 | `getAdminMenus()` | `data.content[]` |
| 결제 | `getPaymentMethods()` | `data[]` |
| 매출 | `getSalesSummary` / Daily / Monthly | README §7 |

Live 카드 props 예: `orderNo`, `orderTypeLabel`, `wide`, `elapsedSec`, `totalPrice`, `menus[].menuName|quantity|base|dressing`, `options[].label|tone`.

## 관련 WBS (요약)

| WBS | 내용 | 상태(2026-07-20) |
| --- | --- | --- |
| WBS2-033 | 라우트 Registry 정렬 | IN_PROGRESS |
| WBS2-034~036 | Dashboard·Live·Orders mock | IN_PROGRESS |
| WBS2-037 | 상태 변경 stub | TODO |
| WBS2-038~043 | 품절·메뉴·결제·매출 | IN_PROGRESS |
| WBS2-044~045 | 상태 UI·QA | TODO |

## 관련 문서

- `ASAK/docs/START_HERE.md`
- `ASAK/docs/planning/current-implementation-map-2026-07-16.md`
- `ASAK/docs/wiki/wbs-status-notes.md`
- `public/mocks/README.md`
