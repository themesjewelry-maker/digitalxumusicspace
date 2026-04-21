import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle2, Clock, Loader2, Phone } from "lucide-react";

interface Booking {
  id: number;
  name: string;
  phone: string;
  course: string;
  note: string;
  status: string;
  created_at: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "待处理", color: "bg-amber-100 text-amber-700" },
  contacted: { label: "已联系", color: "bg-blue-100 text-blue-700" },
  confirmed: { label: "已确认", color: "bg-emerald-100 text-emerald-700" },
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("无法连接后端服务器，请确认 server 已启动");
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("更新失败");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      alert("状态更新失败");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');html{scroll-behavior:smooth;}body{font-family:'Inter',system-ui,sans-serif;}`}</style>

      <nav className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-[#1D1D1F] tracking-tight">
            琴鸣声乐工作室
          </Link>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#86868B]">
            预约管理后台
          </span>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">
              预约记录
            </h1>
            <p className="text-sm text-[#86868B] mt-1">
              共 {bookings.length} 条记录 · 数据来自 SQLite
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回首页
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#86868B] animate-spin" />
            <span className="ml-2 text-sm text-[#86868B]">加载中...</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-10 h-10 text-[#86868B]/30 mx-auto mb-3" />
            <p className="text-sm text-[#86868B]">暂无预约记录</p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                  <tr>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">姓名</th>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">电话</th>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">课程</th>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">备注</th>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">状态</th>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">提交时间</th>
                    <th className="px-5 py-3.5 font-medium text-[#86868B]">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1D1D1F]">{b.name}</td>
                      <td className="px-5 py-4 text-[#1D1D1F]">{b.phone}</td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F]">
                          {b.course}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#86868B] max-w-[240px]">
                        <div className="whitespace-pre-wrap break-words text-xs leading-relaxed">
                          {b.note || "—"}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusMap[b.status]?.color || "bg-gray-100 text-gray-600"}`}>
                          {statusMap[b.status]?.label || b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#86868B] whitespace-nowrap">
                        {new Date(b.created_at).toLocaleString("zh-CN")}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {b.status !== "contacted" && (
                            <button
                              onClick={() => updateStatus(b.id, "contacted")}
                              className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              已联系
                            </button>
                          )}
                          {b.status !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(b.id, "confirmed")}
                              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            >
                              已确认
                            </button>
                          )}
                          {b.status === "confirmed" && (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              已完成
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
