/**
 * *****************************************************************************
 * Count the number of folders with the same name within a main folder.
 * *****************************************************************************
 * 
 * @param {string} mainFolderID - ID of the main folder to search for folders.
 * @param {string} folderNameToSearch - Name of the folder to search for.
 * @returns {number} - The number of folders with the same name found.
 *
 * @example
 * const mainFolderID = "your_main_folder_id";
 * const folderName = "your_folder_name";
 * const count = checkQuantityOfTheSameFolderNames_(mainFolderID, folderName);
 * console.log(`Number of folders with the same name: ${count}`);
 */

function checkQuantityOfTheSameFolderNames_(mainFolderID, folderNameToSearch){
  let theSameFoldersQuantity = 0;
  const mainFolder =  DriveApp.getFolderById(mainFolderID);
  const allFoldersInMainFolder = mainFolder.getFolders();

  while(allFoldersInMainFolder.hasNext()){
    let folder = allFoldersInMainFolder.next()
    if(folder.getName().toLowerCase() === folderNameToSearch.toLowerCase()) theSameFoldersQuantity++
      }

  return theSameFoldersQuantity;
}

/**
 * *****************************************************************************
 * Count the number of folders within a main folder whose names start with the specified base name.
 * *****************************************************************************
 * 
 * @param {string} mainFolderID - ID of the main folder to search for folders.
 * @param {string} baseName - Base name to search for at the beginning of folder names.
 * @returns {number} - The number of folders whose names start with the specified base name.
 * 
 * @example
 * const mainFolderID = "your_main_folder_id";
 * const baseName = "your_base_name";
 * const count = findQuantiyOfFoldersWithTheSameBaseName_(mainFolderID, baseName);
 * console.log(`Number of folders with the same base name: ${count}`);
 */

function findQuantiyOfFoldersWithTheSameBaseName_(mainFolderID, baseName){
  let quantityOfTheSameBase = 0;
  const mainFolder = DriveApp.getFolderById(mainFolderID);
  const allFoldersInMainFolder = mainFolder.getFolders();
  
  while(allFoldersInMainFolder.hasNext())
  {
    let folder = allFoldersInMainFolder.next();
    let folderName = folder.getName();
    folderName.toString().startsWith(baseName) && quantityOfTheSameBase++;
  }

return quantityOfTheSameBase;
}


/**
 * *****************************************************************************
 * Create or retrieve a folder within a main folder based on the folder name.
 * If the folder already exists, its information is retrieved; otherwise, 
 * a new folder is created.
 * *****************************************************************************
 * 
 * @param {string} mainFolderID - ID of the main folder containing or to contain the target folder.
 * @param {string} folderName - Name of the folder to be created or retrieved.
 * @returns {Object} - An object containing the ID and URL link of the target folder.
 *
 * @typedef {Object} FolderData
 * @property {string} id - ID of the target folder.
 * @property {string} link - URL link to the target folder.
 *
 * Usage example:
 * const mainFolderID = "your_main_folder_id";
 * const folderName = "your_folder_name";
 * const result = folderToSetData(mainFolderID, folderName);
 * console.log(`Folder ID: ${result.id}`);
 * console.log(`Folder Link: ${result.link}`);
 */

function folderToSetData_(mainFolderID, folderName, insertDataInFirstExistingFolder = true) {

  const createFolder = (parentFolder, newFolderName) => {
    let newFolder = parentFolder.createFolder(newFolderName);
    return { id: newFolder.getId(), link: newFolder.getUrl() };
  };

  const mainFolder = DriveApp.getFolderById(mainFolderID);
  const allFoldersInMainFolder = mainFolder.getFolders();

  const numberOfSameFolders = checkQuantityOfTheSameFolderNames_(mainFolderID, folderName);

  if (numberOfSameFolders === 0) {
    return createFolder(mainFolder, folderName);
  }

  let existingFolder;
  let newFolderName;

  while (allFoldersInMainFolder.hasNext()) {
    let folder = allFoldersInMainFolder.next();
    if (folder.getName().toLowerCase() === folderName.toLowerCase()) {
      existingFolder = folder;
      break;
    }
  }

  if (existingFolder && insertDataInFirstExistingFolder) {
    return { id: existingFolder.getId(), link: existingFolder.getUrl() };
  } else {
    newFolderName = `${folderName}-[${findQuantiyOfFoldersWithTheSameBaseName_(mainFolderID,folderName) + 1}]`;
    let aditional
    return createFolder(mainFolder, newFolderName);
  }
}