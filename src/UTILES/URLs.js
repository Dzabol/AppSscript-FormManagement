/**
 * *****************************************************************************
 * Replaces placeholder values in the URL with corresponding data values.
 * *****************************************************************************
 * 
 * @param {string} url - The URL containing placeholder values.
 * @param {Object} data - The data object containing key-value pairs to replace placeholders.
 * @returns {string} - The URL with replaced placeholder values.
 */

function replaceDataInURL(url, data) {
    let urlString = url.toString();

    for (const key in data) {
        const regex = new RegExp("{{" + key + "}}", "g");
        urlString = urlString.replace(regex, data[key]);
    }

    return urlString;
}

/**
 * *****************************************************************************
 * Generates a URL based on the given ID and resource type.
 * *****************************************************************************
 *  
 * @param {string} id - The ID used to generate the URL.
 * @param {string} type - The type of resource (e.g., "form", "sheet", "document", "folder", "presentation").
 * @returns {string} - The generated URL.
 */
function generateGoogleURL(id, type) {
  let baseURL = "";
  switch (type.toLowerCase()) {
    case "form":
      baseURL = "https://docs.google.com/forms/d/e/";
      break;
    case "sheet":
      baseURL = "https://docs.google.com/spreadsheets/d/";
      break;
    case "document":
      baseURL = "https://docs.google.com/document/d/";
      break;
    case "folder":
      baseURL = "https://drive.google.com/drive/folders/";
      break;
    case "presentation":
      baseURL = "https://docs.google.com/presentation/d/";
      break;
    // Add more cases for other types if needed
    default:
      return "Unsupported type";
  }
  return `${baseURL}${id}`;
}