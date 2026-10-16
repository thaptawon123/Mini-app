import React, { useState } from 'react';
import JSZip from 'jszip';
import { 
  PiggyBank, 
  Monitor, 
  FileCode2, 
  Terminal, 
  FolderArchive, 
  BookOpen
} from 'lucide-react';
import { TkinterSimulator } from './components/TkinterSimulator';
import { OoadDocument } from './components/OoadDocument';
import { CodeExplorer } from './components/CodeExplorer';
import { ExecutionGuide } from './components/ExecutionGuide';
import { INITIAL_GOAL, GoalData, MAIN_PY_CODE, README_MD_CODE } from './data/projectData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'ooad' | 'code' | 'guide'>('simulator');
  const [goal, setGoal] = useState<GoalData>(INITIAL_GOAL);
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadAllZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      zip.file('main.py', MAIN_PY_CODE);
      zip.file('data.json', JSON.stringify(goal, null, 4));
      zip.file('README.md', README_MD_CODE);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'saving-goal-app.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-['Prompt',sans-serif]">
      {/* Top Navigation / Brand Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                <PiggyBank className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Saving Goal App
                  </h1>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                    Mini Project OOAD + OOP
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  ระบบบันทึกเป้าหมายการออมเงิน • Python (Tkinter + JSON)
                </p>
              </div>
            </div>

            {/* Top Download Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950"
              >
                <FolderArchive className="w-4 h-4" />
                {isZipping ? 'กำลังบีบอัด...' : 'ดาวน์โหลดโปรเจกต์ (.ZIP)'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-3">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'simulator'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              🖥️ จำลองโปรแกรมจริง (Tkinter)
            </button>

            <button
              onClick={() => setActiveTab('ooad')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'ooad'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              📐 การออกแบบ OOAD & Diagrams
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'code'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              💻 โค้ดโปรแกรม (3 ไฟล์)
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'guide'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              🚀 วิธีติดตั้ง & รันโปรแกรม
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simulator' && (
          <TkinterSimulator goal={goal} setGoal={setGoal} />
        )}

        {activeTab === 'ooad' && (
          <OoadDocument />
        )}

        {activeTab === 'code' && (
          <CodeExplorer currentGoal={goal} />
        )}

        {activeTab === 'guide' && (
          <ExecutionGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            มินิโปรเจกต์วิชา Object-Oriented Analysis and Design (OOAD) & Object-Oriented Programming (OOP)
          </div>
          <div className="flex items-center gap-3 font-mono text-slate-400">
            <span>main.py</span>
            <span>•</span>
            <span>data.json</span>
            <span>•</span>
            <span>README.md</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
