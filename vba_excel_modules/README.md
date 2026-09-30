# Enterprise Logistics Suite · VBA Excel Macro Modules (.xlsm)

All macro modules in this folder are **100% Pure English (ASCII compliant)** to ensure seamless compatibility with Microsoft Excel's Visual Basic for Applications (VBA) editor without character encoding corruption (no `?` question marks).

---

### Data Integrity Principle
- **All data is strictly read from your Excel worksheets** (`List`, `Chicken db`, `Pork db`, `Beef db`, `Suppliers`).
- **Zero hardcoded figures or invented values** exist in any routine.
- Modifying a quantity, price, code, or status in the worksheet immediately updates all calculations.

---

### Files Structure

| File | Target in VBA Editor (`Alt + F11`) | Purpose |
|------|-----------------------------------|---------|
| `01_Sheet_List_Events.cls` | **`Microsoft Excel Objects -> Sheet1 (List)`** | Event handler for `Worksheet_Change`, auto-lookups, 10 calculation subroutines, missing cell alerts. |
| `02_ThisWorkbook_Events.cls` | **`Microsoft Excel Objects -> ThisWorkbook`** | `Workbook_BeforeSave` guard preventing save if BU (Status) is blank; auto-trigger `Workbook_Open`. |
| `03_Dashboard_Macro_Engine.bas` | **`Modules -> Insert -> Module`** | Complete executive statistics engine (totals, product share %, mean prices, sample variance `Var_S`, stddev, BU status distribution, arrival histogram). |
| `04_Master_Orchestrator.bas` | **`Modules -> Insert -> Module`** | Master pipeline coordinator from Technical Specification blueprint (`Main_UpdateAllData`). |
| `05_Poti_Radar_Alerts.bas` | **`Modules -> Insert -> Module`** | `CheckPotiArrivals` scanning AN & AT for 15-20 days, and header notification macros `Column_A_Notification` to `Column_BU_Notification`. |

---

### Step-by-Step Installation into Excel (.xlsm)

1. Open your Excel workbook (`.xlsm`) and press **`Alt + F11`** to open the VBA Editor.
2. In the Project Explorer (left pane):
   - Double-click **`Sheet1 (List)`** and paste the code from **`01_Sheet_List_Events.cls`**.
   - Double-click **`ThisWorkbook`** and paste the code from **`02_ThisWorkbook_Events.cls`**.
3. From the top menu, choose **`Insert -> Module`**:
   - Rename to `Module_DashboardEngine` and paste **`03_Dashboard_Macro_Engine.bas`**.
4. Choose **`Insert -> Module`** again:
   - Rename to `Module_MasterOrchestrator` and paste **`04_Master_Orchestrator.bas`**.
5. Choose **`Insert -> Module`** again:
   - Rename to `Module_PotiRadar` and paste **`05_Poti_Radar_Alerts.bas`**.
6. Press **`Ctrl + S`** to save your workbook as **Excel Macro-Enabled Workbook (*.xlsm)**.
