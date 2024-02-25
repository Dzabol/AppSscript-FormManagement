/**
 * ***************************************************************************** 
 * Generates a unique customer ID and creates hyperlinks for each selected form of interest.
 * *****************************************************************************
 * 
 * @param {Object} eventData - The event data containing information about the form submission event.
 * @param {Object} fieldsOfInterests - Object containing information about fields of interest.
 * @param {Object} formTemplatesData - Object containing information about form templates.
 * @returns {Object} - Object containing the customer ID and an array of form names with corresponding URLs.
 */

function generateIDAndURLAdressForNewCustomer(eventData, fieldsOfInterests, formTemplatesData) {
    const sheetName = eventData.range.getSheet().getName();
    const sheetId = eventData.range.getSheet().getParent().getId();
    const spreadSheet = SpreadsheetApp.openById(sheetId);
    const tabToSaveData = spreadSheet.getSheetByName(sheetName);
    const tabWithTemplatesData = spreadSheet.getSheetByName(formTemplatesData.templatesTabName)

    let dataToSendToCustomer = {
        ID: generateCustomerID(),
        email: eventData.namedValues["Adres e-mail"],
        forms: []
    };

    //New Customer row number
    const rowNumber = eventData.range.getRow();

    // Save ID
    const columnNumber = 1;
    const range = tabToSaveData.getRange(rowNumber, columnNumber);
    range.setValue(dataToSendToCustomer.ID);

    //Get data from form
    const data = {
        ID: dataToSendToCustomer.ID,
        NAME: eventData.namedValues["Imię"],
        SURNAME: eventData.namedValues["Nazwisko"],
        TOWN: eventData.namedValues["Miejscowość"],
        PHONE: eventData.namedValues["Telefon"],
    }

    //Marked by customer fields of interests
    const fieldsOFInterests = eventData.namedValues[formTemplatesData.fieldsOfInterestColumnName];
    const arrayOfInterests = fieldsOFInterests[0].split(',').map(interest => interest.trim());

    for (let i = 0; i < arrayOfInterests.length; i++) {
        const interest = arrayOfInterests[i].trim();

        if (fieldsOfInterests.hasOwnProperty(interest)) {
            const interestData = fieldsOfInterests[interest];
            const templateURL = tabWithTemplatesData.getRange(interestData.urlRowTemplatePosition, formTemplatesData.urlColumnPositionForTemplateForm).getValue();

            const rangeToSetNewURL = tabToSaveData.getRange(rowNumber, interestData.urlColumnPosition);
            const newUrl = replaceDataInURL(templateURL, data);

            // Set new URL to Pre-Filled Form
            //rangeToSetNewURL.setValue(newUrl);
            const hyperlinkFormula = `=HYPERLINK("${newUrl}";"Pre-Filled Form Link")`;
            rangeToSetNewURL.setFormula(hyperlinkFormula);

            dataToSendToCustomer.forms.push({
                formName: interest,
                formURL: newUrl,
            })
        }
    }

    return dataToSendToCustomer;
}


