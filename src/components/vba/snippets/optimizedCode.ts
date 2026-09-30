export const OPTIMIZED_CODE = `' ==============================================================================
' ENTERPRISE LOGISTICS SUITE · OPTIMIZED PRODUCTION VBA MODULE
' Compatible with 100% of Davit Petrosyan's original logic, formulas & column specs
' ==============================================================================
Option Explicit

Private Sub Worksheet_Change(ByVal Target As Range)
    If Target Is Nothing Then Exit Sub
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    If Not Intersect(Target, Me.Columns("C")) Is Nothing Then Call AutoLookupItemDetails(Target)
    If Not Intersect(Target, Me.Columns("G")) Is Nothing Then Call AutoLookupSupplierDetails(Target)
    If Not Intersect(Target, Me.Columns("V")) Is Nothing Then Call AutoPercentageCalculation(Target)
    If Not Intersect(Target, Me.Range("K:L")) Is Nothing Then Call AutoCalculateTotalAmount(Target)
    If Not Intersect(Target, Me.Range("K:L, V:V")) Is Nothing Then Call AutoCalculatePrepaymentAmount(Target)
    If Not Intersect(Target, Me.Range("L:L, BF:BF")) Is Nothing Then Call AutoCalculateInvoicedAmount(Target)
    If Not Intersect(Target, Me.Range("K:L, V:V, BF:BH")) Is Nothing Then Call AutoCalculateFinalPaymentAmount(Target)
    If Not Intersect(Target, Me.Columns("BP")) Is Nothing Then Call AutoSyncCustomsReleaseDate(Target)
    If Not Intersect(Target, Me.Columns("AT")) Is Nothing Then Call AutoSyncDatesFromAT(Target)
    If Not Intersect(Target, Me.Columns("A:BU")) Is Nothing Then Call HighlightMissingCells(Target)

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

Private Sub Workbook_BeforeSave(ByVal SaveAsUI As Boolean, Cancel As Boolean)
    Dim ws As Worksheet, maxRow As Long, i As Long, colIndex As Long, emptyBUCell As Range
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("List")
    On Error GoTo 0
    If ws Is Nothing Then Exit Sub
    
    maxRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    If maxRow < 2 Then Exit Sub
    
    For i = 2 To maxRow
        For colIndex = 1 To 73
            If Trim(ws.Cells(i, colIndex).Value) <> "" Then
                If Trim(ws.Cells(i, "BU").Value) = "" Then
                    Set emptyBUCell = ws.Cells(i, "BU")
                    Exit For
                End If
            End If
        Next colIndex
        If Not emptyBUCell Is Nothing Then Exit For
    Next i
    
    If Not emptyBUCell Is Nothing Then
        Cancel = True
        MsgBox "Cannot save file! Column BU is missing at: " & emptyBUCell.Address(False, False), vbCritical
        ws.Activate: emptyBUCell.Select
    End If
End Sub

Public Sub CheckPotiArrivals()
    Dim ws As Worksheet, lastRow As Long, i As Long, dataRange As Variant
    Dim arrDate As Date, diff As Long, msg As String, cnt As Long
    Set ws = ThisWorkbook.Sheets("List")
    lastRow = ws.Cells(ws.Rows.Count, "AN").End(xlUp).Row
    If ws.Cells(ws.Rows.Count, "AT").End(xlUp).Row > lastRow Then lastRow = ws.Cells(ws.Rows.Count, "AT").End(xlUp).Row
    If lastRow < 2 Then Exit Sub
    
    dataRange = ws.Range("AN2:AT" & lastRow).Value
    msg = "": cnt = 0
    For i = 1 To UBound(dataRange, 1)
        If IsDate(dataRange(i, 7)) Then
            arrDate = CDate(dataRange(i, 7))
            diff = DateDiff("d", Date, arrDate)
            If diff >= 15 And diff <= 20 Then
                cnt = cnt + 1
                msg = msg & "- " & Trim(CStr(dataRange(i, 1))) & " (ETA: " & Format(arrDate, "yyyy-mm-dd") & ")" & vbCrLf
            End If
        End If
    Next i
    If cnt > 0 Then MsgBox "Poti 15-20 days containers (" & cnt & "):" & vbCrLf & msg, vbInformation
End Sub`;
