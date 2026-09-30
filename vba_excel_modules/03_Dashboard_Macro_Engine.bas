Attribute VB_Name = "Module_DashboardEngine"
' ==============================================================================
' MODULE: Module_DashboardEngine
' Description: Executive Logistics Dashboard & Statistical Analysis Engine
' Author: Davit Petrosyan
'
' CRITICAL DATA INTEGRITY PRINCIPLE:
' ALL DATA IS EXTRACTED EXCLUSIVELY FROM "List" AND DATABASE SHEETS
' ("Chicken db", "Pork db", "Beef db", "Suppliers").
' NO MOCK OR HARDCODED FIGURES ARE GENERATED IN CODE.
' ==============================================================================
Option Explicit

Public Sub Refresh_Dashboard_From_Sheets()
    Dim wsList As Worksheet, wsDash As Worksheet
    Dim lastRow As Long, i As Long
    Dim itemCode As String, statusVal As String
    Dim qtyVal As Double, priceVal As Double, amountVal As Double
    Dim etaDate As Variant
    Dim daysDiff As Long
    
    ' Data structures for calculations strictly from "List" sheet
    Dim dictItems As Object, dictStatuses As Object, dictPrices As Object
    Dim totalOverallQty As Double, totalOverallAmount As Double
    Dim warehouseCount As Long, warehouseAmount As Double
    Dim pipelineCount As Long, pipelineAmount As Double
    
    ' Histogram buckets for arrival timeline
    Dim countLess5 As Long, count6to10 As Long, count11to15 As Long
    Dim count16to20 As Long, count21to30 As Long, countOver30 As Long
    
    On Error GoTo ErrorHandler
    
    ' Performance optimization
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.EnableEvents = False
    
    Set wsList = ThisWorkbook.Sheets("List")
    
    ' Ensure "Dashboard" sheet exists; if not, create it
    On Error Resume Next
    Set wsDash = ThisWorkbook.Sheets("Dashboard")
    On Error GoTo 0
    If wsDash Is Nothing Then
        Set wsDash = ThisWorkbook.Sheets.Add(Before:=wsList)
        wsDash.Name = "Dashboard"
    End If
    
    lastRow = wsList.Cells(wsList.Rows.Count, "A").End(xlUp).Row
    If lastRow < 2 Then
        MsgBox "No data found in 'List' sheet to calculate statistics.", vbExclamation, "Dashboard"
        GoTo CleanExit
    End If
    
    Set dictItems = CreateObject("Scripting.Dictionary")
    Set dictStatuses = CreateObject("Scripting.Dictionary")
    Set dictPrices = CreateObject("Scripting.Dictionary")
    
    totalOverallQty = 0: totalOverallAmount = 0
    warehouseCount = 0: warehouseAmount = 0
    pipelineCount = 0: pipelineAmount = 0
    
    ' READ ALL DATA STRICTLY ROW BY ROW FROM "List" SHEET (Columns A to BU)
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
        
        ' Status classification (Column BU)
        If statusVal = "Warehouse" Or statusVal = "Delivered" Then
            warehouseCount = warehouseCount + 1
            warehouseAmount = warehouseAmount + amountVal
        ElseIf statusVal <> "" Then
            pipelineCount = pipelineCount + 1
            pipelineAmount = pipelineAmount + amountVal
        End If
        
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
        
        ' Product aggregation
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
        
        ' Arrival timeline histogram (Column AT - Poti Planned ETA)
        etaDate = wsList.Cells(i, "AT").Value
        If IsDate(etaDate) And statusVal <> "Warehouse" And statusVal <> "Delivered" Then
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
    
    ' ==========================================================================
    ' POPULATE "DASHBOARD" SHEET WITH FORMATTED EXECUTIVE REPORT
    ' ==========================================================================
    wsDash.Cells.Clear
    
    ' 1. Title Banner
    With wsDash.Range("B2:L2")
        .Merge
        .Value = "MASTER LOGISTICS ORCHESTRATOR - EXECUTIVE STATISTICAL DASHBOARD"
        .Font.Bold = True
        .Font.Size = 14
        .Font.Color = RGB(255, 255, 255)
        .Interior.Color = RGB(15, 23, 42)
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .RowHeight = 35
    End With
    
    ' 2. KPI Cards Block
    Call FormatKpiCard(wsDash, "B4:C5", "TOTAL AMOUNT ($)", Format(totalOverallAmount, "$#,##0"), RGB(6, 182, 212))
    Call FormatKpiCard(wsDash, "D4:E5", "TOTAL QUANTITY", Format(totalOverallQty, "#,##0") & " kg", RGB(59, 130, 246))
    Call FormatKpiCard(wsDash, "F4:G5", "WAREHOUSE COMPLETED", warehouseCount & " orders (" & Format(warehouseAmount, "$#,##0") & ")", RGB(16, 185, 129))
    Call FormatKpiCard(wsDash, "H4:I5", "IN PIPELINE / TRANSIT", pipelineCount & " orders (" & Format(pipelineAmount, "$#,##0") & ")", RGB(245, 158, 11))
    Call FormatKpiCard(wsDash, "J4:L5", "DATA SOURCE & SYNC", Format(Now, "yyyy-mm-dd hh:mm") & " (Real-time Sheets)", RGB(139, 92, 246))
    
    ' 3. Product Breakdown Table with Mean & Variance
    Dim rowPtr As Long: rowPtr = 8
    wsDash.Cells(rowPtr, "B").Value = "PRODUCT SHARE & MONTHLY PRICE VARIANCE (STRICTLY FROM LIST SHEET)"
    wsDash.Cells(rowPtr, "B").Font.Bold = True
    wsDash.Cells(rowPtr, "B").Font.Color = RGB(6, 182, 212)
    rowPtr = rowPtr + 1
    
    Dim headersProd As Variant
    headersProd = Array("Item Code (C)", "Description (D)", "UOM", "Quantity (K)", "Qty %", "Amount ($)", "Amount %", "Mean Price", "Variance (Var_S)", "StdDev (Sigma)")
    Dim cIdx As Long
    For cIdx = 0 To UBound(headersProd)
        wsDash.Cells(rowPtr, 2 + cIdx).Value = headersProd(cIdx)
        wsDash.Cells(rowPtr, 2 + cIdx).Font.Bold = True
        wsDash.Cells(rowPtr, 2 + cIdx).Interior.Color = RGB(30, 41, 59)
        wsDash.Cells(rowPtr, 2 + cIdx).Font.Color = RGB(255, 255, 255)
    Next cIdx
    rowPtr = rowPtr + 1
    
    Dim k As Variant, itemDetails As Variant
    For Each k In dictItems.Keys
        itemCode = CStr(k)
        itemDetails = dictItems(k)
        
        Dim itemName As String, itemUom As String
        Call LookupItemMetaFromDbSheets(itemCode, itemName, itemUom)
        
        Dim pQty As Double: pQty = itemDetails(0)
        Dim pAmt As Double: pAmt = itemDetails(1)
        Dim pCount As Long: pCount = itemDetails(2)
        
        Dim pMean As Double, pVar As Double, pStd As Double
        Call CalculateMeanAndVariance(dictPrices(k), pMean, pVar, pStd)
        
        wsDash.Cells(rowPtr, 2).Value = itemCode
        wsDash.Cells(rowPtr, 3).Value = itemName
        wsDash.Cells(rowPtr, 4).Value = itemUom
        wsDash.Cells(rowPtr, 5).Value = pQty: wsDash.Cells(rowPtr, 5).NumberFormat = "#,##0"
        If totalOverallQty > 0 Then
            wsDash.Cells(rowPtr, 6).Value = pQty / totalOverallQty: wsDash.Cells(rowPtr, 6).NumberFormat = "0.0%"
        End If
        wsDash.Cells(rowPtr, 7).Value = pAmt: wsDash.Cells(rowPtr, 7).NumberFormat = "$#,##0"
        If totalOverallAmount > 0 Then
            wsDash.Cells(rowPtr, 8).Value = pAmt / totalOverallAmount: wsDash.Cells(rowPtr, 8).NumberFormat = "0.0%"
        End If
        wsDash.Cells(rowPtr, 9).Value = pMean: wsDash.Cells(rowPtr, 9).NumberFormat = "$#,##0.00"
        wsDash.Cells(rowPtr, 10).Value = pVar: wsDash.Cells(rowPtr, 10).NumberFormat = "0.0000"
        wsDash.Cells(rowPtr, 11).Value = pStd: wsDash.Cells(rowPtr, 11).NumberFormat = "0.000"
        
        rowPtr = rowPtr + 1
    Next k
    
    ' 4. Status Breakdown Matrix (BU Column)
    rowPtr = rowPtr + 2
    wsDash.Cells(rowPtr, "B").Value = "STATUS CLASSIFICATION BREAKDOWN (BU COLUMN MATRIX)"
    wsDash.Cells(rowPtr, "B").Font.Bold = True
    wsDash.Cells(rowPtr, "B").Font.Color = RGB(16, 185, 129)
    rowPtr = rowPtr + 1
    
    wsDash.Cells(rowPtr, 2).Value = "Status (BU)": wsDash.Cells(rowPtr, 3).Value = "Order Count": wsDash.Cells(rowPtr, 4).Value = "Total Amount ($)": wsDash.Cells(rowPtr, 5).Value = "% Distribution"
    wsDash.Range(wsDash.Cells(rowPtr, 2), wsDash.Cells(rowPtr, 5)).Font.Bold = True
    wsDash.Range(wsDash.Cells(rowPtr, 2), wsDash.Cells(rowPtr, 5)).Interior.Color = RGB(30, 41, 59)
    wsDash.Range(wsDash.Cells(rowPtr, 2), wsDash.Cells(rowPtr, 5)).Font.Color = RGB(255, 255, 255)
    rowPtr = rowPtr + 1
    
    For Each k In dictStatuses.Keys
        Dim stArr As Variant
        stArr = dictStatuses(k)
        wsDash.Cells(rowPtr, 2).Value = CStr(k)
        wsDash.Cells(rowPtr, 3).Value = stArr(0)
        wsDash.Cells(rowPtr, 4).Value = stArr(1): wsDash.Cells(rowPtr, 4).NumberFormat = "$#,##0"
        If totalOverallAmount > 0 Then
            wsDash.Cells(rowPtr, 5).Value = CDbl(stArr(1)) / totalOverallAmount: wsDash.Cells(rowPtr, 5).NumberFormat = "0.0%"
        End If
        rowPtr = rowPtr + 1
    Next k
    
    ' 5. Arrival Timeline Histogram
    rowPtr = rowPtr + 2
    wsDash.Cells(rowPtr, "B").Value = "ARRIVAL TIMELINE / LEAD TIME HISTOGRAM (AT COLUMN)"
    wsDash.Cells(rowPtr, "B").Font.Bold = True
    rowPtr = rowPtr + 1
    
    Dim histoRanges As Variant, histoCounts As Variant
    histoRanges = Array("<= 5 Days (Urgent)", "6 - 10 Days", "11 - 15 Days", "16 - 20 Days (Poti Radar)", "21 - 30 Days", "> 30 Days")
    histoCounts = Array(countLess5, count6to10, count11to15, count16to20, count21to30, countOver30)
    
    For cIdx = 0 To UBound(histoRanges)
        wsDash.Cells(rowPtr, 2).Value = histoRanges(cIdx)
        wsDash.Cells(rowPtr, 3).Value = histoCounts(cIdx)
        rowPtr = rowPtr + 1
    Next cIdx
    
    wsDash.Columns("B:L").AutoFit
    
    MsgBox "Dashboard statistics successfully refreshed strictly from 'List' sheet!", vbInformation, "Sync Complete"

CleanExit:
    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Exit Sub

ErrorHandler:
    MsgBox "Error refreshing dashboard: " & Err.Description, vbCritical, "Error"
    Resume CleanExit
End Sub

' Helper: Format executive KPI card cell block
Private Sub FormatKpiCard(ws As Worksheet, rngAddress As String, titleText As String, valText As String, accentColor As Long)
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

' Helper: Calculate Mean, Sample Variance, and StdDev
Private Sub CalculateMeanAndVariance(pricesCol As Collection, ByRef outMean As Double, ByRef outVar As Double, ByRef outStd As Double)
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

' Helper: Lookup Item Details from DB sheets
Private Sub LookupItemMetaFromDbSheets(code As String, ByRef outName As String, ByRef outUom As String)
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
