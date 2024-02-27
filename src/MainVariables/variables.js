/**
 * *****************************************************************************
 *                        TEMPLATE DATA
 * ***************************************************************************** 
*/
//Template sheet data
TEMPLATE_DATA_BASE_SHEET_ID = "1N0DsNIOfElOHwTd7TeHsCJp5DPTiQX52mFBopHsOMR0"
TEMPLATE_DATA_BASE_SHEET_NAME = "TEMPLATE"


const MONTH_DESCRIPTION = {
  1: "1. Styczeń",
  2: "2. Luty",
  3: "3. Marzec",
  4: "4. Kwiecień",
  5: "5. Maj",
  6: "6. Czerwiec",
  7: "7. Lipiec",
  8: "8. Sierpień",
  9: "9. Wrzesień",
  10: "10. Październik",
  11: "11. Listopad",
  12: "12. Grudzień",
};


/**
 * *****************************************************************************
 *                               FORM VARIABLES
 * ***************************************************************************** 
*/

const FORM_TEMPLATES_DATA = {
  templatesTabName: "ADMIN",
  urlColumnPositionWithForms: 3,
  urlColumnPositionForTemplateForm: 4,
  fieldsOfInterestColumnName: "Zainteresowanie",
  contactFormTabName: "ContactForm"
}

const ANSWERS_FORM_DATA = {
  customerIDColumnPosition: 1,
  formIdColumnPosition: 2,
  editLinkColumnPosition: 3,
  answerIDcolumnPosition: 4,
  folderURLColumnPositon: 5,
  otherLinks: [{
    name: "Kalkulator",
    type: "sheet",
    columnNumberToSetData: 6,
    url: "",
    id: "",
  },
  ],
}

const FIELDS_OF_INTERESTS_INPUTDATA = {
  "Fotowoltaika": {
    realName: "Fotowoltaika",
    aplicationName: "FOTO",
    urlColumnPosition: 9,
    urlRowTemplatePosition: 4,
    templatesFolderID: "1rPPeQBJA8uv9aAJLAWjZ7L6COa8Jqpd9",
    dataBaseFolderID: "1LTDyHFS4G-NXAauD1WwIUIfvD0yvI8CU",
  },
  "MagazynyEnergii": {
    realName: "Magazyny energii",
    aplicationName: "MAGE",
    urlColumnPosition: 10,
    urlRowTemplatePosition: 5,
    templatesFolderID: "1rPPeQBJA8uv9aAJLAWjZ7L6COa8Jqpd9",
    dataBaseFolderID: "",
  },
  "KolektorySolarne": {
    realName: "Kolektory solarne",
    aplicationName: "KOLS",
    urlColumnPosition: 11,
    urlRowTemplatePosition: 6,
    templatesFolderID: "1rPPeQBJA8uv9aAJLAWjZ7L6COa8Jqpd9",
    dataBaseFolderID: "",
  },
  "PompyCiepla": {
    realName: "Pompy ciepła",
    aplicationName: "POMP",
    urlColumnPosition: 12,
    urlRowTemplatePosition: 7,
    templatesFolderID: "1rPPeQBJA8uv9aAJLAWjZ7L6COa8Jqpd9",
    dataBaseFolderID: "",
  },
    "Klimatyzacja": {
    realName: "Klimatyzacja",
    aplicationName: "KLIM",
    urlColumnPosition: 13,
    urlRowTemplatePosition: 8,
    templatesFolderID: "1rPPeQBJA8uv9aAJLAWjZ7L6COa8Jqpd9",
    dataBaseFolderID: "",
  },
}

