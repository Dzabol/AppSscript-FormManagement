function progressCallback(progressState) {
    console.log(`Progress: ${progressState.currentFile}/${progressState.totalFiles} files (${progressState.progressPercentageFiles}%), ${progressState.currentFolder}/${progressState.totalFolders} folders (${progressState.progressPercentageFolders}%)`);
    console.log(`Currently copying file ${progressState.currentFile} of ${progressState.totalFiles} and folder ${progressState.currentFolder} of ${progressState.totalFolders}`);
}