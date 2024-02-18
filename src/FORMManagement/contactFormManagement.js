function generateIDAndURLAdressForNewCustomer(eventData, FIELDS_OF_INTERESTS_INPUTDATA, FORM_TEMPLATES_DATA) {
    const sheetName = eventData.range.getSheet().getName();
    const sheetId = eventData.range.getSheet().getParent().getId();
    const spreadSheet = SpreadsheetApp.openById(sheetId);
    const tabToSaveData = spreadSheet.getSheetByName(sheetName);
    let dataToSendToCustomer = {
        ID: generateCustomerID(),
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
        ID: customerID,
        NAME: e.namedValues["Imię"],
        SURNAME: e.namedValues["Nazwisko"],
        TOWN: e.namedValues["Miejscowość"],
        PHONE: e.namedValues["Telefon"],
    }

    //Marked by customer fields of interests
    const fieldsOFInterests = eventData.namedValues[FORM_TEMPLATES_DATA.fieldsOfInterestColumnName];
    const arrayOfInterests = fieldsOFInterests[0].split(',').map(interest => interest.trim());

    for (let i = 0; i < arrayOfInterests.length; i++) {
        const interest = arrayOfInterests[i].trim();

        if (FIELDS_OF_INTERESTS_INPUTDATA.hasOwnProperty(interest)) {
            const interestData = FIELDS_OF_INTERESTS_INPUTDATA[interest];
            const templateURL = FORM_TEMPLATES_DATA.templatesTabName.getRange(interestData.urlRowTemplatePosition, FORM_TEMPLATES_DATA.urlColumnPositionForTemplateForm).getValue();

            const rangeToSetNewURL = tabToSaveData.getRange(rowNumber, interestData.urlColumnPosition);
            const newUrl = replaceDataInURL(templateURL, data);

            // Set new URL
            //rangeToSetNewURL.setValue(newUrl);
            const hyperlinkFormula = `=HYPERLINK("${newUrl}", "Link")`;
            rangeToSetNewURL.setFormula(hyperlinkFormula);

            dataToSendToCustomer.push({
                formName: interest,
                formURL: newUrl,
            })
        }
    }

    return dataToSendToCustomer;
}


/**
 * *****************************************************************************
 * Generates a unique customer ID.
 * *****************************************************************************
 * Uses Utilities.getUuid() to generate a UUID.
 * and current date
 * @returns {string} The extracted digits representing the customer constant ID.
 */


function generateCustomerID() {

    const lengthofUUID = 6;

    const id = Utilities.getUuid();
    const date = new Date();
    const year = date.getFullYear().toString();

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let extractedDigits = id.substring(id.length - lengthofUUID);

    return `[${year}/${month}/${day}/${extractedDigits}]`;
}

/**
 * *****************************************************************************
 * Replaces placeholder values in the URL with corresponding data values.
 * *****************************************************************************
 * 
 * @param {string} url - The URL containing placeholder values.
 * @param {Object} data - The data object containing key-value pairs to replace placeholders.
 * @returns {string} - The URL with replaced placeholder values.
 */

function replaceDataInURL(url, data) {
    let urlString = url.toString();

    for (const key in data) {
        const regex = new RegExp("{{" + key + "}}", "g");
        urlString = urlString.replace(regex, data[key]);
    }

    return urlString;
}