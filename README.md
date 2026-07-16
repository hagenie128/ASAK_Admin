# ASAK Admin

## Central documentation

- [ASAK docs index](../ASAK/docs/README.md)
- [Product Bible Pack 12 — Frontend Implementation](../ASAK/docs/product_bible/12_Frontend_Implementation/README.md)
- [Product Bible Pack 11 — Backend Implementation](../ASAK/docs/product_bible/11_Backend_Implementation/README.md)
- [Current Implementation Map](../ASAK/docs/CURRENT_IMPLEMENTATION_MAP.md)
- [Implementation Priority](../ASAK/docs/IMPLEMENTATION_PRIORITY.md)

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

- [작업공간·Git 저장소 안내](../README.md)
- [문서 목차](docs/README.md)
- [개발 환경과 온보딩](docs/01-onboarding.md)
- [프론트 구조와 책임 경계](docs/02-architecture.md)
- [개발 규칙과 구현 가이드](docs/03-development-guide.md)
- [상세 구현 계획](IMPLEMENTATION_PLAN.md)
- [Git 브랜치·PR 운영 계획](docs/05-git-workflow.md)
- [API 연동 기준](docs/06-api-integration.md)

## 디렉터리

```text
src/
  apps/       관리자 앱의 화면·라우팅
  api/        Axios 클라이언트 및 관리자 API 모듈
  styles/     관리자 전용 전역/레이아웃 스타일
docs/         교육, 일정, Git 및 API 연동 문서
```

`src/`의 화면·컴포넌트 파일은 현재 구현 전 단계의 힌트 파일입니다. 상세 역할은 [src 안내](src/README.md)와 [요구사항·화면 매핑](src/contracts/requirements-screen-map.md)을 참고합니다.

이 저장소의 화면 범위와 구현 순서는 `IMPLEMENTATION_PLAN.md`를 기준으로 합니다. 공통 API 계약이 변경되면 영향 화면을 먼저 확인합니다.
