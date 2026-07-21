# ASAK Admin 구현 순서 / 참고 순서 / TODO Tree

> 기준일: 2026-07-21  
> 목적: "다음에 뭘 먼저 구현해야 하는지", "어떤 파일부터 읽어야 하는지", "파일별로 무엇이 남았는지"를 한 문서에서 바로 확인하기 위한 작업 가이드.

## 먼저 읽는 순서

### 1. 전체 방향

1. `IMPLEMENTATION_PLAN.md`
2. `src/STRUCTURE_GUIDE.md`
3. `public/mocks/README.md`
4. `src/mocks/adminMockRepository.js`

이 4개를 먼저 보면:

- 이번 스프린트 범위
- 구조 원칙
- mock 필드명
- 데이터 입구

를 한 번에 잡을 수 있다.

### 2. 화면 구현 전 공통 확인 순서

각 화면에 들어가기 전에 아래 순서로 본다.

1. `src/pages/admin/<Page>.jsx`
2. 해당 page가 쓰는 `src/hooks/*`
3. 해당 page가 쓰는 `src/components/admin/*`
4. `src/mocks/adminMockRepository.js`
5. `public/mocks/README.md`

규칙:

- page를 먼저 읽고 "이 화면이 조립만 하는지" 본다.
- hook이 있으면 "상태/저장/조회 책임"을 본다.
- component는 props만 확인한다.
- mock README는 JSON을 열기 전에 먼저 본다.

---

## 구현 우선순위

### 완료 기준

이 문서에서 "구현 완료"는 아래를 모두 만족하는 상태를 뜻한다.

1. mock 데이터가 화면에 표시된다.
2. 날짜 / 기간 / 상태 / 정렬 / 토글 / 검색 같은 조건 변경이 실제로 동작한다.
3. 잘못된 조건은 요청 전에 막는다.
4. loading / empty / error / save-fail / rollback 흐름이 정리된다.

즉, 단순 표시 연결이나 disabled 상태 유지로는 완료로 보지 않는다.

### P0. 주문 운영

가장 먼저 끝낼 묶음:

1. `WBS2-035` Live 주문 현황
2. `WBS2-036` 주문 목록/상세
3. `WBS2-037` 주문 상태 변경 stub

이 묶음을 먼저 처리하는 이유:

- 관리자 앱의 메인 운영 흐름이다.
- 목록, 상세, 상태 변경이 서로 연결된다.
- 이후 QA와 demo에서 가장 먼저 확인할 화면이다.

### P1. 운영 설정

주문 운영 다음:

1. `WBS2-038` 품절 관리
2. `WBS2-040` 결제수단
3. `WBS2-039` 메뉴 관리

세부 순서:

1. 품절
2. 결제수단
3. 메뉴 목록
4. 메뉴 편집

이유:

- 품절/결제수단은 draft-save 구조가 이미 잡혀 있어 연결 가치가 높다.
- 메뉴 편집은 검증 규칙과 저장 항목이 많아서 가장 늦게 붙이는 편이 안전하다.

### P2. 조회성 화면

운영 설정 다음:

1. `WBS2-034` Dashboard
2. `WBS2-041` Sales Summary
3. `WBS2-042` Monthly Sales
4. `WBS2-043` Daily Sales

이유:

- 저장보다는 표시/필터/empty 상태 정리가 핵심이다.
- 화면별로 정적 값이 많아 mock 연결 시 구조보다 데이터 매핑 확인이 중요하다.

### P3. 공통 상태 / QA

마지막:

1. `WBS2-044` loading / empty / error
2. `WBS2-045` QA

이유:

- 개별 화면이 어느 정도 붙어야 공통 상태 기준이 보인다.
- QA는 중간중간 해도 되지만 최종 정리는 마지막에 묶어야 한다.

---

## 화면별 참고 순서

### 1. Live 주문 현황

읽는 순서:

1. `src/pages/admin/OrderListPage.jsx`
2. `src/components/admin/LiveOrderPreview.jsx`
3. `src/mocks/adminMockRepository.js`
4. `public/mocks/README.md`의 Live 섹션

집중해서 볼 것:

- `getLiveOrders()`에서 무엇을 주는지
- 카드에서 실제로 쓰는 필드가 무엇인지
- 완료/취소 버튼이 어디서 상태를 바꾸는지

### 2. 주문 관리

읽는 순서:

1. `src/pages/admin/OrderManagementPreview.jsx`
2. `src/hooks/useOrdersQuery.js`
3. `src/components/admin/OrderTable.jsx`
4. `src/components/admin/OrderDetailPanel.jsx`
5. `src/api/adminOrderApi.js`
6. `src/mocks/adminMockRepository.js`

집중해서 볼 것:

- 목록과 상세가 어떤 기준으로 연결되는지
- page에서 hook과 table/detail을 어떻게 조립하는지
- 상태 변경, 환불, 영수증 출력이 어디에 붙을 자리인지

### 3. 품절 관리

읽는 순서:

1. `src/pages/admin/SoldOutManagePage.jsx`
2. `src/hooks/useSoldOutDraft.js`
3. `src/hooks/usePagination.js`
4. `src/mocks/adminMockRepository.js`

집중해서 볼 것:

- baseline / dirtyCount
- available / soldOut 이동
- 저장 후 baseline 갱신
- 실패 시 복구 기준

### 4. 결제수단

읽는 순서:

1. `src/pages/admin/PaymentMethodPage.jsx`
2. `src/hooks/usePaymentMethodDraft.js`
3. `src/components/admin/AdminPaymentMethodRow.jsx`
4. `src/components/admin/AdminSaveBar.jsx`
5. `src/mocks/adminMockRepository.js`

집중해서 볼 것:

- rows / activePreviewRows
- 정렬과 토글이 각각 어느 함수로 묶였는지
- 저장하기 버튼 표시 기준

### 5. 메뉴 관리

읽는 순서:

1. `src/pages/admin/MenuManagePage.jsx`
2. `src/mocks/adminMockRepository.js`
3. `public/mocks/README.md`의 메뉴 섹션
4. `src/pages/admin/MenuEditPage.jsx`

집중해서 볼 것:

- 지금은 정적 화면이므로 어디까지가 placeholder인지
- 목록 연결과 편집 저장을 분리해서 봐야 한다는 점

### 6. 대시보드

읽는 순서:

1. `src/pages/admin/DashboardPage.jsx`
2. `src/hooks/useDashboard.js`
3. `src/mocks/adminMockRepository.js`

집중해서 볼 것:

- KPI / recentOrders / statusSummary / inventoryAlerts / weeklySales
- page 내부 로컬 섹션이 실제로 어떤 mock 조각을 쓰는지

### 7. 매출 화면

읽는 순서:

1. `src/pages/admin/SalesSummaryPage.jsx`
2. `src/pages/admin/MonthlySalesPage.jsx`
3. `src/pages/admin/DailySalesPage.jsx`
4. `src/hooks/useSalesQuery.js`
5. `src/mocks/adminMockRepository.js`
6. `public/mocks/README.md`의 매출 섹션

집중해서 볼 것:

- 어떤 값이 아직 하드코딩인지
- 기간/월/일 필터가 붙을 자리가 어디인지
- empty / partial 처리를 어떤 page가 먼저 가져가야 하는지
- 날짜 변경 시 막아야 할 조건(`from <= to`, 미래 날짜 금지, 월/일 경계)을 어디서 검사할지

---

## TODO Tree

아래 트리는 "다음 작업" 기준이다.  
완료된 구조 정리까지 다시 적지 않고, 남은 구현/연결/문서 작업만 적는다.

### A. 주문 운영

- `src/pages/admin/OrderListPage.jsx`
  - [ ] `LiveOrderPreview` 외에 page가 더 가져야 할 책임이 없는지 확인
  - [ ] 라우트 설명 주석을 현재 구조 기준으로 짧게 정리

- `src/components/admin/LiveOrderPreview.jsx`
  - [ ] `getLiveOrders()` 기준 loading / empty / error 분기 구현
  - [ ] 완료/취소 액션의 사용자 피드백 기준 구현
  - [ ] page 전용 로컬 컴포넌트가 과하게 커지면 그때만 재분리

- `src/mocks/adminMockRepository.js`
  - [ ] Live 주문 상태 변경 stub 범위 정의
  - [ ] 주문 운영과 주문 관리가 같은 상태값을 보도록 규칙 문서화

- `src/pages/admin/OrderManagementPreview.jsx`
  - [ ] 목록 선택 시 상세 패널 동기화 구현
  - [ ] 주문 상태 / 결제 상태 / 주문 유형 / 날짜 / 검색 조건 변경 동작 구현
  - [ ] 환불/영수증 버튼의 조건을 화면 계약대로 구현

- `src/hooks/useOrdersQuery.js`
  - [ ] 필터/검색/날짜 조건 state 및 query 규칙 구현
  - [ ] empty / error 구분이 page 요구와 맞게 구현

- `src/components/admin/OrderTable.jsx`
  - [ ] 행 클릭 선택 상태 표시 구현 여부 결정
  - [ ] 필드 표시를 README 계약과 대조 후 누락 보완

- `src/components/admin/OrderDetailPanel.jsx`
  - [ ] 상태 변경 버튼 및 조건 분기 구현
  - [ ] 상세 필드 누락 여부 점검 후 보완

- `src/api/adminOrderApi.js`
  - [ ] stub 경계만 유지
  - [ ] 구현 전까지 repository wrapping 이상의 역할 추가 금지

### B. 운영 설정

- `src/pages/admin/SoldOutManagePage.jsx`
  - [ ] 검색 / 카테고리 조건 변경이 실제로 동작하도록 구현
  - [ ] 이동 버튼, 저장 버튼의 상태 조건을 실제 동작 기준으로 점검

- `src/hooks/useSoldOutDraft.js`
  - [ ] rollback 시나리오 구현 및 문서 체크리스트 반영
  - [ ] `reasonType` 표시 필요 시 데이터 매핑 구현
  - [ ] 저장 성공 후 baseline 갱신 로직 검증

- `src/pages/admin/PaymentMethodPage.jsx`
  - [ ] 미리보기 노출 순서가 활성/정렬 변경에 따라 실제로 바뀌는지 구현 확인
  - [ ] 저장바 표시 조건과 dirty 기준 검증

- `src/hooks/usePaymentMethodDraft.js`
  - [ ] 정렬/토글/저장 조건 변경 로직 구현 검증
  - [ ] 실패 롤백 시나리오 구현

- `src/components/admin/AdminPaymentMethodRow.jsx`
  - [ ] row는 재사용 단위로 유지
  - [ ] 토글 UI가 row 내부 책임으로 남는 현재 구조 유지

- `src/pages/admin/MenuManagePage.jsx`
  - [ ] 카테고리 / 검색 조건 변경 동작 구현
  - [ ] 목록 선택 시 상세 표시 변경이 필요한지 결정하고 반영

- `src/pages/admin/MenuEditPage.jsx`
  - [ ] 필수값 / 가격 / 카테고리 조건 검증 구현
  - [ ] 저장 필드 목록을 mock 계약 기준으로 반영
  - [ ] 저장 실패 시 입력 보존 처리 구현

### C. 조회성 화면

- `src/pages/admin/DashboardPage.jsx`
  - [ ] `useDashboard()`가 주는 데이터와 화면 섹션 매핑 검증
  - [ ] 섹션들은 현재 page 로컬 유지
  - [ ] 추후 2곳 이상 재사용될 때만 재분리

- `src/hooks/useDashboard.js`
  - [ ] loading 외 error 상태가 필요한지 판단
  - [ ] adapter 필요성이 생길 때까지 과한 가공 금지

- `src/pages/admin/SalesSummaryPage.jsx`
  - [ ] 기간 필터 조건 변경 동작 구현
  - [ ] `empty` / `partial` 대응 구현
  - [ ] 잘못된 기간은 요청 전에 막는 검증 구현

- `src/pages/admin/MonthlySalesPage.jsx`
  - [ ] 연도/월 선택 조건 변경 동작 구현
  - [ ] 월 변경 시 KPI / 차트 / 테이블이 함께 바뀌도록 구현

- `src/pages/admin/DailySalesPage.jsx`
  - [ ] 일자 변경 조건 및 이동 동작 구현
  - [ ] 일자 변경 시 KPI / 차트 / 표가 함께 바뀌도록 구현

- `src/hooks/useSalesQuery.js`
  - [ ] 기간/월/일 조건 변경이 공통으로 모이면 여기로 승격
  - [ ] 아직 공통 요구가 약하면 page 로컬 상태 유지

### D. 공통 / 문서 / QA

- `src/components/admin/AdminSaveBar.jsx`
  - [ ] 품절/결제수단 외 다른 화면에서 진짜 재사용되는지 확인

- `src/components/admin/AdminAsyncState.jsx`
  - [ ] 각 화면에서 loading / empty / error 문구 패턴 정리 후 실제 도입
  - [ ] 상태 UI도 버튼/필터 재시도 흐름까지 포함해 구현

- `src/STRUCTURE_GUIDE.md`
  - [ ] 새로 추가/삭제한 구조가 실제 코드와 맞는지 주기적으로 동기화
  - [ ] "분리 원칙"과 "현재 분리 상태"를 기준 문서로 유지

- `IMPLEMENTATION_PLAN.md`
  - [ ] 작업 체크리스트의 완료 여부를 실제 구현 기준으로만 갱신
  - [ ] 미구현 항목을 DONE처럼 보이게 적지 않기

- `public/mocks/README.md`
  - [ ] 각 화면 바인딩 시 실제 props와 차이가 생기면 먼저 여기 갱신

---

## 작업할 때 금지

1. 안 만든 화면에 미리 hook / component 파일을 추가하지 않는다.
2. page에서 JSON을 직접 import하지 않는다.
3. "나중에 재사용할 것 같아서" 공통 컴포넌트를 먼저 만들지 않는다.
4. 문서에 구현 완료처럼 적고 코드는 비어 있는 상태를 만들지 않는다.

---

## 추천 작업 루틴

화면 하나를 잡을 때마다 아래 순서를 그대로 따른다.

1. `public/mocks/README.md`에서 필드 확인
2. `adminMockRepository.js`에서 getter / save 함수 확인
3. `page` 읽고 책임 구분
4. 필요하면 `hook`만 먼저 정리
5. 날짜 / 기간 / 상태 / 정렬 같은 조건 변경이 실제 동작하는지 먼저 확인
6. 마지막에 재사용 UI가 분명할 때만 component 분리
7. 끝나면 `IMPLEMENTATION_PLAN.md` 체크리스트 갱신

이 문서의 목적은 "예쁘게 정리된 구조"가 아니라,  
"다음 작업자가 바로 이어받아도 헷갈리지 않는 순서"를 만드는 것이다.
