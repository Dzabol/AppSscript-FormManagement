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
 * @property {number} totalFiles - The total count of files in the folder.
 * @property {number} totalFolders - The total count of folders in the folder.
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
        totalFiles: 0,
        totalFolders: 0,
        isThereError: false,
        errorMessage: null,
    }

    let files;
    let pageToken = null;

    do {
        try {
            files = Drive.Files.list({
                q: `"${sourceFolderId}" in parents and trashed = false`,
                pageSize: 1000,
                fields: 'nextPageToken, files(id,name,mimeType,webViewLink,webContentLink,contentHints/thumbnail,fileExtension,iconLink,size,thumbnailLink,parents, kind, trashed, owners, modifiedTime)',
                pageToken: pageToken
            });

            if (!files.files || files.files.length === 0) {
                console.log('No files found.');

                return { ...dataInformation, isThereError: true, errorMessage: 'No files found.' };

            }

            for (let i = 0; i < files.files.length; i++) {
                const file = files.files[i];
                // console.log('%s (ID: %s, Type: %s, URL: %s)', file.name, file.id, file.mimeType, file.webContentLink);

                if (file.mimeType === "application/vnd.google-apps.folder") {
                    dataInformation.totalFolders++;
                } else {
                    dataInformation.totalFiles++;
                    if (file.mimeType === "application/vnd.google-apps.shortcut") {
                        dataInformation.totalFiles++; // Zwiększ liczbę plików dla skrótu
                    }
                }
            }

            pageToken = files.nextPageToken;
        } catch (err) {
            console.log('Failed with error %s', err.message);
            dataInformation.isThereError = true;
            dataInformation.errorMessage = err.message;

        }
    } while (pageToken);

    return { ...dataInformation, items: files.files }
}