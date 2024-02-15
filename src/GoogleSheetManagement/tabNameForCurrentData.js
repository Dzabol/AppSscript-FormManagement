/**
 * *****************************************************************************
 * Create a new tab in a spreadsheet if it doesn't already exist.
 * If the tab doesn't exist, it will be created by copying a template tab,
 * and then moved to the first position in the spreadsheet.
 * *****************************************************************************
 * 
 * @param {string} sheetID - ID of the spreadsheet where the tab should be created.
 * @param {string} templateID - ID of the spreadsheet containing the template tab.
 * @param {string} templateSheetName - Name of the template tab.
 *
 * @returns {void}
 *
 * Usage example:
 * createYearTabIfDoesntExist("your_sheet_id", "your_template_id", "your_template_sheet_name");
 */

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