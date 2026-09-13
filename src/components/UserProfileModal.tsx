import React, { useState } from 'react';
import { 
  X, 
  User, 
  Activity, 
  Check, 
  LogIn, 
  LogOut
} from 'lucide-react';
import { UserProfile, CycleRegularity, HrtOption } from '../types';
import { DEMO_PROFILES } from '../data/defaultUserData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUpdateProfile: (updated: UserProfile) => void;
  onSwitchUser: (profile: UserProfile) => void;
  onLogout: () => void;
  savedConnectionsCount: number;
}

const CYCLE_OPTIONS: Array<{ value: CycleRegularity; label: string; description: string }> = [
  { value: 'regular', label: 'Regelmäßig (~28 Tage)', description: 'Kaum Abweichungen in den letzten 12 Monaten' },
  { value: 'irregular_early', label: 'Leicht unregelmäßig (±7 Tage)', description: 'Zykluslänge schwankt, kürzere oder längere Abstände' },
  { value: 'skipped_cycles', label: 'Zyklen übersprungen (>60 Tage)', description: 'Typisch für spätere Perimenopause (STRAW -1)' },
  { value: 'amenorrhea_recent', label: 'Keine Blutung seit 6-11 Monaten', description: 'Übergang zur Menopause' },
  { value: 'amenorrhea_12m', label: '12+ Monate blutungsfrei (Menopause)', description: 'Postmenopause nach WHO-Definition' },
  { value: 'surgical_hysterectomy', label: 'Operativ / Hysterektomie', description: 'Gebärmutterentfernung oder Ovarektomie' }
];

const HRT_OPTIONS: Array<{ value: HrtOption; label: string }> = [
  { value: 'none', label: 'Keine Hormontherapie' },
  { value: 'curious_exploring', label: 'Interessiert / Suche Evidenz & Beratung' },
  { value: 'transdermal_bioidentical', label: 'Bioidentisch transdermal (Östradiol-Gel/Pflaster + Progesteron)' },
  { value: 'oral_hrt', label: 'Kombinierte orale Hormontherapie' },
  { value: 'local_vaginal_only', label: 'Ausschließlich lokale vaginale Östrogene' }
];

const GOAL_OPTIONS = [
  '3-Uhr-Nachts-Schlafqualität wiederherstellen',
  'Brain Fog & Wortfindungsstörungen verstehen',
  'Hitzewallungen & Temperaturspitzen lindern',
  'Stimmungsschwankungen & Reizbarkeit einordnen',
  'Morgendliche Gelenksteifigkeit stoppen',
  'Evidenzbasierte Vorbereitung für das Arztgespräch',
  'Herzstolpern & vegetative Unruhe einordnen'
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  onSwitchUser,
  onLogout,
  savedConnectionsCount
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'accounts' | 'auth'>('profile');
  
  // Profile form state
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [age, setAge] = useState(currentUser?.age || 45);
  const [cycleStatus, setCycleStatus] = useState<CycleRegularity>(currentUser?.cycleStatus || 'skipped_cycles');
  const [hrtStatus, setHrtStatus] = useState<HrtOption>(currentUser?.hrtStatus || 'curious_exploring');
  const [primaryGoals, setPrimaryGoals] = useState<string[]>(currentUser?.primaryGoals || []);
  const [medicalNotes, setMedicalNotes] = useState(currentUser?.medicalNotes || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auth form state for demo
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    let ageGroup = '40-44';
    if (age < 40) ageGroup = '35-39';
    else if (age <= 44) ageGroup = '40-44';
    else if (age <= 49) ageGroup = '45-49';
    else if (age <= 54) ageGroup = '50-54';
    else ageGroup = '55+';

    const updated: UserProfile = {
      ...currentUser,
      name: name.trim() || 'Anonyme Nutzerin',
      email: email.trim() || currentUser.email,
      age: Number(age) || 45,
      ageGroup,
      cycleStatus,
      hrtStatus,
      primaryGoals,
      medicalNotes,
      lastActive: new Date().toISOString().split('T')[0]
    };

    onUpdateProfile(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleToggleGoal = (goal: string) => {
    if (primaryGoals.includes(goal)) {
      setPrimaryGoals(primaryGoals.filter(g => g !== goal));
    } else {
      if (primaryGoals.length < 4) {
        setPrimaryGoals([...primaryGoals, goal]);
      }
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = isRegistering 
      ? (authEmail.split('@')[0] || 'Neue Nutzerin') 
      : 'Sarah Müller';

    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: authEmail || 'demo@eve-health.eu',
      age: 44,
      ageGroup: '40-44',
      cycleStatus: 'irregular_early',
      hrtStatus: 'curious_exploring',
      primaryGoals: [
        '3-Uhr-Nachts-Schlafqualität wiederherstellen',
        'Evidenzbasierte Vorbereitung für das Arztgespräch'
      ],
      medicalNotes: 'Neu registriertes EVE-Nutzerinnenprofil.',
      avatarBg: 'from-[#6D1835] to-[#2B1720]',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    };

    onSwitchUser(newProfile);
    setActiveTab('profile');
    setName(newProfile.name);
    setEmail(newProfile.email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#F6F0E9] rounded-3xl border border-[#DDD4C7] max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#DDD4C7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6D1835] to-[#2B1720] text-white flex items-center justify-center text-xl font-bold shadow-xs">
              {currentUser ? currentUser.name.charAt(0) : 'E'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-xl text-[#2B1720]">
                  {currentUser ? currentUser.name : 'EVE Profil & Login'}
                </h2>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                  EVE Member
                </span>
              </div>
              <p className="text-xs text-[#161616]/75 font-normal">
                EVE — Evidence for every woman • Dein persönlicher Symptom-Pass
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F1] hover:bg-[#EAE2D6] border border-[#DDD4C7] flex items-center justify-center text-[#2B1720] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#2B1720]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-white border-b border-[#DDD4C7] flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-[#2B1720] text-[#2B1720]'
                : 'border-transparent text-[#161616]/70 hover:text-[#2B1720]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>Mein Profil & Zyklus</span>
          </button>

          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'accounts'
                ? 'border-[#2B1720] text-[#2B1720]'
                : 'border-transparent text-[#161616]/70 hover:text-[#2B1720]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>Demo-Profile wechseln</span>
            <span className="text-[10px] bg-[#6D1835]/10 text-[#6D1835] px-1.5 py-0.2 rounded-full font-bold">
              3 Personas
            </span>
          </button>

          <button
            onClick={() => setActiveTab('auth')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'auth'
                ? 'border-[#2B1720] text-[#2B1720]'
                : 'border-transparent text-[#161616]/70 hover:text-[#2B1720]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>Konto / Login</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PROFILE EDIT */}
          {activeTab === 'profile' && currentUser && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Profile Stat Strip */}
              <div className="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-2xl border border-[#DDD4C7] text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6D1835] block">Dot Connections</span>
                  <span className="text-base font-bold text-[#2B1720]">{savedConnectionsCount} Analysen</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6D1835] block">Altersgruppe</span>
                  <span className="text-base font-bold text-[#2B1720]">{currentUser.age} Jahre ({currentUser.ageGroup})</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6D1835] block">Mitglied seit</span>
                  <span className="text-base font-bold text-[#2B1720]">{currentUser.createdAt}</span>
                </div>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-[#E76F61]/15 border border-[#E76F61]/30 rounded-xl text-xs text-[#2B1720] font-bold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-[#6D1835]" />
                  <span>Profil erfolgreich gespeichert! Deine Dot Connections werden mit diesen Daten synchronisiert.</span>
                </div>
              )}

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#2B1720] mb-1">
                    Vollständiger Name / Pseudonym
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DDD4C7] rounded-xl text-sm font-normal text-[#161616] focus:outline-none focus:border-[#6D1835]"
                    placeholder="z.B. Sarah Müller"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1720] mb-1">
                    Alter
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="70"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DDD4C7] rounded-xl text-sm font-normal text-[#161616] focus:outline-none focus:border-[#6D1835]"
                    required
                  />
                </div>
              </div>

              {/* Cycle Status */}
              <div>
                <label className="block text-xs font-bold text-[#2B1720] mb-1.5 flex items-center justify-between">
                  <span>Aktueller Menstruationszyklus-Status</span>
                  <span className="text-[10px] font-normal text-[#161616]/60">Klinische STRAW+10 Basis</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CYCLE_OPTIONS.map(opt => (
                    <div
                      key={opt.value}
                      onClick={() => setCycleStatus(opt.value)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        cycleStatus === opt.value
                          ? 'bg-[#6D1835]/10 border-[#6D1835] text-[#2B1720] shadow-xs'
                          : 'bg-white border-[#DDD4C7] hover:border-[#6D1835]/50 text-[#161616]'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between text-[#2B1720]">
                        <span>{opt.label}</span>
                        {cycleStatus === opt.value && <Check className="w-3.5 h-3.5 text-[#6D1835]" />}
                      </div>
                      <div className="text-[10px] text-[#161616]/75 mt-0.5 font-normal">{opt.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HRT / Hormone Status */}
              <div>
                <label className="block text-xs font-bold text-[#2B1720] mb-1.5">
                  Hormonersatztherapie (HRT) / Aktuelle Unterstützung
                </label>
                <select
                  value={hrtStatus}
                  onChange={e => setHrtStatus(e.target.value as HrtOption)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD4C7] rounded-xl text-xs font-normal text-[#161616] focus:outline-none focus:border-[#6D1835]"
                >
                  {HRT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Focus Goals */}
              <div>
                <label className="block text-xs font-bold text-[#2B1720] mb-1.5 flex items-center justify-between">
                  <span>Deine wichtigsten Schwerpunkte in EVE</span>
                  <span className="text-[10px] text-[#161616]/60 font-normal">Wähle bis zu 4</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GOAL_OPTIONS.map(goal => {
                    const isSelected = primaryGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => handleToggleGoal(goal)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-normal transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2B1720] text-white font-bold shadow-xs'
                            : 'bg-white text-[#161616] border border-[#DDD4C7] hover:bg-[#FAF6F1]'
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Medical Notes */}
              <div>
                <label className="block text-xs font-bold text-[#2B1720] mb-1">
                  Persönliche Notizen für die KI & Arztgespräch
                </label>
                <textarea
                  rows={2}
                  value={medicalNotes}
                  onChange={e => setMedicalNotes(e.target.value)}
                  placeholder="z.B. Blutdruck normal, Schilddrüsenwerte vor 6 Monaten unauffällig, Familienanamnese..."
                  className="w-full px-3.5 py-2 bg-white border border-[#DDD4C7] rounded-xl text-xs text-[#161616] font-normal focus:outline-none focus:border-[#6D1835]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-[#2B1720]/75 hover:text-[#2B1720] cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-[#E76F61]" />
                  <span>Profil aktualisieren</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: DEMO PERSONAS */}
          {activeTab === 'accounts' && (
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-xl border border-[#DDD4C7] text-xs text-[#161616]/80 font-normal">
                💡 <strong>Hackathon Demo-Feature:</strong> Wechsle blitzschnell zwischen typischen klinischen Perimenopause-Profilen, um zu sehen wie sich EVE und die Dot Connections an verschiedene Phasen anpassen.
              </div>

              <div className="space-y-3">
                {DEMO_PROFILES.map(profile => {
                  const isCurrent = currentUser?.id === profile.id;
                  return (
                    <div
                      key={profile.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'bg-white border-[#2B1720] shadow-md' 
                          : 'bg-white/80 border-[#DDD4C7] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D1835] to-[#2B1720] text-white flex items-center justify-center font-bold text-sm`}>
                            {profile.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-[#2B1720]">{profile.name}</h4>
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FAF6F1] border border-[#DDD4C7] text-[#2B1720]">
                                {profile.age} J.
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-[#6D1835]/15 text-[#6D1835]">
                                  Aktiv
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#161616]/75 mt-0.5 font-normal">
                              Status: {profile.cycleStatus === 'skipped_cycles' ? 'Zyklen >60 Tage übersprungen' : profile.cycleStatus === 'irregular_early' ? 'Frühe Zyklusschwankungen' : 'Späte Amenorrhoe'}
                            </p>
                          </div>
                        </div>

                        {!isCurrent && (
                          <button
                            type="button"
                            onClick={() => {
                              onSwitchUser(profile);
                              setName(profile.name);
                              setEmail(profile.email);
                              setAge(profile.age);
                              setCycleStatus(profile.cycleStatus);
                              setHrtStatus(profile.hrtStatus);
                              setPrimaryGoals(profile.primaryGoals);
                              setMedicalNotes(profile.medicalNotes);
                              setActiveTab('profile');
                            }}
                            className="px-3.5 py-1.5 bg-[#FAF6F1] hover:bg-[#2B1720] hover:text-white border border-[#DDD4C7] text-xs font-bold text-[#2B1720] rounded-xl transition-all cursor-pointer"
                          >
                            Als {profile.name.split(' ')[0]} testen
                          </button>
                        )}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#EAE2D6] flex flex-wrap gap-1">
                        {profile.primaryGoals.map((g, i) => (
                          <span key={i} className="text-[10px] bg-[#FAF6F1] text-[#161616]/75 px-2 py-0.5 rounded-md border border-[#DDD4C7] font-normal">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: AUTH / LOGIN / LOGOUT */}
          {activeTab === 'auth' && (
            <div className="space-y-5">
              {currentUser ? (
                <div className="bg-white p-5 rounded-2xl border border-[#DDD4C7] space-y-4 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#6D1835] to-[#2B1720] text-white flex items-center justify-center text-xl font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#2B1720]">Angemeldet als {currentUser.name}</h3>
                    <p className="text-xs text-[#161616]/70 font-normal">{currentUser.email}</p>
                  </div>
                  <p className="text-xs text-[#161616]/80 max-w-sm mx-auto font-normal">
                    Deine Symptom-Verläufe und Dot Connections sind sicher verschlüsselt in deinem EVE-Profil hinterlegt.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={onLogout}
                      className="px-4 py-2 bg-[#E76F61]/15 hover:bg-[#E76F61]/25 text-[#6D1835] text-xs font-bold rounded-xl border border-[#E76F61]/30 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5 text-[#6D1835]" />
                      <span>Abmelden (Gast-Modus)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="bg-white p-5 rounded-2xl border border-[#DDD4C7] space-y-4">
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-[#2B1720]">
                      {isRegistering ? 'Neues EVE-Konto erstellen' : 'In EVE einloggen'}
                    </h3>
                    <p className="text-xs text-[#161616]/75 mt-0.5 font-normal">
                      Evidence for every woman — Speichere deine Symptom-Verläufe dauerhaft.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B1720] mb-1">E-Mail-Adresse</label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      placeholder="deine.email@beispiel.de"
                      required
                      className="w-full px-3 py-2 bg-white border border-[#DDD4C7] rounded-xl text-xs font-normal text-[#161616] focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B1720] mb-1">Passwort</label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2 bg-white border border-[#DDD4C7] rounded-xl text-xs font-normal text-[#161616] focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4 text-[#E76F61]" />
                    <span>{isRegistering ? 'Kostenlos registrieren' : 'Jetzt anmelden'}</span>
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="text-xs text-[#6D1835] font-bold hover:underline cursor-pointer"
                    >
                      {isRegistering ? 'Bereits ein Konto? Hier anmelden' : 'Noch kein Konto? Jetzt registrieren'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
