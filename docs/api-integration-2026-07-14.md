# 06. API 연동 기준

## 환경변수

| 변수 | 예시 | 설명 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | 백엔드 API 기본 주소 |
| `VITE_USE_MOCK` | `true` | mock 사용 여부 |

## 응답 규격

```json
{
  "success": true,
  "status": 200,
  "code": "OK",
  "message": "success",
  "data": {}
}
```

`api/client.js`의 `unwrapResponse`만 envelope를 해제합니다. 페이지와 컴포넌트가 `response.data.data`를 직접 다루지 않도록 합니다.

## 관리자 API 우선순위

| API | 화면 | 핵심 필드 |
| --- | --- | --- |
| `GET /api/admin/orders` | 주문 목록 | orderNo, orderStatus, paymentStatus, totalPrice |
| `PATCH /api/admin/orders/{id}/status` | 주문 상세 | orderStatus |
| `GET/PATCH /api/admin/sold-out-items` | 품절 관리 | targetType, targetId, isSoldOut |
| 메뉴·결제수단·매출 API | 운영 설정 | 별도 계약 확정 후 연결 |

## 오류 처리

- 401: 로그인 화면 또는 세션 갱신 흐름으로 이동
- 403: 권한 없음 안내, 재시도 버튼을 제공하지 않음
- 409: 최신 상태 재조회 후 사용자에게 변경 충돌 안내
- 5xx/네트워크: 사용자가 재시도할 수 있는 오류 UI 제공
