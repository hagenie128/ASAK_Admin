/*
 * Figma Component 연결 후보: AdminLayout
 * 현재 코드 역할: Sidebar + Header + 본문(children) 셸.
 * Figma Navbar Model: Desktop(>1280) / Tablet(≤1280)
 *
 * 데이터 흐름:
 *   main.jsx → AdminApp → AdminLayout → children Page
 */

import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

const TABLET_MQ = "(max-width: 1280px)";

export default function AdminLayout({ children }) {
  const [sidebarModel, setSidebarModel] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(TABLET_MQ).matches ? "Tablet" : "Desktop",
  );

  useEffect(() => {
    const mq = window.matchMedia(TABLET_MQ);
    const sync = () => setSidebarModel(mq.matches ? "Tablet" : "Desktop");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className={`admin-app${sidebarModel === "Tablet" ? " admin-app--tablet" : ""}`}>
      <AdminSidebar model={sidebarModel} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
