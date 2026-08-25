import React from 'react';
import { CalendarBlank, Clock, MapPin, QrCode } from '@phosphor-icons/react';

interface MobileBookingsScreenProps {
  myBookings: any[];
  setActiveTab: (tab: any) => void;
  setSelectedQrPass: (pass: any) => void;
}

export function MobileBookingsScreen({
  myBookings,
  setActiveTab,
  setSelectedQrPass,
}: MobileBookingsScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 space-y-4 px-4 pt-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-extrabold text-[#1A1A28] leading-tight" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
            My Bookings & Passes
          </h2>
          <p className="text-[12px] text-[#6A7282] font-semibold">Access your active mobile passes and ticket QR codes.</p>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200/60 shrink-0">
          {myBookings.length} Active
        </span>
      </div>

      {myBookings.length === 0 ? (
        <div className="text-center py-12 px-4">
          <CalendarBlank size={36} className="text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-900">No Bookings Yet</p>
          <p className="text-[11px] text-slate-500 mb-4">Discover sessions and book your first experience.</p>
          <button
            onClick={() => setActiveTab('discover')}
            className="py-2 px-5 bg-[#33C4F0] text-white text-xs font-bold rounded-full shadow-xs"
          >
            Explore Sessions
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {myBookings.map((bk) => (
            <div key={bk.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${bk.color}15` }}
                >
                  {bk.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      {bk.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{bk.seats} Ticket</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{bk.activityName}</h4>
                  <p className="text-[11px] text-slate-500">{bk.vendorName}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-slate-800 font-medium">
                  <span className="flex items-center gap-1 text-slate-400"><Clock size={12} /> Date & Time:</span>
                  <span>{bk.date} • {bk.time}</span>
                </div>
                <div className="flex items-center justify-between text-slate-800 font-medium">
                  <span className="flex items-center gap-1 text-slate-400"><MapPin size={12} /> Location:</span>
                  <span className="truncate max-w-[160px]">{bk.location}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedQrPass(bk)}
                className="w-full py-3 px-3 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-800 transition"
              >
                <QrCode size={16} /> Show Mobile Pass
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
