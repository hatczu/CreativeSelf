import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight, Sparkle as Sparkles, ArrowRight, BookmarkSimple, BookOpen } from '@phosphor-icons/react';
import creativePersonaImg from '../../../imports/creative_persona_transformation.png';
import ezineCoverImg from '../../../imports/ezine_cover_featured_person.png';

export function HeroCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section
      id="hero-carousel"
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, #F0FBFF 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation / Indicators header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-cyan-600 uppercase bg-cyan-100/80 px-3.5 py-1.5 rounded-full border border-cyan-300/50 flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-500" />
              Creative Self Spotlight
            </span>
            <span className="text-xs font-semibold text-slate-400">
              0{activeIndex + 1} / 02
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveIndex(0)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-200 scale-105'
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
              aria-label="Carousel 1"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => setActiveIndex(1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeIndex === 1
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-200 scale-105'
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
              aria-label="Carousel 2"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[500px] bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeIndex === 0 ? (
              /* CAROUSEL 1 */
              <motion.div
                key="carousel-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
                    ✨ Empower Your Journey
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                    Discover Something <span className="gradient-text">NEW</span> and{' '}
                    <span className="gradient-text">CREATIVE</span> That Empowers Your Life and Career.
                  </h2>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-100/70 space-y-2">
                    <p className="text-lg font-bold text-cyan-900 italic">
                      "You can be anything but square!"
                    </p>
                    <p className="text-base font-semibold text-purple-800">
                      It's never too late to be <span className="underline decoration-cyan-400 font-extrabold">CREATIVE</span>,{' '}
                      <span className="underline decoration-amber-400 font-extrabold">FREE</span> and more{' '}
                      <span className="underline decoration-emerald-400 font-extrabold">PRODUCTIVE</span>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <a
                      href="#test"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-300/50 transition-all hover:-translate-y-0.5"
                    >
                      Start Persona Transformation
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="relative group w-full max-w-lg">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                      <img
                        src={creativePersonaImg}
                        alt="Transitioning Creative Persona"
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                              Persona Shift Visual
                            </p>
                            <p className="text-sm font-bold text-white">
                              Routine Self ➔ Vibrant Creative Persona
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-cyan-500/80 backdrop-blur-md rounded-full text-xs font-bold">
                            Interactive Shift
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* CAROUSEL 2 */
              <motion.div
                key="carousel-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
                    <BookOpen size={14} className="text-purple-600" />
                    Monthly Creative Spotlight
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                    Cover of the Month <span className="gradient-text-warm">eZine</span>
                  </h2>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    Step inside this month's featured story of extraordinary transformation. See how everyday professionals unlock their secondary creative persona through CreativeSelf.
                  </p>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 border border-purple-100 space-y-2">
                    <p className="text-xs font-extrabold text-purple-600 uppercase tracking-widest">
                      Featured Creative Person of the Month
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      "I stopped trying to fit into a square box. CreativeSelf revealed my inner Explorer."
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      — Maya Lin, Design Lead & Visual Storyteller
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <button className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-300/50 transition-all hover:-translate-y-0.5">
                      <BookmarkSimple size={18} />
                      Read eZine Feature Issue
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="relative group w-full max-w-md">
                    <div className="absolute -inset-3 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                      <img
                        src={ezineCoverImg}
                        alt="Cover of the Month eZine"
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute top-4 left-4 px-3.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                        ISSUE #12 · CREATIVE SELF
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setActiveIndex(0)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === 0 ? 'w-8 bg-cyan-500' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label="Go to slide 1"
            />
            <button
              onClick={() => setActiveIndex(1)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === 1 ? 'w-8 bg-purple-500' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label="Go to slide 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
