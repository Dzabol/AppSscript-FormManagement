function progressCallback(progressState) {
    console.log(`Progress: ${progressState.currentFile}/${progressState.totalNumberOfFiles} files (${progressState.progressPercentageFiles}%), ${progressState.currentFolder}/${progressState.totalNumberOfFolders} folders (${progressState.progressPercentageFolders}%)`);
    console.log(`Currently copying file ${progressState.currentFile} of ${progressState.totalNumberOfFiles} and folder ${progressState.currentFolder} of ${progressState.totalNumberOfFolders}`);
}