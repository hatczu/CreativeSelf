import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkle as Sparkles, ArrowRight, CheckCircle, UsersThree } from '@phosphor-icons/react';
import splitGroupImg from '../../../imports/split_group_personality.png';

export function CorporateSurveySection() {
  return (
    <section
      id="corporate-survey"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 60%, #0D3A52 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow */}
      <div
        className="pulse-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(51,196,240,0.15) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Headline & Acumen AI Survey CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-white text-left"
          >
            {/* Acumen Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-cyan-400" />
              Powered by Acumen AI
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Take the Free Corporate Creativity Survey!
            </h2>

            <p className="text-base sm:text-lg text-cyan-100/80 leading-relaxed font-medium">
              Discover your organization's collective creative archetype, uncover hidden innovation potential, and measure group engagement dynamics across all teams.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200 font-semibold">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span>Group/Team Half & Half Personality Mapping</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200 font-semibold">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span>Culture Crisis & Burnout Assessment Report</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200 font-semibold">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span>Tailored Employee Engagement Action Plan</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/corporate"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-white text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
              >
                <UsersThree size={22} weight="bold" />
                Start Corporate Survey — Free
                <ArrowRight size={20} weight="bold" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Half/Half Personality by Group Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative group w-full max-w-lg">
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900">
                <img
                  src={splitGroupImg}
                  alt="Half/Half Personality by Group Visual"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 max-h-[380px]"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-slate-950/85 backdrop-blur-md text-white border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Group Personality Dynamics
                      </p>
                      <p className="text-sm font-extrabold text-white">
                        Half/Half Personality by Group Visual
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-md rounded-full text-xs font-bold">
                      Team Acumen Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
