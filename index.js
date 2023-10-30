function setAttrValue(attributeCode, attributeValue) {
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = attributeValue;
  EdocsApi.setAttributeValue(attribute);
}

function onChangeTeacherPosition() {
  var TeacherPosition = EdocsApi.getAttributeValue("TeacherPosition").value;
  if (TeacherPosition) {
    if (
      TeacherPosition == "Перший проректор" ||
      TeacherPosition == "Проректор"
    ) {
      setAttrValue("TeacherPositionDean", "1");
    } else {
      setAttrValue("TeacherPositionDean", "");
    }
  }
}

//Скрипт для наказу
function setAttrValue(attributeCode, attributeValue) {
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = attributeValue;
  EdocsApi.setAttributeValue(attribute);
}

// викликати на зміну факультету
function setProgDean() {
  debugger;

  var filter = [];
  filter.push({
    attributeCode: "Title",
    value: EdocsApi.getAttributeValue("TeacherDep").value,
  });
  filter.push({
    attributeCode: "Position",
    value: "Декан",
  });
  var searchResult = EdocsApi.getDictionaryData("StaffList", null, filter);

  if (searchResult.length) {
    var ProgDeanDict = EdocsApi.getDictionaryItemData(
      "StaffList",
      searchResult[0].id
    );
    var ProgDeanLogin = EdocsApi.findElementByProperty(
      "code",
      "StaffList",
      ProgDeanDict.attributes
    ).value;
    var ProgDeanData =
      EdocsApi.getEmployeeDataByEmployeeUserLogin(ProgDeanLogin);

    if (ProgDeanData.employeeId) {
      setAttrValue("ProgDean", ProgDeanData.employeeId);
    }
  } else {
    setAttrValue("ProgDean", "");
  }
}
