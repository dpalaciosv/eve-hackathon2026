import { SwipeCard, ValidationBadge, LifestyleToolkit } from '../types';

export const INITIAL_CARDS: SwipeCard[] = [
  {
    id: 'sym-1',
    type: 'symptom',
    category: 'Sleep & Circadian',
    title: 'The 3:17 AM Awakening',
    prompt: 'Woke up at 3:17 AM wide awake, staring at the ceiling for zero identifiable reason.',
    subtext: 'Your mind isn’t necessarily stressed about anything specific, but your body decided sleep time is completely over.',
    clinicalCorrelation: 'Progesterone has a strong calming effect via GABA-A brain receptors. When progesterone drops precipitously in the second half of cycle, nocturnal awakenings peak between 2 and 4 AM.',
    icon: 'Moon',
    accentColor: '#6366F1'
  },
  {
    id: 'sym-2',
    type: 'symptom',
    category: 'Neurocognitive & Mood',
    title: 'The Mid-Sentence Blank',
    prompt: 'Walking into a room or pausing mid-sentence because a common everyday word vanished from your brain.',
    subtext: 'You know what you want to say, but the vocabulary shelf just went temporarily offline.',
    clinicalCorrelation: 'Estrogen acts as a key neuro-protective agent promoting glucose metabolism in the hippocampus and prefrontal cortex. Fluctuation temporarily slows verbal memory retrieval.',
    icon: 'Brain',
    accentColor: '#8B5CF6'
  },
  {
    id: 'myth-1',
    type: 'myth_buster',
    statement: 'MYTH OR FACT: A single routine blood test (like FSH) can confirm or rule out whether you are in perimenopause.',
    isFact: false,
    badgeText: 'Diagnostic Reality',
    explanation: 'MYTH! In perimenopause, hormones fluctuate erratically from day to day and even hour to hour. A "normal" blood test at 9:00 AM does not rule out perimenopause.',
    clinicalReality: 'Leading medical societies (NAMS, NICE, IMS) explicitly advise against routine hormonal blood testing for women over 45 because symptoms and clinical history are the gold standard.',
    sources: ['NICE Guidelines NG23', 'North American Menopause Society (NAMS)']
  },
  {
    id: 'sym-3',
    type: 'symptom',
    category: 'Vasomotor & Thermal',
    title: 'The Sudden Internal Furnace',
    prompt: 'Felt like someone secretly turned a radiator inside your chest to 100°C for 90 seconds.',
    subtext: 'Not just being warm — an internal tidal wave of heat that rises up your neck and makes you want to tear your clothes off.',
    clinicalCorrelation: 'Estrogen fluctuations narrow the "thermoneutral zone" in the hypothalamus. The body triggers emergency vasodilation for microscopic temperature changes.',
    icon: 'Flame',
    accentColor: '#EF4444'
  },
  {
    id: 'sym-4',
    type: 'symptom',
    category: 'Neurocognitive & Mood',
    title: 'Zero-To-Sixty Rage Spikes',
    prompt: 'Sudden surge of unprovoked irritation because someone breathed or chewed near you.',
    subtext: 'A lightning bolt of rage that feels totally disproportionate, followed 10 minutes later by guilt and confusion.',
    clinicalCorrelation: 'Estrogen directly modulates serotonin synthesis and dopamine receptors in the amygdala. Rapid drops lower frustration thresholds before conscious regulation kicks in.',
    icon: 'Zap',
    accentColor: '#F59E0B'
  },
  {
    id: 'myth-2',
    type: 'myth_buster',
    statement: 'MYTH OR FACT: Perimenopause only starts when your periods become irregular or stop completely.',
    isFact: false,
    badgeText: 'Onset Timeline',
    explanation: 'MYTH! Perimenopause often starts 4 to 8 years before cycles become irregular. Sleep changes, mood fluctuations, and anxiety spikes often appear while periods are still like clockwork.',
    clinicalReality: 'In early perimenopause, cycle lengths may even temporarily shorten (e.g. from 28 down to 23 days) due to accelerated follicular phases before they start skipping.',
    sources: ['Endocrine Society Clinical Guidelines', 'The Lancet Women’s Health']
  },
  {
    id: 'sym-5',
    type: 'symptom',
    category: 'Musculoskeletal & Body',
    title: 'Morning Tin Man Stiffness',
    prompt: 'Getting out of bed feeling stiff, like you ran an ultramarathon overnight when all you did was sleep.',
    subtext: 'Fingers, lower back, or Achilles tendons take 20 minutes of gentle hobbling just to lubricate and move smoothly.',
    clinicalCorrelation: 'Estrogen has potent anti-inflammatory properties and maintains collagen hydration in joint cartilage and synovial fluid. Estrogen dips manifest as "menopausal arthralgia".',
    icon: 'Activity',
    accentColor: '#10B981'
  },
  {
    id: 'sym-6',
    type: 'symptom',
    category: 'Sleep & Circadian',
    title: 'The 4:00 AM Heart Flutter',
    prompt: 'Lying in bed and noticing your heart lightly thumping or racing like a hummingbird for 2 minutes.',
    subtext: 'You aren’t having a panic attack, but your cardiovascular system decided to sound a miniature alarm in the dark.',
    clinicalCorrelation: 'Nocturnal cortisol micro-surges coupled with autonomic nervous system instability cause benign palpitations when nighttime estrogen and progesterone dip.',
    icon: 'HeartPulse',
    accentColor: '#EC4899'
  },
  {
    id: 'myth-3',
    type: 'myth_buster',
    statement: 'MYTH OR FACT: Progesterone drops up to 75% faster than estrogen in the early stages of perimenopause.',
    isFact: true,
    badgeText: 'Hormonal Dynamics',
    explanation: 'FACT! Anovulatory cycles (cycles where no egg is released) mean the corpus luteum does not form, leading to near-zero progesterone production while estrogen surges wildly.',
    clinicalReality: 'This "unopposed estrogen" state is why women often experience sore breasts, fluid retention, heavy periods, and acute insomnia in their early 40s.',
    sources: ['Jerilynn Prior, Centre for Menstrual Cycle and Ovulation Research']
  },
  {
    id: 'sym-7',
    type: 'symptom',
    category: 'Metabolic & Hormonal',
    title: 'The Coffee Sensitivity Shift',
    prompt: 'Your beloved morning espresso suddenly triggers jitters, stomach acid, or wired anxiety out of nowhere.',
    subtext: 'You’ve drank coffee for 15 years with zero problems, but suddenly your liver and nervous system treat it with hostility.',
    clinicalCorrelation: 'Estrogen enzymes (CYP1A2) in the liver process caffeine. Hormonal fluctuations change caffeine clearance half-life, making stimulants linger up to 4x longer.',
    icon: 'Coffee',
    accentColor: '#D97706'
  },
  {
    id: 'sym-8',
    type: 'symptom',
    category: 'Neurocognitive & Mood',
    title: 'The Free-Floating Imposter Anxiety',
    prompt: 'Waking up with a pit in your stomach or sudden dread about tasks you normally do with your eyes closed.',
    subtext: 'A nagging sensation that "you can’t handle things anymore", even though nothing in your external workload changed.',
    clinicalCorrelation: 'Progesterone metabolite allopregnanolone is the body’s natural Valium. Its steep withdrawal reduces GABA receptor sensitivity, generating unexplained panic or dread.',
    icon: 'ShieldAlert',
    accentColor: '#6366F1'
  },
  {
    id: 'sym-9',
    type: 'symptom',
    category: 'Metabolic & Hormonal',
    title: 'The Mystery Midsection Shift',
    prompt: 'Favorite jeans feel uncomfortably tight around the waistband, even though your diet and exercise didn’t budge.',
    subtext: 'It feels like your body composition is quietly relocating fat to your abdomen overnight without your permission.',
    clinicalCorrelation: 'Declining estrogen shifts the balance toward androgen dominance, redirecting subcutaneous fat storage toward visceral abdominal receptors and altering insulin sensitivity.',
    icon: 'Sparkles',
    accentColor: '#14B8A6'
  },
  {
    id: 'sym-10',
    type: 'symptom',
    category: 'Musculoskeletal & Body',
    title: 'The Phantom Electric Tingles',
    prompt: 'Strange sensations on your skin — itching, tingling, or feeling like tiny insects are walking on your arms ("formication").',
    subtext: 'You look down, scratch your arm, and there is nothing there — just nerve hypersensitivity.',
    clinicalCorrelation: 'Collagen thinning and neurovascular skin receptor instability during estrogen decline produce paresthesias and pruritus in up to 20% of women.',
    icon: 'Feather',
    accentColor: '#A855F7'
  },
  {
    id: 'myth-4',
    type: 'myth_buster',
    statement: 'MYTH OR FACT: Lifestyle interventions cannot alter the neurobiology of perimenopausal hot flashes or sleep disruptions.',
    isFact: false,
    badgeText: 'Evidence-Based Action',
    explanation: 'MYTH! Clinical trials show that targeted lifestyle protocols (strength training, non-sleep deep rest, temperature regulation, and protein pacing) significantly reduce symptom severity.',
    clinicalReality: 'Resistance training improves autonomic tone and downregulates visceral inflammation, while magnesium glycinate and glycine improve deep slow-wave sleep architecture.',
    sources: ['European Menopause and Andropause Society (EMAS)', 'JAMA Internal Medicine']
  },
  {
    id: 'sym-11',
    type: 'symptom',
    category: 'Vasomotor & Thermal',
    title: 'The 4 AM Cold Shiver Drench',
    prompt: 'Waking up drenched in sweat, followed immediately by violently shivering under three blankets.',
    subtext: 'Tossing off the duvet in a burning panic, then 60 seconds later shivering because your damp shirt feels like ice.',
    clinicalCorrelation: 'The hypothalamic cooling rebound overcompensates after a hot flash vasodilation, dropping core body temperature and triggering rapid shivering.',
    icon: 'Wind',
    accentColor: '#3B82F6'
  },
  {
    id: 'sym-12',
    type: 'symptom',
    category: 'Metabolic & Hormonal',
    title: 'Cycle Roulette',
    prompt: 'Periods playing hide-and-seek: 23 days one cycle, 41 days the next, then a random surprise spotting episode.',
    subtext: 'You have zero idea when to pack menstrual products, and tracking apps keep getting confused.',
    clinicalCorrelation: 'Follicular depletion leads to inconsistent follicular maturation, alternating between high estrogen cycles and delayed anovulatory intervals.',
    icon: 'Calendar',
    accentColor: '#EC4899'
  }
];

export const INITIAL_BADGES: ValidationBadge[] = [
  {
    id: 'badge-1',
    title: 'Self-Advocate Novice',
    subtitle: 'First 5 Swipes Completed',
    description: 'You took the first courageous step to catalog your real bodily signals without brushing them off.',
    icon: 'Sparkles',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 5
  },
  {
    id: 'badge-2',
    title: 'The Dot Connector',
    subtitle: '10 Symptoms Matched',
    description: 'You reached the critical threshold! The constellation between your brain, hormones, and nervous system is revealed.',
    icon: 'GitCommit',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 10
  },
  {
    id: 'badge-3',
    title: 'Myth Slayer',
    subtitle: 'Cracked 3 Medical Myths',
    description: 'You demolished outdated medical myths with peer-reviewed endocrinological facts.',
    icon: 'ShieldCheck',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 3
  },
  {
    id: 'badge-4',
    title: 'Full Spectrum Explorer',
    subtitle: 'Explored All 5 Symptom Domains',
    description: 'You checked across sleep, cognition, vasomotor, musculoskeletal, and metabolism.',
    icon: 'Compass',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 5
  },
  {
    id: 'badge-5',
    title: 'Empowered Patient',
    subtitle: 'Doctor Brief Generated',
    description: 'Equipped with evidence-based data and high-yield questions for your next clinical consultation.',
    icon: 'Stethoscope',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 1
  }
];

export const INITIAL_TOOLKITS: LifestyleToolkit[] = [
  {
    id: 'toolkit-sleep',
    title: '3 AM Sleep Rescue Protocol',
    badge: 'Sleep & Circadian',
    icon: 'Moon',
    targetCategory: 'Sleep & Circadian',
    unlockThreshold: 3,
    isUnlocked: false,
    tagline: 'How to bypass 3 AM GABA receptor drops and soothe nighttime cortisol micro-surges.',
    protocolSteps: [
      {
        timing: '1 Hour Before Bed',
        action: '400mg Magnesium Glycinate + 3g Glycine',
        scientificReason: 'Magnesium acts as an NMDA receptor antagonist and GABA agonist; glycine lowers core body temperature to facilitate deeper stage 3 slow-wave sleep.'
      },
      {
        timing: 'Bedtime',
        action: 'Cool Room to 18°C (65°F) & Breathable Linen',
        scientificReason: 'Hypothalamic sensitivity increases at night. A cool ambient environment prevents premature vasomotor trigger thresholds.'
      },
      {
        timing: 'If Awake at 3 AM',
        action: '10-Minute Non-Sleep Deep Rest (NSDR) / Yoga Nidra',
        scientificReason: 'Do NOT check the clock or look at blue light. Lying still with prolonged exhales activates the parasympathetic vagal brake.'
      }
    ],
    quickChecklist: [
      'Stop caffeine by 11:00 AM',
      'Dim overhead lights 90 mins before bed',
      'Keep an ice roller or cooling mist on nightstand'
    ],
    keySupplementOrFood: 'Magnesium Glycinate + Chamomile / Apigenin tea'
  },
  {
    id: 'toolkit-vasomotor',
    title: 'Thermoregulation & Hot Flash First-Aid',
    badge: 'Thermal Comfort',
    icon: 'Flame',
    targetCategory: 'Vasomotor & Thermal',
    unlockThreshold: 5,
    isUnlocked: false,
    tagline: 'Resetting the hypothalamic thermostat when estrogen drops trigger false heat alarms.',
    protocolSteps: [
      {
        timing: 'At First Sign of Heat Surge',
        action: '4-7-8 Parasympathetic Reset Breathing',
        scientificReason: 'Inhale through nose for 4s, hold for 7s, exhale through mouth for 8s. Interrupts the sympathetic adrenaline cascade that amplifies hot flushes.'
      },
      {
        timing: 'Throughout the Day',
        action: 'Layered Natural Fibers (Merino, Bamboo, Cotton)',
        scientificReason: 'Allows rapid thermal shedding without the rebound shivering caused by trapped synthetic moisture.'
      },
      {
        timing: 'Dinner & Evening',
        action: 'Cap Wine and High-Histamine Foods',
        scientificReason: 'Alcohol and aged cheeses cause cutaneous vasodilation and spike nighttime body temperature.'
      }
    ],
    quickChecklist: [
      'Carry portable rechargeable mini-fan',
      'Drink cold electrolyte water upon waking',
      'Track hot flash triggers in correlation with sugar/wine'
    ],
    keySupplementOrFood: 'Electrolyte minerals (Sodium, Potassium, Magnesium)'
  },
  {
    id: 'toolkit-metabolism',
    title: 'Metabolic & Satiety Pacing Blueprint',
    badge: 'Metabolism',
    icon: 'Sparkles',
    targetCategory: 'Metabolic & Hormonal',
    unlockThreshold: 7,
    isUnlocked: false,
    tagline: 'Stabilizing blood sugar and preserving lean muscle mass against estrogen-induced insulin resistance.',
    protocolSteps: [
      {
        timing: 'Within 60 Mins of Waking',
        action: '30g High-Quality Protein Breakfast',
        scientificReason: 'Prevents cortisol-driven morning glucose spikes, protects muscle protein synthesis, and stimulates satiety hormone GLP-1.'
      },
      {
        timing: '3x Weekly',
        action: 'Progressive Strength & Resistance Training',
        scientificReason: 'Replaces passive cardio with muscle building to reverse the age-related drop in resting metabolic rate and improve insulin sensitivity.'
      },
      {
        timing: 'After Meals',
        action: '10-Minute Brisk Walk',
        scientificReason: 'Uses GLUT4 non-insulin glucose transporters to clear post-meal blood sugar surges into muscle cells.'
      }
    ],
    quickChecklist: [
      'Aim for 1.2g - 1.6g protein per kg body weight daily',
      'Swap chronic high-intensity cardio for lifting heavy things',
      'Prioritize soluble fiber (chia, flaxseed, oats) for estrogen clearance'
    ],
    keySupplementOrFood: 'Whey / Pea Protein + Ground Flaxseeds (lignans for phytoestrogen balance)'
  },
  {
    id: 'toolkit-brain',
    title: 'Brain Fog & Nervous System Anchor',
    badge: 'Cognitive Health',
    icon: 'Brain',
    targetCategory: 'Neurocognitive & Mood',
    unlockThreshold: 9,
    isUnlocked: false,
    tagline: 'Rewiring focus, lowering unprovoked cortisol surges, and quieting the anxious amygdala.',
    protocolSteps: [
      {
        timing: 'Morning Work Block',
        action: 'Singletasking & External Brain Dump',
        scientificReason: 'Working memory capacity temporarily contracts under fluctuating estrogen. Writing checklists eliminates cognitive friction.'
      },
      {
        timing: 'Midday Slump (2 PM)',
        action: '5-Minute Cold Water Face Splash + Sunlight Break',
        scientificReason: 'Stimulates the mammalian dive reflex via trigeminal nerve, restoring alertness without caffeine.'
      },
      {
        timing: 'During Sudden Rage Spikes',
        action: 'Physiological Sigh (Two Inhales, Long Exhale)',
        scientificReason: 'Re-inflates collapsed pulmonary alveoli and immediately slows heart rate via vagal stimulation.'
      }
    ],
    quickChecklist: [
      'Use voice memos to capture fleeting ideas immediately',
      'Normalize verbal pauses: "Hold on, downloading that word"',
      'Omega-3 fatty acids (EPA/DHA 1000mg) for neuro-inflammation'
    ],
    keySupplementOrFood: 'Omega-3 EPA/DHA + Lion’s Mane or Phosphatidylserine'
  }
];
