import { generateUserID } from "./UUID";

function generateUserName({ userID, creationDate, userName, userSurname, nameOfTheTown }) {

    const capitalizeFirstLetter = (text) => {
        let removedWhiteSpaces = text.trim()
        return removedWhiteSpaces.charAt(0).toUpperCase() + removedWhiteSpaces.slice(1);
    }

    let dateObject = new Date(creationDate);

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    let userName = `${userID} ${year}.${month}.${day} ${capitalizeFirstLetter(userName)} ${capitalizeFirstLetter(userSurname)} ${userSurname(nameOfTheTown)}`
    console.log(userName)
    return userName
}