import { useState } from 'react';
import { Link } from 'react-router';
import {
  Search, Plus, Filter, MoreHorizontal, Check, X,
  Star, ChevronDown, UserCheck, Building2, Users,
  ArrowLeft
} from 'lucide-react';

type VendorStatus = 'Active' | 'Pending' | 'Inactive';
type VendorCategory = 'Talent' | 'Trainer' | 'Coach' | 'Group' | 'Association' | 'Service Brand' | 'Activity Provider';

interface Vendor {
  id: number;
  name: string;
  category: VendorCategory;
  status: VendorStatus;
  brand: string;
  rating: number;
  activities: number;
  location: string;
  email: string;
  avatar: string;
  color: string;
}

const vendors: Vendor[] = [
  { id: 1, name: 'Sofia Reyes', category: 'Trainer', status: 'Active', brand: 'Moves & Grooves', rating: 4.9, activities: 34, location: 'Metro Manila', email: 'sofia@movesgrooves.ph', avatar: '💃', color: '#8B5CF6' },
  { id: 2, name: 'Digital Makers Lab', category: 'Activity Provider', status: 'Active', brand: 'Technut', rating: 4.8, activities: 28, location: 'BGC, Taguig', email: 'hello@digitalmakers.ph', avatar: '🤖', color: '#6366F1' },
  { id: 3, name: 'Chef Marco Villar', category: 'Talent', status: 'Pending', brand: 'Chowdown', rating: 0, activities: 0, location: 'Makati', email: 'marco@chefstudio.ph', avatar: '🍳', color: '#F59E0B' },
  { id: 4, name: 'Sunrise Art Collective', category: 'Group', status: 'Active', brand: 'Heart of Art', rating: 4.7, activities: 52, location: 'Quezon City', email: 'info@sunriseart.ph', avatar: '🎨', color: '#EF4444' },
  { id: 5, name: 'Maria Cruz', category: 'Coach', status: 'Active', brand: 'Athletic Fanatics', rating: 5.0, activities: 21, location: 'Pasig', email: 'maria@fitcoach.ph', avatar: '🏆', color: '#10B981' },
  { id: 6, name: 'Wanderers Philippines', category: 'Association', status: 'Inactive', brand: 'Trip and Tell', rating: 4.3, activities: 8, location: 'Nationwide', email: 'contact@wanderers.ph', avatar: '🌍', color: '#3B82F6' },
  { id: 7, name: 'Beat Lab Studios', category: 'Talent', status: 'Active', brand: 'Local Vocals', rating: 4.8, activities: 19, location: 'Ortigas', email: 'studio@beatlabph.com', avatar: '🎤', color: '#F97316' },
  { id: 8, name: 'Craft & Create PH', category: 'Activity Provider', status: 'Pending', brand: 'Bubbly Hobbies', rating: 0, activities: 0, location: 'Mandaluyong', email: 'hello@craftcreate.ph', avatar: '🎯', color: '#EAB308' },
  { id: 9, name: 'Style Lab Manila', category: 'Service Brand', status: 'Active', brand: 'Style File', rating: 4.6, activities: 15, location: 'Makati', email: 'info@stylelabmanila.com', avatar: '✨', color: '#EC4899' },
  { id: 10, name: 'Peak Cycling Club', category: 'Group', status: 'Active', brand: 'Ride High', rating: 4.7, activities: 23, location: 'Fort Bonifacio', email: 'riders@peakcycling.ph', avatar: '🏍️', color: '#F97316' },
];

const categories: VendorCategory[] = ['Talent', 'Trainer', 'Coach', 'Group', 'Association', 'Service Brand', 'Activity Provider'];
const statuses: VendorStatus[] = ['Active', 'Pending', 'Inactive'];

const statusColors: Record<VendorStatus, { text: string; bg: string }> = {
  Active: { text: '#10B981', bg: '#10B98115' },
  Pending: { text: '#F59E0B', bg: '#F59E0B15' },
  Inactive: { text: '#717182', bg: '#71718215' },
};

export function VendorManagement() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Vendor | null>(null);

  const filtered = vendors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || v.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F8FCFF', fontFamily: 'Plus Jakarta Sans, sans-serif', paddingTop: '5rem' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link
                to="/corporate"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.85rem',
                  color: '#717182',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={14} />
                Corporate Dashboard
              </Link>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A1A28' }}>Vendor Management</h1>
            <p style={{ fontSize: '0.9rem', color: '#717182' }}>Manage talents, trainers, coaches, groups, and service providers</p>
          </div>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)',
              boxShadow: '0 6px 20px rgba(51,196,240,0.35)',
            }}
          >
            <Plus size={16} />
            Add Vendor
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Vendors', value: vendors.length, icon: <UserCheck size={18} color="#33C4F0" />, color: '#33C4F0' },
            { label: 'Active', value: vendors.filter(v => v.status === 'Active').length, icon: <Check size={18} color="#10B981" />, color: '#10B981' },
            { label: 'Pending Approval', value: vendors.filter(v => v.status === 'Pending').length, icon: <Building2 size={18} color="#F59E0B" />, color: '#F59E0B' },
            { label: 'Categories', value: categories.length, icon: <Users size={18} color="#8B5CF6" />, color: '#8B5CF6' },
          ].map(({ label, value, icon, color }) => (
            <div
              key={label}
              style={{
                background: '#ffffff',
                borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '9999px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A28', lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '0.8rem', color: '#717182', marginTop: '0.125rem' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Table */}
          <div
            className="xl:col-span-2"
            style={{
              background: '#ffffff',
              borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1.5px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Filters */}
            <div
              style={{
                padding: '1.5rem',
                borderBottom: '1.5px solid rgba(0,0,0,0.06)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
              }}
            >
              {/* Search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  background: '#F8FCFF',
                  border: '1.5px solid rgba(51,196,240,0.2)',
                  flex: 1,
                  minWidth: '180px',
                }}
              >
                <Search size={15} color="#717182" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search vendors..."
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    color: '#1A1A28',
                    outline: 'none',
                    flex: 1,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                />
              </div>

              {/* Category filter */}
              <div style={{ position: 'relative' }}>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '0.625rem 2.5rem 0.625rem 1.25rem',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(0,0,0,0.1)',
                    background: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#1A1A28',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} color="#717182" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>

              {/* Status filter */}
              <div style={{ position: 'relative' }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '0.625rem 2.5rem 0.625rem 1.25rem',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(0,0,0,0.1)',
                    background: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#1A1A28',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  <option value="All">All Statuses</option>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} color="#717182" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Vendor list */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8FCFF' }}>
                    {['Vendor', 'Category', 'Brand', 'Status', 'Rating', 'Actions'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.875rem 1.25rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#717182',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((vendor) => (
                    <tr
                      key={vendor.id}
                      onClick={() => setSelected(vendor)}
                      style={{
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        background: selected?.id === vendor.id ? 'rgba(51,196,240,0.04)' : 'transparent',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => { if (selected?.id !== vendor.id) (e.currentTarget as HTMLElement).style.background = '#F8FCFF'; }}
                      onMouseLeave={(e) => { if (selected?.id !== vendor.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '9999px',
                              background: `${vendor.color}15`,
                              border: `1.5px solid ${vendor.color}25`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              flexShrink: 0,
                            }}
                          >
                            {vendor.avatar}
                          </div>
                          <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A28', whiteSpace: 'nowrap' }}>{vendor.name}</p>
                            <p style={{ fontSize: '0.72rem', color: '#717182' }}>{vendor.location}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: vendor.color,
                            background: `${vendor.color}12`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {vendor.category}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#717182', whiteSpace: 'nowrap' }}>{vendor.brand}</p>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: statusColors[vendor.status].text,
                            background: statusColors[vendor.status].bg,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {vendor.rating > 0 ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Star size={13} color="#F59E0B" fill="#F59E0B" />
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A28' }}>{vendor.rating}</span>
                            <span style={{ fontSize: '0.72rem', color: '#717182' }}>({vendor.activities} acts)</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#717182' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {vendor.status === 'Pending' && (
                            <>
                              <button
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '9999px',
                                  border: 'none',
                                  background: '#10B98115',
                                  color: '#10B981',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                                title="Approve"
                              >
                                <Check size={13} />
                              </button>
                              <button
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '9999px',
                                  border: 'none',
                                  background: '#EF444415',
                                  color: '#EF4444',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                                title="Reject"
                              >
                                <X size={13} />
                              </button>
                            </>
                          )}
                          <button
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '9999px',
                              border: 'none',
                              background: 'rgba(0,0,0,0.05)',
                              color: '#717182',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <MoreHorizontal size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#717182' }}>
                  No vendors match your filters
                </div>
              )}
            </div>
          </div>

          {/* Vendor detail panel */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
              padding: '1.75rem',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1.5px solid rgba(0,0,0,0.06)',
              height: 'fit-content',
            }}
          >
            {selected ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '9999px',
                      background: `${selected.color}15`,
                      border: `2px solid ${selected.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      margin: '0 auto 1rem',
                    }}
                  >
                    {selected.avatar}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A28', marginBottom: '0.25rem' }}>{selected.name}</h3>
                  <span
                    style={{
                      padding: '0.25rem 0.875rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: selected.color,
                      background: `${selected.color}12`,
                    }}
                  >
                    {selected.category}
                  </span>
                </div>

                {/* Status */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '1.85rem 0.7rem 1.85rem 0.9rem',
                    background: statusColors[selected.status].bg,
                    marginBottom: '1.25rem',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#717182' }}>Status</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: statusColors[selected.status].text }}>
                    {selected.status}
                  </span>
                </div>

                {/* Details */}
                {[
                  { label: 'Service Brand', value: selected.brand },
                  { label: 'Location', value: selected.location },
                  { label: 'Email', value: selected.email },
                  { label: 'Activities Delivered', value: selected.activities > 0 ? `${selected.activities} activities` : 'New vendor' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ marginBottom: '0.875rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#717182', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#1A1A28', fontWeight: 600 }}>{value}</p>
                  </div>
                ))}

                {/* Rating */}
                {selected.rating > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#717182', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                      Rating
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} color="#F59E0B" fill={s <= Math.round(selected.rating) ? '#F59E0B' : 'transparent'} />
                      ))}
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1A28', marginLeft: '0.25rem' }}>{selected.rating}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  <button
                    style={{
                      padding: '0.75rem',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: selected.color,
                      width: '100%',
                    }}
                  >
                    Edit Profile
                  </button>
                  {selected.status === 'Pending' && (
                    <button
                      style={{
                        padding: '0.75rem',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#10B981',
                        background: '#10B98112',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Check size={15} />
                      Approve Vendor
                    </button>
                  )}
                  {selected.status === 'Active' && (
                    <button
                      style={{
                        padding: '0.75rem',
                        borderRadius: '9999px',
                        border: '1.5px solid rgba(239,68,68,0.25)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#EF4444',
                        background: 'transparent',
                        width: '100%',
                      }}
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#717182' }}>
                <UserCheck size={40} color="#33C4F0" style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>Select a vendor to view their profile</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>Click any row in the table</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
