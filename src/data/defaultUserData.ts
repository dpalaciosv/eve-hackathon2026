import { UserProfile, DotConnectionHistoryItem } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-sarah-1',
  name: 'Sarah Müller',
  email: 'sarah.mueller@beispiel.de',
  age: 46,
  ageGroup: '45-49',
  cycleStatus: 'skipped_cycles',
  hrtStatus: 'curious_exploring',
  primaryGoals: [
    '3-Uhr-Nachts-Schlafqualität wiederherstellen',
    'Brain Fog & Wortfindungsstörungen verstehen',
    'Evidenzbasierte Vorbereitung für das Arztgespräch'
  ],
  medicalNotes: 'Bislang keine Hormontherapie. Schilddrüsenwerte vor 8 Monaten unauffällig.',
  avatarBg: 'from-[#8B5CF6] to-[#EC4899]',
  createdAt: '2026-06-15',
  lastActive: '2026-09-12'
};

export const DEMO_PROFILES: UserProfile[] = [
  DEFAULT_USER_PROFILE,
  {
    id: 'user-elena-2',
    name: 'Elena Becker',
    email: 'elena.b@beispiel.de',
    age: 41,
    ageGroup: '40-44',
    cycleStatus: 'irregular_early',
    hrtStatus: 'none',
    primaryGoals: [
      'Stimmungstiefs in der zweiten Zyklushälfte einordnen',
      'Unerklärliche Unruhe vor der Periode lindern',
      'Frühe Zyklusschwankungen dokumentieren'
    ],
    medicalNotes: 'Mirena-Spirale vor 1 Jahr entfernt. Zyklen schwanken seither zwischen 23 und 32 Tagen.',
    avatarBg: 'from-[#3B82F6] to-[#8B5CF6]',
    createdAt: '2026-07-01',
    lastActive: '2026-09-10'
  },
  {
    id: 'user-claudia-3',
    name: 'Claudia Weber',
    email: 'claudia.w@beispiel.de',
    age: 51,
    ageGroup: '50-54',
    cycleStatus: 'amenorrhea_recent',
    hrtStatus: 'transdermal_bioidentical',
    primaryGoals: [
      'Wirkung des bioidentischen Östrogengels überprüfen',
      'Morgendliche Gelenksteifigkeit lindern',
      'Prävention für Knochendichte und Herz-Kreislauf aufbauen'
    ],
    medicalNotes: 'Vor 3 Monaten mit transdermalem Östradiol-Gel (50 µg) + mikronisiertem Progesteron (200 mg zyklisch) begonnen.',
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
      'Um 3:17 Uhr hellwach',
      'Das verschwundene Wort mitten im Satz',
      'Der plötzliche innere Heizkörper',
      'Explosive Reizbarkeit aus dem Nichts',
      'Morgendliche Steifigkeit („Blechmann-Gefühl“)',
      'Das 4-Uhr-Herzklopfen im Bett',
      'Plötzliche Kaffee-Unverträglichkeit',
      'Elektrisches Kribbeln auf der Haut'
    ],
    symptomsAbsentCount: 6,
    mythsAnsweredCount: 3,
    stageSummary: 'Mittlere Perimenopause (STRAW+10 Stadium -1)',
    confidence: '89 % Hohe Übereinstimmung',
    dominantCategory: 'Schlaf & Biorhythmus + Kognition & Stimmung',
    headline: 'Progesterondefizit mit neuroendokrinen Rezeptorschwankungen',
    userNote: 'Nach dem Urlaub extrem erschöpft gefühlt; jede Nacht gegen 3:20 Uhr wach geworden.',
    assessment: {
      headline: 'Klare Doppelachse: Zirkadiane Schlafstörung & neuronale Hormonumstellung',
      empatheticCopy: 'Liebe Sarah, dein Symptommuster spiegelt das klassische Bild der mittleren Vierziger wider: Wenn Progesteron abfällt, fehlt die beruhigende Wirkung auf die GABA-Rezeptoren im Gehirn, während unberechenbare Östrogenspitzen das Temperatur- und Schlafzentrum im Hypothalamus vorzeitig alarmieren. Du bildest dir das nicht ein – es ist eine biologische Umstellung.',
      probabilitySummary: {
        stage: 'Mittlere Perimenopause (STRAW+10 Stadium -1)',
        confidence: '89 % Übereinstimmung',
        rationale: 'Deutliche Zyklusschwankungen (über 60 Tage übersprungen) in Kombination mit nächtlichen Wachphasen, vasomotorischen Hitzeschüben und Wortfindungsstörungen.'
      },
      categoryGroupings: [
        {
          category: 'Schlaf & Biorhythmus',
          matchedSymptoms: ['Um 3:17 Uhr hellwach', 'Das 4-Uhr-Herzklopfen im Bett'],
          clinicalExplanation: 'Der Progesteron-Metabolit Allopregnanolon sinkt nachts ab. Dadurch entfällt die natürliche neuronale Bremse genau in dem Moment, in dem die morgendliche Cortisol-Ausschüttung beginnt.',
          severityLevel: 'pronounced',
          hormonalDriver: 'Niedriges Allopregnanolon & nächtliche Cortisolspitzen'
        },
        {
          category: 'Kognition & Stimmung',
          matchedSymptoms: ['Das verschwundene Wort mitten im Satz', 'Explosive Reizbarkeit aus dem Nichts'],
          clinicalExplanation: 'Östrogenschwankungen im Hippocampus und präfrontalen Kortex drosseln vorübergehend den zerebralen Glukosestoffwechsel und verringern die Stresstoleranz der Amygdala.',
          severityLevel: 'moderate',
          hormonalDriver: 'Vorübergehende zerebrale Glukoseunterversorgung & Serotoninschwankungen'
        },
        {
          category: 'Vasomotorik & Temperatur',
          matchedSymptoms: ['Der plötzliche innere Heizkörper'],
          clinicalExplanation: 'Die Überaktivität der KNDy-Neuronen im Hypothalamus verengt die Temperatur-Komfortzone und löst plötzliche Gefäßerweiterungen aus.',
          severityLevel: 'moderate',
          hormonalDriver: 'Hypothalamische Fehlsteuerung des Temperaturzentrums'
        }
      ],
      lifestyleRecommendations: [
        {
          title: '3-Uhr-Nachts-Schlafrettung',
          timeframe: 'Heute Abend (60 Min vor dem Schlafen)',
          action: '400 mg Magnesiumglycinat + 3 g L-Glycin bei kühler Raumtemperatur (unter 19 °C).',
          scientificWhy: 'Glycin senkt die Körperkerntemperatur und verhindert zusammen mit Magnesium das vorzeitige Aufwachen im zweiten Schlafzyklus.',
          icon: 'Moon'
        },
        {
          title: 'Protein- & Nervenanker am Morgen',
          timeframe: 'Täglich innerhalb von 45 Min nach dem Aufstehen',
          action: '30–35 g vollwertiges Protein mit natürlichem Cholin (z. B. Eier oder Soja).',
          scientificWhy: 'Liefert Vorstufen für Acetylcholin und Dopamin, stabilisiert den Blutzucker und verhindert Vormittagstiefs.',
          icon: 'Brain'
        },
        {
          title: 'Vagusnerv-Bremse bei Stress',
          timeframe: 'Bei aufkommender Reizbarkeit',
          action: 'Doppeltes Einatmen durch die Nase, gefolgt von langem hörbarem Ausatmen (Physiologischer Seufzer x 3).',
          scientificWhy: 'Aktiviert unmittelbar den Parasympathikus und senkt die Herzfrequenz bei vegetativer Übererregung.',
          icon: 'Flame'
        }
      ],
      doctorDiscussionPoints: [
        'Könnte mikronisiertes bioidentisches Progesteron (100–200 mg zur Nacht) die Schlafarchitektur wieder stabilisieren?',
        'Hängen die morgendliche Gelenksteifigkeit und das Herzklopfen mit Östrogenabfällen zusammen oder sollten Schilddrüse und Ferritin zusätzlich kontrolliert werden?',
        'Wäre angesichts der Zykluspausen von über 60 Tagen eine transdermale Hormonersatztherapie (Gel/Pflaster) sinnvoll?'
      ],
      hormonalDotConnection: 'Der gemeinsame Nenner deiner Schlafstörungen, Wortfindungsstörungen und inneren Hitze ist kein Burnout – es ist das zeitgleiche Absinken der beruhigenden GABA-Wirkung und die Verengung deines Temperaturreglers im Hypothalamus.'
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
      'Um 3:17 Uhr hellwach',
      'Morgendliche Steifigkeit („Blechmann-Gefühl“)',
      'Das verschwundene Wort mitten im Satz',
      'Elektrisches Kribbeln auf der Haut',
      'Unerklärliche diffuse Zukunftsangst'
    ],
    symptomsAbsentCount: 9,
    mythsAnsweredCount: 2,
    stageSummary: 'Frühe Perimenopause (STRAW+10 Stadium -2)',
    confidence: '78 % Moderate bis hohe Übereinstimmung',
    dominantCategory: 'Kognition & Stimmung + Muskeln & Gelenke',
    headline: 'Beginnender Progesteronmangel in der Gelbkörperphase',
    userNote: 'Basis-Erfassung. Zum ersten Mal verstanden, dass die steifen Finger morgens mit den Hormonen zusammenhängen könnten.',
    assessment: {
      headline: 'Frühe endokrine Warnsignale: Progesteron-Defizitphase',
      empatheticCopy: 'Liebe Sarah, deine 5 bestätigten Symptome deuten auf eine frühe Phase hin, in der die Zykluslänge erst leicht schwankt, aber der Hormonabfall vor der Periode bereits zu leichten Bindegewebsreizungen und Schlafunterbrechungen führt.',
      probabilitySummary: {
        stage: 'Frühe Perimenopause (STRAW+10 Stadium -2)',
        confidence: '78 % Übereinstimmung',
        rationale: 'Leichte Zyklusveränderung kombiniert mit morgendlicher Gelenksteifigkeit und emotionaler Dünnhäutigkeit.'
      },
      categoryGroupings: [
        {
          category: 'Muskeln & Gelenke',
          matchedSymptoms: ['Morgendliche Steifigkeit („Blechmann-Gefühl“)'],
          clinicalExplanation: 'Östrogen schützt den Knorpel und hält das Bindegewebe geschmeidig; frühe Hormonabfälle mindern die Flüssigkeitsbindung in den Gelenken.',
          severityLevel: 'mild',
          hormonalDriver: 'Herabregulierung der synovialen Östrogenrezeptoren'
        },
        {
          category: 'Kognition & Stimmung',
          matchedSymptoms: ['Das verschwundene Wort mitten im Satz', 'Unerklärliche diffuse Zukunftsangst'],
          clinicalExplanation: 'Erhöhte serotonerge Empfindlichkeit im limbischen System bei absinkenden Hormonspiegeln.',
          severityLevel: 'moderate',
          hormonalDriver: 'Limbische Rezeptorschwankungen'
        }
      ],
      lifestyleRecommendations: [
        {
          title: 'Entzündungshemmende Gelenkunterstützung',
          timeframe: 'Morgenroutine',
          action: 'Sanfte Dehnübungen und 2000 mg Omega-3 (EPA/DHA) zum Frühstück.',
          scientificWhy: 'Omega-3-Fettsäuren dämpfen entzündliche Zytokine im Gelenkbereich und fördern die Beweglichkeit.',
          icon: 'Activity'
        },
        {
          title: 'Schlafhygiene & Magnesium',
          timeframe: 'Abend',
          action: 'Licht 90 Min vor dem Schlafen dimmen, Magnesiumglycinat einnehmen.',
          scientificWhy: 'Fördert die GABA-Aktivität im Gehirn ohne Benommenheit am nächsten Tag.',
          icon: 'Moon'
        },
        {
          title: 'Achtsamkeitsanker für den Zyklus',
          timeframe: 'Tage vor der Periode',
          action: 'Die 5 Tage vor der Menstruation im Kalender markieren und Termindichte reduzieren.',
          scientificWhy: 'Kognitive Entlastung verhindert, sich für biologisch bedingte Stimmungsschwankungen selbst zu verurteilen.',
          icon: 'Heart'
        }
      ],
      doctorDiscussionPoints: [
        'Ist die morgendliche Fingersteifigkeit typisch für eine menopausale Arthralgie oder sollte ein Rheuma-Ausschluss erfolgen?',
        'Sollten Basiswerte für Ferritin, Vitamin D3 und TSH bestimmt werden?'
      ],
      hormonalDotConnection: 'Deine Gelenksteifigkeit und deine emotionale Dünnhäutigkeit haben eine gemeinsame biologische Ursache: Fluktuierendes Östrogen beeinflusst unmittelbar die Zellhydratation und die Neurotransmitterbalance.'
    }
  }
];
