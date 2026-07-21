## ASAK Admin 매출 날짜 변경 조건 체크리스트

> 대상: `WBS2-041`, `WBS2-042`, `WBS2-043`  
> 목적: 매출 3화면의 "날짜/기간 변경 조건"만 따로 떼어, 구현 순서대로 잘게 쪼갠 실행 체크리스트를 제공한다.  
> 전제: **정적 화면을 다시 그리는 작업이 아니라, 기존 UI에 mock/repository와 날짜 조건을 연결하는 작업**이다.

---

## 0. 먼저 이해할 것

### 현재 상태

- `SalesSummaryPage.jsx`는 기간 탭, KPI, 차트, 비중 카드, 랭킹, 하단 테이블이 모두 상수 하드코딩이다.
- `MonthlySalesPage.jsx`는 연도/월 개념이 UI에 있지만 실제 데이터 변경 로직이 없다.
- `DailySalesPage.jsx`는 이전/다음 날짜 버튼이 있지만 disabled 고정이며, 선택 날짜 상태도 없다.
- `useSalesQuery.js`는 아직 placeholder다.

### JSON에서 이미 있는 것

- `getSalesSummary(period)`:
  - `today | week | month | empty | partial`
  - `label`, `dateRange`, `kpis`, `chartBars`, `paymentShare`, `orderShare`, `ranking`
- `getDailySales()`:
  - `data.from`, `data.to`
  - `data.rows[] = { date, orderCount, totalAmount, avgAmount }`
  - `data.totals`
- `getMonthlySales()`:
  - `data.year`
  - `data.rows[] = { month, orderCount, totalAmount, avgAmount }`
  - `data.totals`

### JSON에 아직 없는 것

- 일별 시간대 차트 데이터
- 일별 결제수단 비중 / 주문유형 비중
- 일별 메뉴 랭킹
- 월별 메뉴 랭킹

즉, **날짜 변경 조건은 구현 가능**하지만, 일부 보조 패널은 mock 추가 전까지 정적 유지가 필요하다.

---

## 1. 공통 선행 작업 체크리스트

### 1-1. 읽는 순서

1. `src/pages/admin/SalesSummaryPage.jsx`
2. `src/pages/admin/MonthlySalesPage.jsx`
3. `src/pages/admin/DailySalesPage.jsx`
4. `src/hooks/useSalesQuery.js`
5. `src/mocks/adminMockRepository.js`
6. `public/mocks/README.md`

### 1-2. 공통 완료 기준

- [ ] Page에서 하드코딩된 날짜/기간 텍스트를 state 또는 hook 결과로 교체했다.
- [ ] 버튼/탭 클릭 시 실제로 다른 데이터가 보인다.
- [ ] 잘못된 기간/날짜는 요청 전에 막는다.
- [ ] empty 데이터는 에러가 아니라 "데이터 없음"으로 처리한다.
- [ ] 현재 mock에 없는 데이터는 정적 유지하되, 코드에 TODO 주석 또는 문서 근거를 남긴다.
- [ ] 금액 포맷은 `formatCurrency()`를 사용한다.
- [ ] 날짜 포맷은 `utils/date.js`를 통해 일관되게 처리한다.

### 1-3. 공통 구현 단위

- [ ] `useSalesQuery.js`를 "매출 화면 공통 조회 훅"으로 바꿀지 결정한다.
- [ ] 또는 각 페이지별로 `useSalesSummary`, `useMonthlySales`, `useDailySales`로 나눌지 결정한다.
- [ ] 이번 범위에서는 **분리보다 완성이 우선**이므로, 한 파일 안에서 시작해도 괜찮다.

권장 최소 구조:

```text
SalesSummaryPage
  → getSalesSummary(period)

MonthlySalesPage
  → getMonthlySales()
  → getDailySales()   // 월 상세/차트 계산용

DailySalesPage
  → getDailySales()
```

---

## 2. WBS2-041 체크리스트 — `SalesSummaryPage`

### 목표

기간 탭 클릭에 따라 `today / week / month / empty / partial` 데이터를 바꿔 표시하고, 잘못된 period는 기본값으로 안전하게 처리한다.

### 2-1. 상태 / 데이터 연결

- [ ] `selectedPeriod` 상태를 만든다. 기본값은 `"month"` 또는 요구된 기본 화면과 일치시킨다.
- [ ] `getSalesSummary(selectedPeriod)` 호출 연결을 만든다.
- [ ] repository 결과 envelope에서 `data`만 화면에 쓰는 구조를 정리한다.
- [ ] `availablePeriods`를 받아서 탭 렌더링 기준으로 쓸지 결정한다.

### 2-2. 기간 탭 동작

- [ ] `"오늘" -> "today"`, `"이번 주" -> "week"`, `"이번 달" -> "month"` 매핑을 만든다.
- [ ] 탭 클릭 시 `selectedPeriod`가 바뀐다.
- [ ] 선택된 탭에만 `is-selected` 클래스가 들어간다.
- [ ] 현재 선택된 period에 해당하는 `dateRange`가 즉시 바뀐다.
- [ ] mock에 없는 임의 값이 들어오면 `month`로 fallback 된다.

### 2-3. KPI / 차트 / 비중 / 랭킹 바인딩

- [ ] `kpis[]` 하드코딩 상수를 제거한다.
- [ ] `chartBars[]` 하드코딩 상수를 제거한다.
- [ ] `paymentShare[]` 하드코딩 상수를 제거한다.
- [ ] `orderShare[]` 하드코딩 상수를 제거한다.
- [ ] `ranking[]` 하드코딩 상수를 제거한다.
- [ ] `delta`가 양수/음수/0일 때 표시 규칙을 정한다.
- [ ] `deltaLabel`이 `"—"` 인 경우 시각적으로 어색하지 않게 처리한다.

### 2-4. empty / partial 조건

- [ ] 개발 중 강제로 `getSalesSummary("empty")`를 넣어 empty 화면을 확인한다.
- [ ] ranking이 빈 배열일 때 레이아웃이 깨지지 않는지 확인한다.
- [ ] `chartBars`가 모두 0일 때 피크 강조가 이상하지 않은지 확인한다.
- [ ] `getSalesSummary("partial")`일 때 일부만 있는 ranking/비중 데이터가 정상 렌더링되는지 확인한다.

### 2-5. 하단 일자별 매출 표 처리

- [ ] 현재 하단 `dailyRows`는 하드코딩이므로 `getDailySales()`로 대체할지 결정한다.
- [ ] 이번 범위에서 대체한다면:
  - [ ] 선택 period에 맞는 날짜 범위를 daily rows에서 필터링한다.
  - [ ] `today`면 1행 또는 empty 처리한다.
  - [ ] `week`면 최근 7일만 보인다.
  - [ ] `month`면 해당 월 데이터만 보인다.
- [ ] 이번 범위에서 대체하지 않는다면:
  - [ ] "summary 하단 표는 후속 작업"으로 명시하고, 날짜 탭 동작 완성 범위에서 제외 근거를 남긴다.

### 2-6. 완료 판정

- [ ] 탭 클릭만으로 화면 값이 실제로 바뀐다.
- [ ] `empty`, `partial`을 수동 시나리오로 모두 재현했다.
- [ ] 하드코딩 period/dateRange/KPI는 제거되었다.

---

## 3. WBS2-042 체크리스트 — `MonthlySalesPage`

### 목표

월별 매출 화면에서 **선택 월이 바뀌면 KPI / 일별 차트 / 일자별 상세가 함께 바뀌도록** 만든다.

### 중요한 판단

현재 JSON `monthly.rows[]`는 "월 단위 합계"이고, 상세용 일별 데이터는 `getDailySales().data.rows[]`에서 가져와야 한다.  
즉, 이 화면은 **`getMonthlySales()` + `getDailySales()`를 같이 써야** 날짜 변경 조건이 완성된다.

### 3-1. 상태 정의

- [ ] `selectedMonth` 상태를 만든다. 값은 `"2026-07"` 같은 month key로 둔다.
- [ ] 기본값은 `getMonthlySales().data.rows`의 마지막 월 또는 현재 월과 맞춘다.
- [ ] `selectedMonthRow`를 계산한다.
- [ ] `selectedMonthDailyRows`를 `getDailySales().data.rows`에서 해당 월만 필터링해 계산한다.

### 3-2. KPI 연결

- [ ] `"7월 누적 매출"` 같은 하드코딩 문구를 선택 월 기준으로 바꾼다.
- [ ] 총매출은 `selectedMonthRow.totalAmount`를 사용한다.
- [ ] 주문 수는 `selectedMonthRow.orderCount`를 사용한다.
- [ ] 평균 객단가는 `selectedMonthRow.avgAmount`를 사용한다.
- [ ] 값이 없으면 `"-"` 또는 empty 상태 규칙으로 처리한다.

### 3-3. 월 변경 UI

- [ ] 연도 버튼을 실제 월 이동으로 쓸지, 연도 전환만 표시할지 결정한다.
- [ ] 현재 mock은 `2026` 한 해만 있으므로, 최소 구현은 아래 둘 중 하나다:
  - [ ] 옵션 A: 이전/다음 버튼으로 `monthly.rows[]` 안에서 월 이동
  - [ ] 옵션 B: 연도는 고정, 별도 월 선택 state만 내부에서 운용
- [ ] 마지막 월에서 다음 버튼, 첫 월에서 이전 버튼을 막는다.
- [ ] 버튼 활성/비활성 조건이 선택 월 위치와 정확히 맞는다.

### 3-4. 일별 매출 차트

- [ ] `DAILY_BARS`, `DAILY_TICKS` 하드코딩을 제거한다.
- [ ] `selectedMonthDailyRows`에서 차트 막대 높이를 계산한다.
- [ ] 막대 높이 계산 기준(최대값 대비 비율)을 함수로 분리한다.
- [ ] 최고 매출일을 계산해서 피크 강조에 연결한다.
- [ ] `최고 매출일 7/09` 문구를 실제 날짜로 바꾼다.

### 3-5. 평일 vs 주말

- [ ] `selectedMonthDailyRows`의 각 `date`를 `Date`로 변환한다.
- [ ] 요일을 계산해 평일/주말로 분리한다.
- [ ] 각각 평균 매출을 계산한다.
- [ ] 주말 데이터가 0건이면 `"없음"` 처리 규칙을 둔다.
- [ ] 퍼센트 bar width 계산 기준을 정한다.

### 3-6. 일별 주문 수 미니차트

- [ ] 하드코딩 막대를 제거한다.
- [ ] `selectedMonthDailyRows.map((row) => row.orderCount)`로 대체한다.
- [ ] 일 평균 주문 수를 계산해서 하단 문구에 연결한다.

### 3-7. 일자별 상세 테이블

- [ ] `DETAIL_ROWS` 하드코딩을 제거한다.
- [ ] `selectedMonthDailyRows`를 테이블 행으로 렌더링한다.
- [ ] 날짜는 `MM.DD` 형식으로 표시한다.
- [ ] 요일(월/화/수...)을 계산해 같이 표시한다.
- [ ] `totalAmount`, `avgAmount`는 포맷 유틸을 사용한다.

### 3-8. empty 조건

- [ ] 선택 월에 해당하는 `dailyRows`가 하나도 없을 때 empty 블록 또는 빈 테이블 규칙을 만든다.
- [ ] monthly row는 있는데 daily row가 없는 경우 UI가 깨지지 않는지 확인한다.
- [ ] 이전/다음 버튼 비활성 조건이 empty에서도 안전한지 확인한다.

### 3-9. 이번 범위에서 정적 유지 가능한 것

- [ ] 월별 랭킹은 mock에 없으므로 정적 유지 여부를 결정한다.
- [ ] 정적 유지 시 "mock 부족"임을 문서 또는 TODO로 남긴다.

### 3-10. 완료 판정

- [ ] 선택 월을 바꾸면 KPI / 차트 / 테이블이 함께 바뀐다.
- [ ] 첫 월/마지막 월 이동 제한이 정확하다.
- [ ] 같은 월 데이터를 두 군데에서 따로 하드코딩하지 않는다.

---

## 4. WBS2-043 체크리스트 — `DailySalesPage`

### 목표

이전/다음 날짜 버튼으로 선택 일자를 바꾸고, 해당 날짜의 KPI가 실제로 변하도록 만든다.

### 중요한 판단

현재 JSON에는 **일자별 총합(`rows[]`)만 있고 시간대별 상세는 없다.**  
그래서 이 WBS의 핵심은 "날짜 변경 조건"이며, 시간대 차트/상세표/랭킹은 mock 추가 전까지 정적 유지 또는 파생 데이터 최소화가 필요하다.

### 4-1. 상태 정의

- [ ] `selectedDate` 상태를 만든다. 값은 `"2026-07-10"` 같은 ISO date string으로 둔다.
- [ ] 기본값은 `getDailySales().data.rows`의 마지막 날짜 또는 요구된 기준일과 맞춘다.
- [ ] `selectedRow`를 `rows.find()`로 계산한다.
- [ ] `previousRow`, `nextRow`도 같이 계산한다.

### 4-2. 날짜 이동 버튼

- [ ] 이전 날짜 버튼 클릭 시 바로 전 row의 date로 이동한다.
- [ ] 다음 날짜 버튼 클릭 시 바로 다음 row의 date로 이동한다.
- [ ] 첫 날짜에서는 이전 버튼 disabled.
- [ ] 마지막 날짜에서는 다음 버튼 disabled.
- [ ] 날짜 표시 텍스트를 실제 `selectedDate` 기반으로 만든다.
- [ ] 요일 표시 `(금)` 도 실제 날짜에서 계산한다.

### 4-3. KPI 연결

- [ ] 총매출을 `selectedRow.totalAmount`로 연결한다.
- [ ] 주문 수를 `selectedRow.orderCount`로 연결한다.
- [ ] 평균 객단가를 `selectedRow.avgAmount`로 연결한다.
- [ ] 전일 대비 delta는 `previousRow`와 비교 계산한다.
- [ ] 첫 날짜처럼 비교 대상이 없을 때는 `"—"` 규칙을 둔다.

### 4-4. delta 계산 규칙

- [ ] `((현재 - 이전) / 이전) * 100` 계산 함수를 만든다.
- [ ] 이전 값이 0이면 0으로 나누지 않도록 예외 처리한다.
- [ ] 양수/음수/0 표시 포맷을 통일한다.
- [ ] "전일 대비" 문구는 비교 가능한 경우에만 보여줄지 결정한다.

### 4-5. 차트 / 우측 카드 / 상세표 처리

- [ ] 시간대별 매출 차트는 mock 부재 상태에서 어떻게 처리할지 결정한다.
- [ ] 선택지:
  - [ ] A. 현재 정적 유지, 단 날짜 헤더와 KPI만 동작하게 만든다.
  - [ ] B. `selectedRow.totalAmount`를 기반으로 간이 막대 생성 규칙을 만든다.
- [ ] 결제수단별 매출 / 주문 유형별 매출 / 메뉴별 순위도 mock 부재 처리 방식을 결정한다.
- [ ] 시간대별 상세 테이블도 mock 부재 처리 방식을 결정한다.

권장:

- 날짜 변경 조건을 먼저 완성한다.
- 시간대/랭킹/비중은 **정적 유지 + 후속 mock 확장**으로 분리한다.

### 4-6. empty / 경계 조건

- [ ] `rows.length === 0`이면 전체 화면 empty 상태를 만든다.
- [ ] `selectedDate`가 rows에 없는 값이면 마지막 유효 날짜로 fallback 한다.
- [ ] 첫 날짜와 마지막 날짜에서 버튼 경계가 정확한지 확인한다.

### 4-7. 완료 판정

- [ ] 이전/다음 날짜 버튼이 실제로 동작한다.
- [ ] 날짜 표기, 요일, KPI가 함께 바뀐다.
- [ ] 전일 비교 없는 첫 날짜 예외가 처리된다.

---

## 5. 추천 작업 순서

### 순서 1. `WBS2-041`부터 끝내기

이유:

- repository가 이미 period 단위로 준비되어 있다.
- 클릭 시 데이터가 바뀌는 가장 쉬운 화면이다.
- `empty`, `partial` 테스트를 가장 먼저 확인할 수 있다.

### 순서 2. `WBS2-043` 날짜 이동 붙이기

이유:

- `rows[]`가 date 단위라 구현 규칙이 가장 단순하다.
- "날짜 변경 조건"이라는 사용자 요구에 가장 직접적으로 맞닿아 있다.

### 순서 3. `WBS2-042` 월별 집계/상세 계산 붙이기

이유:

- `monthly + daily`를 조합해야 해서 가장 손이 많이 간다.
- 앞선 두 화면에서 만든 포맷/계산 유틸을 재사용할 수 있다.

---

## 6. 파일별 실제 수정 체크포인트

### `src/hooks/useSalesQuery.js`

- [ ] placeholder 제거
- [ ] summary / monthly / daily 공통 조회 로직 배치
- [ ] 선택 period / date / month 계산을 어디까지 hook으로 올릴지 결정

### `src/pages/admin/SalesSummaryPage.jsx`

- [ ] period 탭 state 추가
- [ ] summary data 바인딩
- [ ] empty / partial 확인

### `src/pages/admin/DailySalesPage.jsx`

- [ ] selectedDate state 추가
- [ ] 이전/다음 버튼 활성 조건 추가
- [ ] KPI와 날짜 텍스트 연결

### `src/pages/admin/MonthlySalesPage.jsx`

- [ ] selectedMonth state 추가
- [ ] monthly row / daily rows 조합
- [ ] 차트 / 상세 테이블 동적 계산

### `src/mocks/adminMockRepository.js`

- [ ] `getSalesSummary(period)` fallback 규칙 재확인
- [ ] 필요 시 잘못된 period 입력 테스트 추가
- [ ] mock 확장이 필요하면 sales.daily / sales.monthly 구조를 먼저 정의

### `public/mocks/README.md`

- [ ] 매출 3화면에서 "이미 있는 필드 / 없는 필드" 구분을 구현 후 최신 상태로 갱신

---

## 7. 막히기 쉬운 포인트

- `SalesSummaryPage` 하단 표를 summary getter 하나만으로 해결하려고 하지 말 것
- `MonthlySalesPage`는 `getMonthlySales()`만으로는 상세 차트가 안 나옴
- `DailySalesPage`는 "시간대별 상세"까지 한 번에 하려다 멈추기 쉬움
- 현재 범위의 본질은 **날짜/기간 변경 조건 완성**이지, 모든 보조 카드의 100% 실데이터화가 아님

---

## 8. 최소 완료선

아래 3개가 되면 "날짜 변경 조건 구현"은 일단 통과로 봐도 된다.

- [ ] `WBS2-041`: 기간 탭 클릭 시 summary 데이터가 바뀐다.
- [ ] `WBS2-042`: 선택 월이 바뀌면 월 KPI와 일별 상세가 바뀐다.
- [ ] `WBS2-043`: 이전/다음 날짜 버튼으로 KPI와 날짜 라벨이 바뀐다.

그 다음이 보조 mock 확장이다.
