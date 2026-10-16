import React, { useState } from 'react';
import JSZip from 'jszip';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  FolderArchive, 
  FileText, 
  Code,
  Info
} from 'lucide-react';
import { MAIN_PY_CODE, DATA_JSON_CODE, README_MD_CODE, GoalData } from '../data/projectData';

interface CodeExplorerProps {
  currentGoal: GoalData;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ currentGoal }) => {
  const [selectedFile, setSelectedFile] = useState<'main.py' | 'data.json' | 'README.md'>('main.py');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  // Use live data for data.json
  const activeCode = 
    selectedFile === 'main.py' 
      ? MAIN_PY_CODE 
      : selectedFile === 'data.json' 
        ? JSON.stringify(currentGoal, null, 4) 
        : README_MD_CODE;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([activeCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      zip.file('main.py', MAIN_PY_CODE);
      zip.file('data.json', JSON.stringify(currentGoal, null, 4));
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
      console.error('Failed to create zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
        {/* File Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFile('main.py')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedFile === 'main.py'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            main.py
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
              Python
            </span>
          </button>

          <button
            onClick={() => setSelectedFile('data.json')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedFile === 'data.json'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-amber-400" />
            data.json
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
              Data
            </span>
          </button>

          <button
            onClick={() => setSelectedFile('README.md')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedFile === 'README.md'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            README.md
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">
              Doc
            </span>
          </button>
        </div>

        {/* Download & Copy Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                คัดลอกแล้ว!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                คัดลอกโค้ด
              </>
            )}
          </button>

          <button
            onClick={handleDownloadSingle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            ดาวน์โหลดไฟล์นี้
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <FolderArchive className="w-3.5 h-3.5" />
            {isZipping ? 'กำลังแพ็ค...' : 'ดาวน์โหลดครบ 3 ไฟล์ (.ZIP)'}
          </button>
        </div>
      </div>

      {/* Highlights note for main.py */}
      {selectedFile === 'main.py' && (
        <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-emerald-300">คำแนะนำในการตรวจโค้ด:</span> โค้ดแบ่งออกเป็น 4 ส่วนหลักชัดเจน: 
            (1) คลาส <code className="text-emerald-400 font-mono">SavingGoal</code> (Model) 
            (2) ฟังก์ชันช่วย <code className="text-amber-400 font-mono">save_data / load_data</code> 
            (3) คลาส <code className="text-indigo-400 font-mono">SavingApp</code> (Tkinter GUI Controller) 
            (4) จุดเริ่มต้นโปรแกรม <code className="text-cyan-400 font-mono">if __name__ == '__main__':</code>
          </div>
        </div>
      )}

      {/* Code Display Area */}
      <div className="rounded-xl border border-slate-700 overflow-hidden bg-slate-950 shadow-xl">
        <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{selectedFile}</span>
          <span>{activeCode.split('\n').length} บรรทัด | UTF-8</span>
        </div>
        <div className="p-4 overflow-x-auto max-h-[600px] text-xs font-mono leading-relaxed select-text">
          <pre className="text-slate-300">
            {activeCode.split('\n').map((line, idx) => (
              <div key={idx} className="table-row hover:bg-slate-900/50">
                <span className="table-cell select-none text-slate-600 text-right pr-4 w-10">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {/* Basic syntax coloring hints */}
                  {line.startsWith('#') || line.startsWith('//') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes('class ') ? (
                    <span className="text-purple-400 font-bold">{line}</span>
                  ) : line.includes('def ') ? (
                    <span className="text-emerald-400 font-medium">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};
