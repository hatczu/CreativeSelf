import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, Building2, Layers, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logoIcon from '@/imports/Logo.png';

interface SubscriptionEntitlementHeaderProps {
  variant?: 'horizontal' | 'sidebar';
  showLogo?: boolean;
}

export const SubscriptionEntitlementHeader: React.FC<SubscriptionEntitlementHeaderProps> = ({
  variant = 'horizontal',
  showLogo = true,
}) => {
  const {
    planName,
    maxBrands,
    maxActivities,
    selectedBrand,
    selectedActivities,
    unselectBrand,
    unselectActivity,
  } = useSubscription();

  const brandCount = selectedBrand ? 1 : 0;
  const activityCount = selectedActivities.length;
  const remainingActivities = maxActivities - activityCount;

  if (variant === 'sidebar') {
    return (
      <div
        className="sticky top-8 bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.12)]"
        style={{ borderRadius: '20px 20px 64px 20px' }}
      >
        {/* Optional Logo Link Header */}
        {showLogo && (
          <div className="border-b border-white/10 pb-4 mb-4">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <ImageWithFallback src={logoIcon} alt="CreativeSelf Logo" className="h-8 w-8 object-contain" />
              <span className="text-lg font-extrabold">
                <span className="text-[#33c4f0]">creative</span>
                <span className="text-white">self</span>
              </span>
            </Link>
          </div>
        )}

        {/* Your Subscription Header */}
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#33c4f0]/20 text-[#33c4f0]">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Your Subscription</p>
            <h2 className="text-lg font-extrabold text-white">{planName} Plan</h2>
          </div>
        </div>

        {/* Counters Stacked Vertically */}
        <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-2.5 text-xs font-bold transition ${
              brandCount > 0
                ? 'bg-[#33c4f0]/20 text-[#33c4f0] border border-[#33c4f0]/40'
                : 'bg-white/10 text-white/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <Building2 size={15} />
              <span>Service Brands:</span>
            </span>
            <strong className="text-white">{brandCount} / {maxBrands} selected</strong>
          </div>

          <div
            className={`flex items-center justify-between rounded-full px-4 py-2.5 text-xs font-bold transition ${
              activityCount === maxActivities
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                : activityCount > 0
                ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                : 'bg-white/10 text-white/80'
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers size={15} />
              <span>Activities:</span>
            </span>
            <strong className="text-white">{activityCount} / {maxActivities} selected</strong>
          </div>
        </div>

        {/* Footer Info Block: Separate Lines for Selected Brand and Subtext */}
        <div className="mt-5 border-t border-white/10 pt-4 space-y-2">
          {!selectedBrand ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#33c4f0]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#33c4f0]"></span>
                <span>Selected Brand: <span className="text-white/60 font-normal">None</span></span>
              </div>
              <p className="mt-1.5 text-xs text-white/70 leading-5">
                Choose one service brand to access its activities.
              </p>
            </div>
          ) : (
            <div>
              {/* Line 1: Selected Brand */}
              <div className="flex items-center justify-between text-xs font-bold text-[#10B981]">
                <div className="flex items-center gap-2 truncate">
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#10B981]"></span>
                  <span className="truncate">
                    Selected Brand: <strong className="text-white">{selectedBrand.name}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={unselectBrand}
                  title="Change brand"
                  className="ml-2 shrink-0 text-white/40 hover:text-white text-xs"
                >
                  ×
                </button>
              </div>

              {/* Line 2: Subtext */}
              <div className="mt-2 text-xs text-white/70 leading-5">
                {activityCount < maxActivities ? (
                  <p>You can select up to {remainingActivities} more activity/activities this month.</p>
                ) : (
                  <p className="text-amber-300 font-medium flex items-center gap-1.5">
                    <AlertCircle size={13} className="shrink-0" />
                    <span>Monthly activity limit reached ({maxActivities} / {maxActivities} selected).</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selected Activities Badges (if any selected) */}
        {selectedActivities.length > 0 && (
          <div className="mt-4 border-t border-white/10 pt-3">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45 mb-2">Selected Activities</p>
            <div className="flex flex-wrap gap-2">
              {selectedActivities.map((act) => (
                <div
                  key={act.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/20 px-3 py-1 text-[11px] font-bold text-[#10B981] border border-[#10B981]/30"
                >
                  <Check size={12} />
                  <span className="max-w-[120px] truncate">{act.name}</span>
                  <button
                    type="button"
                    onClick={() => unselectActivity(act.id)}
                    title="Remove activity"
                    className="ml-1 text-[#10B981]/60 hover:text-[#10B981]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (for main area or mobile view)
  return (
    <div className="overflow-hidden bg-[#1a1a28] p-6 text-white shadow-[0_16px_42px_rgba(28,118,155,.12)]" style={{ borderRadius: '20px 20px 64px 20px' }}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#33c4f0]/20 text-[#33c4f0]">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">Your Subscription</p>
            <h2 className="text-xl font-extrabold text-white">{planName} Plan</h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Service Brands Counter */}
          <div className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${brandCount > 0 ? 'bg-[#33c4f0]/20 text-[#33c4f0] border border-[#33c4f0]/40' : 'bg-white/10 text-white/80'}`}>
            <Building2 size={15} />
            <span>Service Brands: <strong className="text-white">{brandCount} / {maxBrands}</strong> selected</span>
          </div>

          {/* Activities Counter */}
          <div className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${activityCount === maxActivities ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : activityCount > 0 ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' : 'bg-white/10 text-white/80'}`}>
            <Layers size={15} />
            <span>Activities: <strong className="text-white">{activityCount} / {maxActivities}</strong> selected</span>
          </div>
        </div>
      </div>

      {/* Helper Context & Entitlement Summary */}
      <div className="mt-4 flex flex-col gap-2 text-xs">
        {!selectedBrand ? (
          <div>
            <p className="flex items-center gap-2 font-bold text-[#33c4f0]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#33c4f0]"></span>
              Selected Brand: <span className="text-white/60 font-normal">None</span>
            </p>
            <p className="mt-1 text-white/70">
              Choose one service brand to access its activities.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between font-bold text-[#10B981]">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[#10B981]"></span>
                Selected Brand: <strong className="text-white">{selectedBrand.name}</strong>
              </div>
              <button
                type="button"
                onClick={unselectBrand}
                title="Change brand"
                className="text-white/40 hover:text-white text-xs"
              >
                Change brand ×
              </button>
            </div>
            <p className="mt-1.5 text-white/70">
              {activityCount < maxActivities ? (
                `You can select up to ${remainingActivities} more activity/activities this month.`
              ) : (
                <span className="text-amber-300 font-bold flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  Monthly Activity Limit Reached ({maxActivities} / {maxActivities} selected). Browse details anytime.
                </span>
              )}
            </p>
          </div>
        )}

        {selectedActivities.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            {selectedActivities.map((act) => (
              <div key={act.id} className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/20 px-3 py-1 text-[11px] font-bold text-[#10B981] border border-[#10B981]/30">
                <Check size={12} />
                <span className="max-w-[140px] truncate">{act.name}</span>
                <button
                  type="button"
                  onClick={() => unselectActivity(act.id)}
                  title="Remove activity"
                  className="ml-1 text-[#10B981]/60 hover:text-[#10B981]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
