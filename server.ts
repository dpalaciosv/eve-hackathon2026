import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "EVE - Evidence for every woman" });
});

// ----------------------------------------------------
// 1. API: Generate Dynamic Swipe Cards
// ----------------------------------------------------
app.post("/api/generate-cards", async (req, res) => {
  try {
    const { category, focusArea, count = 5 } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Du bist eine empathische, renommierte Gynäkologin und Endokrinologin bei EVE (Evidence for every woman).
Erstelle ${count} extrem alltagsnahe, berührende Swipe-Karten auf Deutsch für Frauen in der Perimenopause (Alter ca. 38-55 Jahre).
Schwerpunkt: ${focusArea || category || 'Typische Perimenopause-Symptome und Myth-Buster'}

Mische:
1. "symptom"-Karten: Hook muss eine konkrete, greifbare Alltagssituation sein (z.B. "Um 3:17 Uhr plötzlich hellwach...", "Wort mitten im Satz vergessen", "Plötzliche Hitzewelle in der Brust"). Erkläre die zugrunde liegende hormonelle Ursache verständlich und de-stigmatisierend.
2. "myth_buster"-Karten: Häufige Irrtümer über die Perimenopause (z.B. "FSH-Bluttest ist eindeutig", "Man kann nicht mehr schwanger werden", "Beginnt erst ab 50").

Kategorien (auf Deutsch): 'Schlaf & Biorhythmus', 'Kognition & Stimmung', 'Vasomotorik & Temperatur', 'Muskeln & Gelenke', 'Stoffwechsel & Hormone'.
Antworte ausschließlich auf Deutsch im geforderten JSON-Schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              cards: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING, description: "'symptom' or 'myth_buster'" },
                    category: { type: Type.STRING },
                    title: { type: Type.STRING },
                    prompt: { type: Type.STRING },
                    subtext: { type: Type.STRING },
                    clinicalCorrelation: { type: Type.STRING },
                    statement: { type: Type.STRING },
                    isFact: { type: Type.BOOLEAN },
                    badgeText: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    clinicalReality: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ["id", "type"]
                }
              }
            },
            required: ["cards"]
          }
        }
      });

      const parsed = JSON.parse(response.text?.trim() || '{"cards":[]}');
      return res.json({ success: true, cards: parsed.cards });
    }

    // Fallback card generator if AI key is absent
    const fallbackCards = [
      {
        id: `gen-${Date.now()}-1`,
        type: 'symptom',
        category: 'Kognition & Stimmung',
        title: 'Der Autoschlüssel im Kühlschrank',
        prompt: 'Den Autoschlüssel im Kühlschrank direkt neben der Hafermilch wiedergefunden.',
        subtext: 'Erst drüber gelacht, aber innerlich kurz den kalten Schrecken vor beginnendem Gedächtnisverlust gespürt.',
        clinicalCorrelation: 'Sinkendes Östrogen drosselt vorübergehend die zelluläre Glukoseverwertung im präfrontalen Kortex, was sich als typische Arbeitsgedächtnislücke äußert.',
        icon: 'Key'
      },
      {
        id: `gen-${Date.now()}-2`,
        type: 'myth_buster',
        statement: 'MYTHOS ODER FAKT: Sobald Zyklen unregelmäßig werden, kann man nicht mehr schwanger werden.',
        isFact: false,
        badgeText: 'Fruchtbarkeits-Fakt',
        explanation: 'MYTHOS! Der Eisprung findet in der Perimenopause unberechenbar weiterhin statt. Eine Schwangerschaft ist biologisch möglich, bis 12 Monate am Stück keine Periode mehr auftrat.',
        clinicalReality: 'Gynäkologische Fachgesellschaften empfehlen zuverlässige Verhütung bis zur definitiven Menopause (durchschnittlich mit 51–52 Jahren).',
        sources: ['DGGG & ACOG Leitlinien']
      },
      {
        id: `gen-${Date.now()}-3`,
        type: 'symptom',
        category: 'Vasomotorik & Temperatur',
        title: 'Das Bettdecken-Tauziehen',
        prompt: 'Nassgeschwitzt die Bettdecke weggestrampelt – und 45 Sekunden später bis übers Kinn hochgezogen, weil man zittert vor Kälte.',
        subtext: 'Das Schlafzimmer gleicht um 4 Uhr morgens einem chaotischen Decken-Schlachtfeld.',
        clinicalCorrelation: 'Die KNDy-Neuronen im Hypothalamus lösen eine übertriebene Gefäßerweiterung aus, gefolgt von reflektorischem Kältezittern bei Temperaturabfall.',
        icon: 'Thermometer'
      }
    ];

    res.json({ success: true, cards: fallbackCards, isFallback: true });
  } catch (error: any) {
    console.error("Card generation error:", error);
    res.status(500).json({ error: "Failed to generate cards", details: error?.message });
  }
});

// ----------------------------------------------------
// 2. API: Assess Gathered Symptoms (Dot Connection Engine)
// ----------------------------------------------------
app.post("/api/assess-symptoms", async (req, res) => {
  try {
    const { symptomsPresent = [], symptomsAbsent = [], userContext = {} } = req.body;

    if (!Array.isArray(symptomsPresent) || symptomsPresent.length === 0) {
      return res.status(400).json({ error: "At least one present symptom is required to connect the dots." });
    }

    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Du bist die leitende Endokrinologin und empathische Fachärztin bei EVE (Evidence for every woman), einer evidenzbasierten Plattform für Perimenopause-Symptomanalyse.
Eine Nutzerin hat den Swipe-Check abgeschlossen.
Hier sind die Symptome, die sie mit „DAS BIN ICH!“ bestätigt hat (symptoms_present):
${JSON.stringify(symptomsPresent, null, 2)}

Hier sind die Symptome, die sie mit „NICHT ICH“ abgewählt hat (symptoms_absent):
${JSON.stringify(symptomsAbsent, null, 2)}

Nutzerinnen-Kontext (von EVE - Evidence for every woman):
- Name: ${userContext.userName || 'Sarah'}
- Alter: ${userContext.age || '46'} (Altersgruppe: ${userContext.ageGroup || '45-49'})
- Zyklusstatus (STRAW+10): ${userContext.cycleStatus || 'Schwankend / unregelmäßig'}
- HRT- / Therapiestatus: ${userContext.hrtStatus || 'Keine / erkundend'}
- Primäre Gesundheitsziele: ${Array.isArray(userContext.primaryGoals) ? userContext.primaryGoals.join(', ') : 'Schlafqualität, Brain Fog verstehen, Arztgespräch vorbereiten'}
- Medizinische Notizen: ${userContext.medicalNotes || 'Keine relevanten Vorerkrankungen'}

Erstelle eine fundierte, berührende und evidenzbasierte „Dot Connection“-Analyse auf DEUTSCH für EVE:
1. "headline": Ein empathischer, prägnanter Validierungstitel (z.B. "Deine Symptom-Punkte verbinden sich: Du bist nicht überfordert – deine Hormone stellen sich um").
2. "empatheticCopy": 2 warme, wissenschaftlich validierende Absätze. Nimm jedes Stigma. Erkläre verständlich, warum scheinbar zusammenhanglose Symptome (z.B. Aufwachen um 3 Uhr nachts + plötzliche Wutausbrüche + Gelenksteifigkeit) weder Versagen noch Burnout oder vorzeitiges Altern sind, sondern ein logisches neuroendokrines Signalmuster.
3. "probabilitySummary": Objekt mit:
   - "stage": Geschätzte Perimenopause-Phase (z.B. "Frühe Perimenopause (Luteales Defizit)", "Aktive mittlere Perimenopause (Östrogenschwankungen)" oder "Späte Übergangsphase")
   - "confidence": z.B. "Hohe Übereinstimmung (89 %)"
   - "rationale": 2-3 Sätze biologische Begründung auf Deutsch.
4. "categoryGroupings": Array von Kategorie-Objekten für die bestätigten Symptome:
   - "category": 'Schlaf & Biorhythmus' | 'Kognition & Stimmung' | 'Vasomotorik & Temperatur' | 'Muskeln & Gelenke' | 'Stoffwechsel & Hormone'
   - "matchedSymptoms": Array der deutschen Symptomtitel
   - "clinicalExplanation": Verständliche Erklärung, wie Östrogen- und Progesteronrezeptoren in diesem Organsystem reagieren
   - "severityLevel": 'mild' | 'moderate' | 'pronounced'
   - "hormonalDriver": z.B. "Progesteronabfall & verminderte GABA-Rezeptoraktivität"
5. "lifestyleRecommendations": GENAU 3 hochwirksame, alltagstaugliche und wissenschaftlich belegte Maßnahmen:
   - "title": Titel der Maßnahme
   - "timeframe": z.B. "Heute Abend", "Morgenroutine", "Tägliche Gewohnheit"
   - "action": Konkretes Vorgehen (z.B. 400 mg Magnesiumglycinat-Timing, 30 g Proteinanker, Raumtemperatur-Protokoll)
   - "scientificWhy": Exakte klinische Begründung
   - "icon": 'Moon' | 'Flame' | 'Sparkles' | 'Brain' | 'Activity'
6. "doctorDiscussionPoints": 3 bis 4 präzise Fragen für das nächste Gespräch mit der Gynäkologin oder dem Hausarzt.
7. "hormonalDotConnection": Eine ermutigende Erklärung, wie Östrogen- und Progesteronrezeptoren als Dirigent alle scheinbar zufälligen Punkte im Körper verbinden.

Antworte ausnahmslos auf DEUTSCH und als valides JSON entsprechend dem Schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              empatheticCopy: { type: Type.STRING },
              probabilitySummary: {
                type: Type.OBJECT,
                properties: {
                  stage: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                  rationale: { type: Type.STRING }
                },
                required: ["stage", "confidence", "rationale"]
              },
              categoryGroupings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    matchedSymptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
                    clinicalExplanation: { type: Type.STRING },
                    severityLevel: { type: Type.STRING },
                    hormonalDriver: { type: Type.STRING }
                  },
                  required: ["category", "matchedSymptoms", "clinicalExplanation", "severityLevel", "hormonalDriver"]
                }
              },
              lifestyleRecommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    timeframe: { type: Type.STRING },
                    action: { type: Type.STRING },
                    scientificWhy: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ["title", "timeframe", "action", "scientificWhy", "icon"]
                }
              },
              doctorDiscussionPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              hormonalDotConnection: { type: Type.STRING }
            },
            required: [
              "headline",
              "empatheticCopy",
              "probabilitySummary",
              "categoryGroupings",
              "lifestyleRecommendations",
              "doctorDiscussionPoints",
              "hormonalDotConnection"
            ]
          }
        }
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      return res.json({ success: true, assessment: parsed });
    }

    // Dynamic High-Fidelity Fallback if GEMINI_API_KEY is not configured
    const hasSleep = symptomsPresent.some(s => s.toLowerCase().includes('schlaf') || s.toLowerCase().includes('3:') || s.toLowerCase().includes('wach') || s.toLowerCase().includes('herz') || s.toLowerCase().includes('bett'));
    const hasMood = symptomsPresent.some(s => s.toLowerCase().includes('wut') || s.toLowerCase().includes('angst') || s.toLowerCase().includes('wort') || s.toLowerCase().includes('gehirn') || s.toLowerCase().includes('stimmung'));
    const hasVasomotor = symptomsPresent.some(s => s.toLowerCase().includes('hitze') || s.toLowerCase().includes('schweiß') || s.toLowerCase().includes('heizm') || s.toLowerCase().includes('kälte') || s.toLowerCase().includes('warm'));
    const hasJoints = symptomsPresent.some(s => s.toLowerCase().includes('steif') || s.toLowerCase().includes('gelenk') || s.toLowerCase().includes('blechmann') || s.toLowerCase().includes('kribbel'));
    const count = symptomsPresent.length;

    const fallbackAssessment = {
      headline: `Deine ${count} Symptom-Punkte verbinden sich: Das Netzwerk der hormonellen Umstellung`,
      empatheticCopy: `Atme zuerst einmal tief durch: Du bildest dir das nicht ein, du bist nicht überfordert und dein Körper bricht nicht plötzlich zusammen. Was du spürst, ist real, biologisch greifbar und hormonell gesteuert.\n\nWenn Östrogen und Progesteron in der Perimenopause unregelmäßig fluktuieren, reagiert jede Körperzelle mit Östrogenrezeptoren – von der inneren Schlafuhr im Hypothalamus über das vegetative Nervensystem bis hin zu deinen Gelenkmembranen. Diese Punkte sind keine isolierten Defizite, sondern Ausdruck einer zusammenhängenden neuroendokrinen Neuausrichtung.`,
      probabilitySummary: {
        stage: count >= 8 ? "Aktive mittlere Perimenopause (STRAW+10 Stadium -1)" : "Frühe Perimenopause (Luteale Defizitphase)",
        confidence: count >= 8 ? "Hohe Übereinstimmung (91 %)" : "Moderate bis hohe Übereinstimmung (84 %)",
        rationale: `Das Auftreten von ${count} charakteristischen Symptomen über mehrere Organsysteme hinweg entspricht dem typischen Bild der perimenopausalen Hormonumstellung.`
      },
      categoryGroupings: [
        ...(hasSleep ? [{
          category: 'Schlaf & Biorhythmus',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('3:') || s.toLowerCase().includes('schlaf') || s.toLowerCase().includes('herz') || s.toLowerCase().includes('bett')),
          clinicalExplanation: 'Progesteron wird im Gehirn zu Allopregnanolon verstoffwechselt, das über GABA-A-Rezeptoren beruhigend wirkt. Bei absinkendem Progesteron entfällt die nächtliche Bremse genau dann, wenn die frühmorgendliche Cortisolausschüttung einsetzt.',
          severityLevel: 'pronounced' as const,
          hormonalDriver: 'Progesteronabfall & nächtliche vegetative Dysbalance'
        }] : []),
        ...(hasMood ? [{
          category: 'Kognition & Stimmung',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('wut') || s.toLowerCase().includes('wort') || s.toLowerCase().includes('angst')),
          clinicalExplanation: 'Östrogen fördert die Serotoninsynthese und den Glukosestoffwechsel im Hippocampus und präfrontalen Kortex. Hormonschwankungen verlangsamen zeitweise den Wortabruf und erhöhen die emotionale Reaktivität der Amygdala.',
          severityLevel: 'moderate' as const,
          hormonalDriver: 'Fluktuierendes Östrogen & temporäre zerebrale Glukosedrosselung'
        }] : []),
        ...(hasVasomotor ? [{
          category: 'Vasomotorik & Temperatur',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('hitze') || s.toLowerCase().includes('schweiß') || s.toLowerCase().includes('kälte') || s.toLowerCase().includes('heizm')),
          clinicalExplanation: 'Das Temperaturzentrum im Hypothalamus reagiert hochempfindlich auf sinkende Östrogenspiegel. Die thermoneutrale Zone verengt sich drastisch, sodass schon minimale Temperaturschwankungen plötzliche Hitzewallungen auslösen.',
          severityLevel: 'pronounced' as const,
          hormonalDriver: 'Überaktivität der KNDy-Neuronen im Hypothalamus'
        }] : []),
        ...(hasJoints ? [{
          category: 'Muskeln & Gelenke',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('steif') || s.toLowerCase().includes('gelenk') || s.toLowerCase().includes('blechmann') || s.toLowerCase().includes('kribbel')),
          clinicalExplanation: 'Östrogen schützt die Gelenkflüssigkeit und das Bindegewebskollagen. Hormonabfälle führen zu morgendlicher Gelenksteifigkeit und Übererregbarkeit kutaner Nervenfasern.',
          severityLevel: 'moderate' as const,
          hormonalDriver: 'Herabregulierung synovialer Östrogenrezeptoren'
        }] : []),
        {
          category: 'Stoffwechsel & Hormone',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('kaffee') || s.toLowerCase().includes('taille') || s.toLowerCase().includes('zyklus') || s.toLowerCase().includes('jeans')),
          clinicalExplanation: 'Verschiebungen im Verhältnis von Östrogen zu Androgenen verändern den hepatischen Koffeinabbau (CYP1A2) und begünstigen die viszerale Fetteinlagerung am Bauch.',
          severityLevel: 'moderate' as const,
          hormonalDriver: 'Verändertes Androgen-Östrogen-Verhältnis & verlangsamte Enzym-Clearance'
        }
      ],
      lifestyleRecommendations: [
        {
          title: "3-Uhr-Nachts-Schlafrettung",
          timeframe: "Heute Abend",
          action: "300–400 mg Magnesiumglycinat mit 3 g Glycin 45 Minuten vor dem Zubettgehen. Raumtemperatur auf unter 19 °C kühlen.",
          scientificWhy: "Magnesium und Glycin stärken die GABA-Übertragung und leiten die für tiefen Slow-Wave-Schlaf notwendige Absenkung der Kerntemperatur ein.",
          icon: "Moon"
        },
        {
          title: "Morgendlicher 30 g Proteinanker",
          timeframe: "Tägliche Gewohnheit",
          action: "Innerhalb von 60 Minuten nach dem Aufstehen 30 g hochwertiges Eiweiß (z. B. Eier, Skyr oder pflanzliches Protein) zuführen.",
          scientificWhy: "Puffert frühe Cortisolspitzen ab, stabilisiert den Blutzuckerspiegel und liefert Vorstufen für Wachheitsneurotransmitter.",
          icon: "Sparkles"
        },
        {
          title: "Vagusnerv-Atemanker bei Überreizung",
          timeframe: "Bei aufkommender Reizbarkeit / Unruhe",
          action: "3 Runden physiologischer Seufzer (zweimal durch die Nase einatmen, lang hörbar durch den Mund ausatmen), danach 4-7-8 Rhythmus.",
          scientificWhy: "Aktiviert den Barorezeptor-Reflex, senkt die Herzfrequenz und dämpft vegetative Fehlalarme des Nervensystems sofort.",
          icon: "Brain"
        }
      ],
      doctorDiscussionPoints: [
        "Besprich dein Symptommuster ganzheitlich, statt dich nur auf punktuelle Einzelblutwerte zu verlassen (gemäß internationalen Leitlinien wie NAMS/DGGG).",
        "Frage nach, ob mikronisiertes bioidentisches Progesteron (100–200 mg zur Nacht) bei nächtlichem Erwachen und innerer Unruhe indiziert ist.",
        "Lasse wichtige Basis-Laborwerte überprüfen: Ferritin (Eisenspeicher), TSH mit freien Schilddrüsenwerten (fT3/fT4) und Vitamin D3.",
        "Kläre persönliche Indikationen und Nutzen-Risiko-Abwägungen einer transdermalen bioidentischen Hormontherapie (Östradiol-Gel/Pflaster)."
      ],
      hormonalDotConnection: `Deine Symptome sind keine zufälligen Einzelbeschwerden. Östrogen- und Progesteronrezeptoren durchziehen deinen gesamten Organismus: die innere Schlafuhr im Gehirn, das Temperaturzentrum im Hypothalamus, die Blutgefäße und das Bindegewebe der Gelenke. Wenn diese Botenstoffe schwanken, gerät das Zusammenspiel aus dem Takt. Das Erkennen dieser Zusammenhänge ist der erste Schritt, um deine Souveränität zurückzugewinnen.`
    };

    res.json({ success: true, assessment: fallbackAssessment, isFallback: true });
  } catch (error: any) {
    console.error("Assessment error:", error);
    res.status(500).json({ error: "Failed to assess symptoms", details: error?.message });
  }
});

// ----------------------------------------------------
// 3. Vite Dev Server / Production Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌸 PeriDots Server running on http://localhost:${PORT}`);
  });
}

startServer();
