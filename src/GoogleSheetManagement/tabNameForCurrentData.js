function createYearTabIfDoesntExist(
  sheetID = TEMPLATE_DATA_BASE_SHEET_ID, 
  templateID = TEMPLATE_DATA_BASE_SHEET_ID, 
  templateSheetName = TEMPLATE_DATA_BASE_SHEET_NAME
  ){

  const dataSheet = SpreadsheetApp.openById(sheetID)
  const allSheets = dataSheet.getSheets();
  const sheetsNames = allSheets.map(sheet => sheet.getName() )

  let currentDate = new Date()
  let year = currentDate.getFullYear().toString()

  if (!sheetsNames.includes(year)) 
  {
    const templateSheet = SpreadsheetApp.openById(templateID);
    const templateTab = templateSheet.getSheetByName(templateSheetName)
    const copiedTemplate = templateTab.copyTo(dataSheet)
    copiedTemplate.activate();
    dataSheet.moveActiveSheet(2)
    copiedTemplate.setName(year)
  }
}