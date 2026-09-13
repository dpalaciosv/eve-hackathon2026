import { SwipeCard, ValidationBadge, LifestyleToolkit } from '../types';

export const INITIAL_CARDS: SwipeCard[] = [
  {
    id: 'sym-1',
    type: 'symptom',
    category: 'Schlaf & Biorhythmus',
    title: 'Um 3:17 Uhr hellwach',
    prompt: 'Um 3:17 Uhr plötzlich mit klopfendem Herzen aufgewacht und stundenlang die Decke angestarrt.',
    subtext: 'Kein konkreter Grübelgrund – dein Körper hat einfach mitten in der Nacht beschlossen, dass die Schlafzeit unwiderruflich vorbei ist.',
    clinicalCorrelation: 'Progesteron wirkt über die GABA-A-Rezeptoren im Gehirn wie ein natürliches Beruhigungsmittel. Fällt es in der zweiten Zyklushälfte abrupt ab, kommt es gehäuft zwischen 2 und 4 Uhr morgens zu plötzlichen Aufwachreaktionen.',
    icon: 'Moon',
    accentColor: '#6366F1'
  },
  {
    id: 'sym-2',
    type: 'symptom',
    category: 'Kognition & Stimmung',
    title: 'Das verschwundene Wort mitten im Satz',
    prompt: 'Mitten im Gespräch gestoppt, weil ein alltägliches Wort wie vom Erdboden verschwunden war.',
    subtext: 'Du weißt genau, was du sagen willst, aber der mentale Zugriff ist für zehn Sekunden komplett blockiert.',
    clinicalCorrelation: 'Östrogen fördert die Glukoseaufnahme und Neuroplastizität im Hippocampus und präfrontalen Kortex. Hormonschwankungen verlangsamen vorübergehend den verbalen Wortabruf (Brain Fog).',
    icon: 'Brain',
    accentColor: '#8B5CF6'
  },
  {
    id: 'myth-1',
    type: 'myth_buster',
    statement: 'MYTHOS ODER FAKT: Ein einzelner Routine-Bluttest (wie FSH) kann zuverlässig bestätigen oder ausschließen, ob du in der Perimenopause bist.',
    isFact: false,
    badgeText: 'Diagnostik-Realität',
    explanation: 'MYTHOS! In der Perimenopause schwanken die Hormonspiegel von Tag zu Tag und sogar von Stunde zu Stunde. Ein scheinbar unauffälliger Blutwert am Morgen schließt eine Perimenopause keineswegs aus.',
    clinicalReality: 'Führende gynäkologische Leitlinien (NAMS, NICE, IMS, DGGG) raten bei Frauen ab 45 ausdrücklich von routinemäßigen Hormon-Bluttests ab: Die klinische Symptomatik und der Zyklusverlauf sind der Goldstandard.',
    sources: ['NICE Guidelines NG23', 'North American Menopause Society (NAMS)', 'DGGG']
  },
  {
    id: 'sym-3',
    type: 'symptom',
    category: 'Vasomotorik & Temperatur',
    title: 'Der plötzliche innere Heizkörper',
    prompt: 'Als hätte jemand heimlich in deiner Brust einen Radiator auf 100 °C für 90 Sekunden hochgedreht.',
    subtext: 'Nicht einfach ein warmes Gefühl, sondern eine plötzliche Hitzewelle, die den Hals hinaufsteigt und dich am liebsten die Kleidung vom Leib reißen ließe.',
    clinicalCorrelation: 'Östrogenschwankungen verengen die thermostatische Komfortzone im Hypothalamus. Der Körper leitet schon bei kleinsten Temperaturschwankungen eine Notfall-Gefäßerweiterung ein.',
    icon: 'Flame',
    accentColor: '#EF4444'
  },
  {
    id: 'sym-4',
    type: 'symptom',
    category: 'Kognition & Stimmung',
    title: 'Explosive Reizbarkeit aus dem Nichts',
    prompt: 'Ein plötzlicher Wutanfall, nur weil jemand neben dir geatmet, getippt oder gekaut hat.',
    subtext: 'Ein innerer Blitz aus Wut, der sich völlig unverhältnismäßig anfühlt – gefolgt von Schuldgefühlen und Ratlosigkeit zehn Minuten später.',
    clinicalCorrelation: 'Östrogen moduliert die Serotoninsynthese und die Dopaminrezeptoren in der Amygdala. Schnelle Abfälle senken die Reizschwelle, bevor die bewusste Selbstregulation greifen kann.',
    icon: 'Zap',
    accentColor: '#F59E0B'
  },
  {
    id: 'myth-2',
    type: 'myth_buster',
    statement: 'MYTHOS ODER FAKT: Die Perimenopause beginnt erst dann, wenn die Periode unregelmäßig wird oder ganz ausbleibt.',
    isFact: false,
    badgeText: 'Beginn & Zeitachse',
    explanation: 'MYTHOS! Die Perimenopause beginnt oft 4 bis 8 Jahre vor den ersten sichtbaren Zyklusunregelmäßigkeiten. Schlafstörungen, Stimmungsschwankungen und diffuse Ängste treten häufig bei pünktlichem Zyklus auf.',
    clinicalReality: 'In der frühen Perimenopause können sich Zyklen anfangs sogar verkürzen (z. B. von 28 auf 23 Tage), da die Follikelphase beschleunigt abläuft, bevor Zyklen übersprungen werden.',
    sources: ['Endocrine Society Guidelines', 'The Lancet Women’s Health']
  },
  {
    id: 'sym-5',
    type: 'symptom',
    category: 'Muskeln & Gelenke',
    title: 'Morgendliche Steifigkeit („Blechmann-Gefühl“)',
    prompt: 'Morgens aus dem Bett aufgestanden und sich gefühlt, als wäre man über Nacht einen Marathon gelaufen.',
    subtext: 'Finger, Fußgelenke oder die Lendenwirbelsäule brauchen 20 Minuten sanfte Bewegung, um überhaupt wieder geschmeidig zu funktionieren.',
    clinicalCorrelation: 'Östrogen wirkt entzündungshemmend und bindet Feuchtigkeit im Kollagen der Gelenkknorpel und der Gelenkflüssigkeit. Hormonabfälle äußern sich als typische menopausale Arthralgie.',
    icon: 'Activity',
    accentColor: '#10B981'
  },
  {
    id: 'sym-6',
    type: 'symptom',
    category: 'Schlaf & Biorhythmus',
    title: 'Das 4-Uhr-Herzklopfen im Bett',
    prompt: 'Im Bett gelegen und bemerkt, wie das Herz plötzlich für zwei Minuten wie ein Kolibri flattert oder pocht.',
    subtext: 'Keine Panikattacke, sondern das vegetative Nervensystem, das mitten in der Nacht grundlos Alarm schlägt.',
    clinicalCorrelation: 'Nächtliche Cortisol-Mikrospitzen gepaart mit vegetativer Dysbalance bei sinkenden Östrogen- und Progesteronwerten lösen harmlose Extrasystolen und Palpitationen aus.',
    icon: 'HeartPulse',
    accentColor: '#EC4899'
  },
  {
    id: 'myth-3',
    type: 'myth_buster',
    statement: 'MYTHOS ODER FAKT: Progesteron fällt in der frühen Perimenopause oft bis zu 75 % schneller ab als Östrogen.',
    isFact: true,
    badgeText: 'Hormondynamik',
    explanation: 'FAKT! Bei anovulatorischen Zyklen (ohne Eisprung) bildet sich kein Gelbkörper. Die Progesteronproduktion sinkt drastisch, während Östrogen phasenweise ungebremst hoch bleibt.',
    clinicalReality: 'Diese sogenannte Östrogendominanz erklärt, warum Frauen Anfang 40 häufig unter Brustspannen, Wassereinlagerungen, starken Blutungen und Schlafproblemen leiden.',
    sources: ['Prof. Jerilynn Prior, Centre for Menstrual Cycle and Ovulation Research']
  },
  {
    id: 'sym-7',
    type: 'symptom',
    category: 'Stoffwechsel & Hormone',
    title: 'Plötzliche Kaffee-Unverträglichkeit',
    prompt: 'Der geliebte Morgenkaffee sorgt plötzlich für Zittrigkeit, Magensäure oder innere Unruhe.',
    subtext: 'Du hast 15 Jahre lang problemlos Kaffee getrunken – jetzt reagiert dein Körper plötzlich überempfindlich auf Koffein.',
    clinicalCorrelation: 'Östrogen-regulierte Leberenzyme (CYP1A2) bauen Koffein ab. Hormonschwankungen verlängern die Halbwertszeit von Koffein, sodass Stimulanzien bis zu viermal länger im Körper zirkulieren.',
    icon: 'Coffee',
    accentColor: '#D97706'
  },
  {
    id: 'sym-8',
    type: 'symptom',
    category: 'Kognition & Stimmung',
    title: 'Unerklärliche diffuse Zukunftsangst',
    prompt: 'Mit einem Kloß im Magen oder plötzlicher Angst vor alltäglichen Aufgaben aufgewacht, die du sonst im Schlaf meisterst.',
    subtext: 'Ein nagendes Gefühl der Überforderung, obwohl sich an deinen äußeren Lebensumständen nichts geändert hat.',
    clinicalCorrelation: 'Der Progesteron-Metabolit Allopregnanolon ist das körpereigene Beruhigungsmittel. Sinkende Spiegel reduzieren die Reizschwelle der GABA-Rezeptoren und erzeugen unerklärliche Beklemmungen.',
    icon: 'ShieldAlert',
    accentColor: '#6366F1'
  },
  {
    id: 'sym-9',
    type: 'symptom',
    category: 'Stoffwechsel & Hormone',
    title: 'Die rätselhafte Taillenverschiebung',
    prompt: 'Die Lieblingsjeans sitzt am Hosenbund plötzlich spürbar enger, obwohl Ernährung und Bewegung unverändert sind.',
    subtext: 'Es fühlt sich an, als würde der Körper Fettreserven heimlich und über Nacht an den Bauchraum umlagern.',
    clinicalCorrelation: 'Sinkendes Östrogen verschiebt das Verhältnis zu Androgenen. Fettgewebe wird vermehrt viszeral im Bauchbereich eingelagert, während sich gleichzeitig die Insulinsensitivität verändert.',
    icon: 'Sparkles',
    accentColor: '#14B8A6'
  },
  {
    id: 'sym-10',
    type: 'symptom',
    category: 'Muskeln & Gelenke',
    title: 'Elektrisches Kribbeln auf der Haut',
    prompt: 'Merkwürdige Empfindungen auf der Haut – Juckreiz, Kribbeln oder das Gefühl, als würden Ameisen über die Arme laufen.',
    subtext: 'Du schaust hin, kratzt dich, aber da ist nichts – reine Übererregbarkeit der kutanen Nervenfasern.',
    clinicalCorrelation: 'Kollagenverlust und neurovaskuläre Instabilität während des Östrogenabfalls führen bei bis zu 20 % der Frauen zu Parästhesien und Formikation (Ameisenlaufen).',
    icon: 'Feather',
    accentColor: '#A855F7'
  },
  {
    id: 'myth-4',
    type: 'myth_buster',
    statement: 'MYTHOS ODER FAKT: Lebensstil-Maßnahmen können neurobiologische Hitzewallungen und Schlaflosigkeit nicht spürbar lindern.',
    isFact: false,
    badgeText: 'Evidenzbasierte Praxis',
    explanation: 'MYTHOS! Klinische Studien belegen, dass gezielte Maßnahmen (Krafttraining, Temperaturregulierung, Proteintiming und Entspannungsverfahren) die Symptomlast messbar senken.',
    clinicalReality: 'Progressives Krafttraining stärkt den vegetativen Tonus und dämpft viszerale Entzündungen; Magnesiumglycinat und Glycin unterstützen die Tiefschlafarchitektur nachweislich.',
    sources: ['European Menopause and Andropause Society (EMAS)', 'JAMA Internal Medicine']
  },
  {
    id: 'sym-11',
    type: 'symptom',
    category: 'Vasomotorik & Temperatur',
    title: 'Der schweißgebadete Kältezittern-Schub',
    prompt: 'Nassgeschwitzt aufgewacht und unmittelbar danach unter drei Decken am ganzen Körper vor Kälte gezittert.',
    subtext: 'Erst die Decke in Hektik weggestrampelt – und 60 Sekunden später gezittert, weil das feuchte T-Shirt eiskalt am Rücken klebt.',
    clinicalCorrelation: 'Die hypothalamische Abkühlungsreaktion überkompensiert nach einer Hitzewallung: Die Kerntemperatur sinkt rasch ab, was sofortiges reflektorisches Kältezittern auslöst.',
    icon: 'Wind',
    accentColor: '#3B82F6'
  },
  {
    id: 'sym-12',
    type: 'symptom',
    category: 'Stoffwechsel & Hormone',
    title: 'Zyklus-Roulette',
    prompt: 'Die Periode spielt Verstecken: Mal nach 23 Tagen, mal nach 41 Tagen, dazwischen unerwartete Schmierblutungen.',
    subtext: 'Man weiß nie, wann man Menstruationsprodukte dabeihaben muss, und Perioden-Apps liegen ständig daneben.',
    clinicalCorrelation: 'Die nachlassende Follikelreserve führt zu unregelmäßiger Follikelreifung mit einem Wechsel aus östrogenreichen Zyklen und verzögerten Zyklen ohne Eisprung.',
    icon: 'Calendar',
    accentColor: '#EC4899'
  }
];

export const INITIAL_BADGES: ValidationBadge[] = [
  {
    id: 'badge-1',
    title: 'Erste Schritte',
    subtitle: '5 Symptom-Karten bewertet',
    description: 'Du hast den ersten mutigen Schritt gemacht, deine realen Körpersignale wahrzunehmen, statt sie abzutun.',
    icon: 'Sparkles',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 5
  },
  {
    id: 'badge-2',
    title: 'Muster-Finderin',
    subtitle: '10 Symptome bestätigt',
    description: 'Kritischer Schwellenwert erreicht! Das hormonelle Netzwerk zwischen Gehirn, Nerven und Stoffwechsel wird sichtbar.',
    icon: 'GitCommit',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 10
  },
  {
    id: 'badge-3',
    title: 'Mythos-Bezwingerin',
    subtitle: '3 medizinische Mythen aufgeklärt',
    description: 'Du hast veraltete Menopause-Mythen mit fundierten wissenschaftlichen Fakten entkräftet.',
    icon: 'ShieldCheck',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 3
  },
  {
    id: 'badge-4',
    title: 'Ganzheitliche Entdeckerin',
    subtitle: 'Alle 5 Symptombereiche erkundet',
    description: 'Du hast Signale aus Schlaf, Kognition, Temperatur, Muskeln und Stoffwechsel erfasst.',
    icon: 'Compass',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 5
  },
  {
    id: 'badge-5',
    title: 'Souveräne Patientin',
    subtitle: 'Arzt-Briefing erstellt',
    description: 'Bestens vorbereitet mit konkreten Daten und gezielten Fragen für dein nächstes medizinisches Gespräch.',
    icon: 'Stethoscope',
    isUnlocked: false,
    progressCurrent: 0,
    progressTarget: 1
  }
];

export const INITIAL_TOOLKITS: LifestyleToolkit[] = [
  {
    id: 'toolkit-sleep',
    title: '3-Uhr-Nachts-Schlafrettungsprotokoll',
    badge: 'Schlaf & Biorhythmus',
    icon: 'Moon',
    targetCategory: 'Schlaf & Biorhythmus',
    unlockThreshold: 3,
    isUnlocked: false,
    tagline: 'Wie du nächtliche Progesteron-Tiefs abfederst und Cortisolspitzen beruhigst.',
    protocolSteps: [
      {
        timing: '60 Minuten vor dem Schlafen',
        action: '300–400 mg Magnesiumglycinat + 3 g Glycin',
        scientificReason: 'Magnesium wirkt als GABA-Agonist im Gehirn; Glycin senkt die Körperkerntemperatur und fördert den erholsamen Tiefschlaf.'
      },
      {
        timing: 'Beim Zubettgehen',
        action: 'Schlafzimmertemperatur auf 17–19 °C kühlen & atmungsaktive Naturfasern nutzen',
        scientificReason: 'Die hypothalamische Reizschwelle steigt bei kühler Umgebung, was nächtlichen Hitzewallungen vorbeugt.'
      },
      {
        timing: 'Beim Aufwachen um 3 Uhr',
        action: '10 Minuten physiologisches Seufzen oder Yoga Nidra (NSDR) im Liegen',
        scientificReason: 'Kein Blick auf den Wecker oder das Smartphone. Ruhiges Atmen mit verlängerter Ausatmung aktiviert den beruhigenden Parasympathikus.'
      }
    ],
    quickChecklist: [
      'Koffein spätestens um 12:00 Uhr mittags beenden',
      'Deckenlicht 90 Minuten vor dem Schlafen dimmen',
      'Kühlenden Raumspray oder Eisroller am Nachttisch bereithalten'
    ],
    keySupplementOrFood: 'Magnesiumglycinat + Kamillen- oder Passionsblumentee'
  },
  {
    id: 'toolkit-vasomotor',
    title: 'Thermoregulation & Hitzewallungs-Soforthilfe',
    badge: 'Temperatur & Gefäße',
    icon: 'Flame',
    targetCategory: 'Vasomotorik & Temperatur',
    unlockThreshold: 5,
    isUnlocked: false,
    tagline: 'Den Hypothalamus beruhigen, wenn Hormonschwankungen Fehlalarme im Temperaturzentrum auslösen.',
    protocolSteps: [
      {
        timing: 'Beim ersten Anzeichen einer Hitzewelle',
        action: '4-7-8 Atemtechnik zur parasympathischen Entlastung',
        scientificReason: '4 Sekunden durch die Nase einatmen, 7 Sekunden halten, 8 Sekunden durch den Mund ausatmen. Dämpft die Adrenalinausschüttung.'
      },
      {
        timing: 'Im Tagesverlauf',
        action: 'Kleidung im Zwiebel-Look aus Naturfasern (Merino, Seide, Baumwolle, Modal)',
        scientificReason: 'Ermöglicht sofortige Temperaturabgabe ohne Kältezittern durch feuchte Synthetikstoffe.'
      },
      {
        timing: 'Am Abend',
        action: 'Alkohol und histaminreiche Speisen reduzieren',
        scientificReason: 'Alkohol erweitert die Blutgefäße und treibt die nächtliche Kerntemperatur unbemerkt in die Höhe.'
      }
    ],
    quickChecklist: [
      'Kompakten Handventilator in der Tasche tragen',
      'Morgens direkt ein Glas kaltes Wasser mit einer Prise Meersalz trinken',
      'Hitzeschübe kurz im Notizbuch vermerken (Zusammenhang mit Kaffee/Zucker)'
    ],
    keySupplementOrFood: 'Elektrolyte (Kalium, Natrium, Magnesium)'
  },
  {
    id: 'toolkit-metabolism',
    title: 'Stoffwechsel- & Muskelschutz-Leitfaden',
    badge: 'Stoffwechsel & Kraft',
    icon: 'Sparkles',
    targetCategory: 'Stoffwechsel & Hormone',
    unlockThreshold: 7,
    isUnlocked: false,
    tagline: 'Den Blutzuckerspiegel stabilisieren und wertvolle Muskelmasse gegen hormonelle Insulinresistenz schützen.',
    protocolSteps: [
      {
        timing: 'Innerhalb von 60 Minuten nach dem Aufstehen',
        action: 'Frühstück mit mindestens 30 g hochwertigem Eiweiß',
        scientificReason: 'Puffert den morgendlichen Cortisolanstieg ab, verhindert Heißhungerattacken und regt die Muskelproteinsynthese an.'
      },
      {
        timing: '2–3 Mal pro Woche',
        action: 'Gezieltes Krafttraining mit progressiven Gewichten',
        scientificReason: 'Muskelmasse ist das wichtigste Stoffwechselorgan zur Aufrechterhaltung der Insulinsensitivität und des Grundumsatzes.'
      },
      {
        timing: 'Nach den Hauptmahlzeiten',
        action: '10–15 Minuten zügiger Verdauungsspaziergang',
        scientificReason: 'Aktiviert GLUT4-Glukosetransporter ohne Insulinausschüttung und glättet Blutzuckerspitzen sofort.'
      }
    ],
    quickChecklist: [
      'Täglich 1,2–1,6 g Protein pro Kilogramm Körpergewicht anstreben',
      'Exzessives Ausdauertraining durch Kraftübungen ersetzen',
      'Lösliche Ballaststoffe (Chiasamen, Leinsamen, Hafer) zur Östrogenbalance integrieren'
    ],
    keySupplementOrFood: 'Geschrotete Leinsamen (Lignane als Phytoöstrogene) + Molken- oder Erbsenprotein'
  },
  {
    id: 'toolkit-brain',
    title: 'Brain Fog & Nervensystem-Anker',
    badge: 'Kognition & Fokus',
    icon: 'Brain',
    targetCategory: 'Kognition & Stimmung',
    unlockThreshold: 9,
    isUnlocked: false,
    tagline: 'Den mentalen Fokus stärken, Reizüberflutung stoppen und die überaktive Amygdala beruhigen.',
    protocolSteps: [
      {
        timing: 'Vormittags bei der Arbeit',
        action: 'Monotasking & schriftliche Gedankenentlastung („Brain Dump“)',
        scientificReason: 'Das Arbeitsgedächtnis leidet unter Östrogenschwankungen. Klare Listen nehmen kognitiven Druck aus dem Alltag.'
      },
      {
        timing: 'Beim Nachmittagstief (gegen 14 Uhr)',
        action: 'Kaltes Wasser ins Gesicht + 5 Minuten Tageslicht im Freien',
        scientificReason: 'Aktiviert den Tauchreflex über den Nervus trigeminus und fördert die Wachheit ganz ohne zusätzlichen Kaffee.'
      },
      {
        timing: 'Bei plötzlicher Wut oder Überforderung',
        action: 'Physiologischer Seufzer (zweimal kurz einatmen, lang ausatmen)',
        scientificReason: 'Entfaltet kollabierte Lungenbläschen und verlangsamt reflektorisch die Herzfrequenz über den Vagusnerv.'
      }
    ],
    quickChecklist: [
      'Sprachnotizen nutzen, um flüchtige Gedanken sofort festzuhalten',
      'Wortfindungspausen gelassen nehmen: „Mein Gehirn lädt kurz neu“',
      'Omega-3-Fettsäuren (EPA/DHA 1000 mg) zur neurobiologischen Unterstützung'
    ],
    keySupplementOrFood: 'Omega-3 (EPA/DHA) + Cholin oder Phosphatidylserin'
  }
];
