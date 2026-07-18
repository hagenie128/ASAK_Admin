# 관리자 UI 구현 맵

기준 파일은 `ASAK — Design System Product UI 0718` (`yHhvn5RKjBd91U8BJUQz7F`)이다. 이 문서는 정적 UI 단계의 경계와, 이후 데이터 구현자가 이어받을 위치를 기록한다. Figma를 수정하지 않았고 Figma URL을 런타임에서 참조하지 않는다.

## 라우트와 정적 UI 범위

| 경로 | 화면 파일 | Figma 기준 노드 | 현재 범위 | 이후 연결 지점 |
| --- | --- | --- | --- | --- |
| `/` | `pages/admin/OrderListPage.jsx` | `134:10607` | 실시간 주문 레이아웃 미리보기 | 주문 목록·상태 전이 query |
| `/dashboard` | `pages/admin/DashboardPage.jsx` | `227:5008` | KPI, 최근 주문, 상태/재고/매출 요약 상수 | dashboard adapter로 각 패널별 데이터 주입 |
| `/orders` | `pages/admin/OrderManagementPreview.jsx` | `134:10630` | 필터, 테이블, 상세 패널 | 주문 목록·상세 query |
| `/sold-out` | `pages/admin/SoldOutManagePage.jsx` | `134:11863` | 두 보드와 저장 affordance | 재고/품절 draft store와 저장 mutation |
| `/menus` | `pages/admin/MenuManagePage.jsx` | `134:12137` | 카테고리/검색/카드 표시 | 메뉴 조회·편집 화면 |
| `/payment-methods` | `pages/admin/PaymentMethodPage.jsx` | `134:11493` | 수단 4개, 정책 카드, 미리보기 | 결제수단 draft, 정렬·활성·정책 저장 |
| `/sales`, `/sales/daily`, `/sales/monthly` | `pages/admin/SalesSummaryPage.jsx` | `134:10661` | KPI·차트·비율 표시 | 기간 필터와 sales adapter |
| `/login` | `pages/admin/LoginPage.jsx` | `134:12033` | 로그인 폼 외형 | 인증 API·세션 처리 |

## 코드 읽기 안내

- `apps/AdminApp.jsx`는 URL과 페이지를 조립한다. 각 페이지가 데이터 요청을 하지 않도록 정적 화면의 경계를 여기서 유지한다.
- `components/admin/AdminSidebar.jsx`는 경로별 Figma SVG만 매핑한다. 반응형 메뉴 축소는 CSS의 `1280px` 규칙에서 텍스트를 숨기고 아이콘 rail로 전환한다. 즉 태블릿에서 주문 현황만 별도 사이드바가 되는 문제를 만들지 않는다.
- `DashboardPage.jsx`의 `recentOrders`, `statusRows`, `weeklySales`는 데이터 모델이 아니라 화면 구성을 검증하는 목업 상수다. 실제 API 응답을 직접 이 배열 형식에 맞추지 말고, adapter에서 각 패널 view model로 변환한다.
- `PaymentMethodPage.jsx`의 `PaymentMethodRow`는 운영 목록과 우측 미리보기에 같은 UI를 쓰되 `compact`만 다르게 하는 공통 컴포넌트다. 정렬/토글/수정 버튼은 지금 모두 비활성이고 상태를 변경하지 않는다.

## 로컬 자산·외부 연결 점검

현재 새로 반영한 관리자 자산은 모두 `src/assets/figma/` 안에 저장되어 있다.

- `asak-admin-logo.svg`: Figma 노드 `227:5008`의 관리자 좌측 로고
- `icon-nav-*.svg`: Figma 노드 `227:5008`의 20px 메뉴 SVG 7종
- `soldout-*.png`: `134:11863`의 메뉴 썸네일

따라서 화면 실행 시 Figma, 외부 CDN, 이미지 호스팅을 호출하지 않는다. 앱 의존성은 기존 React, React Router, Zustand, Axios뿐이다. 이 단계에서 API client·Zustand store에 새 호출이나 JSON import를 추가하지 않았다.

## Figma에서 확인한 보정 기록

| 항목 | 코드 보정 | 이유 |
| --- | --- | --- |
| 사이드바 아이콘 | 텍스트/이모지성 임시 표시를 Figma 원본 SVG로 교체 | OS별 glyph 차이와 색 불일치를 제거 |
| 관리자 로고 | 50px 임시 심볼 대신 Figma의 177×60 로고를 desktop sidebar에 사용 | 현재 관리자 기준 화면과 일치 |
| 대시보드 그래프 | CSS 막대그래프로 구현 | Figma의 정적 5일 막대는 웹 SVG/Canvas 의존 없이 표현 가능 |
| 결제수단 브랜드 | 외부 브랜드 로고·이모지 대신 색상 문자 마크 사용 | 브랜드 asset의 라이선스/외부 파일 의존을 만들지 않고, 실제 결제 연동 단계에서 승인된 자산으로 교체 가능 |
| 활성 메뉴 효과 | 라임 배경 + 다중 inset shadow | Figma inner-shadow는 CSS `box-shadow`로 재현 가능. blur 결과가 브라우저마다 달라 캡처 대조를 기준으로 한다. |

## 토큰 보완 제안 (Figma 수정용 메모)

현재 노드에는 색/폰트가 변수로 완전히 연결되지 않은 요소가 섞여 있다. Figma를 수정할 때 다음 변수를 foundation에 추가하거나 기존 값으로 묶는 편이 안전하다.

1. `semantic/bg/page/admin = #F7F7F7`, `semantic/bg/admin = #FFFFFF`, `semantic/border/default = #E5E7EB`
2. `semantic/text/admin/{primary,secondary,tertiary} = #111827 / #6B7280 / #737373`
3. `semantic/brand/primary = #B5E30F`, `semantic/status/{error,warning,success,info}`와 각각의 background
4. type role `Heading/3 = 22/28/700`, `Heading/4 = 18/24/700`, `Body/S = 14/20/400`, `Label/S = 12/16/500`
5. `effect/nav/selected`(4개 inset shadow)와 `effect/shadow/subtle`(0 2 8 #00000014)

Figma의 auto-layout은 화면 프레임 고정폭을 그대로 웹 absolute positioning으로 옮기지 않았다. 카드/보드/패널은 `grid`, `minmax`, `gap`으로 구성했으며 1280px에서 아이콘 사이드바, 720px 이하에서 한 열 레이아웃으로 전환한다. 이 변경은 1920px 기준 외형을 지키면서 태블릿 폭에서 겹침을 막기 위한 구현상 보정이다.
