# ASAK Admin 구조 지도 (짧은 안내)

> 기준일: **2026-07-23**  
> **공부용 본문(꼼꼼한 설명):** 로컬 전용 [`_local_study/ADMIN_MOCK_STUDY.md`](../_local_study/ADMIN_MOCK_STUDY.md)  
> （`_local_study/` 는 gitignore — 팀 repo에는 안 올라감）  
> Mock 필드 사전: [`../public/mocks/README.md`](../public/mocks/README.md)  
> 온보딩·아키텍처 등: [`../docs/README.md`](../docs/README.md)

이 파일은 **어디를 열면 되는지**만 짧게 적는다. 학습·복습은 `_local_study` 문서를 본다.

---

## 데이터 흐름 (고정)

```text
Page → Hook → mocks/adminMockRepository.js → public/mocks/asak-admin-data.json
```

Page에서 JSON 직접 import 금지.

## Page = 조합

| 예 | 조합 |
| --- | --- |
| `OrderListPage` | `LiveOrderPreview` 만 |
| `MenuManagePage` | `MenuListPanel` + `MenuDetailPanel` / `MenuEditPanel` |
| `DashboardPage` | `DashboardPanels` 섹션들 |

## 라우트 한눈에

| 경로 | 페이지 | 데이터 |
| --- | --- | --- |
| `/` (비로그인) · `/login` | LoginPage | mock 세션 |
| `/` (로그인 후) | OrderListPage (Live) | `getLiveOrders` |
| `/dashboard` | DashboardPage | `useDashboard` |
| `/orders` | OrderManagementPreview | `useOrdersQuery` · 상세 패널 |
| `/sold-out` | SoldOutManagePage | `useSoldOutDraft` |
| `/menus` · `/menus/new` · `/menus/edit` | MenuManagePage (+ 얇은 Edit 래퍼) | `useMenusQuery` · 우측 패널 |
| `/payment-methods` | PaymentMethodPage | `usePaymentMethodDraft` |
| `/sales` · `/monthly` · `/daily` | 매출 3화면 | `useSalesQuery` |

## 폴더

| 폴더 | 역할 |
| --- | --- |
| `apps/AdminApp.jsx` | 라우트 · CSS 로드 순서 |
| `pages/admin` | URL 화면 · **조합만** |
| `components/admin` | UI 조각 |
| `hooks` | 조회·draft·`usePagination` |
| `mocks` | repository (권장 유일 입구) |
| `constants/pagination.js` | 화면별 pageSize |
| `styles/` | tokens → reset → global → commonStyle |
| `layouts` | 사이드바 셸 |

## CSS · 셸 (의도만)

- 로드 순서: `tokens` → `reset` → `global` → `commonStyle` (`AdminApp.jsx`)
- 셸: 뷰포트(`100dvh`) 채움 · body 스크롤 잠금 · **내부 패널만** 스크롤
- 품절: 좌(판매중) · 중(이동) · 우(품절)

자세한 설명·QA 치트·연습문제 → `_local_study/ADMIN_MOCK_STUDY.md`
