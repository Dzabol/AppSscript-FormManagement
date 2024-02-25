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
    const formUrlCell = templateTab.getRange(formRowNumber, templateColumnNumber);
    const formURL = formUrlCell.getValue().toString();
    const form = FormApp.openByUrl(formURL);
    const formResponses = form.getResponses();

    const rowNumberInGoogleSheet = eventData.range.getRow();
    const responseNumber = rowNumberInGoogleSheet - 2;

    if (responseNumber < 0 || responseNumber >= formResponses.length) {
        // Obsłuż sytuację, gdy liczba odpowiedzi jest mniejsza niż oczekiwane indeksy
        console.error("Invalid response number:", responseNumber);
        return;
    }

    const editLink = formResponses[responseNumber].getEditResponseUrl();
    const hyperlinkEditForm = `=HYPERLINK("${editLink}";"Edit Link")`;
    const responseID = formResponses[responseNumber].getId();

    const sheetToSaveData = googleSheet.getSheetByName(eventData.range.getSheet().getName());
    const urlCell = sheetToSaveData.getRange(rowNumberInGoogleSheet, 3);
    urlCell.setFormula(hyperlinkEditForm);

    const responseIDCell = sheetToSaveData.getRange(rowNumberInGoogleSheet, 4);
    responseIDCell.setValue(responseID);
}
