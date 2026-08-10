import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, Building2, Layers, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export const SubscriptionEntitlementHeader: React.FC = () => {
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
      <div className="mt-4 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        {!selectedBrand ? (
          <p className="flex items-center gap-2 text-white/70">
            <span className="inline-block h-2 w-2 rounded-full bg-[#33c4f0]"></span>
            Choose one service brand to access its activities.
          </p>
        ) : activityCount < maxActivities ? (
          <p className="flex items-center gap-2 text-white/70">
            <span className="inline-block h-2 w-2 rounded-full bg-[#10B981]"></span>
            Selected Brand: <strong className="text-white">{selectedBrand.name}</strong>. You can select up to {maxActivities - activityCount} more activity/activities this month.
          </p>
        ) : (
          <p className="flex items-center gap-2 text-amber-300 font-bold">
            <AlertCircle size={14} />
            Monthly Activity Limit Reached (2 / 2 selected). Browse details anytime.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {selectedBrand && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/90">
              <Check size={12} className="text-[#33c4f0]" />
              {selectedBrand.name}
              <button
                type="button"
                onClick={unselectBrand}
                title="Change brand"
                className="ml-1 text-white/50 hover:text-white"
              >
                ×
              </button>
            </div>
          )}

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
      </div>
    </div>
  );
};
