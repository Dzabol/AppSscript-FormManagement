/**
 * *****************************************************************************
 * Generates data for the required file or folder based on the provided source 
 * folder ID and objects to search.
 * *****************************************************************************
 * 
 * @param {string} sourceFolderID - The ID of the source folder to search for files.
 * @param {Array} objectsToSearch - An array of objects containing details of files or folders to search for.
 * @returns {Array} - An array of objects containing updated data for the searched files or folders.
 * 
 * Example usage:
 * const sourceFolderID = "xxx";
 * const objectsToSearch = [
 *    {
 *        name: "Kalkulator",
 *        type: "sheet",
 *        columnNumberToSetData: 6,
 *        url: "",
 *        id: "",
 *    },
 * ];
 *
 * const searchResults = generateDataForRequiredFileOrFolder(sourceFolderID, objectsToSearch);
 * console.log(searchResults);
 */

function generateDataForRequiredFileOrFolder(sourceFolderID, objectsToSearch) {
    // Retrieve list of files from the root folder
    const listOfFiles = listRootFolders(sourceFolderID).items;
    let reorganizeList = [];

    // Reorganize list of files array
    listOfFiles.forEach(file => {
        const fileData = {
            name: file.name,
            type: recognizeFileType(file.mimeType),
            url: file.webViewLink,
            id: file.id,
        };
        reorganizeList.push(fileData);
    });

    // Find files
    objectsToSearch.forEach(objectToSearch => {
        const foundItem = reorganizeList.find(item => item.type === objectToSearch.type && item.name.endsWith(objectToSearch.name));
        if (foundItem) {
            objectToSearch.url = foundItem.url;
            objectToSearch.id = foundItem.id;
        }
    });

    return objectsToSearch;
}