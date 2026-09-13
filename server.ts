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
  res.json({ status: "ok", app: "PeriDots - Perimenopause Symptom Tracker MVP" });
});

// ----------------------------------------------------
// 1. API: Generate Dynamic Swipe Cards
// ----------------------------------------------------
app.post("/api/generate-cards", async (req, res) => {
  try {
    const { category, focusArea, count = 5 } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `You are a creative, compassionate women's endocrinology health expert creating Tinder-style swipe cards for "PeriDots", a perimenopause symptom tracking app.
Create ${count} ultra-relatable, low-cognitive-load cards for women in perimenopause (approx ages 38-52).
Focus: ${focusArea || category || 'General perimenopause symptoms and myth-busters'}

Include a mix of:
1. "symptom" cards: Hook must be an everyday, punchy situation (e.g. "Woke up at 3:17 AM staring at the ceiling...", "Mid-sentence brain reboot", "Sudden thermal furnace in your chest"). Include the underlying physiological/hormonal reason.
2. "myth_buster" cards: Shocking or common misconceptions about perimenopause (e.g. "You can't get pregnant", "Hormones only drop after 50", "Routine FSH blood tests are definitive").

Categories to choose from: 'Sleep & Circadian', 'Neurocognitive & Mood', 'Vasomotor & Thermal', 'Musculoskeletal & Body', 'Metabolic & Hormonal'.

Return strictly JSON matching this structure.`;

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
        category: 'Neurocognitive & Mood',
        title: 'The Keys in the Fridge Mystery',
        prompt: 'Found your car keys in the refrigerator next to the almond milk.',
        subtext: 'You laughed it off, but inside you felt a quiet flash of terror about early-onset cognitive decline.',
        clinicalCorrelation: 'Declining estrogen slows mitochondrial bioenergetics in the brain cortex, manifesting as temporary working memory lapses.',
        icon: 'Key'
      },
      {
        id: `gen-${Date.now()}-2`,
        type: 'myth_buster',
        statement: 'MYTH OR FACT: You cannot get pregnant once perimenopausal cycles start skipping.',
        isFact: false,
        badgeText: 'Fertility Reality',
        explanation: 'MYTH! Ovulation still occurs erratically in perimenopause. Pregnancy is physiologically possible until 12 consecutive months without a period.',
        clinicalReality: 'Contraceptive counseling is officially recommended by ACOG until complete menopause (age 50-52 on average).',
        sources: ['ACOG Clinical Consensus']
      },
      {
        id: `gen-${Date.now()}-3`,
        type: 'symptom',
        category: 'Vasomotor & Thermal',
        title: 'The Blanket Tug-of-War',
        prompt: 'Kicking off the duvet soaking wet, then pulling it back over your chin 45 seconds later because you are freezing.',
        subtext: 'Your bed looks like a crime scene of discarded blankets by 4:00 AM.',
        clinicalCorrelation: 'Hypothalamic KNDy neurons trigger exaggerated vasodilatory flushes, followed by rapid reflex shivering.',
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
      const prompt = `You are the lead endocrinologist and empathetic clinician at EVE (Evidence for every woman), a perimenopause symptom intelligence platform.
A user has completed our swipe assessment.
Here are the symptoms they swiped "THAT'S ME" (symptoms_present):
${JSON.stringify(symptomsPresent, null, 2)}

Here are the symptoms they swiped "NOT ME" (symptoms_absent):
${JSON.stringify(symptomsAbsent, null, 2)}

User Profile Context (from EVE - Evidence for every woman):
- User Name: ${userContext.userName || 'Sarah'}
- Age: ${userContext.age || '46'} (Bracket: ${userContext.ageGroup || '45-49'})
- Cycle Regularity (STRAW+10): ${userContext.cycleStatus || 'Fluctuating or irregular'}
- HRT / Therapy Status: ${userContext.hrtStatus || 'None / Exploring'}
- Primary Health Goals: ${Array.isArray(userContext.primaryGoals) ? userContext.primaryGoals.join(', ') : 'Sleep, Brain Fog, Doctor brief'}
- Medical Notes: ${userContext.medicalNotes || 'None noted'}

Generate a comprehensive "Dot Connection" profile reveal for EVE:
1. "headline": A compassionate, punchy validation title addressing the user (e.g. "Connecting Your Symptom Dots: You're Not Crazy, Your Hormones Are Recalibrating")
2. "empatheticCopy": 2 warm, deeply validating paragraphs. De-stigmatize their experience. Tell them why these seemingly disparate symptoms (e.g. 3 AM waking + rage spikes + joint stiffness) are NOT character flaws, burnout, or aging rapidly—they are a biological shift.
3. "probabilitySummary": Object with:
   - "stage": Estimated perimenopause stage (e.g. "Early Perimenopause (Luteal Deficit Phase)", "Active Mid-Perimenopause (Estrogen Fluctuations)", or "Late Transition")
   - "confidence": E.g. "High Likelihood (89%)"
   - "rationale": 2-3 sentences explaining the biological reasoning.
4. "categoryGroupings": Array of category objects representing their present symptoms:
   - "category": 'Sleep & Circadian' | 'Neurocognitive & Mood' | 'Vasomotor & Thermal' | 'Musculoskeletal & Body' | 'Metabolic & Hormonal'
   - "matchedSymptoms": array of strings
   - "clinicalExplanation": why estrogen/progesterone receptors in this system are behaving this way
   - "severityLevel": 'mild' | 'moderate' | 'pronounced'
   - "hormonalDriver": e.g. "Progesterone drop & GABA receptor desensitization"
5. "lifestyleRecommendations": EXACTLY 3 high-impact, evidence-based, doable lifestyle actions:
   - "title": string
   - "timeframe": e.g. "Tonight", "This Week", "Daily Habit"
   - "action": concrete protocol (e.g. 400mg Magnesium Glycinate timing, 30g protein anchor, room temperature protocol)
   - "scientificWhy": exact clinical rationale
   - "icon": 'Moon' | 'Flame' | 'Sparkles' | 'Brain' | 'Activity'
6. "doctorDiscussionPoints": 4 high-yield questions they can take to their OB/GYN or GP.
7. "hormonalDotConnection": A clear, empowering explanation of how estrogen & progesterone receptors act as the central conductor connecting all their seemingly random dots.

Return strictly a valid JSON object matching the requested schema.`;

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
    const hasSleep = symptomsPresent.some(s => s.toLowerCase().includes('sleep') || s.toLowerCase().includes('3:') || s.toLowerCase().includes('woke'));
    const hasMood = symptomsPresent.some(s => s.toLowerCase().includes('rage') || s.toLowerCase().includes('anxiety') || s.toLowerCase().includes('blank') || s.toLowerCase().includes('brain'));
    const hasVasomotor = symptomsPresent.some(s => s.toLowerCase().includes('furnace') || s.toLowerCase().includes('sweat') || s.toLowerCase().includes('hot') || s.toLowerCase().includes('cold'));
    const hasJoints = symptomsPresent.some(s => s.toLowerCase().includes('stiff') || s.toLowerCase().includes('joint') || s.toLowerCase().includes('tin man') || s.toLowerCase().includes('tingle'));
    const count = symptomsPresent.length;

    const fallbackAssessment = {
      headline: `Connecting Your ${count} Symptom Dots: The Architecture of Hormonal Recalibration`,
      empatheticCopy: `First, take a deep breath: you are not going crazy, you are not failing at life, and you are not suddenly falling apart. What you are feeling is real, physical, and neurologically grounded.\n\nWhen estrogen and progesterone begin their erratic roller-coaster in perimenopause, every cell with an estrogen receptor—from your brain's sleep clock in the hypothalamus to your joint synovial membranes—experiences sudden turbulence. These dots are not isolated flaws; they are parts of one coherent hormonal shift.`,
      probabilitySummary: {
        stage: count >= 8 ? "Active Mid-Perimenopausal Transition" : "Early Perimenopausal Onset (Luteal Deficit Phase)",
        confidence: count >= 8 ? "High Likelihood (91%)" : "Moderate-to-High Likelihood (84%)",
        rationale: `The presence of ${count} distinct symptom signals across multiple physiological clusters strongly correlates with early-to-mid perimenopausal endocrine remodeling.`
      },
      categoryGroupings: [
        ...(hasSleep ? [{
          category: 'Sleep & Circadian',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('3:') || s.toLowerCase().includes('sleep') || s.toLowerCase().includes('heart')),
          clinicalExplanation: 'Progesterone metabolizes into allopregnanolone, which calms the brain via GABA-A receptors. Rapid progesterone withdrawal triggers the classic 3:00 AM nocturnal arousal.',
          severityLevel: 'pronounced' as const,
          hormonalDriver: 'Progesterone drop & nocturnal cortisol micro-spikes'
        }] : []),
        ...(hasMood ? [{
          category: 'Neurocognitive & Mood',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('rage') || s.toLowerCase().includes('blank') || s.toLowerCase().includes('anxiety')),
          clinicalExplanation: 'Estrogen directly enhances serotonin synthesis and glucose utilization in the prefrontal cortex and hippocampus. Rollercoaster estrogen levels temporarily impair word retrieval and heighten amygdala reactivity.',
          severityLevel: 'moderate' as const,
          hormonalDriver: 'Estrogen volatility & temporary cerebral glucose dip'
        }] : []),
        ...(hasVasomotor ? [{
          category: 'Vasomotor & Thermal',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('furnace') || s.toLowerCase().includes('sweat') || s.toLowerCase().includes('heat') || s.toLowerCase().includes('cold')),
          clinicalExplanation: 'The hypothalamus controls core body temperature. When estrogen drops abruptly, the thermoneutral zone narrows, prompting sudden emergency vasodilation followed by rebound chills.',
          severityLevel: 'pronounced' as const,
          hormonalDriver: 'Hypothalamic KNDy neuron hyperactivation'
        }] : []),
        ...(hasJoints ? [{
          category: 'Musculoskeletal & Body',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('stiff') || s.toLowerCase().includes('joint') || s.toLowerCase().includes('tin man') || s.toLowerCase().includes('tingle')),
          clinicalExplanation: 'Estrogen acts as a systemic anti-inflammatory agent and maintains collagen hydration. Fluctuations provoke menopausal arthralgia and morning connective-tissue tightness.',
          severityLevel: 'moderate' as const,
          hormonalDriver: 'Synovial estrogen receptor down-regulation'
        }] : []),
        {
          category: 'Metabolic & Hormonal',
          matchedSymptoms: symptomsPresent.filter(s => s.toLowerCase().includes('coffee') || s.toLowerCase().includes('jeans') || s.toLowerCase().includes('cycle') || s.toLowerCase().includes('shift')),
          clinicalExplanation: 'Shifts in estrogen-to-androgen ratios alter liver enzyme kinetics (caffeine sensitivity) and redirect lipid storage toward visceral adipose tissues.',
          severityLevel: 'moderate' as const,
          hormonalDriver: 'Estrogen-androgen ratio shifts and CYP1A2 clearance changes'
        }
      ],
      lifestyleRecommendations: [
        {
          title: "The 3 AM Sleep Rescue Stack",
          timeframe: "Tonight",
          action: "Take 300-400mg Magnesium Glycinate with 3g Glycine 45 minutes before sleep. Keep bedroom at 18°C (65°F).",
          scientificWhy: "Magnesium and Glycine enhance GABAergic transmission and trigger core body temperature cooling required for deep restorative slow-wave sleep.",
          icon: "Moon"
        },
        {
          title: "Morning 30g Protein Anchor",
          timeframe: "Daily Habit",
          action: "Consume 30g of high-leucine protein (eggs, Greek yogurt, or whey/pea isolate) within 60 minutes of waking.",
          scientificWhy: "Buffers morning cortisol surges, prevents mid-morning glucose crashes that mimic panic attacks, and supports muscle protein synthesis.",
          icon: "Sparkles"
        },
        {
          title: "Vagal Brake & Parasympathetic Reset",
          timeframe: "When Rage/Anxiety Spikes",
          action: "Execute 3 rounds of the Physiological Sigh (two sharp nasal inhales, one prolonged oral sigh) followed by 4-7-8 breathing.",
          scientificWhy: "Directly triggers the baroreceptor reflex, slowing heart rate and resetting sympathetic hyperactivity caused by neuro-hormonal drops.",
          icon: "Brain"
        }
      ],
      doctorDiscussionPoints: [
        "Review your symptom cluster pattern rather than relying solely on single-day hormone blood tests (per NAMS guidelines).",
        "Discuss whether cyclic bioidentical micronized progesterone could address the 3 AM sleep awakenings and anxiety.",
        "Request comprehensive metabolic and nutrient screening (Serum Ferritin, TSH with Free T3/T4, Vitamin D3, and Fasting Insulin).",
        "Evaluate personal contraindications and benefits for Body-Identical Hormone Replacement Therapy (HRT/MHT)."
      ],
      hormonalDotConnection: `Your symptoms are not separate, random ailments. Estrogen and progesterone receptors exist in every organ of your body: your brain's circadian clock, your cardiac conduction system, your thermoregulatory center, and your joint cartilage. When these hormones oscillate wildly, the orchestra plays out of sync. Connecting the dots is the first step toward reclaiming your rhythm.`
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
