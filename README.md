# eve
EVE - Evidence for Every Woman

# 🌸 Eve

> Ein KI-gestützter digitaler Begleiter für Frauen in der Perimenopause zur Aufklärung, Symptomverfolgung und Verbesserung der Lebensqualität. Powered by Google Gemini.

[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue.svg)](#)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Google%20Gemini-orange.svg)](https://aistudio.google.com/)
[![Data Privacy](https://img.shields.io/badge/Compliance-GDPR%20Ready-brightgreen.svg)](#)

<p align="center">
  <img src="https://via.placeholder.com/600x300?text=Eve+App+Preview" alt="Eve App Preview">
</p>

## 📖 Inhaltsverzeichnis
- [Über das Projekt](#über-das-projekt)
- [Hauptfunktionen](#hauptfunktionen)
- [KI-Integration & Prompt Engineering](#ki-integration--prompt-engineering)
- [Datenschutz & Gesundheitsdaten](#datenschutz--gesundheitsdaten)
- [Tech Stack](#tech-stack)
- [Lokale Installation](#lokale-installation)
- [Projektstruktur](#projektstruktur)
- [Roadmap](#roadmap)
- [Kontakt & Team](#kontakt--team)

---

## 💡 Über das Projekt
EVE wurde entwickelt, um Frauen ab 35 in einem gamifizierten Approach anhand eines Punktesystems zu ermöglichen einzuschätzen, ob sie bereits in den Bereich der Perimenopause eintreten. 
Die App hilft Nutzerinnen, die komplexen Veränderungen der Perimenopause zu verstehen, ihre individuellen Symptome zu tracken und datenbasierte Gespräche mit medizinischem Fachpersonal zu führen.

## ✨ Hauptfunktionen
- 🤖 **KI-Assistenz (Gemini):** Personalisierte, medizinisch fundierte Antworten auf individuelle Fragen zur Perimenopause.
- 📈 **Erweitertes Symptom-Tracking:** Erfassung von Hitzewallungen, Gehirnnebel, Stimmungsschwankungen und Schlafqualität.
- 🔄 **Dynamisches Zyklus-Tagebuch:** Angepasst an die unregelmäßigen Zyklen dieser Lebensphase.
- 🩺 **Arzt-Report-Export:** Generierung übersichtlicher PDF-Berichte der getrackten Daten für den nächsten Gynäkologen-Besuch.

---

## 🤖 KI-Integration & Prompt Engineering
Eve nutzt die API von **Google AI Studio** und das **Gemini API SDK**:
- **System Prompts:** Speziell entwickelte Prompts im Google AI Studio stellen sicher, dass Antworten empathisch, sachlich korrekt und frei von Halluzinationen bleiben.
- **Safety Settings:** Strenge Content-Filtering-Regeln zum Schutz vor Fehlinformationen im Gesundheitsbereich.
- **Kontextverarbeitung:** Integration strukturierter Nutzer-Trackerdaten in den Gemini-Kontext für maßgeschneiderte Ratschläge.

---

## 🔒 Datenschutz & Gesundheitsdaten
Da wir hochsensible gesundheitliche Daten verarbeiten, hat Datenschutz die höchste Priorität:
- **DSGVO-Konformität:** Alle Prozesse entsprechen der Datenschutz-Grundverordnung.
- **Verschlüsselung:** End-to-End-Verschlüsselung aller personenbezogenen Eingaben und KI-Prompts.
- **AI Privacy:** Es werden keine persönlichen Daten der Nutzerinnen zum allgemeinen Training von KI-Modellen verwendet.

---

## 🛠 Tech Stack
- **AI Core:** Google AI Studio / Gemini API (`@google/generative-ai`)
- **Frontend:** React Native / Flutter
- **Backend:** Node.js / Express / Python FastAPI
- **Datenbank:** PostgreSQL / Supabase
- **DevOps & Repository:** GitHub (`xyz/eve`)

---


## 🚀 Lokale Installation

### Voraussetzungen
- [Node.js](https://nodejs.org/) (Version >= 18.x)
- [Google AI Studio API Key](https://aistudio.google.com/)

### Setup-Schritte

1. **Repository klonen**
   ```bash
   git clone https://github.com/xyz/eve.git
   cd eve
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen einrichten**
   Kopiere die `.env.example` Datei, benenne sie in `.env` um und trage deinen Gemini API Key ein:
   ```bash
   cp .env.example .env
   ```
   *Inhalt der `.env`:*
   ```env
   GEMINI_API_KEY=dein_google_ai_studio_key
   ```

4. **App starten**
   ```bash
   npm run start
   ```

---



## 📂 Projektstruktur
Detaillierte Übersicht über die Verzeichnisarchitektur des Repositories:

```text
xyz-eve/
├── .github/                  # GitHub Actions, CI/CD Pipelines & PR-Templates
├── assets/                   # Statische Ressourcen (Bilder, Icons, Fonts)
├── docs/                     # Produktdokumentation & medizinische Compliance-Docs
├── src/
│   ├── ai/                   # Gemini Integration & AI Studio Logik
│   │   ├── prompts/          # System-Prompts & Kontext-Templates
│   │   ├── config.ts         # AI Studio SDK-Konfiguration & Safety Settings
│   │   └── geminiClient.ts   # API-Wrapper & Error Handling
│   ├── components/           # Wiederverwendbare UI-Komponenten (Atoms, Molecules)
│   │   ├── common/           # Buttons, Inputs, Cards
│   │   └── tracking/         # Spezialisierte Tracker-UI (Slider, Skalen)
│   ├── hooks/                # Custom React Hooks (z.B. useGemini, useTracker)
│   ├── navigation/           # App-Routing (Stack Navigator, Tab Bar)
│   ├── screens/              # Hauptansichten der App
│   │   ├── Dashboard/        # Tagesübersicht & Schnell-Tracking
│   │   ├── SymptomTracker/   # Erfassung von Hitzewallungen, Schlaf, etc.
│   │   ├── AIChat/           # Interaktiver Gemini-Assistent
│   │   └── Reports/          # Export-Vorschau für den Arztbesuch
│   ├── services/             # Externe Dienste & API-Aufrufe
│   ├── store/                # Statusverwaltung (State Management, z.B. Zustand/Redux)
│   ├── types/                # TypeScript-Typdefinitionen (Symptom, ChatMessage, User)
│   └── utils/                # Datumsformatierung, Validierungen & Helper
├── .env.example              # Vorlage für lokale Umgebungsvariablen
├── package.json              # Paketabhängigkeiten & Skripte
└── README.md                 # Projekt-Dokumentation
```

---

## 🗺 Roadmap

- [x] **Phase 1: Fundament & KI-Prototyping**
  - [x] Projekt-Setup im Repository `xyz/eve`
  - [x] Anbindung der Gemini API über Google AI Studio
  - [x] Design und Implementierung der Kern-System-Prompts
- [ ] **Phase 2: Core Symptom-Tracking & UI**
  - [ ] Implementierung der Hauptkategorien (Hitzewallungen, Schlaf, Stimmung, Gehirnnebel)
  - [ ] Interaktiver Chat-Screen mit dem Gemini-Assistenten
  - [ ] Lokale Datenspeicherung und Ende-zu-Ende-Verschlüsselung
- [ ] **Phase 3: Erweiterte Features & Export**
  - [ ] KI-basierte PDF-Berichtsgenerierung für den Arztbesuch
  - [ ] Zyklus-Mustererkennung durch Gemini-Analyse
- [ ] **Phase 4: Compliance & Multi-Platform**
  - [ ] Vollständiges Audit für Medizinprodukt-Compliance & Datenschutz (DSGVO)
  - [ ] Release im Apple App Store & Google Play Store

---

## 🤝 Kontakt & Team

**Projekt & Entwicklung:**
- **Repository:** [github.com/xyz/eve](https://github.com/xyz/eve/)
- **Issue Tracker:** Für Bug Reports und Feature Requests erstelle bitte ein [GitHub Issue](https://github.com/xyz/eve/issues).
- **Projekt-Support:** [contact@xyz-eve.app](mailto:contact@xyz-eve.app)

**Projektverantwortliche:**
- **Lead Developer & AI Engineering:** [Name / GitHub Handle]
- **Product & Medical Advisor:** [Name / Kontakt]

---
*© 2026 Eve Team. Alle Rechte vorbehalten.*
