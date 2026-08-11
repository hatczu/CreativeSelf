import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Users,
  Mail,
  User,
  Building2,
  CheckCircle2,
  Send,
  Copy,
  Check,
  Ticket,
  Clock,
  UserX,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useSubscription, EmployeeInvite } from '../../context/SubscriptionContext';

interface EmployeeSlotManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: string;
  activityName: string;
}

export function EmployeeSlotManagerModal({
  isOpen,
  onClose,
  activityId,
  activityName,
}: EmployeeSlotManagerModalProps) {
  const {
    employeeSlotsPerActivity,
    getInvitesForActivity,
    sendEmployeeInvite,
    updateInviteStatus,
    cancelEmployeeInvite,
    planName,
  } = useSubscription();

  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [department, setDepartment] = useState('Design & Engineering');
  const [lastSentInvite, setLastSentInvite] = useState<EmployeeInvite | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentInvites = getInvitesForActivity(activityId);
  const activeCount = currentInvites.length;
  const remainingSlots = employeeSlotsPerActivity - activeCount;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName || !employeeEmail || remainingSlots <= 0) return;

    const newInvite = sendEmployeeInvite({
      activityId,
      activityName,
      employeeName,
      employeeEmail,
      department,
      status: 'Pending',
    });

    setLastSentInvite(newInvite);
    setEmployeeName('');
    setEmployeeEmail('');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden my-8"
          style={{
            borderRadius: '28px 28px 72px 28px',
            border: '1px solid rgba(51, 196, 240, 0.25)',
          }}
        >
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-cyan-50 via-blue-50 to-white border-b border-cyan-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-md shadow-cyan-300/50">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Manage Corporate Employee Slots</h3>
                <p className="text-xs font-semibold text-cyan-700">
                  {activityName} • {planName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
            {/* Slot Counter Banner */}
            <div
              className="bg-gradient-to-r from-gray-900 to-slate-800 text-white p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg"
              style={{ borderRadius: '20px 20px 48px 20px' }}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Employee Slot Entitlement</span>
                <h4 className="text-xl font-black text-white mt-0.5">
                  {activeCount} / {employeeSlotsPerActivity} Slots Allocated
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  {remainingSlots > 0
                    ? `You can invite ${remainingSlots} more employee(s) to this activity.`
                    : 'All slots for this activity are currently assigned!'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-full bg-cyan-400/20 text-cyan-300 font-extrabold text-xs border border-cyan-400/30 flex items-center gap-1.5">
                  <Ticket size={14} />
                  {remainingSlots} Available
                </div>
              </div>
            </div>

            {/* Invite Form */}
            {remainingSlots > 0 ? (
              <form onSubmit={handleSendInvite} className="bg-cyan-50/50 p-5 rounded-2xl border border-cyan-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <Send size={16} className="text-cyan-600" />
                    Send Employee Invite Code
                  </h4>
                  <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">Email Notification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Employee Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        placeholder="e.g. Jordan Lee"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-500 bg-white text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Work Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={employeeEmail}
                        onChange={(e) => setEmployeeEmail(e.target.value)}
                        placeholder="jordan@company.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-500 bg-white text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Department</label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. Engineering"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-500 bg-white text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold rounded-xl shadow-md shadow-cyan-300/30 text-xs flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  Send Email Invitation & Assign Slot
                </button>
              </form>
            ) : (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3 text-xs text-amber-800 font-medium">
                <AlertCircle className="text-amber-600 shrink-0" size={18} />
                <span>You have reached the maximum employee slots for this activity ({employeeSlotsPerActivity} slots). Upgrade your corporate plan or revoke existing invites to free up slots.</span>
              </div>
            )}

            {/* Simulated Email Sent Notification */}
            {lastSentInvite && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-emerald-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Invitation Sent to {lastSentInvite.employeeEmail}!
                  </span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">Email Delivered</span>
                </div>
                <p className="text-emerald-700 mb-2">
                  An email has been sent to <strong>{lastSentInvite.employeeName}</strong> with their unique invite code:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <code className="font-mono font-bold text-emerald-800 text-sm">{lastSentInvite.inviteCode}</code>
                  <button
                    onClick={() => handleCopyCode(lastSentInvite.inviteCode)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                  >
                    {copiedCode === lastSentInvite.inviteCode ? <Check size={14} /> : <Copy size={14} />}
                    {copiedCode === lastSentInvite.inviteCode ? 'Copied' : 'Copy Code'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Current Invites Table for this Activity */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Assigned Employees ({currentInvites.length})</h4>
              {currentInvites.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-4 text-center border border-dashed rounded-2xl">
                  No employees invited to this activity yet. Send an invite code above!
                </p>
              ) : (
                <div className="space-y-2.5">
                  {currentInvites.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50/50 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center">
                          {inv.employeeName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{inv.employeeName}</p>
                          <p className="text-gray-500 text-[11px]">{inv.employeeEmail} • {inv.department || 'General'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200">
                          {inv.inviteCode}
                        </span>

                        {/* Status selector */}
                        <select
                          value={inv.status}
                          onChange={(e) => updateInviteStatus(inv.id, e.target.value as any)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border border-transparent outline-none ${
                            inv.status === 'Going'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="Going">Going</option>
                          <option value="Pending">Pending</option>
                          <option value="Not Going">Not Going</option>
                        </select>

                        <button
                          onClick={() => cancelEmployeeInvite(inv.id)}
                          title="Revoke Invite"
                          className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <UserX size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
