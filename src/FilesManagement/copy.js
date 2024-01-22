/**
 * *****************************************************************************
 * Copy all folders and their contents from the source to the destination folder.
 * *****************************************************************************
 * @param {object} options - Options for the copying operation.
 * @param {string} options.sourceFolderID - ID of the source folder to copy.
 * @param {string} options.destinationFolderID - ID of the destination folder.
 * @param {string} [options.prefixforTheFileName=""] - Prefix to be added to all file names.
 * @param {string} [options.suffixforTheFileName=""] - Suffix to be added to all file names.
 * @param {string} [options.separator="-"] - Separator between prefix and suffix in file names.
 * @param {boolean} [options.duplicateShourtCut=false] - Whether to duplicate shortcuts.
 * @param {boolean} [options.duplicateFileFromShortcut=false] - Whether to duplicate files from shortcuts.
 * @param {boolean} [options.copyAlsoFilesInFolders=true] - Whether to copy files within folders.
 * @param {object} progressState - Object containing the progress state.
 * @param {number} progressState.totalFolders - Total count of folders to be copied.
 * @param {number} progressState.totalFiles - Total count of files to be copied.
 * @param {number} progressState.currentFolder - Current folder being copied.
 * @param {number} progressState.progressPercentageFolders - Progress percentage for folders.
 * @param {function} [onProgress=null] - Callback function to handle progress updates.
 */

function copyFoldersAndFiles_({
    sourceFolderID,
    destinationFolderID,
    prefixforTheFileName = "",
    suffixforTheFileName = "",
    separator = "-",
    duplicateShourtCut = false,
    duplicateFileFromShortcut = false,
    copyAlsoFilesInFolders = true,
    progressState,
    onProgress = null,
} = {}) {
    const sourceFolder = DriveApp.getFolderById(sourceFolderID);
    const destinationFolder = DriveApp.getFolderById(destinationFolderID);
    const allFolders = sourceFolder.getFolders();

    if (onProgress) {
        onProgress(progressState);
    }

    if (copyAlsoFilesInFolders) {
        //Copy files in folder
        copyAllFilesInFolder_({
            sourceFolder: sourceFolder,
            destinationFolder: destinationFolder,
            prefixforTheFileName: prefixforTheFileName,
            suffixforTheFileName: suffixforTheFileName,
            separator: separator,
            duplicateShourtCut: duplicateShourtCut,
            duplicateFileFromShortcut: duplicateFileFromShortcut,
            progressState,
            onProgress,
        })
    }

    while (allFolders.hasNext()) {
        let subFolder = allFolders.next();
        let subFolderID = subFolder.getId()
        let folderName = subFolder.getName();
        let targetFolder = destinationFolder.createFolder(folderName);
        let targetFolderID = targetFolder.getId()



        if (onProgress) {
            progressState.currentFolder++;
            progressState.progressPercentageFolders = Math.round((progressState.currentFolder / progressState.totalFolders) * 100);
            onProgress(progressState);
        }

        copyFoldersAndFiles_({
            sourceFolderID: subFolderID,
            destinationFolderID: targetFolderID,
            prefixforTheFileName: prefixforTheFileName,
            suffixforTheFileName: suffixforTheFileName,
            separator: separator,
            duplicateShourtCut: duplicateShourtCut,
            duplicateFileFromShortcut: duplicateFileFromShortcut,
            copyAlsoFilesInFolders: copyAlsoFilesInFolders,
            progressState,
            onProgress,
        })
    }
}


/**
 * *****************************************************************************
 * Copy all files from a source folder to a destination folder with optional
 * file name modifications and shortcut handling.
 * *****************************************************************************
 * @param {object} options - Options for the copying operation.
 * @param {folder} options.sourceFolder - Source folder containing the files.
 * @param {folder} options.destinationFolder - Destination folder for copied files.
 * @param {string} [options.prefixforTheFileName=""] - Prefix to be added to all file names.
 * @param {string} [options.suffixforTheFileName=""] - Suffix to be added to all file names.
 * @param {string} [options.separator="-"] - Separator between prefix and suffix in file names.
 * @param {boolean} [options.duplicateShourtCut=false] - Whether to duplicate shortcuts.
 * @param {boolean} [options.duplicateFileFromShortcut=false] - Whether to duplicate files from shortcuts.
 * @param {object} progressState - Object containing the progress state.
 * @param {number} progressState.totalFiles - Total count of files to be copied.
 * @param {number} progressState.currentFile - Current file being copied.
 * @param {number} progressState.progressPercentageFiles - Progress percentage for files.
 * @param {function} [onProgress=null] - Callback function to handle progress updates.
 */

function copyAllFilesInFolder_({
    sourceFolder,
    destinationFolder,
    prefixforTheFileName = "",
    suffixforTheFileName = "",
    separator = "-",
    duplicateShourtCut = false,
    duplicateFileFromShortcut = false,
    progressState,
    onProgress = null,
} = {}) {

    const allFilesInFolder = sourceFolder.getFiles();

    while (allFilesInFolder.hasNext()) {
        let file = allFilesInFolder.next();
        let originalName = file.getName()

        const newFileName = (
            prefixforTheFileName ? `${prefixforTheFileName}${separator} ` : ""
        ) + originalName + (
                suffixforTheFileName ? ` ${separator} ${suffixforTheFileName}` : ""
            );

        if (file.getMimeType() === MimeType.SHORTCUT) {
            //Duplicate shourtCuts
            if (duplicateShourtCut) {
                file.makeCopy(originalName, destinationFolder);
                //Make copy of the file from shortCut
            } else if (duplicateFileFromShortcut) {
                let parentFileFromShortcutID = file.getTargetId();
                let parentFileFromShortcut = DriveApp.getFileById(parentFileFromShortcutID);
                parentFileFromShortcut.makeCopy(newFileName, destinationFolder);
            }
        }

        //copy for nomal file
        else if (file.getMimeType() != MimeType.SHORTCUT) {
            file.makeCopy(newFileName, destinationFolder);
        }

        if (onProgress) {
            progressState.currentFile++;
            progressState.progressPercentageFiles = Math.round((progressState.currentFile / progressState.totalFiles) * 100);
            onProgress(progressState);
        }
    }
}

function progressCallback(progressState) {
    console.log(`Progress: ${progressState.currentFile}/${progressState.totalFiles} files (${progressState.progressPercentageFiles}%), ${progressState.currentFolder}/${progressState.totalFolders} folders (${progressState.progressPercentageFolders}%)`);
    console.log(`Currently copying file ${progressState.currentFile} of ${progressState.totalFiles} and folder ${progressState.currentFolder} of ${progressState.totalFolders}`);
}


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
    let totalFiles = 0;
    let totalFolders = 0;
    let isThereError = false;
    let errorMessage = null;

    const query = '"' + sourceFolderId + '" in parents and trashed = false';
    let files;
    let pageToken = null;

    do {
        try {
            files = Drive.Files.list({
                q: query,
                pageSize: 500,
                fields: 'nextPageToken, files(id, name, webContentLink, mimeType)',
                pageToken: pageToken
            });

            if (!files.files || files.files.length === 0) {
                console.log('No files found.');
                return { items: files.files, totalFiles, totalFolders, isThereError, errorMessage };

            }

            for (let i = 0; i < files.files.length; i++) {
                const file = files.files[i];
                // console.log('%s (ID: %s, Type: %s, URL: %s)', file.name, file.id, file.mimeType, file.webContentLink);

                if (file.mimeType === "application/vnd.google-apps.folder") {
                    totalFolders++;
                } else {
                    totalFiles++;
                    if (file.mimeType === "application/vnd.google-apps.shortcut") {
                        totalFiles++; // Zwiększ liczbę plików dla skrótu
                    }
                }
            }

            pageToken = files.nextPageToken;
        } catch (err) {
            console.log('Failed with error %s', err.message);
            isThereError = true
            errorMessage = err.message;
        }
    } while (pageToken);

    return { items: files.files, totalFiles, totalFolders, isThereError, errorMessage };

}


