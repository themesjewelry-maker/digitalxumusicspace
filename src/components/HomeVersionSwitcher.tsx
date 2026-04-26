import { useLocation, Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { useState } from "react";

const versions = [
  { path: "/", label: "原版", desc: "当前线上首页" },
  { path: "/home/v1", label: "V1 暖木", desc: "暖木色调风格" },
  { path: "/home/v2", label: "V2 深蓝", desc: "深蓝艺术风格" },
  { path: "/home/v3", label: "V3 午夜", desc: "午夜交响风格" },
  { path: "/home/v4", label: "V4 复古", desc: "复古胶片风格" },
];

export default function HomeVersionSwitcher() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isHomeRoute = ["/", "/home/v1", "/home/v2"].includes(location.pathname);
  if (!isHomeRoute) return null;

  const current = versions.find((v) => v.path === location.pathname) || versions[0];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
      {/* 展开的菜单 */}
      {open && (
        <div className="mb-1 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/5 shadow-2xl p-2 min-w-[180px]">
          <div className="px-3 py-2 text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
            首页版本切换
          </div>
          {versions.map((v) => (
            <Link
              key={v.path}
              to={v.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                v.path === location.pathname
                  ? "bg-[#1D1D1F] text-white"
                  : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
              }`}
            >
              <span className="font-semibold">{v.label}</span>
              <span className="text-xs opacity-60">{v.desc}</span>
            </Link>
          ))}
        </div>
      )}

      {/* 触发按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all backdrop-blur-md border ${
          open
            ? "bg-[#1D1D1F] text-white border-[#1D1D1F]"
            : "bg-white/90 text-[#1D1D1F] border-black/5 hover:bg-white"
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>{current.label}</span>
      </button>
    </div>
  );
}
