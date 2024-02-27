/**
 * ***************************************************************************** 
 * Recognizes the file type based on its MIME type.
 * Returns the type of file such as PDF, document, folder, presentation, sheet, image, audio, video, text, or other.
 * *****************************************************************************
 */

function recognizeFileType(mimeType) {
    if (mimeType.startsWith('application/vnd.google-apps')) {
        switch (mimeType) {
            case 'application/vnd.google-apps.document':
                return 'document';
            case 'application/vnd.google-apps.spreadsheet':
                return 'sheet';
            case 'application/vnd.google-apps.presentation':
                return 'presentation';
            case 'application/vnd.google-apps.form':
                return 'form';
            case 'application/vnd.google-apps.folder':
                return 'folder';
            default:
                return 'other google file';
        }
    } else {
        switch (true) {
            case mimeType === 'application/pdf':
                return 'pdf';
            case mimeType.startsWith('image/'):
                return 'image';
            case mimeType.startsWith('audio/'):
                return 'audio';
            case mimeType.startsWith('video/'):
                return 'video';
            case mimeType === 'text/plain':
                return 'text';
            default:
                return 'other';
        }
    }
}
