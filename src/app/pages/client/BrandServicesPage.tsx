import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkle as Sparkles, ArrowRight, MagnifyingGlass as Search, Tag, MapPin, Clock, Star, CheckCircle } from '@phosphor-icons/react';
import { themeCategories, mockVendors, mockActivities } from '@/app/data/subscriptionData';

export function BrandServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter categories
  const categoriesToShow = activeCategory === 'all'
    ? themeCategories.filter(c => c.id !== 'all')
    : themeCategories.filter(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      {/* Hero Header */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles size={14} className="text-cyan-600" />
            Curated Service Brands & Activities
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Brand Services & <span className="gradient-text">Creative Categories</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore our curated network of partner brands — from visual arts and gourmet crafts to tech labs and outdoor expeditions.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative flex items-center">
              <Search size={20} className="absolute left-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories (e.g. Painting, Coffee, Robotics)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {themeCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.symbol}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Brands & Categories Detailed Grid */}
      <section className="max-w-6xl mx-auto px-6 space-y-16">
        <AnimatePresence mode="wait">
          {categoriesToShow.map((category) => {
            // Find vendors matching theme category
            const categoryVendors = mockVendors.filter((v) => v.theme === category.id);
            // Collect subcategories from vendors
            const subcategories = Array.from(new Set(categoryVendors.flatMap((v) => v.categories)));
            // Find activities matching theme category
            const categoryActivities = mockActivities.filter((a) => {
              const matchesCategory = categoryVendors.some((v) => v.id === a.vendorId);
              const matchesSearch = searchQuery
                ? a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  a.category.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
              return matchesCategory && matchesSearch;
            });

            if (searchQuery && categoryActivities.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8"
              >
                {/* Category Header Banner */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                      style={{ background: `${category.color}15`, border: `2px solid ${category.color}30` }}
                    >
                      {category.symbol}
                    </div>
                    <div>
                      <span
                        className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                        style={{ background: category.color }}
                      >
                        Brand Theme
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                        {category.name}
                      </h2>
                      <p className="text-sm text-slate-600 font-medium mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Subcategory Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1">
                      Subcategories:
                    </span>
                    {subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        <Tag size={12} className="text-cyan-600" />
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vendors Row under this Brand Category */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                    Verified Partner Studios & Vendors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-cyan-400 transition"
                      >
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">{vendor.name}</h4>
                            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              <Star size={12} weight="fill" />
                              {vendor.rating} ({vendor.reviewsCount})
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{vendor.specialty}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                            <MapPin size={13} />
                            <span>{vendor.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subcategory Activities Grid */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                    Featured Activities & Workshops ({categoryActivities.length})
                  </h3>

                  {categoryActivities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition duration-200 group"
                        >
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={activity.image}
                              alt={activity.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                              <span>{activity.symbol}</span>
                              <span>{activity.category}</span>
                            </div>
                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-extrabold flex items-center gap-1">
                              <Star size={12} className="text-amber-500" weight="fill" />
                              {activity.rating}
                            </div>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                              <p className="text-xs font-bold text-cyan-600 mb-1">{activity.vendorName}</p>
                              <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-cyan-600 transition">
                                {activity.name}
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                                {activity.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1 text-slate-500 font-medium">
                                <Clock size={14} />
                                {activity.duration}
                              </div>

                              <Link
                                to={`/discover/services/${activity.id}`}
                                className="inline-flex items-center gap-1 font-extrabold text-cyan-600 hover:text-cyan-700"
                              >
                                View Activity
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-50 text-center text-slate-500 text-sm font-medium">
                      No activities match your search query for this theme.
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* AI Recommendation Banner */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-cyan-950 text-white shadow-2xl border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase">
              <CheckCircle size={14} />
              Acumen AI Matching Enabled
            </div>
            <h3 className="text-2xl font-extrabold">Not sure which brand service fits your personality?</h3>
            <p className="text-sm text-cyan-100/80 max-w-xl">
              Take our 2-minute Creative Personality Test and let Acumen AI match you directly with your ideal service brand and activities.
            </p>
          </div>

          <Link
            to="/test"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-extrabold text-sm shadow-lg shrink-0 transition"
          >
            Take Personality Test
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
