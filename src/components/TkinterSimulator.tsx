import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  FileCode, 
  Save, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GoalData, INITIAL_GOAL } from '../data/projectData';

interface TkinterSimulatorProps {
  goal: GoalData;
  setGoal: React.Dispatch<React.SetStateAction<GoalData>>;
}

export const TkinterSimulator: React.FC<TkinterSimulatorProps> = ({ goal, setGoal }) => {
  // Form inputs
  const [goalNameInput, setGoalNameInput] = useState('');
  const [targetAmountInput, setTargetAmountInput] = useState('');
  const [savingAmountInput, setSavingAmountInput] = useState('');

  // Simulated Tkinter messagebox dialog state
  const [dialog, setDialog] = useState<{
    show: boolean;
    type: 'info' | 'error' | 'confirm';
    title: string;
    message: string;
    onConfirm?: () => void;
  } | null>(null);

  // JSON Drawer toggle
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  // Calculations (Exact logic of SavingGoal class)
  const remainingAmount = Math.max(0, goal.target_amount - goal.current_amount);
  const progressPercentage = goal.target_amount > 0 
    ? Math.min(100, Math.round(((goal.current_amount / goal.target_amount) * 100) * 100) / 100)
    : 0;
  const isAchieved = goal.current_amount >= goal.target_amount && goal.target_amount > 0;

  // 1. Action: Set New Goal (FR-01)
  const handleSetGoal = () => {
    const trimmedName = goalNameInput.trim();
    if (!trimmedName) {
      setDialog({
        show: true,
        type: 'error',
        title: 'ข้อผิดพลาด',
        message: 'กรุณาระบุชื่อเป้าหมายการออม'
      });
      return;
    }

    const targetNum = parseFloat(targetAmountInput);
    if (isNaN(targetNum) || targetNum <= 0) {
      setDialog({
        show: true,
        type: 'error',
        title: 'ข้อผิดพลาด',
        message: 'จำนวนเงินเป้าหมายต้องเป็นตัวเลขที่มากกว่า 0 บาท'
      });
      return;
    }

    const executeChange = () => {
      const newGoal: GoalData = {
        goal_name: trimmedName,
        target_amount: targetNum,
        current_amount: 0,
        history: []
      };
      setGoal(newGoal);
      setGoalNameInput('');
      setTargetAmountInput('');
      setDialog({
        show: true,
        type: 'info',
        title: 'สำเร็จ',
        message: `ตั้งเป้าหมาย "${trimmedName}" ยอดเงิน ${targetNum.toLocaleString()} บาท เรียบร้อยแล้ว!`
      });
    };

    if (goal.current_amount > 0) {
      setDialog({
        show: true,
        type: 'confirm',
        title: 'ยืนยันการตั้งเป้าหมายใหม่',
        message: 'การตั้งเป้าหมายใหม่จะเริ่มนับเงินออมและประวัติใหม่ ต้องการดำเนินการต่อหรือไม่?',
        onConfirm: executeChange
      });
    } else {
      executeChange();
    }
  };

  // 2. Action: Add Saving (FR-02)
  const handleAddSaving = () => {
    const amountNum = parseFloat(savingAmountInput);
    if (isNaN(amountNum) || amountNum <= 0) {
      setDialog({
        show: true,
        type: 'error',
        title: 'ข้อผิดพลาด',
        message: 'จำนวนเงินที่ออมต้องมากกว่า 0 บาท'
      });
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newCurrent = goal.current_amount + amountNum;
    const newRecord = {
      amount: amountNum,
      date: dateStr
    };

    const updatedGoal: GoalData = {
      ...goal,
      current_amount: newCurrent,
      history: [...goal.history, newRecord]
    };

    setGoal(updatedGoal);
    setSavingAmountInput('');

    // Check achievement
    if (newCurrent >= goal.target_amount) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setDialog({
        show: true,
        type: 'info',
        title: '🎉 ยินดีด้วย!',
        message: `คุณออมเงินครบตามเป้าหมาย "${goal.goal_name}" แล้ว!\nยอดสะสมรวม: ${newCurrent.toLocaleString()} บาท`
      });
    } else {
      setDialog({
        show: true,
        type: 'info',
        title: 'สำเร็จ',
        message: `ออมเงินเพิ่ม ${amountNum.toLocaleString()} บาท สำเร็จ!`
      });
    }
  };

  const handleResetToDemo = () => {
    setGoal({ ...INITIAL_GOAL });
    setDialog({
      show: true,
      type: 'info',
      title: 'รีเซ็ตข้อมูลแล้ว',
      message: 'โหลดข้อมูลตัวอย่างเริ่มต้นเรียบร้อยแล้ว'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            Tk
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 flex items-center gap-2">
              Python Tkinter Live Simulator
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                ทำงานเหมือนโค้ด main.py 100%
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ทดสอบลองกรอกข้อมูล ดูการคำนวณ ความถูกต้อง (Validation) และการบันทึกข้อมูล
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJsonInspector(!showJsonInspector)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            {showJsonInspector ? 'ซ่อน JSON' : 'ตรวจสอบ data.json สด'}
          </button>
          <button
            onClick={handleResetToDemo}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-700/60 hover:bg-slate-600/80 text-slate-300 transition-colors"
            title="รีเซ็ตเป็นข้อมูลตัวอย่างเริ่มต้น"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            รีเซ็ตข้อมูลตัวอย่าง
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Tkinter App Window (Col 7 or 8) */}
        <div className={`${showJsonInspector ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-600 bg-slate-100 text-slate-800">
            {/* Window Title Bar */}
            <div className="bg-gradient-to-r from-slate-200 to-slate-300 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="text-base">💰</span>
                <span className="text-xs font-semibold text-slate-700 font-mono tracking-tight">
                  แอปพลิเคชันออมเงิน (Saving Goal App) - OOAD Project
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-rose-400/80 border border-rose-500/50"></div>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 space-y-5 bg-[#f8fafc]">
              {/* Header Title */}
              <div className="text-center pb-2 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
                  <span>💰</span> บันทึกเป้าหมายและติดตามการออมเงิน
                </h2>
                <p className="text-xs text-slate-500">
                  ระบบจำลองการทำงานของคลาส <code className="text-emerald-700 font-mono font-semibold">SavingApp</code> & <code className="text-indigo-700 font-mono font-semibold">SavingGoal</code>
                </p>
              </div>

              {/* 1. Goal Setting Frame */}
              <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">1</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    กำหนดหรือแก้ไขเป้าหมายการออม
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-5">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      ชื่อเป้าหมาย:
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ซื้อหูฟัง, เก็บเงินสำรอง"
                      value={goalNameInput}
                      onChange={(e) => setGoalNameInput(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      จำนวนเงินเป้าหมาย (บาท):
                    </label>
                    <input
                      type="number"
                      placeholder="เช่น 5000"
                      value={targetAmountInput}
                      onChange={(e) => setTargetAmountInput(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <button
                      onClick={handleSetGoal}
                      className="w-full py-2 px-3 text-xs font-bold rounded bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      บันทึกเป้าหมาย
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Progress Overview Frame */}
              <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      ความคืบหน้าการออม
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    🎯 เป้าหมาย: {goal.goal_name || 'ยังไม่มีเป้าหมาย'}
                  </span>
                </div>

                {/* Progress Bar (Mimicking ttk.Progressbar) */}
                <div className="my-3">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1">
                    <span>ความสำเร็จ</span>
                    <span className="font-bold text-slate-900">{progressPercentage}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAchieved 
                          ? 'bg-emerald-500' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* 4 Stats Cards (Exact values from SavingGoal methods) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500">เป้าหมายทั้งหมด</div>
                    <div className="text-sm font-bold text-slate-800">
                      {goal.target_amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200 text-center">
                    <div className="text-[11px] text-emerald-700">ออมได้แล้ว</div>
                    <div className="text-sm font-bold text-emerald-800">
                      {goal.current_amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-amber-50/60 border border-amber-200 text-center">
                    <div className="text-[11px] text-amber-700">ยอดเงินที่เหลือ</div>
                    <div className="text-sm font-bold text-amber-800">
                      {remainingAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-indigo-50/60 border border-indigo-200 text-center">
                    <div className="text-[11px] text-indigo-700">ความสำเร็จ</div>
                    <div className="text-sm font-bold text-indigo-800">
                      {progressPercentage}%
                    </div>
                  </div>
                </div>

                {/* Status message */}
                <div className="mt-3 text-center text-xs font-semibold">
                  {isAchieved ? (
                    <span className="text-emerald-600 flex items-center justify-center gap-1.5 bg-emerald-50 py-1 rounded border border-emerald-200">
                      <Sparkles className="w-3.5 h-3.5" />
                      🎉 บรรลุเป้าหมายการออมเรียบร้อยแล้ว ยอดเยี่ยมมาก!
                    </span>
                  ) : (
                    <span className="text-blue-600">
                      ขาดอีกเพียง {remainingAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท จะถึงเป้าหมาย สู้ๆ!
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Add Saving Frame */}
              <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">3</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    เพิ่มเงินออมเข้าเป้าหมาย
                  </h4>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      จำนวนเงินที่ต้องการออม (บาท):
                    </label>
                    <input
                      type="number"
                      placeholder="เช่น 200, 500, 1000"
                      value={savingAmountInput}
                      onChange={(e) => setSavingAmountInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddSaving();
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <button
                    onClick={handleAddSaving}
                    className="w-full sm:w-auto mt-auto py-2 px-5 text-xs font-bold rounded bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>➕</span> เพิ่มเงินออม
                  </button>
                </div>
              </div>

              {/* 4. History Treeview Frame */}
              <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">4</span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      ประวัติการเพิ่มเงินออม (ttk.Treeview)
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400">
                    ทั้งหมด {goal.history.length} รายการ
                  </span>
                </div>

                <div className="rounded border border-slate-200 overflow-hidden bg-slate-50 max-h-56 overflow-y-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-200/80 text-slate-700 sticky top-0 font-medium">
                      <tr>
                        <th className="py-2 px-3 text-center border-b border-slate-300 w-16">ลำดับ</th>
                        <th className="py-2 px-4 border-b border-slate-300">วัน-เวลาที่ออม</th>
                        <th className="py-2 px-4 text-right border-b border-slate-300">จำนวนเงิน (บาท)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {goal.history.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-6 text-center text-slate-400 italic">
                            ยังไม่มีประวัติการออมเงิน กรุณาเพิ่มเงินออมในช่องด้านบน
                          </td>
                        </tr>
                      ) : (
                        [...goal.history].reverse().map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 text-center text-slate-500 font-mono">
                              {goal.history.length - idx}
                            </td>
                            <td className="py-2 px-4 text-slate-700 font-mono text-[11px]">
                              {item.date}
                            </td>
                            <td className="py-2 px-4 text-right font-semibold text-emerald-700 font-mono">
                              +{item.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Realtime JSON Inspector Drawer */}
        {showJsonInspector && (
          <div className="lg:col-span-4 bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200 font-mono">
                  data.json (สถานะบนดิสก์)
                </span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                Auto-saved
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-3">
              นี่คือโครงสร้าง JSON ที่ฟังก์ชัน <code className="text-emerald-300">save_data()</code> บันทึกลงในไฟล์ <code className="text-emerald-300">data.json</code> จริง
            </p>
            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto max-h-[500px] border border-slate-800">
              {JSON.stringify(goal, null, 4)}
            </pre>
          </div>
        )}
      </div>

      {/* Simulated Tkinter MessageBox Modal */}
      {dialog && dialog.show && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-300 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Dialog Header */}
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{dialog.title}</span>
              <button
                onClick={() => setDialog(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Dialog Body */}
            <div className="p-5 flex items-start gap-4">
              {dialog.type === 'error' && (
                <AlertCircle className="w-9 h-9 text-rose-500 shrink-0" />
              )}
              {dialog.type === 'info' && (
                <CheckCircle2 className="w-9 h-9 text-emerald-500 shrink-0" />
              )}
              {dialog.type === 'confirm' && (
                <AlertCircle className="w-9 h-9 text-amber-500 shrink-0" />
              )}

              <div className="flex-1">
                <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                  {dialog.message}
                </p>
              </div>
            </div>

            {/* Dialog Buttons */}
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              {dialog.type === 'confirm' ? (
                <>
                  <button
                    onClick={() => setDialog(null)}
                    className="px-4 py-1.5 text-xs rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-medium"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => {
                      if (dialog.onConfirm) dialog.onConfirm();
                      setDialog(null);
                    }}
                    className="px-4 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  >
                    ตกลง
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setDialog(null)}
                  className="px-5 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                >
                  ตกลง (OK)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
