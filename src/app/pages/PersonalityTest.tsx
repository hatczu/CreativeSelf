import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { personalityTypes } from '../components/landing/PersonalitySection';
import { DropletShape } from '../components/shared/BlobShape';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import kaleidoscope from '../../imports/CS_Kaleidescope_Juice_Drop.png';

const questions = [
  {
    id: 1,
    question: 'When you have free time, what calls to you most?',
    options: [
      { label: 'Creating something entirely new and different', scores: { original: 3, imaginative: 1 } },
      { label: 'Getting lost in daydreams and visions', scores: { imaginative: 3, expressive: 1 } },
      { label: 'Building or fixing something with your hands', scores: { innovative: 3, original: 1 } },
      { label: 'Performing, writing, or making something emotional', scores: { expressive: 3, imaginative: 1 } },
      { label: 'Going somewhere new and discovering it', scores: { explorer: 3, innovative: 1 } },
    ],
  },
  {
    id: 2,
    question: 'How do you usually solve a challenging problem?',
    options: [
      { label: 'I flip it upside down and approach it totally differently', scores: { original: 3, innovative: 1 } },
      { label: 'I imagine all the possibilities and pick the most vivid one', scores: { imaginative: 3, original: 1 } },
      { label: 'I break it into parts and systematically find a solution', scores: { innovative: 3, explorer: 1 } },
      { label: 'I trust my gut and express what feels right', scores: { expressive: 3, imaginative: 1 } },
      { label: 'I explore different perspectives and learn from others', scores: { explorer: 3, expressive: 1 } },
    ],
  },
  {
    id: 3,
    question: 'Which kind of experience excites you most?',
    options: [
      { label: 'Starting a creative project nobody has tried before', scores: { original: 3 } },
      { label: 'An immersive experience that sparks your imagination', scores: { imaginative: 3, expressive: 1 } },
      { label: 'Learning a new technical skill or building something', scores: { innovative: 3 } },
      { label: 'Performing, sharing art, or connecting emotionally', scores: { expressive: 3, original: 1 } },
      { label: 'Traveling somewhere culturally rich and unfamiliar', scores: { explorer: 3, imaginative: 1 } },
    ],
  },
  {
    id: 4,
    question: 'When you think of creativity, what comes to mind first?',
    options: [
      { label: 'Breaking rules and setting new standards', scores: { original: 3 } },
      { label: 'Painting vivid pictures in your mind and on canvas', scores: { imaginative: 3 } },
      { label: 'Inventing something that solves a real problem', scores: { innovative: 3, original: 1 } },
      { label: 'Expressing feelings that words alone cannot capture', scores: { expressive: 3 } },
      { label: 'Wandering without a plan and finding unexpected beauty', scores: { explorer: 3, imaginative: 1 } },
    ],
  },
  {
    id: 5,
    question: 'Which environment helps you thrive?',
    options: [
      { label: 'A blank canvas with total freedom to experiment', scores: { original: 3, expressive: 1 } },
      { label: 'A calm, dreamy space full of inspiration and wonder', scores: { imaginative: 3 } },
      { label: 'A lab, workshop, or space full of tools and materials', scores: { innovative: 3, original: 1 } },
      { label: 'A stage, studio, or community where you can share', scores: { expressive: 3, explorer: 1 } },
      { label: 'Outdoors, on the move, discovering the world', scores: { explorer: 3, expressive: 1 } },
    ],
  },
];

type PersonalityKey = 'original' | 'imaginative' | 'innovative' | 'expressive' | 'explorer';

const personalityMap: Record<PersonalityKey, typeof personalityTypes[0]> = {
  original: personalityTypes[0],
  imaginative: personalityTypes[1],
  innovative: personalityTypes[2],
  expressive: personalityTypes[3],
  explorer: personalityTypes[4],
};

export function PersonalityTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<typeof personalityTypes[0] | null>(null);
  const [revealing, setRevealing] = useState(false);

  const q = questions[step];
  const progress = ((step) / questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const scores: Record<PersonalityKey, number> = { original: 0, imaginative: 0, innovative: 0, expressive: 0, explorer: 0 };
      newAnswers.forEach((answerIdx, qIdx) => {
        const option = questions[qIdx].options[answerIdx];
        Object.entries(option.scores).forEach(([key, val]) => {
          scores[key as PersonalityKey] += val;
        });
      });
      const topKey = (Object.keys(scores) as PersonalityKey[]).reduce((a, b) => scores[a] >= scores[b] ? a : b);
      setRevealing(true);
      setTimeout(() => {
        setResult(personalityMap[topKey]);
        setRevealing(false);
      }, 1200);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setRevealing(false);
  };

  if (revealing) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <DropletShape color="#33C4F0" size={180} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 600 }}
        >
          Acumen is analyzing your results…
        </motion.p>
      </div>
    );
  }

  if (result) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #1A1A28 0%, #2D1B69 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 1.5rem 3rem',
        }}
      >
        <div style={{ maxWidth: '700px', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              background: result.bg,
              borderRadius: '3.5rem 1.15rem 3.5rem 1.4rem',
              padding: '3rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Big emoji */}
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{result.emoji}</div>

            <div
              style={{
                display: 'inline-block',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                background: `${result.color}15`,
                border: `1.5px solid ${result.color}30`,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: result.color,
                marginBottom: '1rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Your Creative Type
            </div>

            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: result.color,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              {result.name}
            </h1>

            <p style={{ fontSize: '1.05rem', color: '#3A3A4A', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
              {result.description}
            </p>

            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: result.color,
                    background: `${result.color}12`,
                    border: `1px solid ${result.color}25`,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Recommended activities */}
            <div
              style={{
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '2.6rem 0.9rem 2.6rem 1.15rem',
                padding: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#717182', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Acumen Recommends
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {result.activities.map((activity) => (
                  <span
                    key={activity}
                    style={{
                      padding: '0.35rem 0.875rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: result.color,
                      color: '#ffffff',
                    }}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/dashboard"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  textDecoration: 'none',
                  background: result.color,
                  boxShadow: `0 8px 28px ${result.color}40`,
                }}
              >
                Explore Your Dashboard
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: result.color,
                  background: `${result.color}12`,
                  border: `1.5px solid ${result.color}25`,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={14} />
                Retake Test
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #F0FBFF 0%, #ffffff 60%, #F5F3FF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative kaleidoscope */}
      <div style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', opacity: 0.08, zIndex: 0 }}>
        <ImageWithFallback src={kaleidoscope} alt="" style={{ width: '400px' }} />
      </div>

      <div style={{ maxWidth: '640px', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-10">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(51,196,240,0.1)',
              border: '1px solid rgba(51,196,240,0.3)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#1AB0DC',
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={13} />
            Powered by Acumen AI
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#1A1A28',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            Creative Personality Test
          </h1>
          <p style={{ color: '#717182', fontSize: '1rem', lineHeight: 1.6 }}>
            5 questions · Takes about 3 minutes
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: '6px',
            borderRadius: '9999px',
            background: 'rgba(51,196,240,0.15)',
            marginBottom: '2.5rem',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #33C4F0 0%, #8B5CF6 100%)',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: '3.25rem 1.05rem 3.25rem 1.35rem',
                padding: '2.5rem',
                boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
                border: '1.5px solid rgba(51,196,240,0.12)',
              }}
            >
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#33C4F0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Question {step + 1} of {questions.length}
              </p>
              <h2
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#1A1A28',
                  lineHeight: 1.35,
                  marginBottom: '1.75rem',
                }}
              >
                {q.question}
              </h2>

              <div className="flex flex-col gap-3">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '9999px',
                      fontSize: '0.95rem',
                      fontWeight: selected === i ? 700 : 500,
                      color: selected === i ? '#ffffff' : '#2A2A3A',
                      background: selected === i
                        ? 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)'
                        : 'rgba(51,196,240,0.05)',
                      border: selected === i
                        ? 'none'
                        : '2px solid rgba(51,196,240,0.2)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      boxShadow: selected === i ? '0 6px 24px rgba(51,196,240,0.35)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (selected !== i) {
                        (e.currentTarget as HTMLElement).style.borderColor = '#33C4F0';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selected !== i) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(51,196,240,0.2)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(51,196,240,0.05)';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => { setStep(Math.max(0, step - 1)); setSelected(null); }}
            disabled={step === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: step === 0 ? '#ccc' : '#717182',
              background: 'transparent',
              border: `1.5px solid ${step === 0 ? '#eee' : 'rgba(0,0,0,0.12)'}`,
              cursor: step === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: i === step ? '#33C4F0' : i < step ? '#10B981' : 'rgba(0,0,0,0.15)',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#ffffff',
              background: selected !== null
                ? 'linear-gradient(135deg, #33C4F0 0%, #8B5CF6 100%)'
                : '#ccc',
              border: 'none',
              cursor: selected !== null ? 'pointer' : 'not-allowed',
              boxShadow: selected !== null ? '0 6px 20px rgba(51,196,240,0.35)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {step === questions.length - 1 ? 'Reveal My Type' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.85rem',
              color: '#717182',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={13} />
            Back to CreativeSelf
          </Link>
        </div>
      </div>
    </div>
  );
}
