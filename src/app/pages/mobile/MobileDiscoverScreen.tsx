import React from 'react';
import { Sparkle, Star, Check, Eye, CaretLeft, MagnifyingGlass, BookmarkSimple, Clock, MapPin } from '@phosphor-icons/react';
import { mockVendors, mockActivities, themeCategories, Activity } from '@/app/data/subscriptionData';
import { useSubscription } from '@/app/context/SubscriptionContext';

interface MobileDiscoverScreenProps {
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlanId: string;
  setSelectedActivity: (activity: Activity | null) => void;
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
  const { planName, selectedBrand, selectBrand } = useSubscription();

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {selectedBrandId === null ? (
        /* VIEW 1: SERVICE BRANDS LIST */
        <div>
          {/* Top Header Block */}
          <div className="bg-white px-4 pt-5 pb-4 space-y-3">
              <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit mb-2.5">
                <span
                  className="text-[10px] font-semibold text-[#007595] leading-[15px]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {planName || (selectedPlanId === 'elite-creative' ? 'Elite Plan' : selectedPlanId === 'basic-creative' ? 'Basic Plan' : 'Pass Active')}
                </span>
              </div>
              <h2 className="text-[18px] font-semibold text-[#1A1A28] leading-tight" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
                Choose a Service Brand
              </h2>
            <p className="text-[12px] text-[#6A7282] font-normal leading-relaxed">
              Select a service brand below to subscribe your plan entitlement & access included activities.
            </p>

            {/* Search Input */}
            <div
              className="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] pr-[20px] gap-[8px] transition focus-within:border-[#33C4F0]"
              style={{ borderRadius: '20px 20px 48px 20px' }}
            >
              <MagnifyingGlass size={16} className="text-[#90A1B9] shrink-0" />
              <input
                type="text"
                placeholder="Search service brands, specialty, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            {/* Theme Category Pills */}
            <div className="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {themeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ borderRadius: '20px 20px 48px 20px' }}
                  className={`py-1.5 px-3.5 text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-[#1AB0DC] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.symbol}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Brands Content List */}
          <div className="pt-2">
            <div className="space-y-2 pb-4">
              {mockVendors
                .filter((vendor) => {
                  const matchesCat = selectedCategory === 'all' || vendor.theme.toLowerCase().includes(selectedCategory.toLowerCase()) || vendor.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
                  const matchesSearch = !searchQuery || vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesCat && matchesSearch;
                })
                .map((vendor) => {
                  const vendorActivities = mockActivities.filter((a) => a.vendorId === vendor.id);
                  const aiMatchScore = vendor.id === 'studio-lumen' ? 98 : vendor.id === 'cocoa-collective' ? 95 : 92;
                  const isSubscribedToVendor = selectedBrand?.id === vendor.id;

                  return (
                    <div key={vendor.id} className="w-full bg-white rounded-none p-4 space-y-3.5">
                      {/* Main Brand Image Container */}
                      <div
                        onClick={() => setSelectedBrandId(vendor.id)}
                        className="relative h-[160px] w-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-sky-600 overflow-hidden isolate cursor-pointer rounded-[20px]"
                      >
                        <img
                          src={vendor.image}
                          alt=""
                          className="w-full h-full object-cover relative z-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0) 100%)' }} />

                        {/* Subscription Status Badge Top-Left */}
                        <div className="absolute top-3 left-3 z-[2]">
                          {isSubscribedToVendor ? (
                            <span className="text-[10px] font-semibold text-[#10B981] bg-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              <Check size={11} /> Subscribed
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-[#147C9E] bg-white px-2.5 py-1 rounded-full shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              Available in Plan
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-[3]">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-[38px] h-[38px] rounded-full bg-white shadow-md flex items-center justify-center text-[18px] shrink-0">
                              {vendor.avatar}
                            </div>
                            <div className="min-w-0 flex flex-col justify-start">
                              <span
                                className="text-[9px] font-semibold text-white bg-white/20 px-2 py-[2px] rounded-full uppercase backdrop-blur-md inline-block w-fit mb-0.5"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                {vendor.theme}
                              </span>
                              <h3
                                className="text-[14px] font-semibold text-white leading-[18px] truncate"
                                style={{ fontFamily: 'Century Gothic, sans-serif' }}
                              >
                                {vendor.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rating, Location & AI Match */}
                      <div className="flex items-center gap-2 text-[12px] font-semibold pt-0.5" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                        <span className="flex items-center gap-1 text-[#FE9A00]">
                          <Star size={14} weight="fill" className="text-[#FFB900]" />
                          {vendor.rating}
                        </span>
                        <span className="text-[#717182]">•</span>
                        <span className="text-[#717182] truncate">{vendor.location}</span>
                        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-[#7E22CE] bg-[#F3E8FF] border border-[#D8B4FE]/60 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <Sparkle size={11} className="text-[#9333EA] fill-[#9333EA]" />
                          {aiMatchScore}% Acumen Match
                        </span>
                      </div>

                      <p className="text-[12px] font-normal text-[#475569] leading-[18px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {vendor.description || vendor.specialty}
                      </p>

                      {/* FEATURED SERVICES PREVIEW */}
                      <div className="border-t border-slate-100 pt-3 space-y-2.5">
                        <h4
                          className="text-[10px] font-semibold text-[#6A7282] uppercase tracking-[1.54px] leading-[16px]"
                          style={{ fontFamily: 'Century Gothic, sans-serif' }}
                        >
                          FEATURED SERVICES ({vendorActivities.length}):
                        </h4>

                        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full">
                          {vendorActivities.map((act) => (
                            <div
                              key={act.id}
                              onClick={() => {
                                setSelectedBrandId(vendor.id);
                                setSelectedActivity(act);
                              }}
                              style={{ borderRadius: '20px 20px 48px 20px' }}
                              className="cursor-pointer flex items-center bg-[#F0F9FF] border border-[#33C4F0]/25 p-1.5 pr-4 gap-2.5 min-w-[220px] shrink-0 hover:bg-[#E0F2FE] transition"
                            >
                              <div className="w-[38px] h-[38px] rounded-full bg-white shrink-0 overflow-hidden relative flex items-center justify-center text-base shadow-2xs border border-slate-200/50">
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
                              <div className="min-w-0 flex-1">
                                <h5
                                  className="text-[11px] font-semibold text-[#334155] leading-tight truncate"
                                  style={{ fontFamily: 'Century Gothic, sans-serif' }}
                                >
                                  {act.name}
                                </h5>
                                <p
                                  className="text-[10px] font-medium text-[#64748B] leading-tight"
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
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedBrandId(vendor.id)}
                          className="flex-1 h-[36px] bg-[#F8FDFF] border border-[#33C4F0]/40 text-[#147C9E] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:bg-[#E8F9FF]"
                          style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                        >
                          <Eye size={15} className="text-[#147C9E]" />
                          View Details
                        </button>

                        {isSubscribedToVendor ? (
                          <button
                            type="button"
                            onClick={() => setSelectedBrandId(vendor.id)}
                            className="flex-1 h-[36px] bg-[#ECFDF5] border border-[#10B981]/30 text-[#059669] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:bg-[#D1FAE5]"
                            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                          >
                            <Check size={15} className="text-[#10B981]" />
                            Subscribed
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              selectBrand({
                                id: vendor.id,
                                name: vendor.name,
                                rating: vendor.rating,
                                specialty: vendor.specialty,
                                color: vendor.color,
                                avatar: vendor.avatar,
                              });
                              setSelectedBrandId(vendor.id);
                            }}
                            className="flex-1 h-[36px] bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition hover:opacity-90 shadow-xs"
                            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        (() => {
          const selectedVendor = mockVendors.find((v) => v.id === selectedBrandId) || mockVendors[0];
          const vendorActivities = mockActivities.filter((a) => a.vendorId === selectedVendor.id);
          const isSubscribedToSelectedVendor = selectedBrand?.id === selectedVendor.id;

          return (
            <div className="space-y-4 p-4">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setSelectedBrandId(null)}
                style={{ borderRadius: '20px 20px 48px 20px' }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 transition"
              >
                <CaretLeft size={16} weight="bold" /> Back to All Service Brands
              </button>

              {/* 1. BRAND DETAILS FIRST (Top Section) */}
              <div className="py-[16px] border-b border-[#F1F5F9] space-y-3">
                {/* Main Brand Image Container */}
                <div className="relative h-[176px] w-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-sky-600 overflow-hidden isolate" style={{ borderRadius: '20px 20px 50px 20px' }}>
                  <img
                    src={selectedVendor.image}
                    alt={selectedVendor.name}
                    className="w-full h-full object-cover relative z-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)' }} />

                  {/* Subscription Status Badge Top-Left */}
                  <div className="absolute top-3 left-3 z-[2]">
                    {isSubscribedToSelectedVendor ? (
                      <span className="text-[10px] font-semibold text-[#10B981] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <Check size={11} /> Subscribed Brand
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#147C9E] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Preview Mode
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-[3]">
                    <div className="flex items-center gap-[10px] min-w-0">
                      <div className="w-[40px] h-[40px] rounded-[16px] bg-white shadow-md flex items-center justify-center text-[20px] shrink-0">
                        {selectedVendor.avatar}
                      </div>
                      <div className="min-w-0 flex flex-col justify-start">
                        <span
                          className="text-[9px] font-semibold text-white bg-white/20 px-2 py-[2px] rounded-[19.6px] uppercase backdrop-blur-md inline-block w-fit mb-0.5"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {selectedVendor.theme}
                        </span>
                        <h3
                          className="text-[14px] font-semibold text-white leading-[20px] truncate"
                          style={{ fontFamily: 'Century Gothic, sans-serif' }}
                        >
                          {selectedVendor.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating, Location & AI Match */}
                <div className="flex items-center gap-2 text-[12px] font-semibold pt-1" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                  <span className="flex items-center gap-1 text-[#FE9A00]">
                    <Star size={14} weight="fill" className="text-[#FFB900]" />
                    {selectedVendor.rating}
                  </span>
                  <span className="text-[#717182]">•</span>
                  <span className="text-[#717182] truncate">{selectedVendor.location}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-[#7E22CE] bg-[#F3E8FF] border border-[#D8B4FE]/60 px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Sparkle size={11} className="text-[#9333EA] fill-[#9333EA]" />
                    {selectedVendor.id === 'studio-lumen' ? 98 : selectedVendor.id === 'cocoa-collective' ? 95 : 92}% Acumen Match
                  </span>
                </div>

                <p className="text-[12px] font-normal text-[#101828] leading-[20px] py-[4px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {selectedVendor.description}
                </p>

                {/* Subscription Status & Action Banner */}
                {!isSubscribedToSelectedVendor ? (
                  <div className="rounded-2xl bg-[#E8F9FF] border border-[#33C4F0]/30 p-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#147C9E]">
                      <Eye size={16} className="text-[#33C4F0] shrink-0" />
                      <span>Preview Mode: You are exploring {selectedVendor.name}'s activities.</span>
                    </div>
                    <p className="text-[11px] text-[#525266] font-medium leading-relaxed">
                      Subscribe to this service brand with your {planName || 'plan'} entitlement to unlock activity bookings.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        selectBrand({
                          id: selectedVendor.id,
                          name: selectedVendor.name,
                          rating: selectedVendor.rating,
                          specialty: selectedVendor.specialty,
                          color: selectedVendor.color,
                          avatar: selectedVendor.avatar,
                        });
                      }}
                      className="w-full h-[36px] bg-[#1A1A28] hover:bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-2 rounded-full transition shadow-xs"
                      style={{ fontFamily: 'Century Gothic, sans-serif' }}
                    >
                      <Check size={15} />
                      Subscribe to {selectedVendor.name}
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 p-3 flex items-center justify-between text-xs text-[#087E58] font-semibold">
                    <span className="flex items-center gap-2">
                      <Check size={16} className="text-[#10B981]" />
                      Subscribed Brand — All workshops below are included in your pass.
                    </span>
                  </div>
                )}
              </div>

              {/* 2. AVAILABLE SERVICES & WORKSHOPS BELOW */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-[10px] font-semibold text-[#6A7282] uppercase tracking-[1.54px] leading-[16px]"
                    style={{ fontFamily: 'Century Gothic, sans-serif' }}
                  >
                    AVAILABLE SERVICES & WORKSHOPS ({vendorActivities.length})
                  </h3>
                  {isSubscribedToSelectedVendor ? (
                    <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Included in Pass
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Subscription Required
                    </span>
                  )}
                </div>

                {/* List of Available Activities */}
                <div className="divide-y divide-[#F1F5F9]">
                  {vendorActivities.map((act) => {
                    const isSaved = savedActivityIds.includes(act.id);
                    return (
                      <div key={act.id} className="py-[16px] space-y-3">
                        {/* Activity Header Row */}
                        <div className="flex items-center justify-between h-[36px]">
                          <div className="flex items-center gap-[10px] min-w-0 flex-1">
                            <div className="w-[32px] h-[32px] bg-[#E8F9FF] rounded-full flex items-center justify-center shrink-0 text-base">
                              {act.symbol || selectedVendor.avatar}
                            </div>
                            <div className="flex flex-col justify-start min-w-0 flex-1">
                              <h4 className="text-[12px] font-semibold text-[#0F172B] leading-[16px] truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {act.name}
                              </h4>
                              <p className="text-[11px] font-normal text-[#90A1B9] leading-[17px] truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {act.category} • {act.duration}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#FE9A00] flex items-center gap-1 shrink-0 ml-2" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                            <Star size={13} weight="fill" className="text-[#FFB900]" />
                            {act.rating}
                          </span>
                        </div>

                        {/* Activity Image */}
                        <div className="relative h-[160px] w-full bg-slate-100 overflow-hidden isolate shadow-2xs" style={{ borderRadius: '20px 20px 50px 20px' }}>
                          <img
                            src={act.image}
                            alt={act.name}
                            className="w-full h-full object-cover relative z-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 60%)' }} />

                          <button
                            type="button"
                            onClick={() => toggleSaveActivity(act.id)}
                            className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition z-[2] ${
                              isSaved ? 'text-[#EF4444]' : 'text-slate-600'
                            }`}
                          >
                            <BookmarkSimple size={16} weight={isSaved ? 'fill' : 'regular'} />
                          </button>

                          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-[3]">
                            <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              <span>{act.symbol}</span> {act.category}
                            </span>
                            {isSubscribedToSelectedVendor ? (
                              <span className="text-[10px] font-semibold text-[#10B981] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Included in Pass
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Subscribe Brand First
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Details row: Duration & Location */}
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#717182] pt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <span className="flex items-center gap-1">
                            <Clock size={14} className="text-[#33C4F0]" /> {act.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-[#33C4F0]" /> {act.location}
                          </span>
                        </div>

                        <p className="text-[12px] font-normal text-[#101828] leading-[18px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {act.description}
                        </p>

                        {/* CTA Buttons row */}
                        <div className="flex items-center gap-[8px] pt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedActivity(act)}
                            className="flex-1 h-[34px] bg-[#F8FDFF] border border-[#33C4F0]/30 text-[#147C9E] text-[12px] font-semibold flex items-center justify-center gap-[6px] transition hover:bg-[#E8F9FF]"
                            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                          >
                            <Eye size={15} className="text-[#147C9E]" />
                            View Details
                          </button>
                          {isSubscribedToSelectedVendor ? (
                            <button
                              type="button"
                              onClick={() => setSelectedActivity(act)}
                              className="flex-1 h-[34px] bg-[#33C4F0] text-white text-[12px] font-semibold flex items-center justify-center gap-[6px] transition hover:opacity-90 shadow-2xs"
                              style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                            >
                              Book Session
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                selectBrand({
                                  id: selectedVendor.id,
                                  name: selectedVendor.name,
                                  rating: selectedVendor.rating,
                                  specialty: selectedVendor.specialty,
                                  color: selectedVendor.color,
                                  avatar: selectedVendor.avatar,
                                });
                                setSelectedActivity(act);
                              }}
                              className="flex-1 h-[34px] bg-[#1A1A28] text-white text-[12px] font-semibold flex items-center justify-center gap-[6px] transition hover:bg-[#33C4F0] hover:text-[#1A1A28] shadow-2xs"
                              style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Century Gothic, sans-serif' }}
                            >
                              Subscribe & Book
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
