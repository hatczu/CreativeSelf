import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, AlertTriangle, X, Trash2, ArrowRight } from 'lucide-react';
import { useSubscription } from '../../context/SubscriptionContext';

export const BrandChangeConfirmationModal: React.FC = () => {
  const {
    selectedBrand,
    selectedActivities,
    isBrandChangeModalOpen,
    pendingBrandToSelect,
    confirmBrandChange,
    cancelBrandChange,
  } = useSubscription();

  if (!isBrandChangeModalOpen || !selectedBrand) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        style={{
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden my-8"
          style={{
            borderRadius: '28px 28px 72px 28px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-red-50 via-amber-50 to-white border-b border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-300/50">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Service Brand Locked</h3>
                <p className="text-xs font-semibold text-rose-700">
                  Confirmation required to change brand
                </p>
              </div>
            </div>
            <button
              onClick={cancelBrandChange}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Warning Alert Banner */}
            <div
              className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3"
              style={{ borderRadius: '16px 16px 36px 16px' }}
            >
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-extrabold text-amber-900">
                  Changing Service Brand Will Reset Activities
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Your current brand <strong className="text-amber-950 font-bold">{selectedBrand.name}</strong> is locked because you have <strong>{selectedActivities.length} active activity/activities</strong> selected this month.
                </p>
              </div>
            </div>

            {/* Current Brand & Affected Activities Summary */}
            <div
              className="bg-gray-50 border border-gray-200 p-4"
              style={{ borderRadius: '20px 20px 40px 20px' }}
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <span>Current Locked Brand:</span>
                <span className="text-rose-600 flex items-center gap-1 font-extrabold">
                  <Lock size={12} /> {selectedActivities.length} Activities Selected
                </span>
              </div>
              <p className="text-base font-extrabold text-gray-900">{selectedBrand.name}</p>

              {selectedActivities.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                  <p className="text-[11px] font-bold text-gray-600">The following selected activities will be unassigned:</p>
                  <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                    {selectedActivities.map((act) => (
                      <li key={act.id} className="flex items-center gap-2 text-rose-700">
                        <Trash2 size={13} className="shrink-0 text-rose-500" />
                        <span className="truncate">{act.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* New Target Brand (if switching to another vendor) */}
            {pendingBrandToSelect && (
              <div className="flex items-center gap-3 p-3 bg-cyan-50 border border-cyan-200 rounded-2xl text-xs">
                <span className="font-bold text-gray-600">Switching to:</span>
                <div className="flex items-center gap-1.5 font-extrabold text-cyan-900">
                  <ArrowRight size={14} className="text-cyan-600" />
                  <span>{pendingBrandToSelect.name}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={cancelBrandChange}
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-xs shadow-md transition"
              >
                Keep {selectedBrand.name} & Activities
              </button>
              <button
                type="button"
                onClick={confirmBrandChange}
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition"
              >
                Switch Brand & Reset Activities
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
