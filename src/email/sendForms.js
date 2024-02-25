function sendEmailWithLinks(dataToSend) {
    console.log(dataToSend.email)
    const subject = `Formularze - [${dataToSend.ID}]`
    let forms = ""

    // Iterate through each form in the dataToSend object
    for (let i = 0; i < dataToSend.forms.length; i++) {
        forms += `${dataToSend.forms[i].formName}: <a href="${dataToSend.forms[i].formURL}">Link do formularza</a> <br>`;
    }

    // Construct the HTML message body
    let message = `
      Szanowny kliencie, <br>
      Dziękujemy bardzo za zainteresowanie naszymi produktami. 
      Poniżej znajdują się linki, które proszę uzupełnić, w celu wyceny wybranych przez Państwa produktów.
      <br>
      <br>
      <strong>Twój numer Klienta to </strong>: ${dataToSend.ID} <br>
      <br>
      <br>
      Linki do formularzy, które proszę uzypełnić
      <br>
      ${forms}
    `;

    // Send the email with HTML content
    MailApp.sendEmail({
        to: dataToSend.email.toString(),
        subject: subject,
        htmlBody: message
    });
}


function sendEmailAsHTMLFromTemplate(docId = "1kyUM_YNijGjo4z5lexKL-sNI_1BFjWkPiVHX7LOjngA") {
    var doc = DocumentApp.openById(docId)
    var url = "https://docs.google.com/feeds/download/documents/export/Export?exportFormat=html&id=" + doc.getId();
    var html = UrlFetchApp.fetch(url, { headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() } }).getContentText();
    var body = doc.getBody().getText();
    var message = body;
    var subject = "subject line";
    MailApp.sendEmail('sebastian.jablecki@gmail.com', subject, message, { htmlBody: html });
}