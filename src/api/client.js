import axios from "axios";

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
