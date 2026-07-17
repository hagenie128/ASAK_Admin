import axios from "axios";

/*
 * [학습] envelope 해제의 단일 위치.
 * Page/Component/Adapter가 response.data.data를 직접 파지하지 않게 한다.
 * Figma와 무관. API 계약 본문을 여기서 추측·변경하지 말 것.
 */

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: { Accept: "application/json" },
});

// All server responses use the team's envelope. Centralizing the unwrap logic
// keeps pages focused on their UI state instead of response-shape details.
export function unwrapResponse(response) {
  const body = response.data;
  if (!body?.success) {
    const error = new Error(body?.message ?? "API request failed");
    error.code = body?.code;
    error.status = body?.status ?? response.status;
    throw error;
  }
  return body.data;
}
