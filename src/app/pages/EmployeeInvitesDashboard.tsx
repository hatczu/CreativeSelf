import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSubscription, EmployeeInvite } from '../context/SubscriptionContext';
import { UniversalSidebar } from '../components/layout/UniversalSidebar';
import { SubscriptionEntitlementHeader } from '../components/shared/SubscriptionEntitlementHeader';
import { EmployeeSlotManagerModal } from '../components/corporate/EmployeeSlotManagerModal';
import {
  Users,
  CheckCircle2,
  Clock,
  UserX,
  Send,
  Search,
  Copy,
  Check,
  Plus,
  Ticket,
  Building2,
  CalendarDays,
  Sparkles,
  Filter,
  RefreshCw,
  MailCheck,
} from 'lucide-react';

export function EmployeeInvitesDashboard() {
  const [searchParams] = useSearchParams();
  const urlActivityId = searchParams.get('activityId');

  const {
    planName,
    planType,
    employeeSlotsPerActivity,
    selectedActivities,
    employeeInvites,
    updateInviteStatus,
    cancelEmployeeInvite,
    sendEmployeeInvite,
  } = useSubscription();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Going' | 'Pending' | 'Cancelled'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<{ id: string; name: string }>({
    id: selectedActivities[0]?.id || 'ceramic-pottery-workshop',
    name: selectedActivities[0]?.name || 'Ceramic Pottery Workshop',
  });

  // Calculate Metrics
  const totalInvites = employeeInvites.length;
  const goingCount = employeeInvites.filter((i) => i.status === 'Going').length;
  const pendingCount = employeeInvites.filter((i) => i.status === 'Pending').length;
  const cancelledCount = employeeInvites.filter((i) => i.status === 'Cancelled' || i.status === 'Not Going').length;

  // Total available corporate slots across active activities
  const totalSlotsCapacity = selectedActivities.length * employeeSlotsPerActivity;
  const activeAssignedSlots = employeeInvites.filter((i) => i.status !== 'Cancelled').length;

  const filteredInvites = employeeInvites.filter((inv) => {
    const matchesActivity = !urlActivityId || inv.activityId === urlActivityId;
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      inv.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.inviteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.activityName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesActivity && matchesStatus && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOpenInviteModal = (actId: string, actName: string) => {
    setSelectedActivityForModal({ id: actId, name: actName });
    setIsSlotModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7fcff] text-[#1a1a28]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <UniversalSidebar />

      <EmployeeSlotManagerModal
        isOpen={isSlotModalOpen}
        onClose={() => setIsSlotModalOpen(false)}
        activityId={selectedActivityForModal.id}
        activityName={selectedActivityForModal.name}
      />

      <div className="mx-auto grid max-w-[1480px] gap-7 px-5 py-8 pb-14 lg:grid-cols-[220px_850px_280px] lg:justify-center lg:px-8 lg:py-12 lg:pl-[76px]">
        {/* Left Sidebar Info */}
        <aside className="hidden lg:block">
          <SubscriptionEntitlementHeader variant="sidebar" showLogo={true} />
        </aside>

        {/* Main Content Dashboard */}
        <main className="space-y-6 min-w-0">
          {/* Header Banner */}
          <div
            className="overflow-hidden bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)]"
            style={{ borderRadius: '20px 20px 64px 20px' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">
                  Corporate Employee Invites & Slot Tracker
                </p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#1a1a28]">
                  Manage Employee Invites
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#717182]">
                  Track employee attendance (Going, Pending, Cancelled), generate invite codes, send email notifications, and manage limited corporate slot allocations for {planName}.
                </p>
              </div>

              {selectedActivities.length > 0 && (
                <button
                  onClick={() =>
                    handleOpenInviteModal(
                      selectedActivities[0].id,
                      selectedActivities[0].name
                    )
                  }
                  className="shrink-0 rounded-full bg-[#1a1a28] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#33c4f0] hover:text-[#1a1a28] flex items-center gap-2"
                >
                  <Plus size={16} />
                  Send New Employee Invite
                </button>
              )}
            </div>
            <div className="mt-5 inline-flex rounded-full bg-[#e8f9ff] px-4 py-2 text-xs font-bold text-[#147c9e]">
              Active Corporate Plan: {planName}
            </div>
          </div>

          {/* Key Metric Cards Widget matching Dashboard UI */}
          <section
            className="overflow-hidden bg-[#1a1a28] p-5 text-white shadow-[0_16px_42px_rgba(28,118,155,.14)]"
            style={{ borderRadius: '20px 20px 64px 20px' }}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">EMPLOYEE INVITES METRICS</p>
                <h3 className="text-lg font-extrabold text-white">Live Attendance & Capacity Overview</h3>
              </div>
              <span className="rounded-full bg-[#33c4f0] px-2.5 py-1 text-[10px] font-extrabold text-[#1a1a28]">
                Real-time
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
                <p className="text-2xl font-extrabold text-[#33c4f0]">{totalInvites}</p>
                <p className="mt-1 text-xs font-bold text-white">Total Invites Sent</p>
                <p className="mt-1 text-[11px] text-white/50">{activeAssignedSlots} / {totalSlotsCapacity || 10} slots active</p>
              </div>

              <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
                <p className="text-2xl font-extrabold text-[#10B981]">{goingCount}</p>
                <p className="mt-1 text-xs font-bold text-white">Going (Confirmed)</p>
                <p className="mt-1 text-[11px] text-white/50">{Math.round((goingCount / (totalInvites || 1)) * 100)}% Acceptance Rate</p>
              </div>

              <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
                <p className="text-2xl font-extrabold text-amber-400">{pendingCount}</p>
                <p className="mt-1 text-xs font-bold text-white">Pending Response</p>
                <p className="mt-1 text-[11px] text-white/50">Awaiting employee action</p>
              </div>

              <div className="rounded-[20px_20px_48px_20px] border border-white/10 bg-white/[.07] p-4 transition hover:bg-white/[.12]">
                <p className="text-2xl font-extrabold text-rose-400">{cancelledCount}</p>
                <p className="mt-1 text-xs font-bold text-white">Cancelled / Declined</p>
                <p className="mt-1 text-[11px] text-white/50">Slots returned to pool</p>
              </div>
            </div>
          </section>

          {/* Main Invites Table Section */}
          <div
            className="bg-white p-6 shadow-[0_16px_42px_rgba(28,118,155,.08)] space-y-5"
            style={{ borderRadius: '20px 20px 64px 20px' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Employee Invite Codes & Status Roster</h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Track who is going, pending, or cancelled, and manage employee invite codes.
                </p>
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-2xl border border-gray-200">
                {[
                  { id: 'all', label: 'All Invites' },
                  { id: 'Going', label: 'Going' },
                  { id: 'Pending', label: 'Pending' },
                  { id: 'Cancelled', label: 'Cancelled' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === tab.id
                        ? 'bg-white text-cyan-800 shadow-sm border border-gray-200/80'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search size={17} className="absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employee name, email, invite code, or activity name..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 text-xs font-medium text-gray-800"
              />
            </div>

            {/* Invites Roster Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Activity</th>
                    <th className="py-3 px-4">Invite Code</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInvites.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500 italic">
                        No employee invites match your current search or filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInvites.map((inv) => (
                      <tr key={inv.id} className="hover:bg-cyan-50/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white font-bold flex items-center justify-center text-xs">
                              {inv.employeeName.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-extrabold text-gray-900">{inv.employeeName}</p>
                              <p className="text-[11px] text-gray-500">{inv.employeeEmail} • {inv.department || 'Team'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-800">
                          {inv.activityName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                            <span>{inv.inviteCode}</span>
                            <button
                              onClick={() => handleCopyCode(inv.inviteCode)}
                              className="text-gray-400 hover:text-cyan-600 transition-colors"
                              title="Copy Invite Code"
                            >
                              {copiedCode === inv.inviteCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={inv.status}
                            onChange={(e) => updateInviteStatus(inv.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border outline-none cursor-pointer ${
                              inv.status === 'Going'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : inv.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            <option value="Going">✓ Going</option>
                            <option value="Pending">⏳ Pending</option>
                            <option value="Not Going">× Not Going</option>
                            <option value="Cancelled">🚫 Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleCopyCode(`https://creativeself.app/invite?code=${inv.inviteCode}`)}
                              className="p-1.5 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                              title="Resend Invite / Copy Link"
                            >
                              <MailCheck size={16} />
                            </button>
                            <button
                              onClick={() => cancelEmployeeInvite(inv.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel / Revoke Slot"
                            >
                              <UserX size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Right Sidebar Info Card for Module Layout Consistency */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            {/* Card 1 (TOP - WHITE): Team Engagement Metrics Widget */}
            <div
              className="overflow-hidden bg-white p-5 shadow-[0_16px_42px_rgba(28,118,155,.08)]"
              style={{ borderRadius: '20px 20px 64px 20px' }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#33c4f0]">
                TEAM ENGAGEMENT
              </span>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-[#1a1a28]">88%</p>
                  <p className="mt-0.5 text-xs font-bold text-[#1a1a28]">Monthly Attendance</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-[14px_14px_22px_14px] bg-[#e8f9ff] text-[#147c9e]">
                  <Users size={20} />
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#717182] font-medium">
                High team response rate across creative restoration and wellbeing activities.
              </p>
            </div>

            {/* Card 2 (BOTTOM - LIGHT CYAN #e8f9ff): Slot Policy & Invite Guidelines */}
            <div
              className="overflow-hidden bg-[#e8f9ff] p-5 shadow-sm"
              style={{ borderRadius: '20px 20px 64px 20px' }}
            >
              <div className="border-b border-[#33c4f0]/20 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#147c9e]">
                  SLOT POLICY
                </span>
                <h3 className="mt-1 text-base font-extrabold text-[#1a1a28]">Team Invite Rules</h3>
              </div>

              <div className="mt-4 space-y-3.5 text-xs text-[#717182]">
                <div className="flex items-start gap-2.5">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#147c9e] shadow-sm mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a28]">Automatic Slot Reservation</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#556976]">
                      Generating an invite code instantly holds 1 seat per employee for your active corporate plan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-purple-600 shadow-sm mt-0.5">
                    <Users size={13} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a28]">Revocable Invitations</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#556976]">
                      If an employee declines or cancels, their slot is freed up immediately for another team member.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-emerald-600 shadow-sm mt-0.5">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a28]">Email Notifications</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#556976]">
                      Employees receive single-use direct access codes via email to join their scheduled activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
