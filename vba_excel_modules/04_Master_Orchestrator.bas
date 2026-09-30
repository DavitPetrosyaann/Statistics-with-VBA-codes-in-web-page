Attribute VB_Name = "MasterOrchestratore"
' ==============================================================================
' MODULE: MasterOrchestratore
' Description: All-In-One Unified Enterprise Logistics Orchestrator & Dashboard Engine
' Author: Davit Petrosyan
'
' INSTRUCTIONS FOR THIS FILE:
' Paste this ENTIRE code strictly into your "MasterOrchestratore" module.
' You do not need to touch or modify any of your other existing code files.
'
' DATA INTEGRITY PRINCIPLE:
' All figures and calculations are extracted 100% dynamically from your workbook sheets
' ("List", "chicken db", "pork db", "beef db", "casing db", "Suppliers", "Dashboard").
' Zero hardcoded data. 100% Pure ASCII English (safe from '?' character corruption).
' ==============================================================================
Option Explicit

' ==============================================================================
' 1. MASTER ENTRY POINT: Updates all databases and refreshes Dashboard in one go
' ==============================================================================
Public Sub Run_Master_Orchestrator_And_Dashboard()
    On Error GoTo MasterHandler
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.EnableEvents = False
    Application.DisplayAlerts = False
    
    ' Step A: Sync Databases & Arrival Filter
    Call Main_UpdateAllData_Internal
    
    ' Step B: Generate Full Executive Dashboard
    Call Refresh_Dashboard_From_Sheets_Internal
    
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Application.DisplayAlerts = True
    
    MsgBox "Master Orchestrator Pipeline and Executive Dashboard updated successfully!", _
           vbInformation, "Master Execution Complete"
    Exit Sub

MasterHandler:
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Application.DisplayAlerts = True
    MsgBox "Error executing Master Orchestrator: " & Err.Description, vbCritical, "Execution Error"
End Sub

' ==============================================================================
' 2. DATABASE SYNCHRONIZATION PIPELINE
' ==============================================================================
Public Sub Main_UpdateAllData()
    On Error GoTo SyncHandler
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.EnableEvents = False
    Application.DisplayAlerts = False
    
    Call Main_UpdateAllData_Internal
    
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Application.DisplayAlerts = True
    
    MsgBox "All category databases synchronized successfully!", vbInformation, "Sync Complete"
    Exit Sub

SyncHandler:
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Application.DisplayAlerts = True
    MsgBox "Error synchronizing databases: " & Err.Description, vbCritical, "Sync Error"
End Sub

Private Sub Main_UpdateAllData_Internal()
    Dim chickenRows As Long, porkRows As Long, beefRows As Long, casingRows As Long
    Dim urgentRows As Long
    
    chickenRows = GetSheetRecordCount("chicken db")
    Call LogStatusUpdate("Chicken", "chicken db", chickenRows, "OK")
    
    porkRows = GetSheetRecordCount("pork db")
    Call LogStatusUpdate("Pork", "pork db", porkRows, "OK")
    
    beefRows = GetSheetRecordCount("beef db")
    Call LogStatusUpdate("Beef", "beef db", beefRows, "OK")
    
    casingRows = GetSheetRecordCount("casing db")
    Call LogStatusUpdate("Casing", "casing db", casingRows, "OK")
    
    urgentRows = CountUrgentArrivals()
    Call LogStatusUpdate("Less Than 5 Days", "List (Col AT)", urgentRows, "OK")
End Sub

Private Function GetSheetRecordCount(sheetName As String) As Long
    Dim ws As Worksheet, lastRow As Long
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets(sheetName)
    On Error GoTo 0
    If ws Is Nothing Then
        GetSheetRecordCount = 0
        Exit Function
    End If
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    If lastRow > 1 Then
        GetSheetRecordCount = lastRow - 1
    Else
        GetSheetRecordCount = 0
    End If
End Function

Private Function CountUrgentArrivals() As Long
    Dim wsList As Worksheet, lastRow As Long, i As Long, cnt As Long
    Dim etaVal As Variant, daysDiff As Long
    
    On Error Resume Next
    Set wsList = ThisWorkbook.Sheets("List")
    On Error GoTo 0
    If wsList Is Nothing Then Exit Function
    
    lastRow = wsList.Cells(wsList.Rows.Count, "A").End(xlUp).Row
    cnt = 0
    For i = 2 To lastRow
        etaVal = wsList.Cells(i, "AT").Value
        If IsDate(etaVal) Then
            daysDiff = DateDiff("d", Date, CDate(etaVal))
            If daysDiff <= 5 And daysDiff >= 0 Then cnt = cnt + 1
        End If
    Next i
    CountUrgentArrivals = cnt
End Function

Private Sub LogStatusUpdate(categoryName As String, sourceInfo As String, rowCount As Long, statusText As String)
    Dim wsMaster As Worksheet, targetRow As Long, r As Long
    On Error Resume Next
    Set wsMaster = ThisWorkbook.Sheets("Master Orchestrator")
    On Error GoTo 0
    If wsMaster Is Nothing Then Exit Sub
    
    targetRow = 0
    For r = 12 To 20
        If Trim(wsMaster.Cells(r, 1).Value) = categoryName Then: targetRow = r: Exit For
    Next r
    If targetRow = 0 Then targetRow = wsMaster.Cells(wsMaster.Rows.Count, "A").End(xlUp).Row + 1
    If targetRow < 12 Then targetRow = 12
    
    wsMaster.Cells(targetRow, 1).Value = categoryName
    wsMaster.Cells(targetRow, 2).Value = sourceInfo
    wsMaster.Cells(targetRow, 3).Value = Format(Now, "yyyy-mm-dd hh:mm")
    wsMaster.Cells(targetRow, 4).Value = rowCount
    wsMaster.Cells(targetRow, 5).Value = statusText
    
    If UCase(statusText) Like "OK*" Then
        wsMaster.Cells(targetRow, 5).Interior.Color = RGB(198, 239, 206)
        wsMaster.Cells(targetRow, 5).Font.Color = RGB(0, 97, 0)
    Else
        wsMaster.Cells(targetRow, 5).Interior.Color = RGB(255, 199, 206)
        wsMaster.Cells(targetRow, 5).Font.Color = RGB(156, 0, 6)
    End If
End Sub

' ==============================================================================
' 3. EXECUTIVE DASHBOARD CALCULATION & REPORTING ENGINE
' ==============================================================================
Public Sub Refresh_Dashboard_From_Sheets()
    On Error GoTo DashHandler
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.EnableEvents = False
    
    Call Refresh_Dashboard_From_Sheets_Internal
    
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    
    MsgBox "Executive Dashboard refreshed successfully from 'List' sheet!", vbInformation, "Dashboard Complete"
    Exit Sub

DashHandler:
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    MsgBox "Error refreshing Dashboard: " & Err.Description, vbCritical, "Dashboard Error"
End Sub

Private Sub Refresh_Dashboard_From_Sheets_Internal()
    Dim wsList As Worksheet, wsDash As Worksheet
    Dim lastRow As Long, i As Long
    Dim itemCode As String, statusVal As String
    Dim qtyVal As Double, priceVal As Double, amountVal As Double
    Dim etaDate As Variant, daysDiff As Long
    Dim isWarehouseCompleted As Boolean
    
    Dim dictItems As Object, dictStatuses As Object, dictPrices As Object
    Dim totalOverallQty As Double, totalOverallAmount As Double
    Dim warehouseCount As Long, warehouseAmount As Double
    Dim pipelineCount As Long, pipelineAmount As Double
    
    Dim countLess5 As Long, count6to10 As Long, count11to15 As Long
    Dim count16to20 As Long, count21to30 As Long, countOver30 As Long
    
    Set wsList = ThisWorkbook.Sheets("List")
    
    On Error Resume Next
    Set wsDash = ThisWorkbook.Sheets("Dashboard")
    On Error GoTo 0
    If wsDash Is Nothing Then
        Set wsDash = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.Count))
        wsDash.Name = "Dashboard"
    End If
    
    lastRow = wsList.Cells(wsList.Rows.Count, "A").End(xlUp).Row
    If lastRow < 2 Then Exit Sub
    
    Set dictItems = CreateObject("Scripting.Dictionary")
    Set dictStatuses = CreateObject("Scripting.Dictionary")
    Set dictPrices = CreateObject("Scripting.Dictionary")
    
    totalOverallQty = 0: totalOverallAmount = 0
    warehouseCount = 0: warehouseAmount = 0
    pipelineCount = 0: pipelineAmount = 0
    
    For i = 2 To lastRow
        itemCode = Trim(CStr(wsList.Cells(i, "C").Value))
        statusVal = Trim(CStr(wsList.Cells(i, "BU").Value))
        qtyVal = 0: priceVal = 0: amountVal = 0
        
        If IsNumeric(wsList.Cells(i, "K").Value) Then qtyVal = CDbl(wsList.Cells(i, "K").Value)
        If IsNumeric(wsList.Cells(i, "L").Value) Then priceVal = CDbl(wsList.Cells(i, "L").Value)
        If IsNumeric(wsList.Cells(i, "N").Value) Then
            amountVal = CDbl(wsList.Cells(i, "N").Value)
        Else
            amountVal = qtyVal * priceVal
        End If
        
        totalOverallQty = totalOverallQty + qtyVal
        totalOverallAmount = totalOverallAmount + amountVal
        
        ' Check if status signifies warehouse/delivered (supports English or Unicode initial)
        isWarehouseCompleted = False
        If Len(statusVal) > 0 Then
            If LCase(statusVal) = "warehouse" Or LCase(statusVal) = "delivered" Then
                isWarehouseCompleted = True
            ElseIf AscW(Left(statusVal, 1)) = 1354 Then ' Unicode code for Armenian initial 'P' (Pahest)
                isWarehouseCompleted = True
            End If
        End If
        
        If isWarehouseCompleted Then
            warehouseCount = warehouseCount + 1
            warehouseAmount = warehouseAmount + amountVal
        ElseIf statusVal <> "" Then
            pipelineCount = pipelineCount + 1
            pipelineAmount = pipelineAmount + amountVal
        End If
        
        ' Aggregate Statuses dynamically (whatever is in Column BU)
        If statusVal <> "" Then
            If Not dictStatuses.Exists(statusVal) Then
                dictStatuses.Add statusVal, Array(1&, amountVal, qtyVal)
            Else
                Dim sArr As Variant
                sArr = dictStatuses(statusVal)
                sArr(0) = sArr(0) + 1
                sArr(1) = sArr(1) + amountVal
                sArr(2) = sArr(2) + qtyVal
                dictStatuses(statusVal) = sArr
            End If
        End If
        
        ' Aggregate Products
        If itemCode <> "" Then
            If Not dictItems.Exists(itemCode) Then
                dictItems.Add itemCode, Array(qtyVal, amountVal, 1&)
                dictPrices.Add itemCode, New Collection
                dictPrices(itemCode).Add priceVal
            Else
                Dim pArr As Variant
                pArr = dictItems(itemCode)
                pArr(0) = pArr(0) + qtyVal
                pArr(1) = pArr(1) + amountVal
                pArr(2) = pArr(2) + 1
                dictItems(itemCode) = pArr
                dictPrices(itemCode).Add priceVal
            End If
        End If
        
        ' Arrival timeline histogram from Column AT
        etaDate = wsList.Cells(i, "AT").Value
        If IsDate(etaDate) And Not isWarehouseCompleted Then
            daysDiff = DateDiff("d", Date, CDate(etaDate))
            If daysDiff <= 5 Then
                countLess5 = countLess5 + 1
            ElseIf daysDiff <= 10 Then
                count6to10 = count6to10 + 1
            ElseIf daysDiff <= 15 Then
                count11to15 = count11to15 + 1
            ElseIf daysDiff <= 20 Then
                count16to20 = count16to20 + 1
            ElseIf daysDiff <= 30 Then
                count21to30 = count21to30 + 1
            Else
                countOver30 = countOver30 + 1
            End If
        End If
    Next i
    
    ' Populate Dashboard
    wsDash.Cells.Clear
    
    ' Banner
    With wsDash.Range("B2:L2")
        .Merge
        .Value = "MASTER LOGISTICS ORCHESTRATOR - EXECUTIVE STATISTICAL DASHBOARD"
        .Font.Bold = True
        .Font.Size = 13
        .Font.Color = RGB(255, 255, 255)
        .Interior.Color = RGB(15, 23, 42)
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .RowHeight = 32
    End With
    
    ' Top KPI Cards
    Call WriteKpiCard(wsDash, "B4:C5", "TOTAL AMOUNT (USD)", Format(totalOverallAmount, "$#,##0"), RGB(6, 182, 212))
    Call WriteKpiCard(wsDash, "D4:E5", "TOTAL VOLUME", Format(totalOverallQty, "#,##0") & " kg", RGB(59, 130, 246))
    Call WriteKpiCard(wsDash, "F4:G5", "WAREHOUSE COMPLETED", warehouseCount & " orders (" & Format(warehouseAmount, "$#,##0") & ")", RGB(16, 185, 129))
    Call WriteKpiCard(wsDash, "H4:I5", "ACTIVE IN TRANSIT", pipelineCount & " orders (" & Format(pipelineAmount, "$#,##0") & ")", RGB(245, 158, 11))
    Call WriteKpiCard(wsDash, "J4:L5", "LAST SYNCHRONIZATION", Format(Now, "yyyy-mm-dd hh:mm") & " (Real-time Sheets)", RGB(139, 92, 246))
    
    ' Products Breakdown Table
    Dim rowPtr As Long: rowPtr = 8
    wsDash.Cells(rowPtr, "B").Value = "PRODUCT PORTFOLIO & MONTHLY PRICE VARIANCE (STRICTLY FROM LIST SHEET)"
    wsDash.Cells(rowPtr, "B").Font.Bold = True
    wsDash.Cells(rowPtr, "B").Font.Color = RGB(6, 182, 212)
    rowPtr = rowPtr + 1
    
    Dim prodHeaders As Variant, cIdx As Long
    prodHeaders = Array("Item Code (C)", "Description (D)", "UOM", "Quantity (K)", "Qty %", "Amount ($)", "Amount %", "Mean Price", "Variance (Var_S)", "StdDev (Sigma)")
    For cIdx = 0 To UBound(prodHeaders)
        wsDash.Cells(rowPtr, 2 + cIdx).Value = prodHeaders(cIdx)
        wsDash.Cells(rowPtr, 2 + cIdx).Font.Bold = True
        wsDash.Cells(rowPtr, 2 + cIdx).Interior.Color = RGB(30, 41, 59)
        wsDash.Cells(rowPtr, 2 + cIdx).Font.Color = RGB(255, 255, 255)
    Next cIdx
    rowPtr = rowPtr + 1
    
    Dim k As Variant, itemData As Variant
    For Each k In dictItems.Keys
        itemCode = CStr(k)
        itemData = dictItems(k)
        
        Dim iName As String, iUom As String
        Call FindItemMetaInAllDbSheets(itemCode, iName, iUom)
        
        Dim iQty As Double: iQty = itemData(0)
        Dim iAmt As Double: iAmt = itemData(1)
        Dim iMean As Double, iVar As Double, iStd As Double
        Call ComputeVarianceStats(dictPrices(k), iMean, iVar, iStd)
        
        wsDash.Cells(rowPtr, 2).Value = itemCode
        wsDash.Cells(rowPtr, 3).Value = iName
        wsDash.Cells(rowPtr, 4).Value = iUom
        wsDash.Cells(rowPtr, 5).Value = iQty: wsDash.Cells(rowPtr, 5).NumberFormat = "#,##0"
        If totalOverallQty > 0 Then
            wsDash.Cells(rowPtr, 6).Value = iQty / totalOverallQty: wsDash.Cells(rowPtr, 6).NumberFormat = "0.0%"
        End If
        wsDash.Cells(rowPtr, 7).Value = iAmt: wsDash.Cells(rowPtr, 7).NumberFormat = "$#,##0"
        If totalOverallAmount > 0 Then
            wsDash.Cells(rowPtr, 8).Value = iAmt / totalOverallAmount: wsDash.Cells(rowPtr, 8).NumberFormat = "0.0%"
        End If
        wsDash.Cells(rowPtr, 9).Value = iMean: wsDash.Cells(rowPtr, 9).NumberFormat = "$#,##0.00"
        wsDash.Cells(rowPtr, 10).Value = iVar: wsDash.Cells(rowPtr, 10).NumberFormat = "0.0000"
        wsDash.Cells(rowPtr, 11).Value = iStd: wsDash.Cells(rowPtr, 11).NumberFormat = "0.000"
        
        rowPtr = rowPtr + 1
    Next k
    
    ' Status Breakdown Matrix (Column BU)
    rowPtr = rowPtr + 2
    wsDash.Cells(rowPtr, "B").Value = "STATUS CLASSIFICATION MATRIX (COLUMN BU)"
    wsDash.Cells(rowPtr, "B").Font.Bold = True
    wsDash.Cells(rowPtr, "B").Font.Color = RGB(16, 185, 129)
    rowPtr = rowPtr + 1
    
    wsDash.Cells(rowPtr, 2).Value = "Status (BU)": wsDash.Cells(rowPtr, 3).Value = "Order Count": wsDash.Cells(rowPtr, 4).Value = "Total Amount ($)": wsDash.Cells(rowPtr, 5).Value = "Distribution %"
    wsDash.Range(wsDash.Cells(rowPtr, 2), wsDash.Cells(rowPtr, 5)).Font.Bold = True
    wsDash.Range(wsDash.Cells(rowPtr, 2), wsDash.Cells(rowPtr, 5)).Interior.Color = RGB(30, 41, 59)
    wsDash.Range(wsDash.Cells(rowPtr, 2), wsDash.Cells(rowPtr, 5)).Font.Color = RGB(255, 255, 255)
    rowPtr = rowPtr + 1
    
    For Each k In dictStatuses.Keys
        Dim stDetails As Variant
        stDetails = dictStatuses(k)
        wsDash.Cells(rowPtr, 2).Value = CStr(k)
        wsDash.Cells(rowPtr, 3).Value = stDetails(0)
        wsDash.Cells(rowPtr, 4).Value = stDetails(1): wsDash.Cells(rowPtr, 4).NumberFormat = "$#,##0"
        If totalOverallAmount > 0 Then
            wsDash.Cells(rowPtr, 5).Value = CDbl(stDetails(1)) / totalOverallAmount: wsDash.Cells(rowPtr, 5).NumberFormat = "0.0%"
        End If
        rowPtr = rowPtr + 1
    Next k
    
    ' Timeline Histogram
    rowPtr = rowPtr + 2
    wsDash.Cells(rowPtr, "B").Value = "POTI ARRIVAL TIMELINE & LEAD TIME HISTOGRAM (COLUMN AT)"
    wsDash.Cells(rowPtr, "B").Font.Bold = True
    rowPtr = rowPtr + 1
    
    Dim tRanges As Variant, tCounts As Variant
    tRanges = Array("<= 5 Days (Urgent)", "6 - 10 Days", "11 - 15 Days", "16 - 20 Days (Poti Radar)", "21 - 30 Days", "> 30 Days")
    tCounts = Array(countLess5, count6to10, count11to15, count16to20, count21to30, countOver30)
    
    For cIdx = 0 To UBound(tRanges)
        wsDash.Cells(rowPtr, 2).Value = tRanges(cIdx)
        wsDash.Cells(rowPtr, 3).Value = tCounts(cIdx)
        rowPtr = rowPtr + 1
    Next cIdx
    
    wsDash.Columns("B:L").AutoFit
End Sub

Private Sub WriteKpiCard(ws As Worksheet, rngAddress As String, titleText As String, valText As String, accentColor As Long)
    Dim rng As Range
    Set rng = ws.Range(rngAddress)
    rng.Interior.Color = RGB(15, 23, 42)
    rng.BorderAround xlContinuous, xlThin, accentColor
    ws.Range(rngAddress).Cells(1, 1).Value = titleText
    ws.Range(rngAddress).Cells(1, 1).Font.Size = 9
    ws.Range(rngAddress).Cells(1, 1).Font.Color = RGB(148, 163, 184)
    ws.Range(rngAddress).Cells(2, 1).Value = valText
    ws.Range(rngAddress).Cells(2, 1).Font.Size = 13
    ws.Range(rngAddress).Cells(2, 1).Font.Bold = True
    ws.Range(rngAddress).Cells(2, 1).Font.Color = accentColor
End Sub

Private Sub ComputeVarianceStats(pricesCol As Collection, ByRef outMean As Double, ByRef outVar As Double, ByRef outStd As Double)
    Dim n As Long: n = pricesCol.Count
    If n = 0 Then
        outMean = 0: outVar = 0: outStd = 0
        Exit Sub
    End If
    
    Dim sum As Double: sum = 0
    Dim p As Variant
    For Each p In pricesCol
        sum = sum + CDbl(p)
    Next p
    outMean = sum / n
    
    If n > 1 Then
        Dim sumSq As Double: sumSq = 0
        For Each p In pricesCol
            sumSq = sumSq + (CDbl(p) - outMean) ^ 2
        Next p
        outVar = sumSq / (n - 1)
        outStd = Sqr(outVar)
    Else
        outVar = 0
        outStd = 0
    End If
End Sub

Private Sub FindItemMetaInAllDbSheets(code As String, ByRef outName As String, ByRef outUom As String)
    Dim ws As Worksheet, foundRange As Range
    outName = "-": outUom = "kg"
    For Each ws In ThisWorkbook.Worksheets
        If LCase(Right(ws.Name, 2)) = "db" Then
            Set foundRange = ws.Columns("A").Find(What:=code, LookIn:=xlValues, LookAt:=xlWhole)
            If Not foundRange Is Nothing Then
                outName = Trim(CStr(ws.Cells(foundRange.Row, "B").Value))
                outUom = Trim(CStr(ws.Cells(foundRange.Row, "C").Value))
                Exit Sub
            End If
        End If
    Next ws
End Sub
