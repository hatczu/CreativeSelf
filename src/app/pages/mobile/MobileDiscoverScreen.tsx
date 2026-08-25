import React from 'react';
import { MagnifyingGlass, Sparkle, Star, Clock, MapPin, BookmarkSimple, CaretLeft, Eye } from '@phosphor-icons/react';
import { mockVendors, mockActivities, themeCategories, Activity } from '@/app/data/subscriptionData';

interface MobileDiscoverScreenProps {
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPlanId: string;
  setSelectedActivity: (act: Activity | null) => void;
  savedActivityIds: string[];
  toggleSaveActivity: (id: string) => void;
}

export function MobileDiscoverScreen({
  selectedBrandId,
  setSelectedBrandId,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  selectedPlanId,
  setSelectedActivity,
  savedActivityIds,
  toggleSaveActivity,
}: MobileDiscoverScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 space-y-4 px-4 pt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {selectedBrandId === null ? (
        /* VIEW 1: SERVICE BRANDS LIST */
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="pb-3 border-b border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-[16px] font-extrabold text-[#1A1A28] leading-tight" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
                Choose a Service Brand
              </h2>
              <span className="text-[10px] font-semibold text-[#1AB0DC] bg-[#E8F9FF] border border-[#33C4F0]/30 px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1 shrink-0">
                <Sparkle size={11} className="text-[#33C4F0] fill-[#33C4F0]" />
                {selectedPlanId === 'elite-creative' ? 'Elite Plan' : selectedPlanId === 'basic-creative' ? 'Basic Plan' : 'Advanced Plan'}
              </span>
            </div>
            <p className="text-[12px] text-[#6A7282] font-medium leading-relaxed">
              Select a service brand below to access all included workshops & activities.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <MagnifyingGlass size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search service brands, specialty, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#33C4F0] shadow-xs transition"
            />
          </div>

          {/* Theme Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {themeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-1.5 px-3 rounded-full text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{cat.symbol}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Service Brands List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pt-1">
              <h3 className="text-[13px] font-extrabold text-[#1A1A28] uppercase tracking-wider">
                Service Brands ({mockVendors.length})
              </h3>
              <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                1 Brand Entitlement
              </span>
            </div>

            {mockVendors
              .filter((vendor) => {
                const matchesCat = selectedCategory === 'all' || vendor.theme.toLowerCase().includes(selectedCategory.toLowerCase()) || vendor.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
                const matchesSearch = !searchQuery || vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCat && matchesSearch;
              })
              .map((vendor) => {
                const vendorActivities = mockActivities.filter((a) => a.vendorId === vendor.id);
                const aiMatchScore = vendor.id === 'studio-lumen' ? 98 : vendor.id === 'cocoa-collective' ? 95 : 92;

                return (
                  <div key={vendor.id} className="py-[16px] border-b border-[#F1F5F9] space-y-3">
                    {/* Header row above card */}
                    <div className="flex items-center justify-between px-0 h-[36px]">
                      <div className="flex items-center gap-[10px] min-w-0 flex-1">
                        <div className="w-[28px] h-[36px] bg-[#F1F5F9] rounded-full p-[4px] flex items-center justify-center shrink-0">
                          <span className="text-[20px] leading-[28px] font-normal text-[#0F172B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {vendor.avatar}
                          </span>
                        </div>
                        <div className="flex flex-col justify-start min-w-0 flex-1">
                          <h4 className="text-[12px] font-[800] text-[#0F172B] leading-[16px] truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {vendor.name}
                          </h4>
                          <p className="text-[11px] font-normal text-[#90A1B9] leading-[17px] truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {vendor.specialty}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-[700] text-[#1AB0DC] bg-[#E8F9FF] px-[8px] py-[2px] rounded-full shrink-0 ml-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {vendorActivities[0]?.duration || '45 min'}
                      </span>
                    </div>

                    {/* Main Brand Image Container */}
                    <div className="relative h-[176px] w-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-sky-600 overflow-hidden isolate" style={{ borderRadius: '20px 20px 50px 20px' }}>
                      <img
                        src={vendor.image}
                        alt=""
                        className="w-full h-full object-cover relative z-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)' }} />

                      <div
                        className="absolute top-3 right-3 text-[#E9D4FF] text-[10px] font-[800] px-[10px] py-[2px] rounded-full flex items-center gap-1 shadow-md z-[2]"
                        style={{
                          background: 'rgba(89, 22, 139, 0.8)',
                          border: '1px solid rgba(194, 122, 255, 0.3)',
                          backdropFilter: 'blur(8px)',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      >
                        <Sparkle size={11} className="text-[#DAB2FF] fill-[#DAB2FF]" />
                        {aiMatchScore}% Acumen Match
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-[3]">
                        <div className="flex items-center gap-[10px] min-w-0">
                          <div className="w-[40px] h-[40px] rounded-[16px] bg-white shadow-md flex items-center justify-center text-[20px] shrink-0">
                            {vendor.avatar}
                          </div>
                          <div className="min-w-0 flex flex-col justify-start">
                            <span
                              className="text-[9px] font-[800] text-white bg-white/20 px-2 py-[2px] rounded-[19.6px] uppercase backdrop-blur-md inline-block w-fit mb-0.5"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              {vendor.theme}
                            </span>
                            <h3
                              className="text-[14px] font-[700] text-white leading-[20px] truncate"
                              style={{ fontFamily: 'Century Gothic, sans-serif' }}
                            >
                              {vendor.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Location */}
                    <div className="flex items-center gap-2 text-[12px] font-[700] pt-1" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                      <span className="flex items-center gap-1 text-[#FE9A00]">
                        <Star size={14} weight="fill" className="text-[#FFB900]" />
                        {vendor.rating}
                      </span>
                      <span className="text-[#717182]">•</span>
                      <span className="text-[#717182]">{vendor.location}</span>
                    </div>

                    <p className="text-[12px] font-normal text-[#101828] leading-[20px] py-[8px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vendor.description || vendor.specialty}
                    </p>

                    {/* FEATURED SERVICES */}
                    <div className="border-t border-[#33C4F0]/15 pt-[16px] space-y-3">
                      <h4
                        className="text-[10px] font-[700] text-[#6A7282] uppercase tracking-[1.54px] leading-[16px]"
                        style={{ fontFamily: 'Century Gothic, sans-serif' }}
                      >
                        FEATURED SERVICES:
                      </h4>

                      <div className="flex items-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full">
                        {vendorActivities.map((act) => (
                          <div
                            key={act.id}
                            onClick={() => setSelectedActivity(act)}
                            className="cursor-pointer flex items-start bg-[#F8FDFF] border border-[#33C4F0]/20 min-w-[262px] w-[262px] h-[52px] shrink-0 overflow-hidden"
                            style={{ borderRadius: '20px 20px 48px 20px' }}
                          >
                            <div className="w-[52px] h-[52px] bg-[#E5E7EB] shrink-0 overflow-hidden relative flex items-center justify-center text-lg">
                              <span className="text-slate-400 select-none z-0">{act.symbol || vendor.avatar || '🎨'}</span>
                              <img
                                src={act.image}
                                alt=""
                                className="w-full h-full object-cover absolute inset-0 z-10"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="px-[10px] pr-[20px] py-[4px] flex flex-col justify-center min-w-0 flex-1">
                              <h5
                                className="text-[12px] font-[700] text-[#414153] leading-[24px] truncate"
                                style={{ fontFamily: 'Century Gothic, sans-serif' }}
                              >
                                {act.name}
                              </h5>
                              <p
                                className="text-[11px] font-[500] text-[#717182] leading-[15px]"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                {act.duration}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-[6px] pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedBrandId(vendor.id)}
                        className="flex-1 h-[34px] bg-[#F8FDFF] border border-[#33C4F0]/30 text-[#147C9E] text-[12px] font-[700] flex items-center justify-center gap-[6px] transition hover:bg-[#E8F9FF]"
                        style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                      >
                        <Eye size={15} className="text-[#147C9E]" />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBrandId(vendor.id)}
                        className="flex-1 h-[32px] bg-[#33C4F0] text-white text-[12px] font-[700] flex items-center justify-center gap-[6px] transition hover:opacity-90 shadow-2xs"
                        style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        (() => {
          const selectedVendor = mockVendors.find((v) => v.id === selectedBrandId) || mockVendors[0];
          const vendorActivities = mockActivities.filter((a) => a.vendorId === selectedVendor.id);

          return (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setSelectedBrandId(null)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A28] bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs hover:bg-slate-50 transition"
              >
                <CaretLeft size={16} weight="bold" /> Back to All Service Brands
              </button>

              <div
                className="bg-white border border-slate-100 shadow-sm overflow-hidden"
                style={{ borderRadius: '20px 20px 54px 20px' }}
              >
                <div className="relative h-44 w-full">
                  <img src={selectedVendor.image} alt={selectedVendor.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white text-2xl flex items-center justify-center shadow-md">
                        {selectedVendor.avatar}
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase bg-white/20 px-2 py-0.5 rounded-md backdrop-blur">
                          {selectedVendor.theme}
                        </span>
                        <h1 className="text-base font-black truncate">{selectedVendor.name}</h1>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur">
                      ★ {selectedVendor.rating}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {selectedVendor.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold border-t border-slate-100 pt-2">
                    <span>📍 {selectedVendor.location}</span>
                    <span className="text-[#10B981]">{vendorActivities.length} Included Sessions</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Available Services & Workshops ({vendorActivities.length})
                </h3>
                <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                  Included in Pass
                </span>
              </div>

              <div className="space-y-3.5">
                {vendorActivities.map((act) => {
                  const isSaved = savedActivityIds.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      className="bg-white border border-slate-100 shadow-sm overflow-hidden hover:border-[#33C4F0]/40 transition"
                      style={{ borderRadius: '20px 20px 54px 20px' }}
                    >
                      <div className="relative h-36 w-full">
                        <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleSaveActivity(act.id)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition ${
                            isSaved ? 'text-[#EF4444]' : 'text-slate-600'
                          }`}
                        >
                          <BookmarkSimple size={16} weight={isSaved ? 'fill' : 'regular'} />
                        </button>
                        <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <span>{act.symbol}</span> {act.category}
                        </div>
                      </div>

                      <div className="p-3.5">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1">{act.name}</h4>
                          <span className="text-[11px] font-bold text-[#F59E0B] flex items-center gap-0.5 shrink-0 ml-2">
                            <Star size={12} weight="fill" /> {act.rating}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 font-medium mb-2.5">{act.vendorName}</p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" /> {act.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-slate-400" /> {act.location}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-50">
                          <span className="text-[11px] font-extrabold text-[#10B981]">
                            Included in Subscription
                          </span>
                          <button
                            onClick={() => setSelectedActivity(act)}
                            className="h-[32px] px-3 bg-[#33C4F0] text-white text-[11px] font-bold shadow-2xs hover:bg-[#1AB0DC] transition flex items-center justify-center"
                            style={{ borderRadius: '10px 10px 24px 10px', fontFamily: 'Poppins, sans-serif' }}
                          >
                            Book Session
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
