function assignEditUrls() {
    var form = FormApp.openById('1BEhTM28SxEMJHDxahVOjE5lf3FrBui_7ave0Xke_LDE');

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('odpowiedzi');

    var data = sheet.getDataRange().getValues();
    var urlCol = 8;
    var responses = form.getResponses();
    var timestamps = [], urls = [], resultUrls = [];

    for (var i = 0; i < responses.length; i++) {
        timestamps.push(responses[i].getTimestamp().setMilliseconds(0));
        urls.push(responses[i].getEditResponseUrl());
    }
    for (var j = 1; j < data.length; j++) {

        resultUrls.push([data[j][0] ? urls[timestamps.indexOf(data[j][0].setMilliseconds(0))] : '']);
    }
    sheet.getRange(2, urlCol, resultUrls.length).setValues(resultUrls);
}