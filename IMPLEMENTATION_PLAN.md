# ASAK Admin 구현 계획

> 기준일: **2026-07-20** · **코드 실측** 반영 (정적 UI · mock READY · Page 연동 0).  
> 담당 영역: **P4 관리자**. **Admin 기능의 정본은 이 저장소(`ASAK-Admin`)뿐이며**, `ASAK-Kiosk`는 Admin 화면/로직을 소유하지 않는다 ([`ASAK-Kiosk/IMPLEMENTATION_PLAN.md`](../ASAK-Kiosk/IMPLEMENTATION_PLAN.md)는 P3 키오스크 전용).  
> 문서 입구: [`ASAK/docs/START_HERE.md`](../ASAK/docs/START_HERE.md)  
> 정본 WBS: [`ASAK/docs/wiki/wbs-v2-2026-07-16.md`](../ASAK/docs/wiki/wbs-v2-2026-07-16.md) **P4 관리자 · WBS2-033 ~ WBS2-045** (Kiosk는 P3 · WBS2-017~032)  
> 구조: [`src/STRUCTURE_GUIDE.md`](src/STRUCTURE_GUIDE.md)  
> UI 맵: [`docs/ui-implementation-map-2026-07-18.md`](docs/ui-implementation-map-2026-07-18.md)
> 구현 맵: [`ASAK/docs/planning/current-implementation-map-2026-07-16.md`](../ASAK/docs/planning/current-implementation-map-2026-07-16.md)  
> Canonical: [`ASAK/docs/governance/canonical-contract-decisions-2026-07-16.md`](../ASAK/docs/governance/canonical-contract-decisions-2026-07-16.md)  
> 이 문서는 **2026-07-14 최초 상세 계획**(화면 계약·일정·fixture·테스트·브랜치 규칙)을 복원하고, **2026-07-20 코드 실측**(현재 상태)을 함께 담은 통합본이다. 두 기준이 다를 때는 **0~1번(코드 실측)이 우선**이며, 나머지는 참고용 계약·이력이다.

## 0. 한눈에 보는 현재 상태

| 층 | 상태 | 의미 |
| --- | --- | --- |
| Figma 정적 UI | **연결됨** | 사이드바·10+ 페이지 라우트 |
| Mock JSON / repository | **준비됨** | `public/mocks/asak-admin-data.json`, `src/mocks/adminMockRepository.js` |
| Page ↔ mock 바인딩 | **없음 (0)** | 페이지는 하드코딩 상수 |
| api / hooks / adapters | **placeholder** | 파일만 존재 |
| Backend 연동 (P6) | **BLOCKED** | business API 없음 |

### 라우트 실측 (`apps/AdminApp.jsx`)

| 코드 경로 | SCR | 화면 | WBS | 데이터 |
| --- | --- | --- | --- | --- |
| `/` (비로그인) · `/login` | SCR-015 | 로그인 (진입점) | — | mock 세션 |
| `/` (로그인 후) | SCR-009 | Live 주문 현황 = 운영 홈 | WBS2-035 | 하드코딩 |
| `/dashboard` | SCR-022 | 대시보드 | WBS2-034 | 하드코딩 |
| `/orders` | SCR-010 | 주문 관리 | WBS2-036 | 하드코딩 |
| `/sold-out` | SCR-011 | 품절 | WBS2-038 | 하드코딩 |
| `/menus` | SCR-016 | 메뉴 목록 | WBS2-039 | 하드코딩 |
| `/menus/new`, `/menus/edit` | SCR-017 | 메뉴 편집 | WBS2-039 | placeholder |
| `/payment-methods` | SCR-018 | 결제수단 | WBS2-040 | disabled |
| `/sales` | SCR-019 | 매출 요약 | WBS2-041 | 하드코딩 |
| `/sales/monthly` | SCR-020 | 월별 매출 | WBS2-042 | 하드코딩 |
| `/sales/daily` | SCR-021 | 일별 매출 | WBS2-043 | 하드코딩 |
| *(미연결)* | — | `OrderDetailPage` | WBS2-036 | 라우트 없음 |

> Canonical 문서 경로(`/orders/live`, `/soldOut`, `/paymentMethods`)와 **코드 kebab-case 불일치** → WBS2-033.  
> 당분간 **코드 경로를 실행 정본**으로 쓰고, Canonical 정렬은 별도 작업.

## 1. 이번 스프린트(7/20~7/22) 목표

**화면을 다시 그리지 않는다.** mock repository → 페이지 연결만 한다.

| 우선 | 작업 | WBS | 완료 조건 |
| --- | --- | --- | --- |
| P0 | Live/주문 목록 mock 바인딩 | WBS2-035~036 | `getLiveOrders` / `getAdminOrders` 사용 |
| P0 | 품절 draft·저장 mock | WBS2-038 | `useSoldOutDraft` + repository |
| P0 | 결제수단 토글·저장 mock | WBS2-040 | 토글 활성 + 실패 롤백 |
| P1 | 대시보드 KPI mock | WBS2-034 | dashboard getter 연결 |
| P1 | 매출 3화면 기간 필터 | WBS2-041~043 | summary/monthly/daily + empty/partial |
| P1 | 주문 상태 변경 stub | WBS2-037 | mock PATCH + 목록/상세 동기 |
| P2 | loading/empty/error·내비 | WBS2-044~045 | `AdminAsyncState` 등 |
| P2 | 라우트 Canonical 정렬 | WBS2-033 | 문서/사이드바/코드 일치 |

### 하지 않는 것

- 실인증·실서버·WebSocket·외부 TTS
- CSS/시안 통째 교체
- Kiosk 저장소에 Admin 기능 추가
- Backend 실연동 (WBS2-059 BLOCKED)

## 2. 권장 연결 패턴

```text
Page
  → hooks (useOrdersQuery, useSoldOutDraft, …)
    → api/* 또는 mocks/adminMockRepository
      → adapters/* (화면 view-model만)
```

- Page에서 axios/`asak-admin-data.json`을 **직접 import하지 않는다**.
- Envelope unwrap은 `api/client.js`만.
- 금액·날짜 표시는 유틸에서만 포맷.

### Mock 사용 예

```js
import {
  getAdminOrders,
  getLiveOrders,
  getSalesSummary,
  getDailySales,
  getMonthlySales,
} from "@/mocks/adminMockRepository";
```

상세: `public/mocks/README.md`

## 3. 공통 계약

| 항목 | 결정 |
| --- | --- |
| Envelope | `{ success, status, code, message, data }` |
| 주문 상태 | `RECEIVED` → `PREPARING` → `COMPLETED` (+ `CANCELLED` mock 가능) |
| 결제 상태 (정본 목표) | `READY` / `APPROVED` / `FAILED` — mock에 `PAID` 등이 있으면 adapter에서 정규화 |
| 금액 정본 | `totalAmount` (mock에 `totalPrice` 있으면 adapter) |
| Canonical 품절 API | `PATCH /api/admin/soldOut` |
| 로그인 SCR-015 | Future/EXCLUDED 성격 — 데모는 mock 세션 최소만 |
| 식별자 (2026-07-14 최초 계약) | `orderId`, `menuId`, `categoryId`, `targetId`, `paymentMethodId`. 화면 전용 별칭을 만들지 않는다 |
| 낙관적 변경 (2026-07-14 최초 계약) | 품절·상태·활성화 토글은 요청 중 중복 실행을 막고, 실패하면 이전 값을 복구한다 |

### 오류 처리 기준 (2026-07-14 최초 계약, 참고)

| 코드 | 화면 행동 |
| --- | --- |
| 401 | 로그인 화면으로 이동하거나 mock 세션 만료 안내를 보인다. |
| 403 | 권한 없음 안내를 보이고 동일 요청 재시도 버튼은 제공하지 않는다. |
| 409 | 최신 목록 또는 상세를 다시 조회한 뒤 상태 충돌 안내를 보인다. |
| 5xx/네트워크 | 현재 입력·필터를 보존하고 사용자가 누를 수 있는 재시도 UI를 보인다. |

## 4. 구현 순서 (남은 일)

1. **WBS2-033** — 사이드바·문서·Canonical 경로 표 정리 (코드 변경 최소)
2. **WBS2-035~036** — Live + Orders mock 바인딩, 상세 선택
3. **WBS2-038** — 품절 draft/save
4. **WBS2-040** — 결제수단
5. **WBS2-034, 041~043** — Dashboard + Sales
6. **WBS2-037** — 상태 변경 stub
7. **WBS2-039** — 메뉴 목록/편집 mock 저장
8. **WBS2-044~045** — 상태 UI·QA

## 5. 화면별 구현 계약 (2026-07-14 최초 계약, 참고)

> SCR 번호와 세부 규칙은 최초 계획 문서 기준이며, 실제 구현 진행도는 0·1번 표를 따른다. mock 바인딩 작업 시 이 표의 규칙을 어기지 않았는지 확인한다.

### 인증·주문 운영: `SCR-015`, `SCR-009`, `SCR-010`

| 화면 | 입력 → 출력 | API/상태 | 필수 규칙·테스트 |
| --- | --- | --- | --- |
| `SCR-015` 로그인 | 계정 정보 → mock 세션·오류 | `adminSessionStore` | 제출 중 중복 전송을 막는다. 실패해도 입력값은 유지한다. 비인증 사용자는 보호 라우트에 직접 접근할 수 없다. |
| `SCR-009` 주문 목록 | 상태·기간·검색어 → 주문 목록 | `API-007` | `orderNo`, `orderType`, `orderStatus`, `paymentStatus`, `totalPrice`, `createdAt`을 표시한다. loading, 결과 없음, 네트워크 오류를 구분한다. 필터 변경은 목록 기준을 명확히 갱신한다. |
| `SCR-010` 주문 상세 | 주문 선택·다음 상태 → 상세·변경 결과 | `API-007`, `API-008` | 품목, 선택 옵션, 제외 재료를 표시한다. 상태 변경 중 버튼을 잠그고, 성공 뒤 목록과 상세 배지가 일치해야 한다. 409는 최신 상태 재조회와 안내로 처리한다. |

### 운영 설정: `SCR-011`, `SCR-016`~`SCR-018`

| 화면 | 입력 → 출력 | API/상태 | 필수 규칙·테스트 |
| --- | --- | --- | --- |
| `SCR-011` 품절 관리 | 대상 유형·키워드·토글 → 품절 목록·변경 결과 | `API-010`, `API-009` | `MENU`, `INGREDIENT`, `OPTION_ITEM`을 명확히 구분한다. 토글 요청 중 중복 클릭을 막고 실패하면 화면 값을 이전 상태로 되돌린다. `reasonType`을 표시한다. |
| `SCR-016` 메뉴 목록 | 검색어·카테고리 → 메뉴 목록 | `API-011` | 카테고리·이름·가격·판매 상태를 보인다. loading/empty/error 상태와 등록 화면 진입을 제공한다. |
| `SCR-017` 메뉴 등록·수정 | 메뉴 폼 → 저장 결과 | `API-012` | `categoryId`, 이름, 가격은 필수다. 가격은 0 이하·문자 입력을 구분해 검증한다. `imageUrl`, `optionGroupIds`는 계약 형태로 저장한다. 저장 실패 시 입력을 보존한다. |
| `SCR-018` 결제수단 | 활성화·순서 → 저장 결과 | `API-013`, `API-014` | 활성화 여부와 노출 순서를 한 화면에서 확인한다. 변경 중 중복 클릭을 막고 실패하면 이전 순서·활성 값을 복구한다. |

### 분석: `SCR-019`

| 화면 | 입력 → 출력 | API/상태 | 필수 규칙·테스트 |
| --- | --- | --- | --- |
| `SCR-019` 매출 조회 | 시작일·종료일 → 일별 매출·메뉴 요약 | `API-015` | `from <= to`를 검증하고 미래 날짜를 막는다. 잘못된 기간은 요청하지 않는다. 기간 내 데이터 없음은 오류가 아닌 empty 상태로, API 실패는 재시도 가능한 error로 보인다. |

## 6. 상태 전이와 mock fixture (2026-07-14 최초 계약, 참고)

> 아래 `API-007`~`API-015` ID는 최초 설계 시 문서 표기이며, 현재 Canonical 경로는 위 3번 표(`PATCH /api/admin/soldOut` 등)를 따른다.

### 주문 상태 전이

```text
RECEIVED → PREPARING → COMPLETED
     │          │
     └─ API-008 요청 중 버튼 잠금
                 ├─ 성공: 목록·상세 상태 동시 갱신
                 └─ 409/실패: 최신 값 재조회 또는 이전 화면 상태 유지
```

### 품절과 설정 변경 규칙

```text
현재 화면 값 변경 시도
  → 요청 중 control 잠금
  → API-009 / API-014 mock 호출
     ├─ 성공: mock fixture와 화면 값을 같은 결과로 갱신
     └─ 실패: 이전 값을 복구하고 오류 메시지 표시
```

| API | 정상 mock | 실패/경계 mock | 영향 화면 |
| --- | --- | --- | --- |
| `API-007/008` | 주문 목록·상세·상태 변경 | 빈 결과, 409 충돌, 5xx | 주문 목록·상세 |
| `API-009/010` | 대상별 품절 목록·토글 | 토글 실패, 검색 결과 없음 | 품절 관리 |
| `API-011/012` | 메뉴 목록·등록/수정 | 필수값 오류, 중복 이름, 저장 실패 | 메뉴 관리 |
| `API-013/014` | 결제수단 목록·활성/정렬 | 중복 클릭, 저장 실패 | 결제수단 관리 |
| `API-015` | 일별 매출·메뉴별 판매량 | 잘못된 기간, 빈 데이터, 네트워크 오류 | 매출 조회 |

- 정상 데이터 없음과 실패 응답을 같은 UI로 처리하지 않는다.
- mock fixture 변경 시 목록·상세·차트가 같은 필드명과 상태값을 보는지 확인한다.
- 페이지·컴포넌트에서 `response.data.data`를 직접 다루지 않는다.

## 7. 일별 실행 순서 (계획(이력) — 2026-07-14~2026-07-22 최초 계획)

> **이력 표**: 아래 날짜 계획은 2026-07-14 최초 작성 시점 기준이다. 7/20 코드 실측(0·1번 표) 결과 Page↔mock 바인딩이 계획보다 늦어져 있다. 지금 해야 할 일은 1·4번을 따른다.

| 날짜 | 주문 담당 | 운영 설정 담당 | 분석·통합 담당 | 당일 완료 조건 |
| --- | --- | --- | --- | --- |
| 7/14 | 로그인·주문 상태·`API-007` 필드 확정 | 품절·메뉴·결제수단 fixture 정의 | envelope, 라우트, loading/error 기준 | 화면/API/TC ID와 담당 확정 |
| 7/15 | `SCR-015`, `SCR-009` 목록·필터 | `SCR-011` 목록·대상 필터 | 공통 empty/error UI | 로그인과 주문 목록 mock 시연 |
| 7/16 | `SCR-010` 상세·상태 변경 | `SCR-011` 토글·실패 복구 | `API-007`~`010` fixture 리뷰 | 목록·상세 일치와 품절 복구 확인 |
| 7/17 | 상태 전이 예외·401/403 안내 | `SCR-016` 메뉴 목록 | `SCR-019` 기간·매출 fixture | 주문·메뉴 목록의 네 상태 완료 |
| 7/18 | 주문 운영 smoke·결함 수정 | `SCR-017` 폼 검증, `SCR-018` 설정 | `SCR-019` 카드·차트·빈 데이터 | 저장 실패·기간 검증 시연 |
| 7/19 | 로그인·주문 회귀 테스트 | 메뉴·결제수단 회귀 테스트 | 접근성·반응형 점검 | `TC-A01`~`TC-A05` 초안 완료 |
| 7/20 (**오늘**) | 401/403/409/5xx UI 정리 | 품절·폼·정렬 경계 수정 | fixture 일관성, lint/build | 알려진 결함 우선순위 확정 — **실측 결과 위 1번 표로 대체** |
| 7/21 | 주문·로그인 PR 정리 | 운영 화면 PR 정리 | 전체 mock smoke와 데모 순서 | 모든 필수 화면 연결 완료 |
| 7/22 | 최종 bug fix | 최종 bug fix | 빌드 산출물, worklog, 데모 | `TC-A01`~`TC-A06` 통과 |

## 8. 테스트 체크리스트

| ID | 시나리오 | 기대 결과 |
| --- | --- | --- |
| `TC-A01` 주문 상태 변경 | 주문을 상세에서 다음 상태로 변경 | 목록과 상세의 상태·배지가 일치하고 요청 중 중복 변경이 불가능하다. |
| `TC-A02` 품절 토글 실패 | 메뉴·재료·옵션 각각에 실패 mock 적용 | 이전 값으로 복구되고 대상 이름·오류가 표시된다. |
| `TC-A03` 비인증·권한 없음 / 매출 empty·partial | 세션 없이 보호 라우트 접근(403 mock), 매출 데이터 없음 | 보호 화면 차단·권한 안내가 보이고, 데이터 없음은 오류가 아닌 empty로 처리되며 합계가 일치한다. |
| `TC-A04` 메뉴 폼 오류 | 이름 누락, 0 이하 가격, 저장 실패 | 각 검증 오류가 구분되고 실패 뒤 입력값이 보존된다. |
| `TC-A05` 결제수단 저장 실패 / 매출 기간 조회 | 저장 실패 mock, 역전 기간·미래 날짜 조회 | 결제수단은 이전 값으로 롤백되고, 잘못된 매출 기간은 요청하지 않는다. |
| `TC-A06` 최종 mock 데모 | 로그인 → 주문 → 품절 → 메뉴 → 결제수단 → 매출 | 주요 흐름이 끊기지 않고 loading/error 상태도 재현된다. |

## 9. 브랜치·커밋·일일 작업 규칙 (2026-07-14 최초 계약, 참고)

```text
main
├─ feature/admin-auth-orders-scr009-010-015
├─ feature/admin-sold-out-scr011
├─ feature/admin-menu-payment-scr016-018
└─ feature/admin-sales-scr019
```

- `main`에 직접 push하지 않고 기능 흐름 단위로 PR을 만든다.
- 공통 파일(`src/api/`, `src/store/`, `src/constants/`, mock fixture)을 변경하기 전에는 영향 화면 담당자 둘 이상이 필드명과 실패 복구 방식을 확인한다.
- 커밋은 `type(scope): 동사로 시작하는 설명` 형식으로 작성한다.

```text
feat(admin): add order status transition for SCR-010
feat(admin): add mock sold-out rollback for SCR-011
feat(admin): validate menu form fields for SCR-017
feat(admin): add payment method ordering states
test(admin): cover sales date-range validation
docs(admin): align order mock fields with API-007
```

매일 종료 전 worklog에 `완료 화면 / 변경한 fixture·API 필드 / 실행한 TC / 다음 작업 / 공통 파일 변경 여부`를 기록한다. 구현 시작 전에는 해당 `SCR`, `API`, `TC`를 계약 문서에서 확인한다.

## 10. 관련 문서

| 문서 | 경로 |
| --- | --- |
| STRUCTURE_GUIDE | [`src/STRUCTURE_GUIDE.md`](src/STRUCTURE_GUIDE.md) |
| UI 구현 맵 | [`docs/ui-implementation-map-2026-07-18.md`](docs/ui-implementation-map-2026-07-18.md) |
| admin-api-contract | [`src/contracts/admin-api-contract.md`](src/contracts/admin-api-contract.md) |
| WBS 상태 메모 | [`ASAK/docs/wiki/wbs-status-notes.md`](../ASAK/docs/wiki/wbs-status-notes.md) |
| 구현 맵 | [`ASAK/docs/planning/current-implementation-map-2026-07-16.md`](../ASAK/docs/planning/current-implementation-map-2026-07-16.md) |
| Kiosk 구현 계획 (별도 정본, Admin 범위 없음) | [`ASAK-Kiosk/IMPLEMENTATION_PLAN.md`](../ASAK-Kiosk/IMPLEMENTATION_PLAN.md) |

## Documentation status

- Status: **Current (2026-07-20 code audit) + 2026-07-14 최초 계약 복원본**
- 이전 07-14 계획은 Admin을 "placeholder만"으로 적어 **과소평가** → 0·1번 표는 실측으로 대체.
- 단, 07-14 계획의 화면 계약(5번)·상태전이·fixture(6번)·일정(7번, 이력)·테스트(8번)·브랜치 규칙(9번)은 **삭제하지 않고 이 문서에 유지**한다 (2026-07-20 사용자 피드백: "기존에 있던 내용이 빠졌다" 반영).
- LMIS 요구사항은 DevCopilot에서 **IN_PROGRESS** (정적 UI, DONE 아님).
