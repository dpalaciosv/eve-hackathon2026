import React, { useState } from 'react';
import { 
  X, 
  History, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Trash2, 
  Plus, 
  Edit3, 
  Check, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Brain,
  Moon,
  Flame
} from 'lucide-react';
import { DotConnectionHistoryItem, DotConnectionAssessment } from '../types';

interface ConnectionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: DotConnectionHistoryItem[];
  onSelectHistoryItem: (item: DotConnectionHistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  canSaveCurrentSession: boolean;
  onSaveCurrentSession: () => void;
  currentAssessmentAvailable: boolean;
}

export const ConnectionHistoryModal: React.FC<ConnectionHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onDeleteHistoryItem,
  onUpdateNote,
  canSaveCurrentSession,
  onSaveCurrentSession,
  currentAssessmentAvailable
}) => {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleStartEditNote = (item: DotConnectionHistoryItem) => {
    setEditingNoteId(item.id);
    setNoteText(item.userNote || '');
  };

  const handleSaveNote = (id: string) => {
    onUpdateNote(id, noteText);
    setEditingNoteId(null);
  };

  const handleTriggerSaveCurrent = () => {
    onSaveCurrentSession();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] rounded-3xl border border-[#E4DDD0] max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#ECE5D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xl font-bold shadow-xs">
              <History className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-heading font-black text-xl text-[#1E1B18]">
                  Meine Dot Connection Historie
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#7C3AED]">
                  {history.length} Einträge
                </span>
              </div>
              <p className="text-xs text-[#6E6860]">
                EVE — Evidence for every woman • Dein chronologischer Perimenopause-Verlauf
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] border border-[#DDD6C8] flex items-center justify-center text-[#6B655E] hover:text-[#1E1B18] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Banner: Save Current Live Session */}
        {currentAssessmentAvailable && canSaveCurrentSession && (
          <div className="px-6 py-3 bg-[#8B5CF6]/10 border-b border-[#8B5CF6]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#581C87]">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span>
                <strong>Aktive Dot Connection vorhanden!</strong> Möchtest du deine aktuelle Symptom-Analyse als Verlaufseintrag sichern?
              </span>
            </div>
            <button
              onClick={handleTriggerSaveCurrent}
              className="px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Jetzt in Historie speichern</span>
            </button>
          </div>
        )}

        {saveToast && (
          <div className="px-6 py-2 bg-emerald-50 text-emerald-800 text-xs font-bold border-b border-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Aktuelle Dot Connection erfolgreich zu deiner EVE-Historie hinzugefügt!</span>
          </div>
        )}

        {/* History List Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {history.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF0F5] text-[#EC4899] flex items-center justify-center mb-3">
                <History className="w-7 h-7" />
              </div>
              <h3 className="font-serif-heading font-black text-lg text-[#1E1B18] mb-1">
                Noch keine Dot Connections gespeichert
              </h3>
              <p className="text-xs text-[#706A62] max-w-sm mb-4">
                Swipe mindestens 10 Symptome im Swiper und erstelle dein erstes Dot Connection Profil, um deinen biologischen Verlauf hier zu sichern.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Zum Symptom Swiper
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Longitudinal Trajectory Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#E8E1D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#8B5CF6] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> EVE Längsschnitt-Übersicht
                  </span>
                  <h4 className="font-bold text-sm text-[#1E1B18]">
                    Verlauf über {history.length} Messzeitpunkte dokumentiert
                  </h4>
                  <p className="text-xs text-[#6B655E]">
                    Zeigt Ärzten und Ärztinnen objektiv, dass deine Symptome keine Momentaufnahme oder bloßer Stress sind, sondern zyklische hormonelle Muster.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-[#DDD6C8] text-center">
                    <span className="text-[10px] text-zinc-500 block">Frühester Eintrag</span>
                    <span className="text-xs text-[#1E1B18]">{history[history.length - 1]?.date.split(' ')[1] || 'Juli'} 2026</span>
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-[#DDD6C8] text-center">
                    <span className="text-[10px] text-zinc-500 block">Neuester Eintrag</span>
                    <span className="text-xs text-[#8B5CF6]">{history[0]?.date.split(' ')[1] || 'Heute'} 2026</span>
                  </div>
                </div>
              </div>

              {/* Individual History Cards */}
              <div className="space-y-3">
                {history.map((item, index) => {
                  const isLatest = index === 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isLatest
                          ? 'bg-white border-[#8B5CF6]/50 shadow-sm'
                          : 'bg-white/90 border-[#E8E1D5] hover:bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-[#1E1B18] flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                              {item.date}
                            </span>
                            {isLatest && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.2 rounded-full bg-purple-100 text-purple-800">
                                Aktuellste
                              </span>
                            )}
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FAF7F2] text-[#6B655E] border border-[#EAE4D9]">
                              {item.symptomsMatchedCount} Symptome bestätigt
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {item.confidence}
                            </span>
                          </div>

                          <h3 className="font-serif-heading font-black text-base text-[#1E1B18] mt-1.5">
                            {item.stageSummary}
                          </h3>
                          <p className="text-xs text-[#706A62] mt-0.5 line-clamp-2">
                            {item.headline || item.assessment.headline}
                          </p>
                        </div>

                        {/* Open Report Button */}
                        <button
                          type="button"
                          onClick={() => {
                            onSelectHistoryItem(item);
                            onClose();
                          }}
                          className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#8B5CF6] hover:text-white border border-[#DCD5C8] text-xs font-bold text-[#1E1B18] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Dot Profil ansehen</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Symptoms tags */}
                      <div className="mt-3 pt-3 border-t border-[#F2ECE3] flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-bold text-zinc-500 mr-1">Bestätigt:</span>
                        {item.symptomsMatchedTitles.slice(0, 4).map((title, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A453F] border border-[#EAE4D9]"
                          >
                            {title}
                          </span>
                        ))}
                        {item.symptomsMatchedTitles.length > 4 && (
                          <span className="text-[10px] font-bold text-[#8B5CF6] px-1.5 py-0.5">
                            +{item.symptomsMatchedTitles.length - 4} weitere
                          </span>
                        )}
                      </div>

                      {/* User reflection / personal note */}
                      <div className="mt-3 pt-2.5 border-t border-[#F2ECE3] flex items-start justify-between gap-3 text-xs">
                        {editingNoteId === item.id ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={noteText}
                              onChange={e => setNoteText(e.target.value)}
                              placeholder="Notiz hinzufügen (z.B. Arztgespräch, Medikamente, Schlafverlauf)..."
                              className="flex-1 px-3 py-1.5 bg-[#FAF7F2] border border-[#DCD5C8] rounded-xl text-xs text-[#1E1B18] focus:outline-none focus:border-[#8B5CF6]"
                            />
                            <button
                              onClick={() => handleSaveNote(item.id)}
                              className="px-3 py-1.5 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Speichern
                            </button>
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer"
                            >
                              Abbrechen
                            </button>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span className="text-[11px] text-[#6B655E] italic">
                              {item.userNote ? `„${item.userNote}“` : 'Keine persönliche Notiz hinterlegt.'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditNote(item)}
                              className="text-[10px] text-[#8B5CF6] font-bold hover:underline cursor-pointer ml-1"
                            >
                              {item.userNote ? 'Bearbeiten' : '+ Notiz hinzufügen'}
                            </button>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Diesen Verlaufseintrag wirklich löschen?')) {
                              onDeleteHistoryItem(item.id);
                            }
                          }}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Eintrag löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
