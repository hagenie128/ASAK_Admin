// 결제수단 편집 Hook — WBS2-040
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPaymentMethods, savePaymentMethods } from "../mocks/adminMockRepository.js";

function snapshot(rows) {
  return rows.map((row) => `${row.methodId}:${row.isActive}:${row.sortOrder}`).join("|");
}

function reorder(rows, methodId, direction) {
  const index = rows.findIndex((row) => row.methodId === methodId);
  if (index < 0) return rows;

  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= rows.length) return rows;

  const next = [...rows];
  [next[index], next[target]] = [next[target], next[index]];
  return next.map((row, sortIndex) => ({ ...row, sortOrder: sortIndex + 1 }));
}

export function usePaymentMethodDraft() {
  const [rows, setRows] = useState([]);
  const [baseline, setBaseline] = useState("");
  const [status, setStatus] = useState("loading");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const envelope = getPaymentMethods();
    const nextRows = [...(envelope.data ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
    setRows(nextRows);
    setBaseline(snapshot(nextRows));
    setStatus("ready");
  }, []);

  const isDirty = useMemo(() => snapshot(rows) !== baseline, [rows, baseline]);

  const activePreviewRows = useMemo(
    () => rows.filter((row) => row.isActive),
    [rows],
  );

  const toggleMethod = useCallback((methodId) => {
    setRows((prev) =>
      prev.map((row) =>
        row.methodId === methodId ? { ...row, isActive: !row.isActive } : row,
      ),
    );
  }, []);

  const moveMethod = useCallback((methodId, direction) => {
    setRows((prev) => reorder(prev, methodId, direction));
  }, []);

  const save = useCallback(async () => {
    if (!isDirty || isSaving) {
      return { success: true, message: "변경사항이 없습니다." };
    }

    const before = rows;
    setIsSaving(true);
    try {
      const result = savePaymentMethods(before);
      if (result.success) {
        setBaseline(snapshot(before));
      } else {
        setRows(before);
      }
      return result;
    } catch {
      setRows(before);
      return { success: false, message: "저장에 실패했습니다." };
    } finally {
      setIsSaving(false);
    }
  }, [rows, isDirty, isSaving]);

  return {
    status,
    rows,
    activePreviewRows,
    isDirty,
    isSaving,
    canSave: isDirty && !isSaving,
    toggleMethod,
    moveMethod,
    save,
  };
}
