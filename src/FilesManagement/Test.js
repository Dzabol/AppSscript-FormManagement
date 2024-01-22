function test() {

    const filesDataFromSourceFolder = listRootFolders_(SOURCE_FOLDER_ID);
    const totalFiles = filesDataFromSourceFolder.totalFiles;
    const totalFolders = filesDataFromSourceFolder.totalFolders;

        const progressState = {
        totalFiles,
        totalFolders,
        copiedFiles: 0,
        copiedFolders: 0,
        currentFile: 0,
        currentFolder: 0,
        progressPercentageFiles: 0,
        progressPercentageFolders: 0,
    };

    copyFoldersAndFiles_({
        sourceFolderID: SOURCE_FOLDER_ID,
        destinationFolderID: DESTINATION_FOLDER_ID,
                progressState,
        onProgress: progressCallback,
    })

}


