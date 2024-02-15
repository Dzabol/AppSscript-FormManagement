/**
 * *****************************************************************************
 * Generates a unique user identifier based on the Google Sheets tab name and the application name.
 * *****************************************************************************
 * 
 * @param {string} tabNameInGoogleSheet - The name of the Google Sheets tab used to generate the identifier.
 * @param {string} applicationName - The name of the application for which the user identifier is generated.
 * @returns {string} - A unique user identifier for the specified application and Google Sheets tab.
 */

function generateUserID(tabNameInGoogleSheet, nameForSalesApplication) {
    //retrive current ID from tab PropertiesService
    let currentIDForTab = generateGoogleSheetUUIDNumber_(tabNameInGoogleSheet);
    let newUserID = generateIDForCurrentForSalesApplication_(nameForSalesApplication, currentIDForTab)

    return newUserID;
}

/**
 * *******************************************************************************************
 * Generates a formatted ID for a given application, incorporating a numeric identifier
 * padded with leading zeros to achieve a specified length.
 * *******************************************************************************************
 * 
 * @param {string} applicationName - The name or code of the application.
 * @param {number} uuidNumber - The numeric identifier to be incorporated into the ID.
 * @param {number} quantityOfZeros - The desired length of the numeric identifier with leading zeros.
 * @returns {string} The formatted ID in the pattern "[applicationName-numericIdentifier]".
 */
function generateIDForCurrentForSalesApplication_(aplicationName = "FOTO", uuidNumber = 0, quantityOfZeros = 7) {

    let idNumberInString = uuidNumber.toString();
    let numberFilledWithZeros = idNumberInString.padStart(quantityOfZeros, "0")
    let idNumber = `[${aplicationName}-${numberFilledWithZeros}]`

    return idNumber
}

/**
 * *****************************************************************************
 * Generates and returns a unique identifier for a specified tab in a Google Sheets document.
 * If the tab does not exist in the document properties, it will be created with the default reset value.
 * *****************************************************************************
 * 
 * If 'resetValue' is true, the identifier will be reset to the default value.
 * If 'resetValue' is false and the 'currentID' property does not exist, it will be initialized to 1.
 * If 'resetValue' is false and 'currentID' exists, it will be incremented by 1.
 *
 * @param {string} tabName - The name of the tab for which the unique identifier is generated.
 * @param {boolean} resetValue - Indicates whether to reset the identifier to the default value.
 * @returns {number} The generated or updated unique identifier for the specified tab.
 */

function generateGoogleSheetUUIDNumber_(tabName = "defult", resetValue = false) {
    let documentProperties = PropertiesService.getDocumentProperties();
    let tabProperties = documentProperties.getProperty(tabName);
    // console.log(PropertiesService.getDocumentProperties().getProperty(tabName));

    // Default reset value
    let resetValueObj = { [tabName]: { currentID: 0 } };

    let currentPropertiesForTab = tabProperties !== null ? JSON.parse(tabProperties) : resetValueObj;

    // Check if resetValue is true
    if (resetValue) {
        currentPropertiesForTab = resetValueObj;
    } else {
        // Check if currentID exists before incrementing
        if (currentPropertiesForTab[tabName] && 'currentID' in currentPropertiesForTab[tabName]) {
            currentPropertiesForTab[tabName].currentID++;
        } else {
            // If currentID doesn't exist
            currentPropertiesForTab[tabName] = { currentID: 1 };
        }
    }

    let updatedProperties = JSON.stringify(currentPropertiesForTab);
    // Update values in service
    PropertiesService.getDocumentProperties().setProperty(tabName, updatedProperties);
    // console.log(PropertiesService.getDocumentProperties().getProperty(tabName));

    return currentPropertiesForTab[tabName].currentID;
}





function deleteAllServiceProperties() {
    let documentProperties = PropertiesService.getDocumentProperties();
    documentProperties.deleteAllProperties();
}



