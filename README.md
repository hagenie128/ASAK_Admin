# ASAK Admin

> **작업 시작점:** [ASAK 프로젝트 작업 허브](../ASAK/PROJECT_HUB.md) → 기능 한 개 선택 → 이 저장소 코드 수정 → 워크로그 기록.

## Central documentation

- [ASAK docs index](../ASAK/docs/README.md)
- [Product Bible Pack 12 — Frontend Implementation](../ASAK/docs/product_bible/12_Frontend_Implementation/README.md)
- [Product Bible Pack 11 — Backend Implementation](../ASAK/docs/product_bible/11_Backend_Implementation/README.md)
- [Current Implementation Map](../ASAK/docs/planning/current-implementation-map-2026-07-16.md)
- [Implementation Priority](../ASAK/docs/planning/implementation-priority-2026-07-16.md)
- [Implementation Guide Start](../ASAK/docs/implementation_guide/00_START_HERE.md)
- [Admin Implementation Guide](../ASAK/docs/implementation_guide/03_ADMIN_IMPLEMENTATION.md)
- [API·Response Guide](../ASAK/docs/implementation_guide/04_API_DB_IMPLEMENTATION.md)

This is the canonical implementation repository for administrator React JavaScript.

ASAK 관리자 운영 화면 전용 React/Vite 애플리케이션입니다. 주문 조회·상태 변경, 품절, 메뉴·결제수단 설정, 매출 조회를 이 저장소에서 담당합니다. 주문 키오스크 화면은 `ASAK-kiosk` 저장소에서 개발합니다.

## 빠른 시작

```bash
git clone https://github.com/hagenie128/ASAK_Admin.git
cd ASAK_Admin
cp .env.example .env
npm install
npm run dev
```

개발 서버는 `http://localhost:5174`에서 실행됩니다.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run lint` | 정적 검사 |
| `npm run build` | 운영용 `dist/` 생성 |
| `npm run preview` | 빌드 결과 로컬 확인 |

## 문서

- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) ← **실행 계획 (2026-07-20)**
- [src/STRUCTURE_GUIDE.md](src/STRUCTURE_GUIDE.md)
- [docs/ui-implementation-map-2026-07-18.md](docs/ui-implementation-map-2026-07-18.md)
- [UI-INDEX.md](../UI-INDEX.md)
- [Current Implementation Map](../ASAK/docs/planning/current-implementation-map-2026-07-16.md)
- [작업공간 안내](../README.md)

## 디렉터리

```text
src/
  apps/       AdminApp 라우트
  pages/      정적 UI 화면
  components/ Sidebar 등
  mocks/      adminMockRepository (READY, Page 미연결)
  api/hooks/adapters/  placeholder
docs/         UI 맵·Figma 로그
public/mocks/ asak-admin-data.json
```

## 현재 구현 기준 (2026-07-20)

- **Figma 정적 UI:** 라우트 연결됨 (`/`, `/dashboard`, `/orders`, `/sold-out`, `/menus`, `/payment-methods`, `/sales*`)
- **Mock:** repository READY · **페이지 연동 0**
- **코드 경로(실행):** kebab-case · Canonical(`/soldOut` 등)과 CONFLICT → WBS2-033
- Figma **0718** (`yHhvn5RKjBd91U8BJUQz7F`) — 0715 키 사용 금지
- Admin 정본은 이 저장소. Kiosk 안 Admin scaffold에 새 기능 넣지 말 것.
- Backend API 없음 → mock UI와 실연동을 구분할 것.
