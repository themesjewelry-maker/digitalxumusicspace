import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const useDarkNavPage = location.pathname === "/home/v3" || location.pathname === "/home/v4";
  const useDarkNav = useDarkNavPage || !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "理念", href: "/philosophy", external: true },
    { label: "钢琴", href: "/piano-philosophy", external: true },
    { label: "声乐", href: "/vocal", external: true },
    { label: "创始人", href: "/teacher", external: true },
    { label: "关于", href: "/about", external: true },
    { label: "预约", href: "/#booking" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? useDarkNav
              ? "bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]"
              : "bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[52px]">
            {/* Logo */}
            <Link
              to="/"
              className={`font-semibold text-sm tracking-tight hover:opacity-70 transition-opacity ${
                useDarkNav ? "text-[#F8F6F0]" : "text-[#1D1D1F]"
              }`}
            >
              琴鸣声乐工作室
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.external ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-xs transition-colors tracking-wide font-medium ${
                      useDarkNav
                        ? "text-[#F8F6F0]/70 hover:text-[#F8F6F0]"
                        : "text-[#1D1D1F]/80 hover:text-[#1D1D1F]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-xs transition-colors tracking-wide font-medium ${
                      useDarkNav
                        ? "text-[#F8F6F0]/70 hover:text-[#F8F6F0]"
                        : "text-[#1D1D1F]/80 hover:text-[#1D1D1F]"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="/#booking"
                className={`text-xs px-4 py-1.5 rounded-full transition-colors font-medium ${
                  useDarkNav
                    ? "bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E8C84A]"
                    : "bg-[#1D1D1F] text-white hover:bg-[#333]"
                }`}
              >
                预约试听
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 -mr-2 ${useDarkNav ? "text-[#F8F6F0]" : "text-[#1D1D1F]"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 backdrop-blur-2xl md:hidden ${
          useDarkNav ? "bg-[#0A0A0A]/95" : "bg-white/95"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, i) =>
            link.external ? (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-medium transition-colors ${
                    useDarkNav
                      ? "text-[#F8F6F0] hover:text-[#D4AF37]"
                      : "text-[#1D1D1F] hover:text-[#86868B]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`text-2xl font-medium transition-colors ${
                  useDarkNav
                    ? "text-[#F8F6F0] hover:text-[#D4AF37]"
                    : "text-[#1D1D1F] hover:text-[#86868B]"
                }`}
              >
                {link.label}
              </motion.a>
            )
          )}
          <motion.a
            href="/#booking"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-4 text-lg bg-[#1D1D1F] text-white px-8 py-3 rounded-full"
          >
            预约试听
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
