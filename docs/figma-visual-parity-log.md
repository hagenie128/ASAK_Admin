# Admin Figma 시각 일치 기록

## 기준 파일

- Figma: `ASAK — Design System Product UI 0718`
- File key: `yHhvn5RKjBd91U8BJUQz7F`
- Admin canvas: `134:10606` — `📊 06-C. Screens / Admin (Implementation Final)`
- 기준 해상도: Desktop `1920 × 1080`; 공통 관리 화면은 Figma의 240px navbar를 기준으로 한다.

이 파일은 기존 `figma-ui-handoff.md`의 이전 파일 키 기록보다 우선한다. Figma 화면을 수정하지 않고 코드 구현과 대조만 기록한다.

## 검증 방식

각 화면은 다음 순서로 완료한다.

1. Figma 노드 스크린샷을 저장하고 노드·variant·Auto Layout을 기록한다.
2. 로컬 화면을 같은 뷰포트에서 캡처한다.
3. 로고, 이미지, 텍스트, 간격, radius, border, shadow, 상태 화면을 대조한다.
4. 차이가 있으면 코드만 수정하고, 적용한 에셋과 예외를 이 문서에 남긴다.

`레이아웃이 표시된다`는 완료 기준이 아니다. 원본과의 시각 대조가 끝난 화면만 완료 처리한다.

## 에셋 연결 기록

| Figma 노드 | Figma 에셋 | 프로젝트 파일 | 사용 위치 | 상태 |
| --- | --- | --- | --- | --- |
| `134:10624` / `Admin/Navbar`, model=`logo` | `ASAK s logo` | `src/assets/figma/asak-s-logo.svg` | `AdminSidebar.jsx`, `LiveOrderPreview.jsx` | 원본 SVG를 프로젝트 내부 에셋으로 저장해 사용 |
| `134:10612` / `Admin/OrderCard` | `akar-icons:plus` | `src/assets/figma/icon-plus.svg` | `LiveOrderPreview.jsx` | 텍스트 `+` 대체 |
| `134:10612` / `Admin/OrderCard` | `pinhead:chip-bag-with-chip` | `src/assets/figma/icon-chip-bag.svg` | `LiveOrderPreview.jsx` | 임시 사각형 기호 대체 |
| `134:10612` / `Admin/OrderCard` | `mdi:drink-outline` | `src/assets/figma/icon-drink.svg` | `LiveOrderPreview.jsx` | 임시 사각형 기호 대체 |

Figma MCP가 내려주는 에셋 URL은 단기 URL이므로, 코드에는 URL을 남기지 않고 위의 내부 파일만 참조한다. 외부 CDN이나 Figma 런타임 의존성은 만들지 않는다.

## 효과(Effects) 대조 기록

| Figma 효과/노드 | Figma 값 또는 역할 | 웹 적용 | 대체 여부·사유 |
| --- | --- | --- | --- |
| `Admin/OrderCard` (`134:10612`) | 16px radius, floating card shadow | CSS `border-radius: 16px`, 다중 `box-shadow` | CSS box-shadow로 구현 가능. 브라우저별 블러가 Figma와 1:1 렌더링되지 않으므로 캡처 대조 후 수치만 조정한다. |
| `Admin/OrderCard` 옵션 버튼 | Figma는 48px 원형 컨트롤 | 40px 원형 + 원본 9px SVG | 화면 밀도와 가독성 기준으로 축소. 데이터 선택 기능이 붙기 전의 정적 표시이며, 터치 인터랙션을 추가할 때는 별도 48px 터치 영역을 유지한다. |
| `nav seleted` | 활성 메뉴 라임 표면/내부 하이라이트 | CSS inset shadow | CSS로 구현 가능. Figma의 오타 이름은 수정하지 않고 문서상 `Effect/Nav/Selected`로 추적한다. |
| `메뉴카드` | 카드 경계와 얕은 그림자 | CSS border + shadow | CSS로 구현 가능. 카드별 동일 토큰을 사용한다. |
| `라임 전체 번짐` | 큰 범위의 lime glow | 필요 화면에만 `box-shadow` 또는 pseudo element | backdrop/filter가 필요한 경우 성능·접근성 영향 때문에 동일한 색상/투명도의 정적 shadow로 대체하고, 해당 화면 행에 수치를 기록한다. |

## 문서 기준 위계·토큰 정책

코드 반영은 다음 우선순위를 따른다: 현재 0718 Figma 파일 → `ASAK_FIGMA_PRECISE_FIX_CHECKLIST_2026-07-18.md` → `FIGMA_0718_COLOR_CANON_2026-07-18.md` → Product Bible의 component/token 규칙 → 이전 Figma 파일과 스크린샷.

| 영역 | 코드 적용 기준 | Figma에서 발견해도 그대로 복제하지 않는 값 |
| --- | --- | --- |
| Typography | Pretendard Variable, 역할별 Heading/Body/Label, 명시 line-height | Auto line-height, 본문 16px 미만, 문서 역할과 맞지 않는 heading weight |
| 큰 제목 | 34px 이상은 -1%~-2% letter-spacing, line-height 매핑표 적용 | 큰 제목의 0% tracking 또는 본문과 동일한 400 weight |
| Color | `#B5E30F` Brand Primary, `#111827` primary text, `#6B7280` secondary text, semantic status token | `#3B82F6`, `#0088FF`, `#08F` 선택색; 임의 Tailwind green/lime |
| Layout | 8px base spacing, Screen → Section → Composite → Primitive 계층, 내용에 따라 Hug/Fill 사용 | 절대 좌표만으로 만든 재사용 컴포넌트, 화면마다 다른 동일 의미 spacing |
| Interactive target | 실기능을 붙일 컨트롤은 48px 터치 영역을 확보 | 표시용 아이콘 크기와 터치 영역을 동일하게 강제하는 방식 |

`Live Order`의 옵션 원형은 원본 48px에서 시각 크기를 40px으로 축소했지만, 실제 선택 기능 구현 시에는 48px 이상의 투명한/여백 포함 클릭 영역을 별도로 둔다. 또한 문서의 Blue 제거 원칙에 따라 음료 아이콘 wrapper의 blue border는 Brand Primary로 교체했다.

## 화면별 진행 상태

| 화면 | Figma 노드 | 코드 화면 | 에셋/효과 대조 | 상태 |
| --- | --- | --- | --- | --- |
| Live Order / Default | `134:10607` | `components/admin/LiveOrderPreview.jsx` | navbar 원본 logo 확보, 주문 카드 대조 진행 중 | 진행 중 |
| Order Detail / Default | `134:10630` | `pages/admin/OrderDetailPage.jsx` | 미대조 | 대기 |
| Sold-out / Default | `134:11863` | `pages/admin/SoldOutManagePage.jsx` | 미대조 | 대기 |
| Login / Default | `134:12033` | `pages/admin/LoginPage.jsx` | 미대조 | 대기 |
| Menu Management / Default | `134:12137` | `pages/admin/MenuManagePage.jsx` | 메뉴 이미지 에셋 포함 대조 필요 | 대기 |
| Payment / Default | `134:11493` | `pages/admin/PaymentMethodPage.jsx` | 미대조 | 대기 |
| Sales / Default | `134:10661` | `pages/admin/SalesSummaryPage.jsx` | 미대조 | 대기 |
| Dashboard / Default | `227:5008` | `pages/admin/DashboardPage.jsx` | 미대조 | 대기 |

## 구현 경계

이미지·아이콘·로고·CSS 효과는 피그마 원본에 맞춰 포함한다. 다만 API 호출, JSON 불러오기, 주문 상태 전이, 인증, 저장, 결제, TTS는 구현하지 않으며 버튼은 UI 확인용 비활성 상태로 둔다.
