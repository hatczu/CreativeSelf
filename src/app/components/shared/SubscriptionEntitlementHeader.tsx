import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, Building2, Layers, AlertCircle, Users, Lock } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logoIcon from '@/imports/Logo.png';
import { BrandChangeConfirmationModal } from './BrandChangeConfirmationModal';

interface SubscriptionEntitlementHeaderProps {
  variant?: 'horizontal' | 'sidebar';
  showLogo?: boolean;
  hideCounters?: boolean;
  topChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export const SubscriptionEntitlementHeader: React.FC<SubscriptionEntitlementHeaderProps> = ({
  variant = 'horizontal',
  showLogo = true,
  hideCounters = false,
  topChildren,
  children,
}) => {
  const {
    planName,
    planType,
    maxBrands,
    maxActivities,
    employeeSlotsPerActivity,
    selectedBrand,
    selectedActivities,
    isBrandLocked,
    unselectBrand,
    unselectActivity,
    setPlan,
  } = useSubscription();

  const brandCount = selectedBrand ? 1 : 0;
  const activityCount = selectedActivities.length;
  const remainingActivities = maxActivities - activityCount;

  if (variant === 'sidebar') {
    return (
      <div
        className="sticky top-8 overflow-hidden bg-[#15343d] p-4 sm:p-5 text-white shadow-[0_12px_36px_rgba(28,118,155,.12)]"
        style={{ borderRadius: '20px 20px 64px 20px' }}
      >
        <BrandChangeConfirmationModal />

        {/* Top Cyan Icon Container */}
        <div className="grid h-10 w-10 place-items-center rounded-[14px_14px_22px_14px] bg-[#33c4f0] text-[#15343d] mb-3 shadow-md shadow-[#33c4f0]/20">
          <Sparkles size={18} className="fill-current" />
        </div>

        {/* Header Title */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45">YOUR MONTHLY PLAN</p>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles size={14} className="text-[#33c4f0] shrink-0" />
              <h2 className="text-sm sm:text-base font-extrabold text-white truncate">{planName}</h2>
            </div>
          </div>
        </div>

        {/* Top Children Slot (for top-positioned navigation tabs) */}
        {topChildren}

        {/* Compact Stacked Metric Cards (Hidden when hideCounters is true) */}
        {!hideCounters && (
          <div className="mt-3.5 space-y-2.5">
            {/* Card 1: BRANDS */}
            <div className="rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">BRANDS</p>
                {selectedBrand && (
                  <button
                    type="button"
                    onClick={unselectBrand}
                    className="text-[9px] text-white/50 hover:text-white underline"
                  >
                    Change
                  </button>
                )}
              </div>
              <p className="mt-0.5 text-lg font-black text-white">{brandCount} / {maxBrands}</p>
              {selectedBrand && (
                <p className="mt-0.5 text-[10px] font-semibold text-[#33c4f0] truncate">
                  ✓ {selectedBrand.name}
                </p>
              )}
            </div>

            {/* Card 2: ACTIVITIES */}
            <div className="rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">ACTIVITIES</p>
              <p className="mt-0.5 text-lg font-black text-white">{activityCount} / {maxActivities}</p>
              <p className="mt-0.5 text-[10px] text-white/50 truncate">
                {remainingActivities > 0 ? `${remainingActivities} remaining this month` : 'Limit reached'}
              </p>
            </div>

            {/* Card 3: EMPLOYEE SLOTS (If corporate) */}
            {planType === 'corporate' && (
              <div className="rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">EMPLOYEE SLOTS</p>
                <p className="mt-0.5 text-lg font-black text-purple-300">{employeeSlotsPerActivity}</p>
                <p className="mt-0.5 text-[10px] text-white/50">Slots per activity</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Helper Description */}
        <p className="mt-3.5 text-[11px] sm:text-xs text-white/65 leading-relaxed font-medium">
          Choose a service brand, then build a month of restorative experiences.
        </p>

        {/* Children slot for page-specific navigation tabs */}
        {children}
      </div>
    );
  }

  // Horizontal variant (EXACT MATCH to Dashboard image layout!)
  return (
    <section
      className="overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]"
      style={{ borderRadius: '20px 20px 64px 20px' }}
    >
      <BrandChangeConfirmationModal />

      {/* Top Title Line */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">YOUR CREATIVE PLAN</p>
          <div className="mt-1 flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">{planName}</h2>
            <span className="rounded-full bg-[#33c4f0] px-2.5 py-1 text-[10px] font-extrabold text-[#1a1a28]">
              Active
            </span>
          </div>
        </div>

        <p className="text-xs text-white/50">Your plan renews on 31 Aug.</p>
      </div>

      {/* 3-Column Inner Card Grid matching screenshot */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {/* Card 1: Subscribed Brands */}
        <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-[#33c4f0]">{brandCount} / {maxBrands}</p>
          </div>
          <p className="mt-1 text-xs font-bold text-white">Subscribed Service Brands</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-[11px] text-white/70 font-semibold truncate">
              {selectedBrand ? selectedBrand.name : 'Select a brand to start'}
            </p>
            {selectedBrand && (
              <button
                type="button"
                onClick={unselectBrand}
                className="text-[11px] text-[#33c4f0] hover:underline font-bold ml-2 shrink-0"
              >
                Change brand
              </button>
            )}
          </div>
        </div>

        {/* Card 2: Services Remaining */}
        <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
          <p className="text-2xl font-extrabold text-[#33c4f0]">{remainingActivities}</p>
          <p className="mt-1 text-xs font-bold text-white">Services remaining</p>
          <p className="mt-1 text-[11px] text-white/50">
            {activityCount} of {maxActivities} activities selected this month
          </p>
        </div>

        {/* Card 3: Employee Slots / Selected Activities */}
        {planType === 'corporate' ? (
          <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
            <p className="text-2xl font-extrabold text-purple-400">{employeeSlotsPerActivity}</p>
            <p className="mt-1 text-xs font-bold text-white">Employee slots per activity</p>
            <p className="mt-1 text-[11px] text-white/50">Corporate team allocation</p>
          </div>
        ) : (
          <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
            <div className="flex -space-x-2">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#ef4444]/70 text-xs">🎨</span>
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#1a1a28] bg-[#10b981]/70 text-xs">🧘</span>
            </div>
            <p className="mt-2 text-xs font-bold text-white">Selected activities</p>
            <p className="mt-1 text-[11px] text-white/50 truncate">
              {selectedActivities.map((a) => a.name).join(', ') || 'No activities selected yet'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
