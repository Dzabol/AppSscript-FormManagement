function generateFormIDandEditLink(eventData, aplicationName = "") {
  const sheetName = eventData.range.getSheet().getName();
  const sheetId = eventData.range.getSheet().getParent().getId();
  const spreadSheet = SpreadsheetApp.openById(sheetId);
  const tabToSaveData = spreadSheet.getSheetByName(sheetName);
  const rowNumber = eventData.range.getRow();

  const dataToSet = {
    formID: generateCustomerID(aplicationName),
    idColumnNumber: 2,
    formEditLink: getEditLinksToForm(eventData),
    formEditLinkColumnNumber: 3,
  }

  // Save FORM ID
  const idCell = tabToSaveData.getRange(rowNumber, dataToSet.idColumnNumber);
  idCell.setValue(dataToSet.formID);

  //Save Edit Link
  //rangeToSetNewURL.setValue(newUrl);
  const editLinkCell = tabToSaveData.getRange(rowNumber, dataToSet.formEditLinkColumnNumber);
  const hyperlinkEditForm = `=HYPERLINK("${dataToSet.formEditLink}";"Edit Link")`;
  editLinkCell.setFormula(hyperlinkEditForm);

  return dataToSet.formID
}

function getEditLinksToForm(eventData) {
  let form = FormApp.openById(eventData.source.getId());
  let responseID = eventData.response.getId();
  let formResponse = form.getResponse(responseID)
  let editLink = formResponse.getEditResponseUrl()

  return editLink
}



function assignEditUrls() {
  var form = FormApp.openById('1BEhTM28SxEMJHDxahVOjE5lf3FrBui_7ave0Xke_LDE');

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('odpowiedzi');

  var data = sheet.getDataRange().getValues();
  var urlCol = 8;
  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrls = [];

  for (var i = 0; i < responses.length; i++) {
    timestamps.push(responses[i].getTimestamp().setMilliseconds(0));
    urls.push(responses[i].getEditResponseUrl());
  }
  for (var j = 1; j < data.length; j++) {

    resultUrls.push([data[j][0] ? urls[timestamps.indexOf(data[j][0].setMilliseconds(0))] : '']);
  }
  sheet.getRange(2, urlCol, resultUrls.length).setValues(resultUrls);
}

/*
  authMode: 
   { toString: [Function: toString],
     name: [Function: toString],
     toJSON: [Function: toString],
     ordinal: [Function: ordinal],
     compareTo: [Function: compareTo],
     NONE: 
      { toString: [Function: toString],
        name: [Function: toString],
        toJSON: [Function: toString],
        ordinal: [Function: ordinal],
        compareTo: [Function: compareTo],
        NONE: [Circular],
        CUSTOM_FUNCTION: [Object],
        LIMITED: [Object],
        FULL: [Circular] },
     CUSTOM_FUNCTION: 
      { toString: [Function: toString],
        name: [Function: toString],
        toJSON: [Function: toString],
        ordinal: [Function: ordinal],
        compareTo: [Function: compareTo],
        NONE: [Object],
        CUSTOM_FUNCTION: [Circular],
        LIMITED: [Object],
        FULL: [Circular] },
     LIMITED: 
      { toString: [Function: toString],
        name: [Function: toString],
        toJSON: [Function: toString],
        ordinal: [Function: ordinal],
        compareTo: [Function: compareTo],
        NONE: [Object],
        CUSTOM_FUNCTION: [Object],
        LIMITED: [Circular],
        FULL: [Circular] },
     FULL: [Circular] },
  namedValues: 
   { Telefon: [ '' ],
     'ID Klienta\nProszę nie usuwać i nie modyfikować na tej podstawie będzie rozpatrywane Państwa zapytanie': [ '{{ID}}' ],
     Nazwisko: [ '{{SURNAME}}' ],
     'Imię': [ '{{NAME}}' ],
     'Adres e-mail': [ 'asd@yyy.pl' ],
     Test: [ 'Opcja 1' ],
     'Miejscowość': [ '{{TOWN}}' ],
     'Sygnatura czasowa': [ '2024-02-19 21:52:58' ] },
  range: 
   { toString: [Function],
     setNumberFormat: [Function],
     getNumberFormat: [Function],
     setComment: [Function],
     getComment: [Function],
     getFilter: [Function],
     clear: [Function],
     getValue: [Function],
     isBlank: [Function],
     merge: [Function],
     check: [Function],
     setValue: [Function],
     offset: [Function],
     sort: [Function],
     clearDataValidations: [Function],
     getMergedRanges: [Function],
     setBackgroundObjects: [Function],
     setFontColorObjects: [Function],
     getDataValidation: [Function],
     getDataValidations: [Function],
     setDataValidation: [Function],
     setDataValidations: [Function],
     copyTo: [Function],
     setValues: [Function],
     getHeight: [Function],
     getLastRow: [Function],
     setFontSize: [Function],
     getDataSourceUrl: [Function],
     getDataTable: [Function],
     getFontSize: [Function],
     getBandings: [Function],
     addDeveloperMetadata: [Function],
     createTextFinder: [Function],
     getDataSourceTables: [Function],
     getDeveloperMetadata: [Function],
     getLastColumn: [Function],
     getDataSourcePivotTables: [Function],
     getDataSourceFormulas: [Function],
     getNotes: [Function],
     getBackground: [Function],
     getNumColumns: [Function],
     clearFormat: [Function],
     clearNote: [Function],
     setNote: [Function],
     getVerticalAlignment: [Function],
     getFontFamily: [Function],
     setFontFamily: [Function],
     setTextStyle: [Function],
     getNumRows: [Function],
     getRowIndex: [Function],
     getTextStyle: [Function],
     clearComment: [Function],
     createDeveloperMetadataFinder: [Function],
     getColumn: [Function],
     removeDuplicates: [Function],
     setBackground: [Function],
     getFormulas: [Function],
     protect: [Function],
     randomize: [Function],
     activate: [Function],
     breakApart: [Function],
     getEndRow: [Function],
     getBorders: [Function],
     getSheet: [Function],
     setBorder: [Function],
     setWrap: [Function],
     getGridId: [Function],
     getWrap: [Function],
     getWraps: [Function],
     autoFill: [Function],
     uncheck: [Function],
     isChecked: [Function],
     setWraps: [Function],
     getWrapStrategy: [Function],
     setShowHyperlink: [Function],
     getHorizontalAlignment: [Function],
     setVerticalAlignments: [Function],
     getBackgroundObjects: [Function],
     setFormulas: [Function],
     activateAsCurrentCell: [Function],
     deleteCells: [Function],
     getNextDataCell: [Function],
     getDataRegion: [Function],
     getFormulaR1C1: [Function],
     getFormulasR1C1: [Function],
     getDataSourceFormula: [Function],
     getNumberFormats: [Function],
     getBackgroundColors: [Function],
     insertCells: [Function],
     setFormulaR1C1: [Function],
     setFormulasR1C1: [Function],
     setBackgroundColors: [Function],
     getDisplayValue: [Function],
     getDisplayValues: [Function],
     mergeAcross: [Function],
     mergeVertically: [Function],
     isPartOfMerge: [Function],
     setBackgroundObject: [Function],
     setBackgrounds: [Function],
     getEndColumn: [Function],
     getBackgrounds: [Function],
     setBackgroundRGB: [Function],
     setComments: [Function],
     setFontColor: [Function],
     setFontColorObject: [Function],
     setFontColors: [Function],
     setFontFamilies: [Function],
     setFontLine: [Function],
     setFontLines: [Function],
     setFontSizes: [Function],
     setFontStyle: [Function],
     setFontStyles: [Function],
     setFontWeight: [Function],
     setFontWeights: [Function],
     setHorizontalAlignments: [Function],
     setNumberFormats: [Function],
     copyValuesToRange: [Function],
     copyFormatToRange: [Function],
     getFontColor: [Function],
     getFontColorObject: [Function],
     getFontColors: [Function],
     getFontColorObjects: [Function],
     getBackgroundObject: [Function],
     getFontLine: [Function],
     getFontLines: [Function],
     getFontSizes: [Function],
     getFontStyle: [Function],
     getFontStyles: [Function],
     getFontWeights: [Function],
     getHorizontalAlignments: [Function],
     getVerticalAlignments: [Function],
     getA1Notation: [Function],
     isStartColumnBounded: [Function],
     isStartRowBounded: [Function],
     isEndColumnBounded: [Function],
     isEndRowBounded: [Function],
     autoFillToNeighbor: [Function],
     getFontFamilies: [Function],
     getTextRotations: [Function],
     setTextRotation: [Function],
     setTextRotations: [Function],
     setVerticalText: [Function],
     setTextDirections: [Function],
     getTextDirections: [Function],
     splitTextToColumns: [Function],
     applyRowBanding: [Function],
     applyColumnBanding: [Function],
     setWrapStrategy: [Function],
     setWrapStrategies: [Function],
     getWrapStrategies: [Function],
     createPivotTable: [Function],
     createDataSourcePivotTable: [Function],
     createDataSourceTable: [Function],
     shiftRowGroupDepth: [Function],
     shiftColumnGroupDepth: [Function],
     expandGroups: [Function],
     collapseGroups: [Function],
     getRichTextValue: [Function],
     getRichTextValues: [Function],
     setRichTextValue: [Function],
     getTextRotation: [Function],
     getTextStyles: [Function],
     setTextStyles: [Function],
     insertCheckboxes: [Function],
     removeCheckboxes: [Function],
     trimWhitespace: [Function],
     setRichTextValues: [Function],
     setFormula: [Function],
     getFormula: [Function],
     setHorizontalAlignment: [Function],
     setVerticalAlignment: [Function],
     setNotes: [Function],
     canEdit: [Function],
     getBackgroundColor: [Function],
     setBackgroundColor: [Function],
     getRow: [Function],
     clearContent: [Function],
     createFilter: [Function],
     getBorder: [Function],
     setTextDirection: [Function],
     getFontWeight: [Function],
     getComments: [Function],
     getNote: [Function],
     getCell: [Function],
     getWidth: [Function],
     getColumnIndex: [Function],
     getTextDirection: [Function],
     moveTo: [Function],
     getValues: [Function],
     columnEnd: 10,
     columnStart: 1,
     rowEnd: 5,
     rowStart: 5 },
  source: 
   { toString: [Function],
     isReadable: [Function],
     isWritable: [Function],
     getName: [Function],
     getKey: [Function],
     setName: [Function],
     getId: [Function],
     copy: [Function],
     getOwner: [Function],
     rename: [Function],
     */