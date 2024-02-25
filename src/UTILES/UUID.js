/**
 * *****************************************************************************
 * Generates a unique customer ID.
 * *****************************************************************************
 * Uses Utilities.getUuid() to generate a UUID.
 * and current date
 * @returns {string} The extracted digits representing the customer constant ID.
 */


function generateCustomerID(prefix = "") {

    const lengthofUUID = 6;

    const id = Utilities.getUuid();
    const date = new Date();
    const year = date.getFullYear().toString();

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let extractedDigits = id.substring(id.length - lengthofUUID);

    return `${prefix && `${prefix} - `}${year}/${month}/${day}/${extractedDigits}`;
}

/**
 * *****************************************************************************
 * Generate a customer identification name based on provided data.
 * 
 * @param {Object} userData - Object containing user data.
 * @param {string} userData.userID - User ID.
 * @param {string} userData.creationDate - Creation date in "YYYY-MM-DD HH:mm:ss" format.
 * @param {string} userData.userName - User's first name.
 * @param {string} userData.userSurname - User's last name.
 * @param {string} userData.nameOfTheTown - Name of the town.
 * 
 * @returns {string} - Customer identification name.
 * 
 * Usage example:
 * const customerIDName = generatecustomerIdentificationName({ 
 *   userID: "FOTO0001",
 *   creationDate: "2024-01-10 20:28:16",
 *   userName: "Paulina",
 *   userSurname: "Kowalska",
 *   nameOfTheTown: "Skawina"
 * });
 * console.log(customerIDName);
 */

function generatecustomerIdentificationName({ userID, formID, customerName, customerSurname, nameOfTheTown }) {
    const capitalizeFirstLetter = (text) => {
        let removedWhiteSpaces = text.trim();
        return removedWhiteSpaces.charAt(0).toUpperCase() + removedWhiteSpaces.slice(1);
    };

    let dateObject = new Date();
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    let customerIdentificationName = `[${userID}] [${formID}] - ${capitalizeFirstLetter(customerName.toString())} ${capitalizeFirstLetter(customerSurname.toString())} - ${capitalizeFirstLetter(nameOfTheTown.toString())}`;
    console.log(customerIdentificationName.toString());
    return customerIdentificationName;
}





