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
    duplicateFileFromShortcut = true,
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
            progressState.progressPercentageFolders = Math.round((progressState.currentFolder / progressState.totalNumberOfFolders) * 100);
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
            progressState.progressPercentageFiles = Math.round((progressState.currentFile / progressState.totalNumberOfFiles) * 100);
            onProgress(progressState);
        }
    }
}

