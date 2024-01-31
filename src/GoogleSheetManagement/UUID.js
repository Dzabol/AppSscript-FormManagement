function test() {
    generateGoogleSheetUUIDNumber_();
}

function generateGoogleSheetUUIDNumber_(tabName = "defult", resetValue = false) {
    let documentProperties = PropertiesService.getDocumentProperties();
    let tabProperties = documentProperties.getProperty(tabName);
    console.log(PropertiesService.getDocumentProperties().getProperty(tabName));

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


function deleteServiceProperties() {
    let documentProperties = PropertiesService.getDocumentProperties();
    documentProperties.deleteAllProperties();
}
