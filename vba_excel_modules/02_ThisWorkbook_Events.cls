VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "ThisWorkbook"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
' ==============================================================================
' Description: Prevents saving the workbook if any row containing data
'              is missing required values in Column BU.
' Author: Davit Petrosyan
' ==============================================================================
Option Explicit

Private Sub Workbook_BeforeSave(ByVal SaveAsUI As Boolean, Cancel As Boolean)
    Dim ws As Worksheet
    Dim maxRow As Long
    Dim i As Long
    Dim colIndex As Long
    Dim hasAnyDataInRow As Boolean
    Dim emptyBUCell As Range
    
    Set ws = ThisWorkbook.Sheets("List")
    
    ' Find the maximum used row in range A:BU
    maxRow = ws.UsedRange.Rows.Count + ws.UsedRange.Row - 1
    
    ' Loop through all rows starting from row 2 (skipping header)
    If maxRow >= 2 Then
        For i = 2 To maxRow
            hasAnyDataInRow = False
            
            ' Check if any cell in range A to BU (Columns 1 to 73) has data
            For colIndex = 1 To 73
                If Trim(ws.Cells(i, colIndex).Value) <> "" Then
                    hasAnyDataInRow = True
                    Exit For
                End If
            Next colIndex
            
            ' If the row has any data but BU column is empty, block save
            If hasAnyDataInRow Then
                If Trim(ws.Cells(i, "BU").Value) = "" Then
                    Set emptyBUCell = ws.Cells(i, "BU")
                    Exit For
                End If
            End If
        Next i
    End If
    
    ' If an empty BU cell is found, block saving and alert user
    If Not emptyBUCell Is Nothing Then
        Cancel = True
        MsgBox "Cannot save file! Column BU is missing data at cell: " & emptyBUCell.Address(False, False), _
               vbCritical, "Required Field Missing"
        ws.Activate
        emptyBUCell.Select
    End If
End Sub

' ==============================================================================
' Description: Automatically runs the Poti arrival notification check
'              upon opening the Excel workbook.
' ==============================================================================
Private Sub Workbook_Open()
    Call CheckPotiArrivals
End Sub
