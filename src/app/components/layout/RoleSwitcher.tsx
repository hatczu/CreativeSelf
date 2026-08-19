import { useState } from "react";
import { Link } from "react-router";
import { ArrowsLeftRight as ArrowLeftRight } from "@phosphor-icons/react";

type Role = "client" | "vendor" | "admin" | "mobile";

export function RoleSwitcher({ activeRole }: { activeRole: Role }) {
  const [open, setOpen] = useState(false);
  const roles: { label: string; path: string; role: Role }[] = [
    { label: "Client Desktop", path: "/dashboard", role: "client" },
    { label: "Client Mobile App 📱", path: "/mobile", role: "mobile" },
    { label: "Vendor Portal", path: "/vendor", role: "vendor" },
    { label: "Admin Workspace", path: "/admin", role: "admin" },
  ];

  return <div className="relative"><button type="button" onClick={() => setOpen((value) => !value)} title="Switch role" aria-label="Switch role" className="grid h-10 w-10 place-items-center rounded-full border border-[#33c4f0]/25 text-[#147c9e] transition hover:bg-[#e8f9ff]"><ArrowLeftRight size={17} /></button>{open && <div className="absolute bottom-0 left-14 w-44 overflow-hidden border border-[#dfe5e7] bg-white py-2 shadow-xl" style={{ borderRadius: "20px 20px 64px 20px" }}><p className="px-4 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#717182]">Switch workspace</p>{roles.map((item) => <Link key={item.role} to={item.path} onClick={() => setOpen(false)} className={`block px-4 py-2 text-sm font-bold no-underline hover:bg-[#f3f5f6] ${activeRole === item.role ? "bg-[#e8f9ff] text-[#147c9e]" : "text-[#19242a]"}`}>{item.label}</Link>)}</div>}</div>;
}
