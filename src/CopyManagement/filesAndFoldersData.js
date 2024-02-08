/**
 * *****************************************************************************
 * Function to list and retrieve information about files and folders in a
 * specified folder identified by its ID.
 * *****************************************************************************
 * @param {string} sourceFolderId - ID of the folder to list and retrieve data.
 * @returns {Object} - An object containing information about files and folders,
 *                    along with error details if encountered.
 *
 * @typedef {Object} FileAndFolderInfo
 * @property {Array} files - Array of objects representing files in the folder.
 * @property {number} totalNumberOfFiles - The total count of files in the folder.
 * @property {number} totalNumberOfFolders - The total count of folders in the folder.
 * @property {boolean} isThereError - Indicates if an error occurred during execution.
 * @property {string} errorMessage - Detailed error message if an error occurred.
 *
 * Usage example:
 * const sourceFolderId = "your_source_folder_id";
 * const folderInfo = listRootFolders_(sourceFolderId);
 * console.log(`Total Files: ${folderInfo.totalFiles}`);
 * console.log(`Total Folders: ${folderInfo.totalFolders}`);
 * console.log(`Files:`, folderInfo.files);
 * console.log(`Is there an error? ${folderInfo.isThereError}`);
 * console.log(`Error Message: ${folderInfo.errorMessage}`);
 */

function listRootFolders_(sourceFolderId) {
    let dataInformation = {
        items: [],
        totalNumberOfFiles: 0,
        totalNumberOfFolders: 0,
        isThereError: false,
        errorMessage: null,
    }

    let sourceFolder = DriveApp.getFolderById(sourceFolderId)
    let folders = sourceFolder.getFolders()
    let files;
    let pageToken = null;

    const generateData = (idNumber) => {
        files = Drive.Files.list({
            q: `"${idNumber}" in parents and trashed = false`,
            includeItemsFromAllDrives: true,
            supportsAllDrives: true,
            corpora: 'allDrives',
            pageSize: 1000,
            pageToken: pageToken,
            fields: 'nextPageToken, files(id,name,mimeType,webViewLink,webContentLink,contentHints/thumbnail,fileExtension,iconLink,size,thumbnailLink,parents, kind, owners, modifiedTime)',

        });

        if (!files.files || files.files.length === 0) return

        for (let i = 0; i < files.files.length; i++) {
            const file = files.files[i];
            dataInformation.items.push(file);
            if (file.mimeType === "application/vnd.google-apps.folder") {
                dataInformation.totalNumberOfFolders++;
            } else {
                dataInformation.totalNumberOfFiles++;
                if (file.mimeType === "application/vnd.google-apps.shortcut") {
                    dataInformation.totalNumberOfFiles++; // Zwiększ liczbę plików dla skrótu
                }
            }
        }
        pageToken = files.nextPageToken;
    }

    do {
        try {
            generateData(sourceFolderId);
            //Generate for subfolders
            while (folders.hasNext()) {

                let currentfolderID = folders.next().getId();
                generateData(currentfolderID);
                listRootFolders_(currentfolderID)
            }
        } catch (err) {
            console.log('Failed with error %s', err.message);
            dataInformation.isThereError = true;
            dataInformation.errorMessage = err.message;

        }
    } while (pageToken);

    return { ...dataInformation, items: files.files }
}

