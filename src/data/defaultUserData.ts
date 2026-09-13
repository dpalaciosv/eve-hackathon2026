import { UserProfile, DotConnectionHistoryItem } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-sarah-1',
  name: 'Sarah Müller',
  email: 'sarah.mueller@example.de',
  age: 46,
  ageGroup: '45-49',
  cycleStatus: 'skipped_cycles',
  hrtStatus: 'curious_exploring',
  primaryGoals: [
    'Restore 3 AM sleep quality',
    'Understand brain fog vs. stress',
    'Prepare evidence-based doctor appointment'
  ],
  medicalNotes: 'No previous hormone treatments. Thyroid function checked 8 months ago within normal limits.',
  avatarBg: 'from-[#8B5CF6] to-[#EC4899]',
  createdAt: '2026-06-15',
  lastActive: '2026-09-12'
};

export const DEMO_PROFILES: UserProfile[] = [
  DEFAULT_USER_PROFILE,
  {
    id: 'user-elena-2',
    name: 'Elena Becker',
    email: 'elena.b@example.de',
    age: 41,
    ageGroup: '40-44',
    cycleStatus: 'irregular_early',
    hrtStatus: 'none',
    primaryGoals: [
      'Understand early luteal mood drops',
      'Manage new unexplained anxiety before period',
      'Track cycle variations'
    ],
    medicalNotes: 'Mirena IUD removed 1 year ago. Cycles now varying between 23 and 32 days.',
    avatarBg: 'from-[#3B82F6] to-[#8B5CF6]',
    createdAt: '2026-07-01',
    lastActive: '2026-09-10'
  },
  {
    id: 'user-claudia-3',
    name: 'Claudia Weber',
    email: 'claudia.w@example.de',
    age: 51,
    ageGroup: '50-54',
    cycleStatus: 'amenorrhea_recent',
    hrtStatus: 'transdermal_bioidentical',
    primaryGoals: [
      'Evaluate transdermal estradiol efficacy',
      'Relieve joint stiffness and frozen shoulder',
      'Cardiovascular & bone density longevity plan'
    ],
    medicalNotes: 'Started transdermal estradiol 50mcg + micronized progesterone 200mg cyclically 3 months ago.',
    avatarBg: 'from-[#EC4899] to-[#F59E0B]',
    createdAt: '2026-05-10',
    lastActive: '2026-09-11'
  }
];

export const INITIAL_CONNECTION_HISTORY: DotConnectionHistoryItem[] = [
  {
    id: 'history-session-august',
    date: '24. August 2026',
    timestamp: 1787572800000,
    userSnapshot: {
      name: 'Sarah Müller',
      age: 46,
      cycleStatus: 'skipped_cycles'
    },
    symptomsMatchedCount: 8,
    symptomsMatchedTitles: [
      '3 AM Sleep Fragmentation',
      'The "Lost Word" Mid-Sentence Blank',
      'Micro-Ignitions / Sudden Radiator Sensation',
      '3 PM Sudden Sensory Overload',
      'Morning "Tin-Man" Finger & Foot Stiffness',
      'Late-Luteal Rage Surge',
      'Heart Flutter in Bed',
      'Sensory Odor & Sound Sensitivity'
    ],
    symptomsAbsentCount: 6,
    mythsAnsweredCount: 3,
    stageSummary: 'Late Perimenopausal Transition (STRAW+10 Stage -1)',
    confidence: '89% High Alignment',
    dominantCategory: 'Sleep & Circadian + Neurocognitive',
    headline: 'Progesterone Deficit with Neuro-Receptor Fluctuations',
    userNote: 'Felt extremely exhausted after vacation; sleep was broken every night around 3:20 AM.',
    assessment: {
      headline: 'Clear Dual Axis: Circadian Clock Glitch & Neurosteroid Calibration',
      empatheticCopy: 'Sarah, your cluster reflects the classic mid-40s progesterone decline where calming GABA-A receptor stimulation decreases, while estrogen surges trigger micro-hypothalamic resets during the early morning.',
      probabilitySummary: {
        stage: 'Late Perimenopausal Transition (STRAW+10 Stage -1)',
        confidence: '89% Alignment',
        rationale: 'Marked cycle irregularity (>60 days skipped) combined with nocturnal awakenings, vasomotor thermoregulation bursts, and cognitive tip-of-tongue pauses.'
      },
      categoryGroupings: [
        {
          category: 'Sleep & Circadian',
          matchedSymptoms: ['3 AM Sleep Fragmentation', 'Heart Flutter in Bed'],
          clinicalExplanation: 'Progesterone metabolite allopregnanolone drops abruptly, removing nocturnal GABAergic braking right when cortisol surges.',
          severityLevel: 'pronounced',
          hormonalDriver: 'Low allopregnanolone & peak nocturnal cortisol'
        },
        {
          category: 'Neurocognitive & Mood',
          matchedSymptoms: ['The "Lost Word" Mid-Sentence Blank', 'Late-Luteal Rage Surge', '3 PM Sudden Sensory Overload'],
          clinicalExplanation: 'Estrogen fluctuations in hippocampal and prefrontal cortex receptors temporarily downregulate cerebral glucose metabolism.',
          severityLevel: 'moderate',
          hormonalDriver: 'Transient cerebral glucose hypo-metabolism'
        },
        {
          category: 'Vasomotor & Thermal',
          matchedSymptoms: ['Micro-Ignitions / Sudden Radiator Sensation'],
          clinicalExplanation: 'KNDy neuron hyperactivity in the hypothalamus narrows the thermoneutral zone.',
          severityLevel: 'moderate',
          hormonalDriver: 'Hypothalamic KNDy neuron pulse activation'
        }
      ],
      lifestyleRecommendations: [
        {
          title: '3 AM Sleep Rescue Protocol',
          timeframe: 'Tonight (1 hour before bed)',
          action: '400mg Magnesium Bisglycinate + 3g L-Glycine + dark bedroom cooler than 19°C.',
          scientificWhy: 'Glycine lowers core body temperature by promoting peripheral vasodilation, preventing the 3 AM thermostat alarm.',
          icon: 'Moon'
        },
        {
          title: 'Morning Protein & Neuro-Anchor',
          timeframe: 'Daily within 45 min of waking',
          action: 'Consume 30-35g complete protein with natural choline (eggs or soy).',
          scientificWhy: 'Provides dopamine and acetylcholine precursors needed for cognitive word-finding and stable glucose.',
          icon: 'Brain'
        },
        {
          title: 'Parasympathetic Vagus Brake',
          timeframe: 'When sensory overload hits',
          action: 'Double inhale through the nose followed by prolonged audible sigh through the mouth (Physiological Sigh x 3).',
          scientificWhy: 'Directly triggers the sinoatrial node brake, calming heart flutters and adrenaline surges.',
          icon: 'Flame'
        }
      ],
      doctorDiscussionPoints: [
        'Could bioidentical micronized progesterone (100-200mg capsules) taken cyclically or continuously restore my sleep continuity?',
        'Are my morning joint stiffness and heart flutters correlated with perimenopausal estrogen drops or should we run thyroid/iron panels?',
        'Would transdermal bioidentical estradiol gel or patch be appropriate given my cycle gaps of >60 days?'
      ],
      hormonalDotConnection: 'The common thread tying your 3 AM waking, brain fog, and sudden internal heat is not burnout or aging—it is the simultaneous down-regulation of GABA calmers and narrowing of your hypothalamic thermostat.'
    }
  },
  {
    id: 'history-session-july',
    date: '12. Juli 2026',
    timestamp: 1783857600000,
    userSnapshot: {
      name: 'Sarah Müller',
      age: 46,
      cycleStatus: 'irregular_early'
    },
    symptomsMatchedCount: 5,
    symptomsMatchedTitles: [
      '3 AM Sleep Fragmentation',
      'Morning "Tin-Man" Finger & Foot Stiffness',
      'The "Lost Word" Mid-Sentence Blank',
      'Sensory Odor & Sound Sensitivity',
      'Sudden Crying Spells at Commercials'
    ],
    symptomsAbsentCount: 9,
    mythsAnsweredCount: 2,
    stageSummary: 'Early Perimenopausal Transition (STRAW+10 Stage -2)',
    confidence: '78% Moderate-High',
    dominantCategory: 'Neurocognitive & Musculoskeletal',
    headline: 'Emerging Luteal Progesterone Shortfall',
    userNote: 'Baseline recording. First time I realized my stiff fingers in the morning could be connected to hormones.',
    assessment: {
      headline: 'Early Endocrine Warning Signals: Progesterone Deficiency Phase',
      empatheticCopy: 'Sarah, your initial 5 matched symptoms point toward an early phase where cycle lengths are only just beginning to vary, but estrogen withdrawal during the late cycle causes mild connective tissue inflammation and sleep fragility.',
      probabilitySummary: {
        stage: 'Early Perimenopausal Transition (STRAW+10 Stage -2)',
        confidence: '78% Alignment',
        rationale: 'Mild cycle shift combined with morning connective tissue stiffness and emotional responsiveness.'
      },
      categoryGroupings: [
        {
          category: 'Musculoskeletal & Body',
          matchedSymptoms: ['Morning "Tin-Man" Finger & Foot Stiffness'],
          clinicalExplanation: 'Estrogen acts as a natural joint chondroprotective agent; early drops lower synovial hydration.',
          severityLevel: 'mild',
          hormonalDriver: 'Synovial estrogen receptor down-regulation'
        },
        {
          category: 'Neurocognitive & Mood',
          matchedSymptoms: ['The "Lost Word" Mid-Sentence Blank', 'Sudden Crying Spells at Commercials'],
          clinicalExplanation: 'Serotonergic sensitivity to estrogen drops in the limbic system.',
          severityLevel: 'moderate',
          hormonalDriver: 'Limbic estrogen fluctuations'
        }
      ],
      lifestyleRecommendations: [
        {
          title: 'Anti-Inflammatory Joint Support',
          timeframe: 'Morning routine',
          action: 'Gentle mobility drills and 2000mg Omega-3 (EPA/DHA) with breakfast.',
          scientificWhy: 'Omega-3 fatty acids attenuate inflammatory cytokine production in synovial membranes.',
          icon: 'Activity'
        },
        {
          title: 'Sleep Hygiene Calibration',
          timeframe: 'Evening',
          action: 'Dim lights 90 min before bed, magnesium glycinate.',
          scientificWhy: 'Boosts GABA receptor activation without grogginess.',
          icon: 'Moon'
        },
        {
          title: 'Emotional Self-Compassion Anchor',
          timeframe: 'Late Luteal Days',
          action: 'Calendar awareness of the 5 days before your period.',
          scientificWhy: 'Cognitive reframing prevents blaming yourself for biologically mediated emotional swings.',
          icon: 'Heart'
        }
      ],
      doctorDiscussionPoints: [
        'Is my morning hand stiffness indicative of perimenopausal arthralgia or early osteoarthritis?',
        'Should we check baseline ferritin, Vitamin D3, and TSH levels?'
      ],
      hormonalDotConnection: 'Your joint stiffness and emotional sensitivity share a root cause: fluctuating estrogen levels directly influencing cellular hydration and neurotransmitter re-uptake.'
    }
  }
];
