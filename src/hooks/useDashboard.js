import { useEffect, useState } from "react";
import { getDashboard } from "../mocks/adminMockRepository.js";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const envelope = getDashboard();
    setData(envelope.data ?? null);
    setStatus("ready");
  }, []);

  return { data, status };
}
