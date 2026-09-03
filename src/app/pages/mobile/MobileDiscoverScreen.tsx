import React from 'react';
import { Sparkle, Star, Check, Eye, CaretLeft, CaretRight, MagnifyingGlass, BookmarkSimple, Clock, MapPin } from '@phosphor-icons/react';
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
    <div className={`flex-1 overflow-y-auto overflow-x-hidden pb-28 ${selectedBrandId === null ? 'bg-[#F1F5F9]' : 'bg-white'} [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
      {selectedBrandId === null ? (
        /* VIEW 1: SERVICE BRANDS LIST */
        <div>
          {/* Top Header Block */}
          <div
            className="w-full px-4 pt-5 pb-4 space-y-3 rounded-none border-b border-slate-100/80"
            style={{
              background: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 60%, #FFFFFF 100%)',
            }}
          >
            {/* Plan Badge at Very Top */}
            <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full w-fit">
              <span
                className="text-[10px] font-semibold text-[#007595] leading-[15px]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {planName || (selectedPlanId === 'elite-creative' ? 'Elite Plan' : selectedPlanId === 'basic-creative' ? 'Basic Plan' : 'Pass Active')}
              </span>
            </div>

            <h2 className="text-[20px] font-bold text-[#1A1A28] leading-tight" style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}>
              Discover
            </h2>

            <p className="text-[12px] text-[#6A7282] font-normal">
              Explore included brands & activities.
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
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.symbol}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Brands Content List */}
          <div className="p-2.5 space-y-2.5 pb-6">
            {mockVendors
              .filter((vendor) => {
                const matchesCat = selectedCategory === 'all' || vendor.theme.toLowerCase().includes(selectedCategory.toLowerCase()) || vendor.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
                const matchesSearch = !searchQuery || vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCat && matchesSearch;
              })
              .map((vendor) => {
                const vendorActivities = mockActivities.filter((a) => a.vendorId === vendor.id);
                const isSubscribedToVendor = selectedBrand?.id === vendor.id;

                return (
                  <div
                    key={vendor.id}
                    onClick={() => setSelectedBrandId(vendor.id)}
                    className="w-full bg-white cursor-pointer py-4 hover:shadow-md transition-all duration-200 overflow-hidden"
                    style={{
                      borderRadius: '20px 20px 48px 20px',
                      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {/* Top Header Banner: White Background with Bottom Border */}
                    <div className="w-full bg-white border-b border-[#E2E8F0] px-4 pb-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-[38px] h-[38px] rounded-full bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center text-[18px] shrink-0">
                          {vendor.avatar}
                        </div>
                        <div className="min-w-0 flex flex-col justify-start flex-1">
                          <span
                            className="text-[9px] font-semibold text-[#FF6467] uppercase tracking-[0.45px] leading-[14px]"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {vendor.theme}
                          </span>
                          <h3
                            className="text-[15px] font-bold text-[#101828] leading-[18px] truncate"
                            style={{ fontFamily: 'Century Gothic, sans-serif' }}
                          >
                            {vendor.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSubscribedToVendor ? (
                          <span
                            className="text-[10px] font-semibold text-[#059669] bg-[#ECFDF5] px-3 py-1 flex items-center gap-1 border border-[#10B981]/30"
                            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
                          >
                            <Check size={11} className="text-[#10B981]" /> Subscribed
                          </span>
                        ) : (
                          <span
                            className="text-[10px] font-semibold text-[#147C9E] bg-[#DFF2FE] px-3 py-1 inline-block"
                            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
                          >
                            Available in Plan
                          </span>
                        )}
                        <CaretRight size={14} className="text-[#45556C] shrink-0" />
                      </div>
                    </div>

                    {/* Rating & Short Description Paragraph Block */}
                    <div className="px-4 pt-3.5 pb-0 space-y-2">
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#FE9A00]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <Star size={14} weight="fill" className="text-[#FFB900]" />
                        <span>{vendor.rating}</span>
                        <span className="text-[#717182] font-semibold">•</span>
                        <span className="text-[#717182] font-semibold">{vendor.location}</span>
                      </div>

                      <p className="text-[12px] font-normal text-[#475569] leading-[18px] line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {vendor.description || vendor.specialty}
                      </p>
                    </div>

                    {/* Featured Activities Carousel directly below Description */}
                    <div className="pt-4 px-4 pb-0">
                      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full">
                        {vendorActivities.map((act) => (
                          <div
                            key={act.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBrandId(vendor.id);
                              setSelectedActivity(act);
                            }}
                            style={{ borderRadius: '16px 16px 38.4px 16px' }}
                            className="relative w-[200px] h-[128px] overflow-hidden shrink-0 cursor-pointer p-3 flex flex-col justify-end group shadow-xs transition hover:scale-[1.01]"
                          >
                            <img
                              src={act.image}
                              alt={act.name}
                              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div
                              className="absolute inset-0 z-[1]"
                              style={{
                                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0) 100%)',
                              }}
                            />

                            <div className="relative z-[2] space-y-0.5">
                              <span
                                className="text-[7.2px] font-semibold text-white bg-white/20 px-1.5 py-[1px] rounded-full uppercase backdrop-blur-md inline-block leading-[11px]"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                {act.category || vendor.theme}
                              </span>
                              <h5
                                className="text-[11.2px] font-bold text-white leading-[14px] line-clamp-2"
                                style={{ fontFamily: 'Century Gothic, sans-serif' }}
                              >
                                {act.name}
                              </h5>
                            </div>
                          </div>
                        ))}
                      </div>
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
          const isSubscribedToSelectedVendor = selectedBrand?.id === selectedVendor.id;

          return (
            <div className="bg-white space-y-4 p-4 min-h-full">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setSelectedBrandId(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A28] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition"
              >
                <CaretLeft size={16} weight="bold" /> Back to All Service Brands
              </button>

              {/* 1. BRAND DETAILS FIRST (Top Section) */}
              <div className="py-[16px] border-b border-[#F1F5F9] space-y-3">
                {/* Main Brand Image Container */}
                <div className="relative h-[176px] w-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-sky-600 overflow-hidden isolate rounded-2xl">
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
                  {/* Razor-Sharp GPU-Accelerated Conic Progress Ring Badge */}
                  <div
                    className="ml-auto inline-flex items-center gap-1.5 bg-[#FBF7FF] border border-[#E9D4FF] px-2 py-1 rounded-full shrink-0"
                    title={`${selectedVendor.id === 'studio-lumen' ? 98 : selectedVendor.id === 'cocoa-collective' ? 95 : 92}% Acumen Match`}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center p-[2px] shrink-0"
                      style={{
                        background: `conic-gradient(#9333EA ${(selectedVendor.id === 'studio-lumen' ? 98 : selectedVendor.id === 'cocoa-collective' ? 95 : 92) * 3.6}deg, #E9D4FF 0deg)`,
                      }}
                    >
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <Sparkle size={8} className="text-[#9333EA] fill-[#9333EA]" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#7E22CE] leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {selectedVendor.id === 'studio-lumen' ? 98 : selectedVendor.id === 'cocoa-collective' ? 95 : 92}%
                    </span>
                  </div>
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
              <div className="space-y-3 pt-1">
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
                <div className="-mx-4 bg-[#F1F5F9] space-y-2.5 pt-2 pb-2">
                  {vendorActivities.map((act) => {
                    const isSaved = savedActivityIds.includes(act.id);
                    return (
                      <div
                        key={act.id}
                        onClick={() => setSelectedActivity(act)}
                        className="bg-white w-full py-4 px-4 space-y-3 cursor-pointer hover:bg-slate-50/80 transition"
                      >
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
                        <div className="relative h-[160px] w-full bg-slate-100 overflow-hidden isolate shadow-none" style={{ borderRadius: '20px 20px 48px 20px' }}>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveActivity(act.id);
                            }}
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
