export const MAIN_PY_CODE = `"""
Mini Project: ระบบบันทึกเป้าหมายการออมเงิน (Saving Goal App)
วิชา: Object-Oriented Analysis and Design (OOAD) & Object-Oriented Programming (OOP)
ภาษา: Python (GUI ด้วย Tkinter, บันทึกข้อมูลด้วย JSON)
"""

import os
import json
from datetime import datetime
import tkinter as tk
from tkinter import ttk, messagebox


# ==============================================================================
# 1. คลาส SavingGoal (Model) - ตามหลัก Object-Oriented Programming (OOP)
# ==============================================================================
class SavingGoal:
    """
    คลาสสำหรับจำลองข้อมูลและพฤติกรรมของเป้าหมายการออมเงิน
    หลักการ OOP: Encapsulation (การรวบรวมข้อมูล Attribute และ Method การคำนวณไว้ในคลาสเดียวกัน)
    """

    def __init__(self, goal_name: str, target_amount: float, current_amount: float = 0.0, history: list = None):
        # Attribute (คุณลักษณะของอ็อบเจกต์)
        self.goal_name = str(goal_name).strip()
        self.target_amount = float(target_amount)
        self.current_amount = float(current_amount)
        self.history = history if history is not None else []

    def add_saving(self, amount: float) -> bool:
        """
        เมธอดสำหรับเพิ่มเงินออมเข้าเป้าหมาย
        ตรวจสอบเงื่อนไขความถูกต้อง และบันทึกประวัติวันเวลาลงใน List
        """
        if amount <= 0:
            raise ValueError("จำนวนเงินที่ต้องการออมต้องมากกว่า 0 บาท")

        self.current_amount += amount
        
        # บันทึกประวัติการออมพร้อมระบุวันเวลาปัจจุบัน
        record = {
            "amount": amount,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.history.append(record)
        return True

    def get_remaining_amount(self) -> float:
        """
        คำนวณยอดเงินที่ยังขาดอยู่เพื่อให้บรรลุเป้าหมาย
        ถ้าออมครบหรือเกินแล้ว จะคืนค่าเป็น 0.0 บาท
        """
        remaining = self.target_amount - self.current_amount
        return max(0.0, remaining)

    def get_progress_percentage(self) -> float:
        """
        คำนวณเปอร์เซ็นต์ความคืบหน้าของการออม (0.00% - 100.00%)
        """
        if self.target_amount <= 0:
            return 0.0
        percentage = (self.current_amount / self.target_amount) * 100.0
        return round(min(100.0, percentage), 2)

    def is_achieved(self) -> bool:
        """
        ตรวจสอบสถานะว่าออมครบตามเป้าหมายแล้วหรือไม่
        """
        return self.current_amount >= self.target_amount

    def to_dict(self) -> dict:
        """
        แปลงข้อมูลของอ็อบเจกต์เป็น Dictionary เพื่อบันทึกลงในไฟล์ JSON
        """
        return {
            "goal_name": self.goal_name,
            "target_amount": self.target_amount,
            "current_amount": self.current_amount,
            "history": self.history
        }

    @classmethod
    def from_dict(cls, data: dict):
        """
        สร้างอ็อบเจกต์ SavingGoal ขึ้นมาใหม่จากข้อมูล Dictionary ที่อ่านได้จาก JSON
        """
        return cls(
            goal_name=data.get("goal_name", "เป้าหมายการออม"),
            target_amount=float(data.get("target_amount", 1000.0)),
            current_amount=float(data.get("current_amount", 0.0)),
            history=data.get("history", [])
        )


# ==============================================================================
# 2. ฟังก์ชันช่วยจัดการไฟล์ข้อมูล JSON (Helper Functions)
# ==============================================================================
DATA_FILE = "data.json"


def save_data(goal: SavingGoal, filepath: str = DATA_FILE) -> bool:
    """
    ฟังก์ชันสำหรับบันทึกข้อมูลของเป้าหมายลงในไฟล์ JSON
    """
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(goal.to_dict(), f, ensure_ascii=False, indent=4)
        return True
    except Exception as e:
        print(f"เกิดข้อผิดพลาดในการบันทึกไฟล์: {e}")
        return False


def load_data(filepath: str = DATA_FILE) -> SavingGoal:
    """
    ฟังก์ชันสำหรับโหลดข้อมูลจากไฟล์ JSON
    หากยังไม่มีไฟล์ จะสร้างเป้าหมายเริ่มต้นและสร้างไฟล์ให้อัตโนมัติ
    """
    if not os.path.exists(filepath):
        # สร้างข้อมูลเป้าหมายตัวอย่างเริ่มต้นให้อัตโนมัติ
        default_goal = SavingGoal(goal_name="ซื้ออุปกรณ์การเรียน", target_amount=5000.0)
        save_data(default_goal, filepath)
        return default_goal

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            return SavingGoal.from_dict(data)
    except Exception as e:
        print(f"ไม่สามารถอ่านไฟล์ได้ สร้างเป้าหมายเริ่มต้นใหม่: {e}")
        default_goal = SavingGoal(goal_name="เป้าหมายใหม่", target_amount=3000.0)
        save_data(default_goal, filepath)
        return default_goal


# ==============================================================================
# 3. คลาส SavingApp (GUI Controller) - ตามหลัก Object-Oriented Programming (OOP)
# ==============================================================================
class SavingApp:
    """
    คลาสสำหรับควบคุมหน้าจอ GUI และประสานการทำงานกับ SavingGoal (Controller + View)
    หลักการ OOP: Composition / Association (SavingApp ถือครองและใช้งานอ็อบเจกต์ของ SavingGoal)
    """

    def __init__(self, root: tk.Tk):
        # Attribute อ้างอิงหน้าต่างหลัก Tkinter
        self.root = root
        self.root.title("แอปพลิเคชันออมเงิน (Saving Goal App) - OOAD Project")
        self.root.geometry("620x720")
        self.root.minsize(580, 680)

        # โหลดข้อมูลเป้าหมายเข้ามาเก็บในตัวแปรอ็อบเจกต์
        self.goal = load_data(DATA_FILE)

        # ตั้งค่ารูปแบบสีและธีม
        self._setup_style()

        # สร้างส่วนประกอบของหน้าจอ GUI
        self._create_widgets()

        # อัปเดตข้อมูลบนหน้าจอให้ตรงกับข้อมูลที่โหลดมา
        self.update_display()

    def _setup_style(self):
        """กำหนดลักษณะการแสดงผล (Theme & Style)"""
        style = ttk.Style()
        style.theme_use("clam")

        # ปรับแต่งฟอนต์และสี
        style.configure("Header.TLabel", font=("Helvetica", 14, "bold"), foreground="#1e293b")
        style.configure("SubHeader.TLabel", font=("Helvetica", 11, "bold"), foreground="#334155")
        style.configure("Value.TLabel", font=("Helvetica", 12, "bold"), foreground="#0f766e")
        style.configure("Success.TLabel", font=("Helvetica", 11, "bold"), foreground="#16a34a")
        style.configure("Action.TButton", font=("Helvetica", 10, "bold"), padding=6)

    def _create_widgets(self):
        """สร้างองค์ประกอบบนหน้าต่างทั้งหมด"""
        main_frame = ttk.Frame(self.root, padding="16")
        main_frame.pack(fill=tk.BOTH, expand=True)

        # ส่วนหัวของโปรแกรม (Header)
        title_label = ttk.Label(
            main_frame,
            text="💰 บันทึกเป้าหมายและติดตามการออมเงิน",
            font=("Helvetica", 16, "bold"),
            foreground="#0f172a"
        )
        title_label.pack(pady=(0, 14))

        # ==================== ส่วนที่ 1: กำหนดเป้าหมายใหม่ (Goal Setting) ====================
        goal_group = ttk.LabelFrame(main_frame, text=" 1. กำหนดหรือแก้ไขเป้าหมายการออม ", padding="12")
        goal_group.pack(fill=tk.X, pady=(0, 12))

        # บรรทัดที่ 1: ชื่อเป้าหมาย
        ttk.Label(goal_group, text="ชื่อเป้าหมาย:").grid(row=0, column=0, sticky=tk.W, padx=4, pady=4)
        self.entry_goal_name = ttk.Entry(goal_group, width=28)
        self.entry_goal_name.grid(row=0, column=1, sticky=tk.W, padx=4, pady=4)

        # บรรทัดที่ 2: ยอดเงินเป้าหมาย
        ttk.Label(goal_group, text="จำนวนเงินเป้าหมาย (บาท):").grid(row=1, column=0, sticky=tk.W, padx=4, pady=4)
        self.entry_target_amount = ttk.Entry(goal_group, width=28)
        self.entry_target_amount.grid(row=1, column=1, sticky=tk.W, padx=4, pady=4)

        # ปุ่มบันทึกเป้าหมาย
        btn_set_goal = ttk.Button(
            goal_group,
            text="บันทึกเป้าหมาย",
            style="Action.TButton",
            command=self.set_new_goal
        )
        btn_set_goal.grid(row=0, column=2, rowspan=2, padx=(12, 4), pady=4, sticky="nsew")

        # ==================== ส่วนที่ 2: แสดงผลสรุปและความคืบหน้า (Progress) ====================
        status_group = ttk.LabelFrame(main_frame, text=" 2. ความคืบหน้าการออม ", padding="12")
        status_group.pack(fill=tk.X, pady=(0, 12))

        # แสดงชื่อเป้าหมายปัจจุบัน
        self.lbl_current_goal_name = ttk.Label(status_group, text="-", style="Header.TLabel")
        self.lbl_current_goal_name.pack(anchor=tk.W, pady=(0, 6))

        # แถบ Progress Bar
        self.progress_bar = ttk.Progressbar(status_group, orient="horizontal", mode="determinate", length=400)
        self.progress_bar.pack(fill=tk.X, pady=(4, 8))

        # กล่องแสดงตัวเลขสรุป 4 ช่อง
        stats_frame = ttk.Frame(status_group)
        stats_frame.pack(fill=tk.X, pady=4)

        # ยอดเป้าหมาย
        f1 = ttk.Frame(stats_frame)
        f1.pack(side=tk.LEFT, expand=True, fill=tk.X)
        ttk.Label(f1, text="เป้าหมายทั้งหมด").pack()
        self.lbl_target = ttk.Label(f1, text="0.00 บาท", style="Value.TLabel")
        self.lbl_target.pack()

        # ออมได้แล้ว
        f2 = ttk.Frame(stats_frame)
        f2.pack(side=tk.LEFT, expand=True, fill=tk.X)
        ttk.Label(f2, text="ออมได้แล้ว").pack()
        self.lbl_current = ttk.Label(f2, text="0.00 บาท", style="Value.TLabel")
        self.lbl_current.pack()

        # เงินที่ขาดอีก
        f3 = ttk.Frame(stats_frame)
        f3.pack(side=tk.LEFT, expand=True, fill=tk.X)
        ttk.Label(f3, text="ยอดเงินที่เหลือ").pack()
        self.lbl_remaining = ttk.Label(f3, text="0.00 บาท", style="Value.TLabel")
        self.lbl_remaining.pack()

        # เปอร์เซ็นต์ความสำเร็จ
        f4 = ttk.Frame(stats_frame)
        f4.pack(side=tk.LEFT, expand=True, fill=tk.X)
        ttk.Label(f4, text="ความสำเร็จ").pack()
        self.lbl_percentage = ttk.Label(f4, text="0.00%", style="Value.TLabel")
        self.lbl_percentage.pack()

        # ข้อความแจ้งเตือนเมื่อบรรลุเป้าหมาย
        self.lbl_status_message = ttk.Label(status_group, text="", style="Success.TLabel")
        self.lbl_status_message.pack(pady=(6, 0))

        # ==================== ส่วนที่ 3: เพิ่มเงินออม (Add Saving) ====================
        saving_group = ttk.LabelFrame(main_frame, text=" 3. เพิ่มเงินออมเข้าเป้าหมาย ", padding="12")
        saving_group.pack(fill=tk.X, pady=(0, 12))

        ttk.Label(saving_group, text="จำนวนเงินที่ต้องการออม (บาท):").pack(side=tk.LEFT, padx=(0, 8))
        self.entry_saving_amount = ttk.Entry(saving_group, width=20)
        self.entry_saving_amount.pack(side=tk.LEFT, padx=(0, 12))
        self.entry_saving_amount.bind("<Return>", lambda event: self.add_saving_amount())

        btn_add_saving = ttk.Button(
            saving_group,
            text="➕ เพิ่มเงินออม",
            style="Action.TButton",
            command=self.add_saving_amount
        )
        btn_add_saving.pack(side=tk.LEFT)

        # ==================== ส่วนที่ 4: ประวัติการออมเงิน (History) ====================
        history_group = ttk.LabelFrame(main_frame, text=" 4. ประวัติการเพิ่มเงินออม ", padding="12")
        history_group.pack(fill=tk.BOTH, expand=True)

        columns = ("order", "date", "amount")
        self.tree = ttk.Treeview(history_group, columns=columns, show="headings", height=8)

        # กำหนดหัวตาราง
        self.tree.heading("order", text="ลำดับ")
        self.tree.heading("date", text="วัน-เวลาที่ออม")
        self.tree.heading("amount", text="จำนวนเงิน (บาท)")

        # กำหนดความกว้างคอลัมน์
        self.tree.column("order", width=60, anchor=tk.CENTER)
        self.tree.column("date", width=260, anchor=tk.CENTER)
        self.tree.column("amount", width=180, anchor=tk.E)

        # Scrollbar สำหรับประวัติ
        scrollbar = ttk.Scrollbar(history_group, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscroll=scrollbar.set)

        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    # --------------------------------------------------------------------------
    # เมธอดจัดการ Event และการทำงานของแอปพลิเคชัน
    # --------------------------------------------------------------------------
    def set_new_goal(self):
        """
        ฟังก์ชันรับค่าจากฟอร์ม ตรวจสอบความถูกต้อง แล้วสร้าง/รีเซ็ตเป้าหมายใหม่
        """
        name = self.entry_goal_name.get().strip()
        target_str = self.entry_target_amount.get().strip()

        # ตรวจสอบข้อมูลนำเข้า (Data Validation)
        if not name:
            messagebox.showerror("ข้อผิดพลาด", "กรุณาระบุชื่อเป้าหมายการออม")
            self.entry_goal_name.focus()
            return

        try:
            target = float(target_str)
            if target <= 0:
                messagebox.showerror("ข้อผิดพลาด", "จำนวนเงินเป้าหมายต้องมากกว่า 0 บาท")
                self.entry_target_amount.focus()
                return
        except ValueError:
            messagebox.showerror("ข้อผิดพลาด", "กรุณากรอกจำนวนเงินเป้าหมายเป็นตัวเลขที่ถูกต้อง")
            self.entry_target_amount.focus()
            return

        # ถามยืนยันหากมีเป้าหมายเดิมอยู่แล้ว
        if self.goal and self.goal.current_amount > 0:
            confirm = messagebox.askyesno(
                "ยืนยันการตั้งเป้าหมายใหม่",
                "การตั้งเป้าหมายใหม่จะเริ่มนับเงินออมและประวัติใหม่ ต้องการดำเนินการต่อหรือไม่?"
            )
            if not confirm:
                return

        # สร้างอ็อบเจกต์ SavingGoal ตัวใหม่
        self.goal = SavingGoal(goal_name=name, target_amount=target)
        save_data(self.goal, DATA_FILE)

        # ล้างช่องกรอกและอัปเดตหน้าจอ
        self.entry_goal_name.delete(0, tk.END)
        self.entry_target_amount.delete(0, tk.END)
        self.update_display()

        messagebox.showinfo("สำเร็จ", f"ตั้งเป้าหมาย '{name}' เรียบร้อยแล้ว!")

    def add_saving_amount(self):
        """
        ฟังก์ชันรับเงินออมจากฟอร์ม เรียกใช้เมธอดของ SavingGoal และบันทึกผล
        """
        if not self.goal:
            messagebox.showerror("ข้อผิดพลาด", "กรุณาตั้งเป้าหมายการออมก่อน")
            return

        amount_str = self.entry_saving_amount.get().strip()

        # ตรวจสอบความถูกต้องของจำนวนเงิน
        try:
            amount = float(amount_str)
            if amount <= 0:
                messagebox.showerror("ข้อผิดพลาด", "จำนวนเงินที่ออมต้องมากกว่า 0 บาท")
                self.entry_saving_amount.focus()
                return
        except ValueError:
            messagebox.showerror("ข้อผิดพลาด", "กรุณากรอกจำนวนเงินออมเป็นตัวเลขที่ถูกต้อง")
            self.entry_saving_amount.focus()
            return

        try:
            # เรียกใช้เมธอด add_saving ของอ็อบเจกต์ SavingGoal (ตามหลัก OOP)
            self.goal.add_saving(amount)
            save_data(self.goal, DATA_FILE)

            # ล้างช่องกรอกเงินออม
            self.entry_saving_amount.delete(0, tk.END)

            # อัปเดตหน้าจอ
            self.update_display()

            # แจ้งเตือนหากบรรลุเป้าหมาย
            if self.goal.is_achieved():
                messagebox.showinfo(
                    "🎉 ยินดีด้วย!",
                    f"คุณออมเงินครบตามเป้าหมาย '{self.goal.goal_name}' แล้ว!\\n"
                    f"ยอดรวม: {self.goal.current_amount:,.2f} บาท"
                )
            else:
                messagebox.showinfo("สำเร็จ", f"ออมเงินเพิ่ม {amount:,.2f} บาท สำเร็จ!")

        except Exception as e:
            messagebox.showerror("ข้อผิดพลาด", str(e))

    def update_display(self):
        """
        อัปเดตข้อมูลบนหน้าจอ GUI ให้สะท้อนข้อมูลปัจจุบันของอ็อบเจกต์ SavingGoal
        """
        if not self.goal:
            return

        # อัปเดตข้อความสรุป
        self.lbl_current_goal_name.config(text=f"🎯 เป้าหมาย: {self.goal.goal_name}")
        self.lbl_target.config(text=f"{self.goal.target_amount:,.2f} ฿")
        self.lbl_current.config(text=f"{self.goal.current_amount:,.2f} ฿")
        self.lbl_remaining.config(text=f"{self.goal.get_remaining_amount():,.2f} ฿")

        # คำนวณเปอร์เซ็นต์
        percentage = self.goal.get_progress_percentage()
        self.lbl_percentage.config(text=f"{percentage:.2f}%")

        # อัปเดตแถบ Progress Bar
        self.progress_bar["value"] = percentage

        # แสดงข้อความสถานะความสำเร็จ
        if self.goal.is_achieved():
            self.lbl_status_message.config(
                text="🎉 บรรลุเป้าหมายการออมเรียบร้อยแล้ว ยอดเยี่ยมมาก!",
                foreground="#16a34a"
            )
        else:
            self.lbl_status_message.config(
                text=f"ขาดอีกเพียง {self.goal.get_remaining_amount():,.2f} บาท จะถึงเป้าหมาย สู้ๆ!",
                foreground="#2563eb"
            )

        # ล้างและเติมข้อมูลในตารางประวัติ (Treeview)
        for item in self.tree.get_children():
            self.tree.delete(item)

        # แสดงรายการล่าสุดไว้ด้านบน (ย้อนกลับลำดับ)
        for idx, item in enumerate(reversed(self.goal.history), start=1):
            date_str = item.get("date", "-")
            amt = float(item.get("amount", 0.0))
            self.tree.insert("", tk.END, values=(idx, date_str, f"+{amt:,.2f}"))


# ==============================================================================
# 4. จุดเริ่มต้นการทำงานของโปรแกรม (Main Entry Point)
# ==============================================================================
if __name__ == "__main__":
    root = tk.Tk()
    app = SavingApp(root)
    root.mainloop()
`;

export const DATA_JSON_CODE = `{
    "goal_name": "ซื้อ iPad เพื่อการศึกษา",
    "target_amount": 15000.0,
    "current_amount": 4500.0,
    "history": [
        {
            "amount": 2000.0,
            "date": "2026-10-10 14:30:00"
        },
        {
            "amount": 1500.0,
            "date": "2026-10-12 18:45:22"
        },
        {
            "amount": 1000.0,
            "date": "2026-10-15 09:15:10"
        }
    ]
}`;

export const README_MD_CODE = `# 💰 มินิโปรเจกต์: ระบบบันทึกเป้าหมายการออมเงิน (Saving Goal App)
**วิชา:** Object-Oriented Analysis and Design (OOAD) & Object-Oriented Programming (OOP)  
**ภาษาและเครื่องมือ:** Python 3, Tkinter GUI, JSON Data Persistence

---

## 1. เอกสารการออกแบบเชิงวิเคราะห์ (OOAD Document)

### 1.1 Problem Statement & วัตถุประสงค์ (Objectives)
* **Problem Statement:** ในชีวิตประจำวัน ผู้คนมักตั้งเป้าหมายทางการเงิน เช่น เก็บเงินซื้ออุปกรณ์การเรียน หรือสะสมเงินทุนสำรอง แต่ขาดเครื่องมือที่เรียบง่ายในการบันทึกและเห็นภาพความก้าวหน้าอย่างชัดเจน ทำให้ขาดแรงจูงใจและลืมติดตามยอดเงินออม
* **วัตถุประสงค์ (Objectives):**
  1. เพื่อสร้างโปรแกรมคอมพิวเตอร์แบบเดสก์ท็อป (Desktop GUI) ที่ช่วยให้ผู้ใช้งานสามารถตั้งเป้าหมายการออมและบันทึกเงินออมได้สะดวกรวดเร็ว
  2. เพื่อนำหลักการวิเคราะห์และออกแบบเชิงวัตถุ (OOAD) และการเขียนโปรแกรมเชิงวัตถุ (OOP) มาประยุกต์ใช้ในการแก้ปัญหาจริง
  3. เพื่อให้ข้อมูลถูกจัดเก็บแบบคงทน (Persistence) ในรูปแบบไฟล์ JSON โดยไม่ต้องติดตั้งระบบฐานข้อมูลภายนอกที่ซับซ้อน

---

### 1.2 ข้อกำหนดฟังก์ชันการทำงาน (Functional Requirements)
ระบบมุ่งเน้นความเรียบง่าย โดยมีฟังก์ชันหลัก 4 ประการ:
1. **FR-01 (เพิ่ม/กำหนดเป้าหมายการออม):** ผู้ใช้สามารถระบุ "ชื่อเป้าหมาย" (Goal Name) และ "จำนวนเงินเป้าหมาย" (Target Amount) ที่มากกว่า 0 บาทได้
2. **FR-02 (เพิ่มเงินออมเข้าเป้าหมาย):** ผู้ใช้สามารถป้อนจำนวนเงินที่ต้องการออมสะสมเพิ่ม (Deposit Amount) โดยระบบจะตรวจสอบค่าต้องมากกว่า 0 บาท และบันทึกเวลาที่ทำรายการอัตโนมัติ
3. **FR-03 (แสดงผลสรุปและเปอร์เซ็นต์):** ระบบจะคำนวณและแสดงผล:
   - ยอดเงินเป้าหมายรวม
   - ยอดเงินที่ออมได้สะสมแล้ว
   - ยอดเงินที่ยังขาดอยู่ (\`max(0, target - current)\`)
   - เปอร์เซ็นต์ความสำเร็จของการออม (\`(current / target) * 100%\`) พร้อมแถบ Progress Bar
4. **FR-04 (ดูประวัติการเพิ่มเงินออม):** ผู้ใช้สามารถเรียกดูรายการประวัติการหยอดเงินออมย้อนหลัง พร้อมวัน-เวลาและจำนวนเงินที่ออมในแต่ละครั้ง

---

### 1.3 Use Case Diagram
- **Actor:** ผู้ใช้งาน (User)
- **Use Cases:**
  - UC-01: กำหนดเป้าหมายการออม (Set Saving Goal)
  - UC-02: เพิ่มเงินออมเข้าเป้าหมาย (Add Savings)
  - UC-03: ติดตามความคืบหน้าและเปอร์เซ็นต์ (View Progress & Percentage)
  - UC-04: ตรวจสอบประวัติการออมเงิน (View History)

---

### 1.4 แผนภาพคลาส (Class Diagram)
- **SavingGoal** (Model: \`goal_name\`, \`target_amount\`, \`current_amount\`, \`history\`, \`add_saving()\`, \`get_remaining_amount()\`, \`get_progress_percentage()\`)
- **SavingApp** (Controller & View: \`root\`, \`goal\`, UI Widgets, \`set_new_goal()\`, \`add_saving_amount()\`, \`update_display()\`)
- ความสัมพันธ์: \`SavingApp\` ประกอบด้วยและเรียกใช้อ็อบเจกต์ \`SavingGoal\` (Composition / Association)
`;

export interface GoalData {
  goal_name: string;
  target_amount: number;
  current_amount: number;
  history: Array<{
    amount: number;
    date: string;
  }>;
}

export const INITIAL_GOAL: GoalData = {
  goal_name: "ซื้อ iPad เพื่อการศึกษา",
  target_amount: 15000,
  current_amount: 4500,
  history: [
    { amount: 2000, date: "2026-10-10 14:30:00" },
    { amount: 1500, date: "2026-10-12 18:45:22" },
    { amount: 1000, date: "2026-10-15 09:15:10" }
  ]
};

