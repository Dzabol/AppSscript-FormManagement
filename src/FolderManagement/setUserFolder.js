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

function folderToSetData_(mainFolderID, folderName) {
  let foldersInMainFolder = listRootFolders_(mainFolderID)
  let folderData = foldersInMainFolder.items.find(folder => (folder.name.toLowerCase() === folderName.toLowerCase() && folder.mimeType === 'application/vnd.google-apps.folder'))

  if (folderData) return { id: folderData.id, link: folderData.webViewLink }
  else {
    let mainFolder = DriveApp.getFolderById(mainFolderID);
    let newFolder = mainFolder.createFolder(folderName)
    return { id: newFolder.getId(), link: newFolder.getUrl() }
  }
}


/**
 * *****************************************************************************
 * Creates a folder structure for a user based on the specified main folder ID 
 * and user folder name.
 * The folder structure includes a hierarchy of year, month, and user-specific 
 * folders.
 * *****************************************************************************
 *
 * @param {string} mainFolderID - The ID of the main folder where the user structure will be created.
 * @param {string} userFolderName - The name of the user-specific folder to be created.
 * @returns {string} - string with ID of userFolder
 */

function setUserFolder(mainFolderID, userFolderName) {
  if (!userFolderName) return;

  let currentDate = new Date()
  let month = (currentDate.getMonth() + 1).toString();
  let year = currentDate.getFullYear().toString()

  let yearFolder = folderToSetData_(mainFolderID, year)
  let monthFolder = folderToSetData_(yearFolder.id, MONTH_DESCRIPTION[month])
  let userFolder = folderToSetData_(monthFolder.id, userFolderName)

  return userFolder.id
}





