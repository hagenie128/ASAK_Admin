# 05. Git 브랜치·PR 운영 계획

## 브랜치

```text
main                         # 항상 빌드 가능한 통합 브랜치
feature/admin-login
feature/admin-orders
feature/admin-sold-out
feature/admin-menu-management
feature/admin-sales
fix/admin-order-status-error
docs/admin-onboarding
```

- `main`에 직접 push하지 않습니다.
- 하나의 브랜치에는 하나의 기능 또는 한 종류의 수정만 넣습니다.
- 공통 API 계약 변경은 영향 화면 담당자에게 범위를 공유합니다.

## 작업 절차

```bash
git switch main
git pull --rebase origin main
git switch -c feature/admin-orders
# 구현, lint/build
git add src/apps src/api docs
git commit -m "feat(admin): add order list filters"
git push -u origin feature/admin-orders
```

## 커밋 규칙

형식은 `type(scope): summary`입니다.

| type | 용도 | 예시 |
| --- | --- | --- |
| feat | 기능 | `feat(admin): add sold-out toggle` |
| fix | 버그 | `fix(admin): preserve order filter` |
| refactor | 동작 없는 구조 개선 | `refactor(api): centralize error mapping` |
| docs | 문서 | `docs(admin): add onboarding guide` |
| test | 테스트 | `test(admin): cover order status update` |
| chore | 설정 | `chore: update eslint configuration` |

## PR 체크리스트

- [ ] 제목과 설명에 화면/API ID가 있다.
- [ ] `npm run lint`와 `npm run build`를 실행했다.
- [ ] loading, empty, error 상태를 확인했다.
- [ ] API/상태 변경의 영향 화면을 적었다.
- [ ] 화면 캡처 또는 테스트 방법을 첨부했다.

충돌이 발생하면 먼저 `main`을 rebase하고, 공통 파일 충돌은 임의로 해결하지 말고 해당 담당자와 계약을 확인합니다.
