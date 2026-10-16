import React from 'react';
import { Terminal, Laptop, Apple, Cpu, AlertTriangle, CheckSquare, PlayCircle } from 'lucide-react';

export const ExecutionGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          คู่มือการติดตั้งและวิธีรันโปรแกรมอย่างละเอียด (Step-by-Step)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          โปรเจกต์นี้ใช้เพียง Python 3 และไลบรารีมาตรฐาน (<code className="text-emerald-400">tkinter</code>, <code className="text-emerald-400">json</code>, <code className="text-emerald-400">datetime</code>) จึง<strong>ไม่ต้องใช้ pip install</strong> แพ็กเกจเสริมใดๆ รันได้ทันทีทุกระบบปฏิบัติการ
        </p>
      </div>

      {/* OS tabs / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Windows */}
        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold text-sm">
              <Laptop className="w-4 h-4" />
              <span>Microsoft Windows</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>
                ดาวน์โหลดไฟล์ <code className="text-emerald-400">main.py</code> และ <code className="text-amber-400">data.json</code> ไว้ในโฟลเดอร์เดียวกัน
              </li>
              <li>
                เปิด <strong>Command Prompt (cmd)</strong> หรือ <strong>PowerShell</strong>
              </li>
              <li>
                ใช้คำสั่งเปลี่ยนโฟลเดอร์:
                <pre className="mt-1 p-2 rounded bg-slate-950 font-mono text-[11px] text-cyan-300">
                  cd C:\Users\YourName\saving-app
                </pre>
              </li>
              <li>
                รันโปรแกรม:
                <pre className="mt-1 p-2 rounded bg-slate-950 font-mono text-[11px] text-emerald-300">
                  python main.py
                </pre>
                <span className="text-[11px] text-slate-400">(หรือดับเบิลคลิกไฟล์ main.py โดยตรง)</span>
              </li>
            </ol>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
            💡 ปกติ Tkinter จะติดตั้งมาพร้อมตัว Python บน Windows อัตโนมัติ
          </div>
        </div>

        {/* macOS */}
        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-200 font-bold text-sm">
              <Apple className="w-4 h-4" />
              <span>macOS</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>
                บันทึกไฟล์ทั้ง 3 ไฟล์ลงในโฟลเดอร์ เช่น <code className="text-slate-300">~/saving-app</code>
              </li>
              <li>
                เปิดโปรแกรม <strong>Terminal</strong> (กด Cmd + Space แล้วค้นหา Terminal)
              </li>
              <li>
                ย้ายเข้าโฟลเดอร์:
                <pre className="mt-1 p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-300">
                  cd ~/saving-app
                </pre>
              </li>
              <li>
                รันโปรแกรม:
                <pre className="mt-1 p-2 rounded bg-slate-950 font-mono text-[11px] text-emerald-300">
                  python3 main.py
                </pre>
              </li>
            </ol>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-amber-300/80">
            ⚠️ หากแจ้งเตือน No module tkinter ให้พิมพ์: <code className="font-mono">brew install python-tk</code>
          </div>
        </div>

        {/* Linux */}
        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>Linux (Ubuntu / Debian)</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>
                ติดตั้งแพ็กเกจ Tkinter ของระบบ:
                <pre className="mt-1 p-2 rounded bg-slate-950 font-mono text-[11px] text-amber-300">
                  sudo apt update
                  sudo apt install python3-tk
                </pre>
              </li>
              <li>
                เปิด Terminal ในโฟลเดอร์โปรเจกต์
              </li>
              <li>
                รันโปรแกรม:
                <pre className="mt-1 p-2 rounded bg-slate-950 font-mono text-[11px] text-emerald-300">
                  python3 main.py
                </pre>
              </li>
            </ol>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
            💡 ทำงานได้ทั้งบน X11 และ Wayland Desktop
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-3">
          <CheckSquare className="w-4 h-4 text-indigo-400" />
          รายการตรวจสอบความสมบูรณ์ก่อนส่งอาจารย์ (Verification Checklist)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60 flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>ตรวจสอบ Syntax ผ่านฉลาก (python -m py_compile main.py)</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60 flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>เมื่อยังไม่มี data.json โปรแกรมสร้างไฟล์เริ่มต้นให้อัตโนมัติ</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60 flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>ห้ามใส่จำนวนเงินติดลบ หรือค่าเป้าหมายเป็นศูนย์ (Data Validation)</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60 flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>ปิดโปรแกรมแล้วเปิดใหม่ ข้อมูลยังคงอยู่ครบถ้วน (Persistence)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
