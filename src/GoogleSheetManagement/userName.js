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
function generatecustomerIdentificationName({ userID, creationDate, userName, userSurname, nameOfTheTown }) {
    const capitalizeFirstLetter = (text) => {
        let removedWhiteSpaces = text.trim();
        return removedWhiteSpaces.charAt(0).toUpperCase() + removedWhiteSpaces.slice(1);
    };

    let dateObject = new Date(creationDate);

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    let customerIdentificationName = `${userID} ${year}.${month}.${day} ${capitalizeFirstLetter(userName)} ${capitalizeFirstLetter(userSurname)} ${capitalizeFirstLetter(nameOfTheTown)}`;
    console.log(customerIdentificationName);
    return customerIdentificationName;
}
