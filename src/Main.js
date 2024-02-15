/**
 * *****************************************************************************
 * Copy template files and folders to a user-specific folder, and generate
 * customer identification based on basic data.
 * *****************************************************************************
 * 
 * @param {string} dataBaseFolderID - ID of the folder where user folders are stored.
 * @param {string} templatesFolderID - ID of the folder containing template files.
 * @param {object} descriptionsOfTheMonths - Descriptions of the months.
 * @param {Array} customerBasicData - Array containing basic customer data.
 *   Index 0: Creation date
 *   Index 1: User name
 *   Index 2: User surname
 *   Index 3: Name of the town
 *
 *  @returns {Object} - An object containing the new customer ID and the ID of the customer-specific folder.
 *   - customerID: New potential customer ID.
 *   - customerFolderID: ID of the customer-specific folder.
 *
 * Usage example:
 * createNewUser("your_data_base_folder_id", "your_templates_folder_id", { 1: "1. Styczeń", 2: "2. Luty"...} , ["2024-01-10 20:28:16", "Paulina", "Kowalska", "Skawina"]);
 * console.log(result.customerID);
 * console.log(result.customerFolderID);
 */
 
function createNewUser(
  dataBaseFolderID = FOLDER_ID_TO_STORE_FILES_WITH_CUSTOMERS,
  templatesFolderID = FOLDER_ID_WITH_TEMPLATE_FILES, 
  descriptionsOfTheMonths = MONTH_DESCRIPTION,
  customerBasicData = ["2024-01-10 20:28:16","Paulina","Kowalska","Skawina"]
) {
  // Generate customer ID
  // const newPotentialCustomerID = generateUserID(currentYearTabNameWithPotentialCustomers, aplicationName)
  const newPotentialCustomerID = "[FOTO0001]";
  const customerDescription = generatecustomerIdentificationName({ 
    userID: newPotentialCustomerID,  
    creationDate: customerBasicData[0].toString(), 
    userName: customerBasicData[1].toString(), 
    userSurname: customerBasicData[2].toString(), 
    nameOfTheTown: customerBasicData[3].toString() });

  // Create user folder
  const userFolderID = setUserFolder({
    mainFolderID: dataBaseFolderID,
    userFolderName: customerDescription,
    monthDescription: descriptionsOfTheMonths
  });

  // Copy template files and folders
  const listOfTheDataFromTemplateFolder = listRootFolders_(templatesFolderID);
  let progressState = {
    totalNumberOfFiles: listOfTheDataFromTemplateFolder.totalNumberOfFiles,
    totalNumberOfFolders: listOfTheDataFromTemplateFolder.totalNumberOfFolders,
    copiedFiles: 0,
    copiedFolders: 0,
    currentFile: 0,
    currentFolder: 0,
    progressPercentageFiles: 0,
    progressPercentageFolders: 0,
  };

  copyFoldersAndFiles_({
    sourceFolderID: templatesFolderID,
    destinationFolderID: userFolderID,
    prefixforTheFileName: customerDescription,
    progressState,
    onProgress: progressCallback,
  });

  return {customerID: newPotentialCustomerID, customerFolderID: userFolderID}
}