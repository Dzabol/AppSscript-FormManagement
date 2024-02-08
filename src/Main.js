function createNewUser_({
    sourceFolderWithTemplatesID,
    dataBaseFolderID,
    aplicationName,
    currentYearTabNameWithPotentialCustomers }) {

    //const newUserID = generateUserID(currentYearTabNameWithPotentialCustomers, aplicationName)
    const newUserFolderID = setUserFolder(dataBaseFolderID,)
    const filesDataFromSourceFolder = listRootFolders_(sourceFolderWithTemplatesID);
    const totalFiles = filesDataFromSourceFolder.totalNumberOfFiles;
    const totalFolders = filesDataFromSourceFolder.totalNumberOfFolders;

    console.log(`Foldery: ${totalFolders}
    Pliki: ${totalFiles}`)


    const progressState = {
        totalNumberOfFiles: totalFiles,
        totalNumberOfFolders: totalFolders,
        copiedFiles: 0,
        copiedFolders: 0,
        currentFile: 0,
        currentFolder: 0,
        progressPercentageFiles: 0,
        progressPercentageFolders: 0,
    };

    copyFoldersAndFiles_({
        sourceFolderID: sourceFolderWithTemplatesID,
        destinationFolderID: dataBaseFolderID,
        progressState,
        onProgress: progressCallback,
    })

}


function testowe() {
    createNewUser_({
        sourceFolderWithTemplatesID: SOURCE_FOLDER_ID,
        dataBaseFolderID: DESTINATION_FOLDER_ID,
        aplicationName: "TEST",
        currentYearTabNameWithPotentialCustomers: "2024"
    })
}

function iloscPlikow() {
    const filesDataFromSourceFolder = listRootFolders_(SOURCE_FOLDER_ID);
    const totalFiles = filesDataFromSourceFolder.totalNumberOfFiles;
    const totalFolders = filesDataFromSourceFolder.totalNumberOfFolders;

    console.log(`Foldery: ${totalFolders} Pliki: ${totalFiles}`)
    console.log(filesDataFromSourceFolder)
}


