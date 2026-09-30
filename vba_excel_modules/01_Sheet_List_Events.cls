VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Sheet1_List"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
' ==============================================================================
' Description: Main worksheet change event handler. Triggers specific sub-routines
'              for data calculations, formatting, auto-lookups, and row validation.
' Author: Davit Petrosyan
' ==============================================================================
Private Sub Worksheet_Change(ByVal Target As Range)
    ' 1. Auto-lookup item details from DB sheets & auto-fill row index/date
    Call AutoLookupItemDetails(Target)
    
    ' 2. Auto-lookup supplier details from "Suppliers" sheet (G -> H)
    Call AutoLookupSupplierDetails(Target)
    
    ' 3. Calculate Advance (V) and Final (Y) percentages
    Call AutoPercentageCalculation(Target)
    
    ' 4. Calculate Total Amount (N = K * L)
    Call AutoCalculateTotalAmount(Target)
    
    ' 5. Calculate Prepayment Amount (AB = K * L * V)
    Call AutoCalculatePrepaymentAmount(Target)
    
    ' 6. Calculate Invoiced Amount (BG = BF * L)
    Call AutoCalculateInvoicedAmount(Target)
    
    ' 7. Calculate Final Payment Amount (BI = (BF * L) - (K * L * V) - BH)
    Call AutoCalculateFinalPaymentAmount(Target)
    
    ' 8. Synchronize Customs Release Date (BQ = BP)
    Call AutoSyncCustomsReleaseDate(Target)
    
    ' 9. Calculate Planned Dates from AT (BJ = AT - 20, BM = AT + 4)
    Call AutoSyncDatesFromAT(Target)
    
    ' 10. Highlight missing/empty cells logic across columns A:BU
    Call HighlightMissingCells(Target)
End Sub

' ==============================================================================
' Description: Dynamic lookup for product details (Name in D, UOM in F) from DB
'              sheets ending with "db". Auto-generates row index in Column A
'              and today's date in Column B. Displays a notification and erases
'              invalid codes if not found in any database.
' ==============================================================================
Private Sub AutoLookupItemDetails(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim itemCode As String
    Dim wsDB As Worksheet
    Dim foundRange As Range
    Dim prevIndex As Variant
    Dim isFound As Boolean
    
    Set checkRange = Intersect(Target, Me.Columns("C"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        
        If rowNum > 1 Then
            itemCode = Trim(CStr(cell.Value))
            
            If itemCode <> "" Then
                isFound = False
                For Each wsDB In ThisWorkbook.Worksheets
                    If LCase(Right(wsDB.Name, 2)) = "db" Then
                        Set foundRange = wsDB.Columns("A").Find(What:=itemCode, LookIn:=xlValues, LookAt:=xlWhole)
                        If Not foundRange Is Nothing Then
                            Me.Cells(rowNum, "D").Value = wsDB.Cells(foundRange.Row, "B").Value
                            Me.Cells(rowNum, "F").Value = wsDB.Cells(foundRange.Row, "C").Value
                            isFound = True
                            Exit For
                        End If
                    End If
                Next wsDB
                
                If isFound Then
                    If Trim(CStr(Me.Cells(rowNum, "A").Value)) = "" Then
                        If rowNum = 2 Then
                            Me.Cells(rowNum, "A").Value = 1
                        Else
                            prevIndex = Me.Cells(rowNum - 1, "A").Value
                            If IsNumeric(prevIndex) And Trim(CStr(prevIndex)) <> "" Then
                                Me.Cells(rowNum, "A").Value = CDbl(prevIndex) + 1
                            Else
                                Me.Cells(rowNum, "A").Value = 1
                            End If
                        End If
                    End If
                    
                    If Trim(CStr(Me.Cells(rowNum, "B").Value)) = "" Then
                        Me.Cells(rowNum, "B").Value = Date
                        Me.Cells(rowNum, "B").NumberFormat = "dd.mm.yyyy"
                    End If
                Else
                    MsgBox "The code '" & itemCode & "' was not found in the database. Please enter a valid item code.", _
                           vbExclamation + vbOKOnly, "Invalid Item Code"
                    
                    cell.ClearContents
                    Me.Cells(rowNum, "D").ClearContents
                    Me.Cells(rowNum, "F").ClearContents
                End If
            Else
                Me.Cells(rowNum, "D").ClearContents
                Me.Cells(rowNum, "F").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Looks up supplier name in Column H from "Suppliers" sheet
'              based on supplier code entered in Column G.
' ==============================================================================
Private Sub AutoLookupSupplierDetails(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim supplierCode As String
    Dim wsSuppliers As Worksheet
    Dim foundRange As Range
    
    Set checkRange = Intersect(Target, Me.Columns("G"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    On Error Resume Next
    Set wsSuppliers = ThisWorkbook.Worksheets("Suppliers")
    On Error GoTo CleanUp
    
    If wsSuppliers Is Nothing Then Exit Sub
    
    For Each cell In checkRange
        rowNum = cell.Row
        
        If rowNum > 1 Then
            supplierCode = Trim(CStr(cell.Value))
            
            If supplierCode <> "" Then
                Set foundRange = wsSuppliers.Columns("A").Find(What:=supplierCode, LookIn:=xlValues, LookAt:=xlWhole)
                
                If Not foundRange Is Nothing Then
                    Me.Cells(rowNum, "H").Value = wsSuppliers.Cells(foundRange.Row, "B").Value
                Else
                    MsgBox "The supplier code '" & supplierCode & "' was not found in the Suppliers database.", _
                           vbExclamation + vbOKOnly, "Invalid Supplier Code"
                    cell.ClearContents
                    Me.Cells(rowNum, "H").ClearContents
                End If
            Else
                Me.Cells(rowNum, "H").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Automatically formats prepayment percentage in Column V and
'              calculates the remaining balance percentage for Column Y.
' ==============================================================================
Private Sub AutoPercentageCalculation(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim valInput As Double
    Dim rowNum As Long
    
    Set checkRange = Intersect(Target, Me.Columns("V"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        
        If rowNum > 1 Then
            If IsNumeric(cell.Value) And Trim(CStr(cell.Value)) <> "" Then
                valInput = CDbl(cell.Value)
                If valInput > 1 Then valInput = valInput / 100
                cell.Value = valInput
                cell.NumberFormat = "0%"
                Me.Cells(rowNum, "Y").Value = 1 - valInput
                Me.Cells(rowNum, "Y").NumberFormat = "0%"
            Else
                Me.Cells(rowNum, "Y").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Calculates Total Amount in Column N (N = K * L)
' ==============================================================================
Private Sub AutoCalculateTotalAmount(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim qtyVal As Variant, priceVal As Variant
    
    Set checkRange = Intersect(Target, Me.Range("K:L"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            qtyVal = Me.Cells(rowNum, "K").Value
            priceVal = Me.Cells(rowNum, "L").Value
            If IsNumeric(qtyVal) And IsNumeric(priceVal) And Trim(CStr(qtyVal)) <> "" And Trim(CStr(priceVal)) <> "" Then
                Me.Cells(rowNum, "N").Value = CDbl(qtyVal) * CDbl(priceVal)
            Else
                Me.Cells(rowNum, "N").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Calculates Prepayment Amount in Column AB (AB = K * L * V)
' ==============================================================================
Private Sub AutoCalculatePrepaymentAmount(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim qtyVal As Variant, priceVal As Variant, pctVal As Variant
    
    Set checkRange = Intersect(Target, Me.Range("K:L, V:V"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            qtyVal = Me.Cells(rowNum, "K").Value
            priceVal = Me.Cells(rowNum, "L").Value
            pctVal = Me.Cells(rowNum, "V").Value
            If IsNumeric(qtyVal) And IsNumeric(priceVal) And IsNumeric(pctVal) And _
               Trim(CStr(qtyVal)) <> "" And Trim(CStr(priceVal)) <> "" And Trim(CStr(pctVal)) <> "" Then
                Me.Cells(rowNum, "AB").Value = CDbl(qtyVal) * CDbl(priceVal) * CDbl(pctVal)
            Else
                Me.Cells(rowNum, "AB").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Calculates Invoiced Amount in Column BG (BG = BF * L)
' ==============================================================================
Private Sub AutoCalculateInvoicedAmount(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim invQtyVal As Variant, priceVal As Variant
    
    Set checkRange = Intersect(Target, Me.Range("L:L, BF:BF"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            invQtyVal = Me.Cells(rowNum, "BF").Value
            priceVal = Me.Cells(rowNum, "L").Value
            If IsNumeric(invQtyVal) And IsNumeric(priceVal) And Trim(CStr(invQtyVal)) <> "" And Trim(CStr(priceVal)) <> "" Then
                Me.Cells(rowNum, "BG").Value = CDbl(invQtyVal) * CDbl(priceVal)
            Else
                Me.Cells(rowNum, "BG").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Calculates Final Payment Amount in Column BI
' ==============================================================================
Private Sub AutoCalculateFinalPaymentAmount(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim orderQty As Variant, invQty As Variant, unitPrice As Variant, advancePct As Variant, retentionVal As Variant
    Dim invoicedTotal As Double, advancePaid As Double, retentionAmt As Double
    
    Set checkRange = Intersect(Target, Me.Range("K:L, V:V, BF:BH"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            orderQty = Me.Cells(rowNum, "K").Value
            unitPrice = Me.Cells(rowNum, "L").Value
            advancePct = Me.Cells(rowNum, "V").Value
            invQty = Me.Cells(rowNum, "BF").Value
            retentionVal = Me.Cells(rowNum, "BH").Value
            
            If IsNumeric(orderQty) And IsNumeric(unitPrice) And IsNumeric(advancePct) And IsNumeric(invQty) And _
               Trim(CStr(orderQty)) <> "" And Trim(CStr(unitPrice)) <> "" And _
               Trim(CStr(advancePct)) <> "" And Trim(CStr(invQty)) <> "" Then
               
                If IsNumeric(retentionVal) And Trim(CStr(retentionVal)) <> "" Then
                    retentionAmt = CDbl(retentionVal)
                Else
                    retentionAmt = 0
                End If
                
                invoicedTotal = CDbl(invQty) * CDbl(unitPrice)
                advancePaid = CDbl(orderQty) * CDbl(unitPrice) * CDbl(advancePct)
                Me.Cells(rowNum, "BI").Value = invoicedTotal - advancePaid - retentionAmt
            Else
                Me.Cells(rowNum, "BI").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Synchronizes Customs Release Date (BQ = BP)
' ==============================================================================
Private Sub AutoSyncCustomsReleaseDate(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    
    Set checkRange = Intersect(Target, Me.Columns("BP"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            If Trim(CStr(cell.Value)) <> "" Then
                Me.Cells(rowNum, "BQ").Value = cell.Value
            Else
                Me.Cells(rowNum, "BQ").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Calculates Planned Dates from AT (BJ = AT - 20, BM = AT + 4)
' ==============================================================================
Private Sub AutoSyncDatesFromAT(ByVal Target As Range)
    Dim checkRange As Range
    Dim cell As Range
    Dim rowNum As Long
    Dim baseDate As Date
    
    Set checkRange = Intersect(Target, Me.Columns("AT"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            If IsDate(cell.Value) And Trim(CStr(cell.Value)) <> "" Then
                baseDate = CDate(cell.Value)
                Me.Cells(rowNum, "BJ").Value = baseDate - 20
                Me.Cells(rowNum, "BJ").NumberFormat = "dd.mm.yyyy"
                Me.Cells(rowNum, "BM").Value = baseDate + 4
                Me.Cells(rowNum, "BM").NumberFormat = "dd.mm.yyyy"
            Else
                Me.Cells(rowNum, "BJ").ClearContents
                Me.Cells(rowNum, "BM").ClearContents
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub

' ==============================================================================
' Description: Highlights missing/empty cells in Light Red across A:BU
' ==============================================================================
Private Sub HighlightMissingCells(ByVal Target As Range)
    Dim checkRange As Range
    Dim rowNum As Long
    Dim cell As Range
    Dim rowRange As Range
    Dim colIndex As Long
    Dim hasData As Boolean
    
    Set checkRange = Intersect(Target, Me.Columns("A:BU"))
    If checkRange Is Nothing Then Exit Sub
    
    On Error GoTo CleanUp
    Application.EnableEvents = False
    Application.ScreenUpdating = False
    
    For Each cell In checkRange
        rowNum = cell.Row
        If rowNum > 1 Then
            Set rowRange = Me.Range(Me.Cells(rowNum, 1), Me.Cells(rowNum, 73))
            
            hasData = False
            For colIndex = 1 To 73
                If Trim(Me.Cells(rowNum, colIndex).Value) <> "" Then
                    hasData = True
                    Exit For
                End If
            Next colIndex
            
            If Not hasData Then
                rowRange.Interior.ColorIndex = xlNone
            Else
                For colIndex = 1 To 73
                    If Trim(Me.Cells(rowNum, colIndex).Value) = "" Then
                        Me.Cells(rowNum, colIndex).Interior.Color = RGB(255, 199, 206)
                    Else
                        Me.Cells(rowNum, colIndex).Interior.ColorIndex = xlNone
                    End If
                Next colIndex
            End If
        End If
    Next cell

CleanUp:
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub
