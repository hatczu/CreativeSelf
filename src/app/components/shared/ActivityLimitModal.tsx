import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { WarningCircle as AlertCircle, Check, X, CalendarBlank as Calendar, Sparkle as Sparkles } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

export const ActivityLimitModal: React.FC = () => {
  const { isLimitModalOpen, closeLimitModal, selectedActivities, planName, maxActivities } = useSubscription();
  const navigate = useNavigate();

  if (!isLimitModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a28]/60 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md overflow-hidden bg-white p-6 shadow-[0_24px_60px_rgba(28,118,155,.2)]"
        style={{ borderRadius: '24px 24px 64px 24px' }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#33c4f0]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-amber-600">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-amber-600">Limit Reached</p>
              <h3 className="text-xl font-extrabold text-[#1a1a28]">Activity Limit Reached</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closeLimitModal}
            className="grid h-8 w-8 place-items-center rounded-full bg-[#f2fbfe] text-[#717182] hover:bg-[#e8f9ff] hover:text-[#1a1a28]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-sm leading-6 text-[#414153]">
            Your <strong>{planName}</strong> subscription includes <strong>{maxActivities} activities per month</strong>.
          </p>

          <div className="rounded-2xl border border-[#33c4f0]/20 bg-[#f8fdff] p-4">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#717182]">You've already selected:</p>
            <div className="mt-3 space-y-2">
              {selectedActivities.map((act) => (
                <div key={act.id} className="flex items-center gap-2 text-sm font-bold text-[#1a1a28]">
                  <div className="grid h-5 w-5 place-items-center rounded-full bg-[#10b981] text-white">
                    <Check size={12} />
                  </div>
                  <span>{act.name}</span>
                </div>
              ))}
              {selectedActivities.length === 0 && (
                <p className="text-xs italic text-[#717182]">2 activities selected for this month.</p>
              )}
            </div>
          </div>

          <p className="text-xs leading-5 text-[#717182]">
            You can browse other activities, but you cannot select another activity this month.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              closeLimitModal();
              navigate('/bookings');
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#33c4f0] px-5 py-2.5 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#20b3df]"
          >
            <Calendar size={16} />
            View My Activities
          </button>
          <button
            type="button"
            onClick={() => {
              closeLimitModal();
              // Navigate to dashboard or explore plans section without price
              navigate('/dashboard');
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#33c4f0]/30 bg-white px-5 py-2.5 text-xs font-extrabold text-[#1a1a28] transition hover:bg-[#f2fbfe]"
          >
            <Sparkles size={16} />
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );
};
