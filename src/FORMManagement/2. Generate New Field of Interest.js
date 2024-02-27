function generateUserSpaceForRequiredFieldOfInterest(
  eventData,
  templatesData,
  answersFormBasicInformation,
  fieldOfInterestBasicInformations,
  descriptionsOfTheMonths
) {

  //Spreadsheet
  const sheetName = eventData.range.getSheet().getName();
  const sheetId = eventData.range.getSheet().getParent().getId();
  const spreadSheet = SpreadsheetApp.openById(sheetId);
  const tabToSaveData = spreadSheet.getSheetByName(sheetName);

  //Basic data
  const rowNumberToSetData = eventData.range.getRow();
  const customerInformations = {
    userID: tabToSaveData.getRange(rowNumberToSetData, answersFormBasicInformation.customerIDColumnPosition).getValue().toString(),
    formID:generateCustomerID(fieldOfInterestBasicInformations.aplicationName),
    customerName: eventData.namedValues["Imię"],
    customerSurname: eventData.namedValues["Nazwisko"],
    nameOfTheTown: eventData.namedValues["Miejscowość"],
  } 
  
  //Data from Templates tab
  const sheetNameWithTemplatesFroms = templatesData.templatesTabName;
  const columnNumberWithForm = templatesData.urlColumnPositionWithForms;
  const templateFormRowNumber = fieldOfInterestBasicInformations.urlRowTemplatePosition
  const editLinksData = getEditFormURL(eventData, sheetNameWithTemplatesFroms, columnNumberWithForm, templateFormRowNumber)

  //Save in Sheet basic Form information
  const formIdCell = tabToSaveData.getRange(rowNumberToSetData, answersFormBasicInformation.formIdColumnPosition);
  const editLinkCell = tabToSaveData.getRange(rowNumberToSetData, answersFormBasicInformation.editLinkColumnPosition);
  const responseIdCell = tabToSaveData.getRange(rowNumberToSetData, answersFormBasicInformation.answerIDcolumnPosition);
  
  formIdCell.setValue(customerInformations.formID)
  editLinkCell.setFormula(`=HYPERLINK("${editLinksData.editLink}";"Edit Form")`)
  responseIdCell.setValue(editLinksData.responseID)

  /** 
   * Files from Customer Folder
   */

  //Create newFolderWithTemplates
  const dataFromFolders = createNewCustomerSpaceForAplication(
    customerInformations,
    fieldOfInterestBasicInformations.dataBaseFolderID,
    fieldOfInterestBasicInformations.templatesFolderID,
    descriptionsOfTheMonths
  )

  //Set URL for Customer Folder
  const folderID = dataFromFolders.customerFolderID
  const folderURL = generateGoogleURL(folderID, "folder")
  const folderUrlCell = tabToSaveData.getRange(rowNumberToSetData, answersFormBasicInformation.folderURLColumnPositon);

  folderUrlCell.setFormula(`=HYPERLINK("${folderURL}";"Link to Folder")`)

   //Set URL for other files from Cusotmer Folder defined in global variables
   let otherObjects = generateDataForRequiredFileOrFolder(folderID,answersFormBasicInformation.otherLinks)
   
  otherObjects.forEach(file =>{
    let range = tabToSaveData.getRange(rowNumberToSetData, file.columnNumberToSetData); 
    let hyperLink = `=HYPERLINK("${file.url.toString()}";"Link")`
    range.setFormula(hyperLink)
  })
}

/**
 * *****************************************************************************  
 * Retrieves the edit link for the form response and sets it in the Google Sheets.
 * ***************************************************************************** 
 *  
 * @param {Object} eventData - The event data object containing information about the trigger event.
 * @param {string} templateSheetTabName - The name of the template sheet tab containing the form URL.
 * @param {number} templateColumnNumber - The column number in the template sheet tab where the form URL is located.
 * @param {number} formRowNumber - The row number in the template sheet tab where the form URL is located.
 */

function getEditFormURL(eventData, templateSheetTabName, templateColumnNumber, formRowNumber) {

  const googleSheet = SpreadsheetApp.openById(eventData.source.getId());
  const templateTab = googleSheet.getSheetByName(templateSheetTabName);

  //Get form Url from template tab
  const formUrlCell = templateTab.getRange(formRowNumber, templateColumnNumber);
  const formURL = formUrlCell.getValue().toString();

  //Get responses from submited forms
  const form = FormApp.openByUrl(formURL);
  const formResponses = form.getResponses();

  //Established response position based on answer from google sheet
  const rowNumberInGoogleSheet = eventData.range.getRow();
  const responseNumber = rowNumberInGoogleSheet - 2;  // -2 -> 2 rows in header

  if (responseNumber < 0 || responseNumber >= formResponses.length) {
    // Obsłuż sytuację, gdy liczba odpowiedzi jest mniejsza niż oczekiwane indeksy
    console.error("Invalid response number:", responseNumber);
    return;
  }

  //Get required response data
  const editLink = formResponses[responseNumber].getEditResponseUrl();
  const responseID = formResponses[responseNumber].getId();

  return { editLink: editLink, responseID: responseID }
}



//Assing URLs for all responses.

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

