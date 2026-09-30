Attribute VB_Name = "Module_PotiRadar"
' ==============================================================================
' Description: Scans Column AT for Poti plan dates arriving within 15-20 days
'              and displays a summary notification with container numbers (Column AN).
' Author: Davit Petrosyan
' ==============================================================================
Option Explicit

Public Sub CheckPotiArrivals()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim dataRange As Variant
    Dim i As Long
    Dim arrivalDate As Date
    Dim daysDiff As Long
    Dim containerNo As String
    Dim resultMsg As String
    Dim matchCount As Long
    
    On Error GoTo ErrorHandler
    
    Set ws = ThisWorkbook.Sheets("List")
    
    ' Find the last non-empty row in column AN or AT (formerly AM or AS)
    lastRow = ws.Cells(ws.Rows.Count, "AN").End(xlUp).Row
    If ws.Cells(ws.Rows.Count, "AT").End(xlUp).Row > lastRow Then
        lastRow = ws.Cells(ws.Rows.Count, "AT").End(xlUp).Row
    End If
    
    ' Check if there is data beyond the header row
    If lastRow < 2 Then
        MsgBox "No data found to evaluate.", vbInformation, "Poti Container Check"
        Exit Sub
    End If
    
    ' Load data into an array for fast processing (AN is col 40, AT is col 46 -> 7 columns)
    dataRange = ws.Range("AN2:AT" & lastRow).Value
    
    resultMsg = ""
    matchCount = 0
    
    ' Loop through the loaded array
    For i = 1 To UBound(dataRange, 1)
        ' Check if the date field is valid
        If IsDate(dataRange(i, 7)) Then ' Index 7 corresponds to column AT in AN:AT range
            arrivalDate = CDate(dataRange(i, 7))
            daysDiff = DateDiff("d", Date, arrivalDate)
            
            ' Filter containers arriving in 15 to 20 days (inclusive)
            If daysDiff >= 15 And daysDiff <= 20 Then
                containerNo = Trim(CStr(dataRange(i, 1))) ' Index 1 corresponds to column AN
                If containerNo = "" Then
                    containerNo = "[No Container Number]"
                End If
                
                matchCount = matchCount + 1
                resultMsg = resultMsg & "- " & containerNo & " (Date: " & Format(arrivalDate, "yyyy-mm-dd") & ", Days left: " & daysDiff & ")" & vbCrLf
            End If
        End If
    Next i
    
    ' Display notification
    If matchCount > 0 Then
        MsgBox "Containers arriving in Poti within 15-20 days (" & matchCount & " found):" & vbCrLf & vbCrLf & resultMsg, _
               vbInformation, "Poti Arrival Notification"
    Else
        MsgBox "Currently there are no containers scheduled to arrive in Poti within 15-20 days.", _
               vbInformation, "Poti Arrival Notification"
    End If

    Exit Sub

ErrorHandler:
    MsgBox "An error occurred during checking: " & Err.Description, vbCritical, "Error"
End Sub

' ==============================================================================
' Description: Individual notification routines for header shape clicks (A to BU)
' ==============================================================================

Public Sub Column_A_Notification()
    MsgBox "Row sequence number (N/N). Automatically generated unique entry identifier.", vbInformation, "Column A Info"
End Sub

Public Sub Column_B_Notification()
    MsgBox "Order Creation Date. Shows the date when the purchase order was generated.", vbInformation, "Column B Info"
End Sub

Public Sub Column_C_Notification()
    MsgBox "Item Product Code. Internal system stock code for the ordered product.", vbInformation, "Column C Info"
End Sub

Public Sub Column_D_Notification()
    MsgBox "Item Name / Description. Detailed specifications and grade of the product.", vbInformation, "Column D Info"
End Sub

Public Sub Column_E_Notification()
    MsgBox "Order Quantity. Total volume or weight ordered for this specific item.", vbInformation, "Column E Info"
End Sub

Public Sub Column_F_Notification()
    MsgBox "Unit of Measurement (UOM). Defines how quantity is measured (e.g., kg, pcs, tons).", vbInformation, "Column F Info"
End Sub

Public Sub Column_G_Notification()
    MsgBox "Supplier Code. Internal unique identification number of the supplier.", vbInformation, "Column G Info"
End Sub

Public Sub Column_H_Notification()
    MsgBox "Supplier Name. Legal company name of the direct vendor/supplier.", vbInformation, "Column H Info"
End Sub

Public Sub Column_I_Notification()
    MsgBox "Exporter Name. Legal entity or foreign vendor responsible for exporting the goods.", vbInformation, "Column I Info"
End Sub

Public Sub Column_J_Notification()
    MsgBox "Brand Name / Manufacturer. Trade name, producer details, or plant approval code for the items.", vbInformation, "Column J Info"
End Sub

Public Sub Column_K_Notification()
    MsgBox "Ordered Quantity (006). Confirmed quantity.", vbInformation, "Column K Info"
End Sub

Public Sub Column_L_Notification()
    MsgBox "Unit Price. Agreed price per unit of measurement.", vbInformation, "Column L Info"
End Sub

Public Sub Column_M_Notification()
    MsgBox "Currency. Financial currency code used for pricing (e.g., USD, EUR).", vbInformation, "Column M Info"
End Sub

Public Sub Column_N_Notification()
    MsgBox "Total Amount. Calculated total value for the ordered quantity (Quantity x Price).", vbInformation, "Column N Info"
End Sub

Public Sub Column_O_Notification()
    MsgBox "Transport / Freight Cost (USD). Freight and logistics expenses calculated based on the Incoterm condition.", vbInformation, "Column O Info"
End Sub

Public Sub Column_P_Notification()
    MsgBox "Contract / Proforma Invoice No. Official reference number of the agreement or proforma invoice.", vbInformation, "Column P Info"
End Sub

Public Sub Column_Q_Notification()
    MsgBox "Contract / Proforma Date. Signing or issue date of the contract or proforma invoice.", vbInformation, "Column Q Info"
End Sub

Public Sub Column_R_Notification()
    MsgBox "Production Deadline / Supplier Confirmed Date. Production schedule date, confirmed by the supplier and buyer.", vbInformation, "Column R Info"
End Sub

Public Sub Column_S_Notification()
    MsgBox "Expiration Date / Confirmed by Supplier. Shelf life or expiry date confirmed by supplier and buyer.", vbInformation, "Column S Info"
End Sub

Public Sub Column_T_Notification()
    MsgBox "Production Date per Document. Manufacturing date stated in official shipping or invoice documents.", vbInformation, "Column T Info"
End Sub

Public Sub Column_U_Notification()
    MsgBox "Expiration Date per Document. Expiry date stated in official shipping or invoice documents.", vbInformation, "Column U Info"
End Sub

Public Sub Column_V_Notification()
    MsgBox "Prepayment Percentage (%). Percentage of total order value required as advance payment.", vbInformation, "Column V Info"
End Sub

Public Sub Column_W_Notification()
    MsgBox "Prepayment Terms. Specific condition for issuing advance payment (e.g., against documents, before production).", vbInformation, "Column W Info"
End Sub

Public Sub Column_X_Notification()
    MsgBox "Prepayment Period (Days). Number of days allocated or allowed for advance payment execution.", vbInformation, "Column X Info"
End Sub

Public Sub Column_Y_Notification()
    MsgBox "Final Payment Percentage (%). Remaining percentage of total order value to be settled upon final terms.", vbInformation, "Column Y Info"
End Sub

Public Sub Column_Z_Notification()
    MsgBox "Final Payment Terms. Specific condition for final balance payment (e.g., after production receipt, upon arrival).", vbInformation, "Column Z Info"
End Sub

Public Sub Column_AA_Notification()
    MsgBox "Final Payment Period (Days). Number of days allocated or allowed for final payment settlement.", vbInformation, "Column AA Info"
End Sub

Public Sub Column_AB_Notification()
    MsgBox "Prepayment Amount. Calculated monetary value of advance payment.", vbInformation, "Column AB Info"
End Sub

Public Sub Column_AC_Notification()
    MsgBox "Prepayment Payment Date. Actual execution date when advance payment was processed.", vbInformation, "Column AC Info"
End Sub

Public Sub Column_AD_Notification()
    MsgBox "Prepayment Confirmation Date by Supplier. Date when supplier officially confirmed receipt of prepayment.", vbInformation, "Column AD Info"
End Sub

Public Sub Column_AE_Notification()
    MsgBox "Interim Payment Amount. Value of partial or interim payment made between advance and final balance.", vbInformation, "Column AE Info"
End Sub

Public Sub Column_AF_Notification()
    MsgBox "Interim Payment Date. Execution date of interim payment.", vbInformation, "Column AF Info"
End Sub

Public Sub Column_AG_Notification()
    MsgBox "Assigned Warehouse Entry Date. Instructed or target date for goods to enter warehouse.", vbInformation, "Column AG Info"
End Sub

Public Sub Column_AH_Notification()
    MsgBox "Planned Container Loading Date. Scheduled date for loading container at origin.", vbInformation, "Column AH Info"
End Sub

Public Sub Column_AI_Notification()
    MsgBox "Planned Container Loading Date per Proforma. Target loading date specified in initial proforma invoice.", vbInformation, "Column AI Info"
End Sub

Public Sub Column_AJ_Notification()
    MsgBox "Export Country. Country of origin where goods are shipped from.", vbInformation, "Column AJ Info"
End Sub

Public Sub Column_AK_Notification()
    MsgBox "Dispatch / Shipping Instructions Status. Indicates whether specific operational or document instructions have been issued.", vbInformation, "Column AK Info"
End Sub

Public Sub Column_AL_Notification()
    MsgBox "Cargo Photos Receipt Status. Indicates whether photographic verification of cargo/loading was received (YES/NO).", vbInformation, "Column AL Info"
End Sub

Public Sub Column_AM_Notification()
    MsgBox "Transport Mode / Shipping Line. Carrier, logistics line, or transport type utilized.", vbInformation, "Column AM Info"
End Sub

Public Sub Column_AN_Notification()
    MsgBox "Container or Waybill Number. Identification number of container or shipping document (e.g., Bill of Lading / CMR).", vbInformation, "Column AN Info"
End Sub

Public Sub Column_AO_Notification()
    MsgBox "Planned Container Loading Date. Scheduled date for loading container at origin.", vbInformation, "Column AO Info"
End Sub

Public Sub Column_AP_Notification()
    MsgBox "Departure Date from Origin (ETD). Actual or estimated date of departure from origin port or terminal.", vbInformation, "Column AP Info"
End Sub

Public Sub Column_AQ_Notification()
    MsgBox "Current Tracking Status (Daily). Daily operational tracking update regarding cargo location or transit phase.", vbInformation, "Column AQ Info"
End Sub

Public Sub Column_AR_Notification()
    MsgBox "Istanbul Transshipment Date. Date of cargo arrival or handling at Istanbul transit hub.", vbInformation, "Column AR Info"
End Sub

Public Sub Column_AS_Notification()
    MsgBox "Departure Date from Istanbul/Odessa. Departure date of cargo from transit port toward final destination route.", vbInformation, "Column AS Info"
End Sub

Public Sub Column_AT_Notification()
    MsgBox "Poti Planned Discharge Date (ETA). Scheduled date for container arrival and discharge at Poti port.", vbInformation, "Column AT Info"
End Sub

Public Sub Column_AU_Notification()
    MsgBox "Poti Actual Arrival / Discharge Date. Actual date container was discharged or handled at Poti port.", vbInformation, "Column AU Info"
End Sub

Public Sub Column_AV_Notification()
    MsgBox "Container Pick-up Date. Date when empty or loaded container was picked up from terminal.", vbInformation, "Column AV Info"
End Sub

Public Sub Column_AW_Notification()
    MsgBox "Container Return / Delivery Date. Date when container was gate-in or returned to depot.", vbInformation, "Column AW Info"
End Sub

Public Sub Column_AX_Notification()
    MsgBox "Free Days Period. Free demurrage and detention period allowed for container usage.", vbInformation, "Column AX Info"
End Sub

Public Sub Column_AY_Notification()
    MsgBox "Secondary Documents Handover Date. Second verification or internal routing date for original shipping documents.", vbInformation, "Column AY Info"
End Sub

Public Sub Column_AZ_Notification()
    MsgBox "Courier Express Company. Express delivery service provider used for shipping physical trade documents (e.g., DHL, FedEx).", vbInformation, "Column AZ Info"
End Sub

Public Sub Column_BA_Notification()
    MsgBox "Courier Tracking Number (AWB). Air waybill or tracking reference number for courier shipment.", vbInformation, "Column BA Info"
End Sub

Public Sub Column_BB_Notification()
    MsgBox "Original Documents Receipt Date. Date when physical shipping documents were received.", vbInformation, "Column BB Info"
End Sub

Public Sub Column_BC_Notification()
    MsgBox "Documents Submission / Handover Date. Date when shipping documents were handed over for processing or customs clearance.", vbInformation, "Column BC Info"
End Sub

Public Sub Column_BD_Notification()
    MsgBox "Commercial Invoice Number. Official invoice document number issued by supplier.", vbInformation, "Column BD Info"
End Sub

Public Sub Column_BE_Notification()
    MsgBox "Commercial Invoice Date. Issue date of final commercial invoice.", vbInformation, "Column BE Info"
End Sub

Public Sub Column_BF_Notification()
    MsgBox "Invoiced Quantity. Total item quantity billed in commercial invoice.", vbInformation, "Column BF Info"
End Sub

Public Sub Column_BG_Notification()
    MsgBox "Invoiced Amount (521). Total invoice monetary value billed to buyer under standard accounting category 521.", vbInformation, "Column BG Info"
End Sub

Public Sub Column_BH_Notification()
    MsgBox "Retained / Withheld Amount. Value withheld from payment pending compliance or final audit.", vbInformation, "Column BH Info"
End Sub

Public Sub Column_BI_Notification()
    MsgBox "Final Payment Amount. Outstanding balance payable to supplier upon completion of terms.", vbInformation, "Column BI Info"
End Sub

Public Sub Column_BJ_Notification()
    MsgBox "Planned Final Payment Date. Scheduled target date for processing final balance payment.", vbInformation, "Column BJ Info"
End Sub

Public Sub Column_BK_Notification()
    MsgBox "Actual Final Payment Date. Actual execution date when final balance payment was completed.", vbInformation, "Column BK Info"
End Sub

Public Sub Column_BL_Notification()
    MsgBox "Final Payment Confirmation Date by Supplier. Date when supplier officially confirmed receipt of final payment balance.", vbInformation, "Column BL Info"
End Sub

Public Sub Column_BM_Notification()
    MsgBox "Planned Customs Terminal Entry Date (ETA). Scheduled date for cargo arrival and entry at customs terminal.", vbInformation, "Column BM Info"
End Sub

Public Sub Column_BN_Notification()
    MsgBox "Customs Declaration Number. Official reference number assigned to the customs declaration.", vbInformation, "Column BN Info"
End Sub

Public Sub Column_BO_Notification()
    MsgBox "Customs Declaration Registration Date. Official date when the declaration was registered with customs authorities.", vbInformation, "Column BO Info"
End Sub

Public Sub Column_BP_Notification()
    MsgBox "Customs Release Date. Date when customs officially cleared and released the cargo.", vbInformation, "Column BP Info"
End Sub

Public Sub Column_BQ_Notification()
    MsgBox "Customs Duties Payment Date. Execution date of mandatory customs duties, taxes, or clearance fees.", vbInformation, "Column BQ Info"
End Sub

Public Sub Column_BR_Notification()
    MsgBox "Freight Forwarder / Carrier. Inland or local logistics company responsible for cargo transportation.", vbInformation, "Column BR Info"
End Sub

Public Sub Column_BS_Notification()
    MsgBox "HS Code (Commodity Code). Harmonized System commodity code for international trade classification.", vbInformation, "Column BS Info"
End Sub

Public Sub Column_BT_Notification()
    MsgBox "Transport / Freight Expense Amount. Final internal transport and shipping costs incurred.", vbInformation, "Column BT Info"
End Sub

Public Sub Column_BU_Notification()
    MsgBox "Order Status (Mandatory). Mandatory tracking status field indicating current stage (e.g., In Transit, Customs Warehouse).", vbInformation, "Column BU Info"
End Sub

' ==============================================================================
' Description: Automatically links header shapes in row 1 (columns A to BU)
'              to their corresponding notification macros.
' ==============================================================================
Public Sub AutoAssignMacrosToShapes()
    Dim ws As Worksheet
    Dim shp As Shape
    Dim colLetter As String
    Dim colNum As Long
    Dim totalAssigned As Long
    Dim targetCell As Range
    
    Set ws = ThisWorkbook.Sheets("List")
    totalAssigned = 0
    
    ' Loop through all shapes on the sheet
    For Each shp In ws.Shapes
        ' Safely check TopLeftCell to prevent Run-time error
        Set targetCell = Nothing
        On Error Resume Next
        Set targetCell = shp.TopLeftCell
        On Error GoTo 0
        
        ' Check if shape is positioned in Row 1 (Header row)
        If Not targetCell Is Nothing Then
            If targetCell.Row = 1 Then
                colNum = targetCell.Column
                
                ' Process Columns 1 to 73 (A to BU)
                If colNum >= 1 And colNum <= 73 Then
                    colLetter = Split(ws.Cells(1, colNum).Address, "$")(1)
                    
                    ' Assign macro function dynamically based on column letter
                    shp.OnAction = "Column_" & colLetter & "_Notification"
                    totalAssigned = totalAssigned + 1
                End If
            End If
        End If
    Next shp
    
    MsgBox "Successfully assigned macros to " & totalAssigned & " shapes!", vbInformation, "Done"
End Sub
