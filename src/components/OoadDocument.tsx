import React, { useState } from 'react';
import { 
  Layers, 
  Target, 
  CheckCircle, 
  FileText, 
  Code2, 
  ShieldCheck, 
  Boxes, 
  Workflow, 
  Users, 
  Database,
  ArrowRight
} from 'lucide-react';

export const OoadDocument: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'usecase' | 'classdiagram' | 'oop'>('overview');

  return (
    <div className="space-y-6">
      {/* Sub navigation for OOAD */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          1. วัตถุประสงค์ & Requirements
        </button>

        <button
          onClick={() => setActiveTab('usecase')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'usecase'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          2. Use Case Diagram
        </button>

        <button
          onClick={() => setActiveTab('classdiagram')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'classdiagram'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          3. Class Diagram & ความสัมพันธ์
        </button>

        <button
          onClick={() => setActiveTab('oop')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'oop'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          4. การนำหลักการ OOP มาใช้
        </button>
      </div>

      {/* Tab 1: Overview & Functional Requirements */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Problem Statement Card */}
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-400">
              <Target className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-100">
                Problem Statement และที่มาของโปรเจกต์
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              ในชีวิตประจำวัน นักเรียน นักศึกษา และบุคคลทั่วไปมักจะตั้งเป้าหมายทางการเงิน เช่น ต้องการเก็บเงินซื้ออุปกรณ์การเรียน ค่าเทอม หรือเงินสำรองฉุกเฉิน แต่บ่อยครั้งที่ขาดเครื่องมือที่เรียบง่าย สะดวกรวดเร็ว และเห็นภาพความก้าวหน้าอย่างชัดเจน ทำให้ขาดแรงจูงใจและลืมติดตามยอดเงินออม
            </p>
            <div className="mt-4 pt-4 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                <div className="text-xs font-semibold text-emerald-400 mb-1">🎯 วัตถุประสงค์ที่ 1</div>
                <div className="text-xs text-slate-300">
                  สร้างโปรแกรม Desktop GUI ด้วย Tkinter ที่ใช้งานง่าย ตอบโจทย์การใช้งานจริง
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                <div className="text-xs font-semibold text-indigo-400 mb-1">🧠 วัตถุประสงค์ที่ 2</div>
                <div className="text-xs text-slate-300">
                  ฝึกฝนการวิเคราะห์ออกแบบ OOAD และเขียนโปรแกรมเชิงวัตถุ OOP อย่างถูกต้อง
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                <div className="text-xs font-semibold text-amber-400 mb-1">💾 วัตถุประสงค์ที่ 3</div>
                <div className="text-xs text-slate-300">
                  จัดเก็บข้อมูลแบบคงทน (Persistence) ด้วย JSON ไฟล์ โดยไม่ต้องพึ่งพาฐานข้อมูลภายนอก
                </div>
              </div>
            </div>
          </div>

          {/* 4 Functional Requirements */}
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md">
            <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              ข้อกำหนดฟังก์ชันการทำงานหลัก 4 ประการ (Functional Requirements)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  FR-01
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    เพิ่ม/กำหนดเป้าหมายการออม (Add Saving Goal)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    ผู้ใช้สามารถระบุชื่อเป้าหมาย (เช่น ซื้อ iPad) และจำนวนเงินเป้าหมายที่ต้องการ โดยระบบจะตรวจสอบค่าต้องมากกว่า 0 บาท และสามารถรีเซ็ตหรือแก้ไขเป้าหมายใหม่ได้
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  FR-02
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    เพิ่มเงินออมเข้าเป้าหมาย (Deposit Savings)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    ผู้ใช้สามารถกรอกจำนวนเงินเพื่อสะสมเพิ่มได้ตลอดเวลา ระบบจะตรวจสอบความถูกต้อง (ห้ามติดลบ) และแสตมป์วัน-เวลาที่ออมลงในประวัติอัตโนมัติ
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  FR-03
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    แสดงยอดที่ออมได้ ยอดคงเหลือ และเปอร์เซ็นต์
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    คำนวณและแสดงผลสรุปแบบ Real-time: ยอดเป้าหมาย, ยอดเงินสะสม, ยอดเงินที่ยังขาดอยู่, และเปอร์เซ็นต์ความสำเร็จ พร้อม Progress Bar และการแจ้งเตือนเมื่อสำเร็จ
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  FR-04
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    ดูประวัติการเพิ่มเงินออม (View History)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    แสดงตารางประวัติรายการออมเงินทั้งหมด พร้อมลำดับ วันที่-เวลาที่ทำรายการ และจำนวนเงินที่ฝากเข้าเป้าหมาย ช่วยให้ผู้ใช้ตรวจสอบย้อนหลังได้ชัดเจน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Use Case Diagram */}
      {activeTab === 'usecase' && (
        <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-400" />
                แผนภาพ Use Case Diagram
              </h3>
              <p className="text-xs text-slate-400">
                แสดงขอบเขตของระบบ (System Boundary) และปฏิสัมพันธ์ระหว่างผู้ใช้งาน (Actor) กับ Use Cases
              </p>
            </div>
          </div>

          {/* Interactive Visual Use Case Diagram */}
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-700/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Actor */}
              <div className="md:col-span-3 flex flex-col items-center justify-center p-6 rounded-xl bg-slate-800/80 border border-indigo-500/30 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 mb-3 shadow-inner">
                  <Users className="w-8 h-8" />
                </div>
                <div className="font-bold text-sm text-slate-100">ผู้ใช้งาน (User)</div>
                <div className="text-[11px] text-slate-400 mt-1">Primary Actor</div>
                <div className="mt-3 text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  ผู้ตั้งเป้าหมาย & หยอดเงินออม
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="hidden md:flex md:col-span-1 justify-center text-slate-500">
                <ArrowRight className="w-6 h-6 animate-pulse" />
              </div>

              {/* System Boundary Box */}
              <div className="md:col-span-8 p-5 rounded-xl bg-slate-950/80 border-2 border-dashed border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    System Boundary: ระบบบันทึกเป้าหมายการออมเงิน (Saving Goal App)
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                    <span>data.json</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-indigo-500 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                      <span>UC-01</span>
                      <span className="text-slate-200">กำหนดเป้าหมายการออม</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      ระบุชื่อเป้าหมาย และยอดเงินเป้าหมาย (&gt; 0)
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-emerald-500 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                      <span>UC-02</span>
                      <span className="text-slate-200">เพิ่มเงินออมเข้าเป้าหมาย</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      ป้อนจำนวนเงิน และบันทึกเวลาทำรายการอัตโนมัติ
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
                      <span>UC-03</span>
                      <span className="text-slate-200">ดูสรุปความคืบหน้า & %</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      คำนวณยอดออมได้, ยอดที่เหลือ, และ % ความสำเร็จ
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-purple-500 transition-colors">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs mb-1">
                      <span>UC-04</span>
                      <span className="text-slate-200">ดูประวัติการออมย้อนหลัง</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      ตรวจสอบรายการออมเงินทั้งหมดในตาราง Treeview
                    </p>
                  </div>
                </div>

                {/* Sub include */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 italic">
                    &lt;&lt;include&gt;&gt; ทั้งหมดถูกบันทึกและโหลดอัตโนมัติผ่านโมดูล JSON Persistence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Class Diagram */}
      {activeTab === 'classdiagram' && (
        <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-indigo-400" />
                แผนภาพคลาส (UML Class Diagram)
              </h3>
              <p className="text-xs text-slate-400">
                สถาปัตยกรรม 2 คลาสหลัก: SavingGoal (Model) และ SavingApp (View/Controller)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card 1: SavingGoal (Model) */}
            <div className="rounded-xl overflow-hidden border border-emerald-500/40 bg-slate-900 shadow-lg flex flex-col">
              <div className="bg-emerald-950/80 px-4 py-3 border-b border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono">Entity / Model Class</span>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">SavingGoal</h4>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Business Logic
                </span>
              </div>

              {/* Attributes */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/40">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 font-mono">Attributes (คุณลักษณะ)</div>
                <div className="space-y-1 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">goal_name:</span>
                    <span className="text-emerald-400">str</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">target_amount:</span>
                    <span className="text-emerald-400">float</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">current_amount:</span>
                    <span className="text-emerald-400">float</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">history:</span>
                    <span className="text-emerald-400">list[dict]</span>
                  </div>
                </div>
              </div>

              {/* Methods */}
              <div className="p-4 flex-1 bg-slate-900/60">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 font-mono">Methods (พฤติกรรม)</div>
                <div className="space-y-1.5 font-mono text-xs text-slate-300">
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">__init__(goal_name, target, current=0, history=None)</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">add_saving(amount: float)</span>: <span className="text-indigo-400">bool</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">get_remaining_amount()</span>: <span className="text-indigo-400">float</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">get_progress_percentage()</span>: <span className="text-indigo-400">float</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">is_achieved()</span>: <span className="text-indigo-400">bool</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">to_dict()</span>: <span className="text-indigo-400">dict</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">from_dict(data: dict)</span>: <span className="text-indigo-400">SavingGoal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: SavingApp (View/Controller) */}
            <div className="rounded-xl overflow-hidden border border-indigo-500/40 bg-slate-900 shadow-lg flex flex-col">
              <div className="bg-indigo-950/80 px-4 py-3 border-b border-indigo-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-mono">GUI & Controller Class</span>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">SavingApp</h4>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Tkinter Interface
                </span>
              </div>

              {/* Attributes */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/40">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 font-mono">Attributes (คุณลักษณะ)</div>
                <div className="space-y-1 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">root:</span>
                    <span className="text-indigo-400">tk.Tk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100 font-semibold text-amber-300">goal:</span>
                    <span className="text-emerald-400 font-semibold">SavingGoal</span>
                    <span className="text-[10px] text-slate-500">(1 instance)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">entry_goal_name / entry_target:</span>
                    <span className="text-indigo-400">ttk.Entry</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">progress_bar:</span>
                    <span className="text-indigo-400">ttk.Progressbar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400">-</span>
                    <span className="text-slate-100">tree:</span>
                    <span className="text-indigo-400">ttk.Treeview</span>
                  </div>
                </div>
              </div>

              {/* Methods */}
              <div className="p-4 flex-1 bg-slate-900/60">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 font-mono">Methods (พฤติกรรม)</div>
                <div className="space-y-1.5 font-mono text-xs text-slate-300">
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">__init__(root: tk.Tk)</span>
                  </div>
                  <div>
                    <span className="text-rose-400">- </span>
                    <span className="text-slate-100">_setup_style()</span>: <span className="text-indigo-400">None</span>
                  </div>
                  <div>
                    <span className="text-rose-400">- </span>
                    <span className="text-slate-100">_create_widgets()</span>: <span className="text-indigo-400">None</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">set_new_goal()</span>: <span className="text-indigo-400">None</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">add_saving_amount()</span>: <span className="text-indigo-400">None</span>
                  </div>
                  <div>
                    <span className="text-emerald-400">+ </span>
                    <span className="text-slate-100">update_display()</span>: <span className="text-indigo-400">None</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Relationship Details */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
            <h4 className="text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider flex items-center gap-2">
              <span className="text-amber-400">🔗</span> คำอธิบายความสัมพันธ์ระหว่างคลาส (Association / Composition)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              คลาส <code className="text-indigo-300 font-mono">SavingApp</code> มีความสัมพันธ์แบบ <strong>Has-A Relationship</strong> กับ <code className="text-emerald-300 font-mono">SavingGoal</code> โดยในตัวแปร <code className="text-amber-300 font-mono">self.goal</code> จะเก็บอ็อบเจกต์ของ <code className="text-emerald-300 font-mono">SavingGoal</code> ไว้หนึ่งตัวเสมอ เมื่อผู้ใช้กดปุ่มบันทึกเงินออม คลาส <code className="text-indigo-300 font-mono">SavingApp</code> จะส่งข้อความ (Message Passing) ไปยังเมธอด <code className="text-emerald-300 font-mono">self.goal.add_saving(amount)</code> เพื่อให้โมเดลประมวลผล แล้วนำผลลัพธ์มาอัปเดตหน้าจอ GUI ผ่าน <code className="text-indigo-300 font-mono">update_display()</code>
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: OOP Principles */}
      {activeTab === 'oop' && (
        <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700 shadow-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-700">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">
              การนำหลักการ OOP มาประยุกต์ใช้ในโปรเจกต์
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                <span>1. Encapsulation (การห่อหุ้มข้อมูล)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                รวมข้อมูลเป้าหมาย (ชื่อ, ยอดเป้าหมาย, ยอดสะสม, ประวัติ) และเมธอดคำนวณไว้ในคลาส <code className="text-emerald-300">SavingGoal</code> พร้อมดักจับความผิดพลาด (Validation) ในเมธอด <code className="text-emerald-300">add_saving</code> เพื่อป้องกันไม่ให้ข้อมูลภายนอกถูกแก้ไขโดยตรง
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <span>2. Abstraction (การซ่อนรายละเอียดที่ซับซ้อน)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                คลาส GUI (<code className="text-indigo-300">SavingApp</code>) เพียงเรียก <code className="text-emerald-300">goal.get_progress_percentage()</code> ก็ได้ผลลัพธ์เปอร์เซ็นต์โดยไม่ต้องคำนวณสูตรคณิตศาสตร์เอง หรือเรียก <code className="text-emerald-300">to_dict()</code> โดยไม่ต้องรู้วิธีการจัดโครงสร้าง Dictionary
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <span>3. Separation of Concerns (การแบ่งแยกหน้าที่)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                แบ่งออกเป็น 2 ชั้นชัดเจน: <strong>Model Layer</strong> (<code className="text-emerald-300">SavingGoal</code>) รับผิดชอบกฎเกณฑ์ของเงินออม และ <strong>View/Controller Layer</strong> (<code className="text-indigo-300">SavingApp</code>) รับผิดชอบวิดเจ็ตหน้าจอและการคลิกของเมาส์
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                <span>4. Reusability & Extensibility (การนำกลับมาใช้ใหม่)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                คลาส <code className="text-emerald-300">SavingGoal</code> เป็นอิสระจาก Tkinter อย่างสมบูรณ์ ทำให้นักศึกษาสามารถนำไปประยุกต์ใช้ทำ Command-Line Interface (CLI), Web API (Flask/FastAPI), หรือ Mobile Application ได้โดยไม่ต้องแก้โค้ดโมเดลเลย
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
