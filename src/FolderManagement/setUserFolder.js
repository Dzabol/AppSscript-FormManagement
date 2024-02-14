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

function setUserFolder({mainFolderID, userFolderName, monthDescription}) {
  if (!userFolderName) return;

  let currentDate = new Date()
  let month = (currentDate.getMonth() + 1).toString();
  let year = currentDate.getFullYear().toString()

  const yearFolderData = folderToSetData_(mainFolderID, year)
  const monthFolderData = folderToSetData_(yearFolderData.id, monthDescription[month])
  const userFolder = folderToSetData_(monthFolderData.id, userFolderName, false)

  return userFolder.id
}