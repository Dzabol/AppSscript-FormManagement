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

function createNewCustomerSpaceForAplication(
  customerInformations,
  dataBaseFolderID,
  templatesFolderID,
  descriptionsOfTheMonths,
) {
  //Folder description for customer in required aplication
  const customerDescription = generatecustomerIdentificationName(customerInformations);

  // Create user folder
  const customerFolderID = setUserFolder({
    mainFolderID: dataBaseFolderID,
    userFolderName: customerDescription,
    monthDescription: descriptionsOfTheMonths
  });

  // Copy template files and folders
  const listOfTheDataFromTemplateFolder = listRootFolders(templatesFolderID);
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
    destinationFolderID: customerFolderID,
    prefixforTheFileName: customerDescription,
    progressState,
    onProgress: progressCallback,
  });

  return { customerFolderID: customerFolderID }
}