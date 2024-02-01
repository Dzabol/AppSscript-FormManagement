import { SOURCE_FOLDER_ID, DESTINATION_FOLDER_ID, MONTH_DESCRIPTION } from "./MainVariables/variables";
import { generateUserID } from "./GoogleSheetManagement/UUID";
import { setUserFolder } from "./FolderManagement/setUserFolder";

function createNewUser({
    sourceFolderWithTemplatesID = SOURCE_FOLDER_ID,
    dataBaseFolderID = DESTINATION_FOLDER_ID,
    aplicationName,
    currentYearTabNameWithPotentialCustomers }) {

    const newUserID = generateUserID(currentYearTabNameWithPotentialCustomers, aplicationName)
    const newUserFolderID = setUserFolder(dataBaseFolderID,)
    const filesDataFromSourceFolder = listRootFolders_(sourceFolderWithTemplatesID);
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
        sourceFolderID: sourceFolderWithTemplatesID,
        destinationFolderID: dataBaseFolderID,
        progressState,
        onProgress: progressCallback,
    })

}


