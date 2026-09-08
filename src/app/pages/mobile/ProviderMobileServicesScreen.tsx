import React, { useState } from 'react';
import {
  Plus,
  MagnifyingGlass,
  Eye,
  CalendarBlank,
  Sparkle,
  PencilSimple,
} from '@phosphor-icons/react';

interface ProviderMobileServicesScreenProps {
  onOpenNewService: () => void;
  servicesList: any[];
}

export function ProviderMobileServicesScreen({
  onOpenNewService,
  servicesList,
}: ProviderMobileServicesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'published' | 'draft'>('all');

  const filteredServices = servicesList.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterTab === 'published') return matchesSearch && s.published;
    if (filterTab === 'draft') return matchesSearch && !s.published;
    return matchesSearch;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-28 bg-[#F1F5F9] text-[#1A1A28] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Top Header Block */}
      <div
        className="w-full px-4 pt-5 pb-4 space-y-3 border-b border-slate-100/80"
        style={{
          background: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 60%, #FFFFFF 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center justify-center px-[10px] py-[2px] bg-[#ECFEFF] border border-[#A2F4FD] h-[21px] rounded-full">
            <span
              className="text-[10px] font-semibold text-[#007595] leading-[15px]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Services Catalog
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenNewService}
            className="py-1.5 px-3 bg-[#1AB0DC] hover:bg-[#007595] text-white text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer shadow-2xs"
            style={{ borderRadius: '20px 20px 48px 20px', fontFamily: 'Poppins, sans-serif' }}
          >
            <Plus size={14} weight="bold" />
            <span>Add Service</span>
          </button>
        </div>

        <h2
          className="text-[20px] font-bold text-[#1A1A28] leading-tight"
          style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
        >
          Services & Workshops
        </h2>

        <p className="text-[12px] text-[#6A7282] font-normal">
          Manage your creative workshop packages available for corporate booking.
        </p>

        {/* Search Bar */}
        <div
          className="w-full h-[40px] bg-white border border-[#E2E8F0] flex items-center px-[12px] pr-[20px] gap-[8px] transition focus-within:border-[#1AB0DC]"
          style={{ borderRadius: '20px 20px 48px 20px' }}
        >
          <MagnifyingGlass size={16} className="text-[#90A1B9] shrink-0" />
          <input
            type="text"
            placeholder="Search service packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent text-[12px] font-medium text-slate-900 placeholder:text-[#90A1B9] focus:outline-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pt-1 pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            style={{ borderRadius: '20px 20px 48px 20px' }}
            className={`py-1.5 px-3.5 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
              filterTab === 'all'
                ? 'bg-[#1AB0DC] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Services ({servicesList.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('published')}
            style={{ borderRadius: '20px 20px 48px 20px' }}
            className={`py-1.5 px-3.5 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
              filterTab === 'published'
                ? 'bg-[#10B981] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Published ({servicesList.filter((s) => s.published).length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('draft')}
            style={{ borderRadius: '20px 20px 48px 20px' }}
            className={`py-1.5 px-3.5 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
              filterTab === 'draft'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Drafts ({servicesList.filter((s) => !s.published).length})
          </button>
        </div>
      </div>

      {/* Services List Content */}
      <div className="p-3.5 space-y-3 pb-6">
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-xs font-medium text-[#6A7282]">No service packages found.</p>
            <button
              type="button"
              onClick={onOpenNewService}
              className="mt-2 text-xs font-semibold text-[#007595] inline-flex items-center gap-1"
            >
              <Plus size={14} /> Add new service
            </button>
          </div>
        ) : (
          filteredServices.map((listing) => (
            <div
              key={listing.id || listing.title}
              className="bg-white border border-slate-100/80 shadow-2xs overflow-hidden hover:border-[#1AB0DC] transition space-y-3"
              style={{ borderRadius: '20px 20px 48px 20px' }}
            >
              <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                <span
                  className={`absolute top-3 right-3 text-[9px] font-bold uppercase px-2.5 py-0.5 text-white backdrop-blur-xs shadow-xs ${
                    listing.published ? 'bg-[#10B981]' : 'bg-slate-600'
                  }`}
                  style={{ borderRadius: '10px 10px 20px 10px' }}
                >
                  {listing.published ? 'Published' : 'Draft'}
                </span>

                <span className="absolute bottom-3 left-3 w-8 h-8 rounded-xl bg-white/90 text-lg flex items-center justify-center shadow-xs">
                  {listing.emoji || '✨'}
                </span>
              </div>

              <div className="p-4 pt-0 space-y-2.5">
                <div>
                  <h3
                    className="text-[15px] font-bold text-[#1A1A28] leading-tight"
                    style={{ fontFamily: 'Century Gothic, Poppins, sans-serif' }}
                  >
                    {listing.title}
                  </h3>
                  <p className="text-[11px] text-[#6A7282] font-medium mt-1 flex items-center gap-2">
                    <span>{listing.format}</span>
                    {listing.price && (
                      <span className="font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                        {listing.price}
                      </span>
                    )}
                  </p>
                </div>

                {listing.description && (
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {listing.description}
                  </p>
                )}

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6A7282] font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye size={13} className="text-[#1AB0DC]" />
                      <span>{listing.views || '0'} views</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarBlank size={13} className="text-[#1AB0DC]" />
                      <span>{listing.bookings || '0'} bookings</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenNewService}
                    className="p-1.5 text-slate-400 hover:text-[#1AB0DC] transition"
                    title="Edit Service"
                  >
                    <PencilSimple size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
