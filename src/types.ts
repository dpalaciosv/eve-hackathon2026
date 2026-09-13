export type SymptomCategory = 
  | 'Sleep & Circadian'
  | 'Neurocognitive & Mood'
  | 'Vasomotor & Thermal'
  | 'Musculoskeletal & Body'
  | 'Metabolic & Hormonal';

export interface SymptomCard {
  id: string;
  type: 'symptom';
  category: SymptomCategory;
  title: string;
  prompt: string; // Relatable, low-cognitive-load card hook (e.g. "Woke up at 3:17 AM...")
  subtext: string; // Everyday situation
  clinicalCorrelation: string; // Underlying physiological dot connection
  icon: string;
  accentColor?: string;
}

export interface MythBusterCard {
  id: string;
  type: 'myth_buster';
  statement: string;
  isFact: boolean; // false = Myth, true = Fact
  badgeText: string;
  explanation: string;
  clinicalReality: string;
  sources: string[];
}

export type SwipeCard = SymptomCard | MythBusterCard;

export type SwipeDirection = 'left' | 'right' | 'up';

export interface SwipeLog {
  cardId: string;
  cardType: 'symptom' | 'myth_buster';
  action: 'present' | 'absent' | 'answered_correct' | 'answered_incorrect';
  timestamp: number;
  card: SwipeCard;
}

export interface ValidationBadge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progressCurrent: number;
  progressTarget: number;
}

export interface LifestyleToolkit {
  id: string;
  title: string;
  badge: string;
  icon: string;
  targetCategory: SymptomCategory;
  unlockThreshold: number; // Number of symptoms matched to unlock
  isUnlocked: boolean;
  tagline: string;
  protocolSteps: Array<{
    timing: string;
    action: string;
    scientificReason: string;
  }>;
  quickChecklist: string[];
  keySupplementOrFood: string;
}

export interface LifestyleRecommendation {
  title: string;
  timeframe: string;
  action: string;
  scientificWhy: string;
  icon: string;
}

export interface CategoryGrouping {
  category: string;
  matchedSymptoms: string[];
  clinicalExplanation: string;
  severityLevel: 'mild' | 'moderate' | 'pronounced';
  hormonalDriver: string;
}

export interface DotConnectionAssessment {
  headline: string;
  empatheticCopy: string;
  probabilitySummary: {
    stage: string;
    confidence: string;
    rationale: string;
  };
  categoryGroupings: CategoryGrouping[];
  lifestyleRecommendations: [LifestyleRecommendation, LifestyleRecommendation, LifestyleRecommendation] | LifestyleRecommendation[];
  doctorDiscussionPoints: string[];
  hormonalDotConnection: string;
  constellationPoints?: Array<{
    id: string;
    label: string;
    category: string;
    x: number;
    y: number;
  }>;
}

export interface UserContext {
  ageGroup: string;
  cycleStatus: string;
  notes?: string;
}

export type CycleRegularity = 
  | 'regular' // ~28 days
  | 'irregular_early' // changes by +/- 7 days
  | 'skipped_cycles' // skipped 2+ cycles (60+ days)
  | 'amenorrhea_recent' // no period for 6-11 months
  | 'amenorrhea_12m' // 12+ months (menopause)
  | 'surgical_hysterectomy';

export type HrtOption = 
  | 'none'
  | 'curious_exploring'
  | 'transdermal_bioidentical'
  | 'oral_hrt'
  | 'local_vaginal_only';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  ageGroup: string;
  cycleStatus: CycleRegularity;
  hrtStatus: HrtOption;
  primaryGoals: string[];
  medicalNotes: string;
  avatarBg: string;
  createdAt: string;
  lastActive: string;
}

export interface DotConnectionHistoryItem {
  id: string;
  date: string;
  timestamp: number;
  userSnapshot: {
    name: string;
    age: number;
    cycleStatus: CycleRegularity;
  };
  symptomsMatchedCount: number;
  symptomsMatchedTitles: string[];
  symptomsAbsentCount: number;
  mythsAnsweredCount: number;
  stageSummary: string;
  confidence: string;
  dominantCategory: string;
  headline: string;
  assessment: DotConnectionAssessment;
  userNote?: string;
  symptomsPresentCards?: SwipeCard[];
  symptomsAbsentCards?: SwipeCard[];
}

