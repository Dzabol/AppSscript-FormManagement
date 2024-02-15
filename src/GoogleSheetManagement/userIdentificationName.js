function generatecustomerIdentificationName({ userID, creationDate, userName, userSurname, nameOfTheTown }) {

   console.log(userID, creationDate, userName, userSurname, nameOfTheTown)

    const capitalizeFirstLetter = (text) => {
        let removedWhiteSpaces = text.trim()
        return removedWhiteSpaces.charAt(0).toUpperCase() + removedWhiteSpaces.slice(1);
    }

    let dateObject = new Date(creationDate);

    let year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString();
    let correctedMonth = month.padStart(2,"0")
    let day = dateObject.getDate().toString();
    let correctedDay = day.padStart(2,"0")

    let customerIdentificationName = `${userID} ${year}.${correctedMonth}.${correctedDay} ${capitalizeFirstLetter(userName)} ${capitalizeFirstLetter(userSurname)} - ${(nameOfTheTown)}`
    console.log(customerIdentificationName)
    return customerIdentificationName
}