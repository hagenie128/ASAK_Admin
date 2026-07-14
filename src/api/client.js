import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: { Accept: "application/json" },
});

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
