var container = document.querySelector(".container");
var tenantButtons = document.querySelectorAll(".tenant-buttons a");
// var dummyButton = document.querySelector(".dummyButton");
var insertFields = document.querySelector(".temp-value");
var fixedEntity = document.querySelector(".fixed-entity");
// var saveAll = document.querySelector(".main-section h3 input");

// saveAll.addEventListener("click", saveAll);

var tenant_id = "";


// tenantButtons[1].style.display = "none";
// tenantButtons[2].style.display = "none";
tenantButtons[0].addEventListener("click", saveTenant);
$(document).ready(function() {
    $(".main-section :input").prop("disabled", true);

});

function enable_entities() {
    event.preventDefault();


    tenantButtons[0].style.display = "none";
    tenantButtons[1].style.display = "inline";
    tenantButtons[2].style.display = "inline";
    $('.main-section').append('<style>.main-section:before{display:none !important;}</style>');
    $(document).ready(function() {
        $(".main-section :input").prop("disabled", false);
        $("#save").css("background-color", "#BDBDBD");
        $("#save").prop("disabled", true);

        //         $(".fixed-entity-field-block input").prop("readonly", true);
        // $("#fixed-entity-field-type").attr("disabled", true);
    });
}
var elements = document.querySelectorAll(".fixed-entity-field-block input[type='text'],.fixed-entity-field-block select,.fixed-entity-field-block input[type='image']");
var values = [];
var fieldDiv, fieldInnerDivOne, fieldInnerDivTwo, dieldDummy, fieldCloseBtn, a, b;
var fieldCount = 0,
    insertFields, fieldCounts = 0;
var fieldId;

var fieldArray = [];
var entityArray = [];



elements[2].addEventListener("click", temporaryFields);








function temporaryFields(event) {
    event.preventDefault();



    var fieldName = document.querySelector("#fixed-entity-field-name").value;
    var entityName = document.querySelector("#fixed-entity-name").value;

    if (entityName.trim() == '' || !(entityName.length > 0 && entityName.length < 14)) {
        tingleAlert("<h3>" + 'Enter valid Entity Name' + "</h3>");
    } else if (fieldName.trim() == '' || !(fieldName.length > 0 && fieldName.length < 14)) {
        tingleAlert("<h3>" + 'Enter valid Field Name' + "</h3>");
    } else {



        dynamicFields();

        function dynamicFields() {
            var x = elements[0].value.toString();
            // alert(x.toUpperCase());

            if (fieldArray.includes(x) == true) {
                tingleAlert("Field Name Already Exists");
            } else {
                fieldArray.push(x);


                fieldDiv = document.createElement("div");
                fieldDiv.setAttribute("class", "entityClass");
                fieldDiv.setAttribute("style", "margin-top: 3%; color:white; font-size:18px; text-transform:capitalize;");
                fieldInnerDivOne = document.createElement("div");
                fieldInnerDivOne.appendChild(document.createTextNode(elements[0].value.toUpperCase()));
                fieldInnerDivOne.setAttribute("style", "width: 31%; float: left; margin-left: 8%;");
                fieldInnerDivOne.setAttribute("class", "fieldName");
                fieldDiv.appendChild(fieldInnerDivOne);

                fieldInnerDivtwo = document.createElement("div");
                fieldInnerDivtwo.appendChild(document.createTextNode(elements[1].value.toUpperCase()));
                fieldInnerDivtwo.setAttribute("style", "width: 36%; float: left; margin-left: 9%;");
                fieldInnerDivtwo.setAttribute("class", "fieldType");
                fieldDiv.appendChild(fieldInnerDivtwo);

                dieldDummy = document.createElement("div");

                fieldCloseBtn = document.createElement("input");
                fieldCloseBtn.setAttribute("type", "image");
                fieldCloseBtn.setAttribute("style", "width: 3%;");
                fieldCloseBtn.src = "/images/delete.png";
                fieldCounts++;
                checkFieldCount(fieldCounts);

                // dieldDummy.appendChild(fieldCloseBtn);
                fieldDiv.appendChild(fieldCloseBtn);
                var hr = document.createElement('hr');
                hr.setAttribute("style", "width: 79%; margin-left: 8%;");
                fieldDiv.appendChild(hr);
                fieldCloseBtn.addEventListener("click", function(event) {
                    a = event.currentTarget.parentNode.parentNode;
                    b = event.currentTarget.parentElement;
                    a.removeChild(b);
                    fieldCount--;
                    fieldCounts--;
                    checkFieldCount(fieldCounts);


                });


                elements[0].value = "";

                insertFields.appendChild(fieldDiv);

                fieldCount++;
                // console.log(fieldCount);
                this.removeEventListener("click", this, false);

            }
        }

    }


    elements[2].removeEventListener("click", temporaryFields);

}

function checkFieldCount(f) {
    // alert(f);
    var newFieldCount = parseInt(f);
    if (newFieldCount > 0) {
        $("#save").prop("disabled", false);
        $("#save").css("background-color", "white");
    } else {
        $("#save").css("background-color", "#BDBDBD");
        $("#save").prop("disabled", true);


    }
}

tenantButtons[1].addEventListener("click", tenantEdit);

function tenantEdit(event) {
    event.preventDefault();

    this.firstChild.src = "/images/go.png";
    $("#tenant-name").prop("readonly", false);

    this.addEventListener("click", updateTenant);
    this.removeEventListener("click", tenantEdit);

}

function updateTenant(event) {
    event.preventDefault();
    this.firstChild.src = "/images/edit-sans.png";
    var tenantHidden = document.getElementById("tenantId").value;
    var newTenantName = document.getElementById("tenant-name").value.toUpperCase();
    var data = {
        "name": newTenantName,
    };
    if (newTenantName.trim() == '') {
        tingleAlert("<h3>" + "Tenant Name Required" + "</h3>");
    } else if (newTenantName == tenantName) {
        tingleAlert("<h3>" + "No Update in Tenant Name" + "</h3>");
    } else {

        $.ajax({
            url: "http://localhost:1337/tenant/" + tenantHidden,
            type: 'PUT',
            data: data,
            success: function(result) {
                // alert(JSON.stringify(result));
                $("#tenant-name").prop("readonly", true);
            },
            error: function(err) {
                // alert(JSON.stringify(err));
            }

        });

    }
    this.removeEventListener("click", updateTenant);
}


tenantButtons[2].addEventListener("click", function(event) {
    event.preventDefault();

    var tenantHidden = document.getElementById("tenantId").value;
    var modalTinyBtn = new tingle.modal({
        footer: true
    });
    modalTinyBtn.open();



    modalTinyBtn.setContent("<h3>" + "You want to Delete Tenant?" + "</h3>");

    modalTinyBtn.addFooterBtn('YES', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
        deleteTenant(tenantHidden);
        modalTinyBtn.close();
    });

    modalTinyBtn.addFooterBtn('NO', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function() {
        modalTinyBtn.close();
    });


    this.removeEventListener("click", this);

});

function deleteTenant(tenantHidden) {
    // alert("delete");
    $.ajax({
        url: "http://localhost:1337/tenant/" + tenantHidden,
        type: 'DELETE',
        success: function(result) {
            // alert(JSON.stringify(result));
            window.location.href = "http://localhost:1337/";
        },
        error: function(err) {
            // alert(JSON.stringify(err));
        }

    });
}


// var letters = /^[A-Za-z0-9 ]+$/;
var tenantName;

function saveTenant(event) {
    event.preventDefault();

    tenantName = document.querySelector("#tenant-name").value;
    // alert(tenantName.length);
    if (tenantName.trim() == '') {
        tingleAlert("<h3>" + "Tenant Name Required" + "</h3>");
    } else {
        var data = {
            "name": $("#tenant-name").val().toUpperCase(),
        };
        $.ajax({
            url: '/tenant/',
            type: 'POST',
            data: data,
            success: function(result) {
                var create = _.map(result, 'id');
                document.getElementById("tenantId").value = create;
                document.getElementById("setId").value = create;
                enable_entities(event)
                tenant_id = JSON.stringify(create);
                // alert(tenant_id);
                // alert(JSON.stringify(result));

                $("#tenant-name").prop("readonly", true);
            },
            error: function(err) {
                tingleAlert("<h3>" + "Tenant Name Already Exists!" + "</h3>");
            }

        });



    }


    this.removeEventListener("click", saveTenant);

}

var fCount, fieldGoBtn, dynamicfieldCloseBtn, dynamicAdd;



function saveAll(event) {
    // event.preventDefault();

    fieldCounts = 0;
    $("#save").css("background-color", "#BDBDBD");
    $("#save").prop("disabled", true);

    var id = document.getElementById('setId').value;
    // alert(id);
    var e;
    var data = {

        "fields": _.map($(".entityClass"), e => ({
            "name": $(e).find(".fieldName").text().toUpperCase(),
            "type": $(e).find(".fieldType").text()
        })),

        "name": $("#fixed-entity-name").val().toUpperCase(),
        "tenant": id
    };

    // `console.log`(data);


    $.ajax({
        url: "http://localhost:1337/entity",
        type: 'POST',
        data: data,

        success: function(result) {

            //remove insert fields
            fixedEntity.removeChild(insertFields);
            insertFields = document.createElement("div");
            insertFields.setAttribute("class", "temp-value");
            fixedEntity.appendChild(insertFields);

            // alert(JSON.stringify(result));
            var getId = _.map(result.entityCreated, 'id');
            var enitityValue = result.entityCreated[0].name;
            // console.log(enitityValue);
            var fieldsValue;
            var fieldsType;
            // console.log(JSON.stringify(result));
            // console.log(enitityValue);

            var get = _.map(result.entityCreated, enitity => {
                $(enitity).find('fields')
                    // _.map(enitity, 'fields')
                    // enitity.fields.id

            });
            var entitiyId = result.entityCreated[0].id;


            var show = document.querySelector(".show");
            var accordion = document.createElement("div");
            accordion.setAttribute("class", "accordion");
            accordion.addEventListener("click", animation);
            var dl = document.createElement("dl");
            dl.setAttribute("style", "border-radius: 1em;")
            var dt = document.createElement("dt");
            var accordionTitle = document.createElement("a");
            accordionTitle.setAttribute("href", "#");
            accordionTitle.setAttribute("class", "accordionTitle");
            // accordionTitle.appendChild(document.createTextNode("aaa"));

            var dd = document.createElement("dd");
            dd.setAttribute("class", "accordionItem accordionItemCollapsed");
            dd.setAttribute("style", "overflow: auto");


            var showChild = document.createElement("div");
            showChild.setAttribute("class", "showClass");


            var textEntities = document.createElement("input");
            textEntities.setAttribute("type", "text");
            textEntities.setAttribute("placeholder", "Entity Name");
            textEntities.setAttribute("class", "entityShowValue");
            textEntities.setAttribute("pattern", "[a-z0-9 ]{1,15}");
            textEntities.setAttribute("style", "width: 30%; padding: 1%; margin: 1%; margin-left: -22em; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; text-transform:uppercase;");
            textEntities.value = enitityValue;
            accordionTitle.appendChild(textEntities);
            var entityIdShow = document.createElement("input");
            entityIdShow.setAttribute("type", "hidden");
            entityIdShow.setAttribute("class", "entitiyId");
            entityIdShow.value = entitiyId;
            accordionTitle.appendChild(entityIdShow);
            // console.log(entitiyId + "marri");

            dynamicfieldCloseBtn = document.createElement("input");
            dynamicfieldCloseBtn.setAttribute("type", "image");
            dynamicfieldCloseBtn.setAttribute("style", "width: 3%; float: right; margin-top: 1%; margin-right: 2%; background-color: #fff; padding: 1%; border-radius: 2em;");
            dynamicfieldCloseBtn.src = "/images/delete.png";
            // dieldDummy.appendChild(fieldCloseBtn);
            accordionTitle.appendChild(dynamicfieldCloseBtn);
            dynamicfieldCloseBtn.addEventListener("click", dynamicClose);

            fieldEditBtn = document.createElement("input");
            fieldEditBtn.setAttribute("type", "image");
            fieldEditBtn.setAttribute("style", "width: 3%; float: right; margin-top: 1%; margin-right: 1%;background-color: #fff; padding: 1%; border-radius: 2em;");
            fieldEditBtn.src = "/images/edit-sans.png";
            fieldEditBtn.addEventListener("click", dynamicEdit);
            // dieldDummy.appendChild(fieldCloseBtn);
            accordionTitle.appendChild(fieldEditBtn);
            dt.appendChild(accordionTitle);
            dl.appendChild(dt);



            // var mybr = document.createElement('br');
            // showChild.appendChild(mybr);
            var fieldText = document.createElement("Label");
            fieldText.setAttribute("style", "margin-left: 6%;");
            fieldText.innerHTML = "FIELD:";
            showChild.appendChild(fieldText);

            dynamicAdd = document.createElement("input");
            dynamicAdd.setAttribute("type", "image");
            dynamicAdd.src = "/images/Add-green.png";
            dynamicAdd.setAttribute("style", "width: 3%; float:right; margin: 0.5% 3% 0 0; visibility: hidden");
            dynamicAdd.addEventListener("click", addField);
            showChild.appendChild(dynamicAdd);


            var hr = document.createElement('hr');
            hr.setAttribute("style", "width: 88%; margin: 1%;");
            showChild.appendChild(hr);
            // div1 = document.createElement("div");
            // showChild.appendChild(div1);
            // var div3 = document.createElement("div");
            var div3 = document.createElement("div");
            fCount = fieldCount;
            for (i = 0; i < fCount; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "allFields");
                fieldsValue = result.entityCreated[0].fields[i].name;
                fieldsType = result.entityCreated[0].fields[i].type;
                fieldsId = result.entityCreated[0].fields[i].id;
                // console.log(fieldsValue);

                var textFields = document.createElement("input");
                textFields.setAttribute("type", "text");
                textFields.setAttribute("placeholder", "Field Name");
                textFields.setAttribute("class", "fieldShowValue");
                textFields.setAttribute("pattern", "[a-z0-9 ]{1,15}");
                textFields.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; margin-left: 6%; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; text-transform:capitalize;");
                div.appendChild(textFields);
                // console.log(document.querySelectorAll('.fieldShowValue'));
                textFields.value = fieldsValue;
                var array = ["STRING", "DATE", "NUMBER"];
                var selectList = document.createElement("select");
                selectList.setAttribute("class", "mySelect");
                selectList.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; border: none; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; margin-left: 7%;");
                div.appendChild(selectList);

                fieldId = document.createElement("input");
                fieldId.setAttribute("type", "hidden");
                fieldId.setAttribute("class", "fieldId");
                fieldId.value = fieldsId;
                div.appendChild(fieldId);
                // console.log(fieldsId + "tamil");



                for (j = 0; j < array.length; j++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", array[j]);
                    option.text = array[j];
                    selectList.appendChild(option);
                }
                // console.log(fieldsType);

                if (fieldsType == "String") {
                    selectList.firstChild.selected = true;
                } else if (fieldsType == "Date") {
                    selectList.firstChild.nextSibling.selected = true;
                } else {
                    selectList.lastChild.selected = true;
                }
                fieldCount--;
                fieldCBtn = document.createElement("input");
                fieldCBtn.setAttribute("type", "image");
                fieldCBtn.setAttribute("style", "float: right; width: 3%; margin: 1.8% 3% 0 0");
                fieldCBtn.src = "/images/delete.png";
                fieldCBtn.addEventListener("click", delField);
                div.appendChild(fieldCBtn);
                div3.appendChild(div);
            }

            showChild.appendChild(div3);

            dd.appendChild(showChild);


            dl.appendChild(dd);
            accordion.appendChild(dl);
            $(accordion).insertAfter(show);
            // validation();
            document.getElementById('fixed-entity-field-name').value = "";
            document.getElementById('fixed-entity-name').value = "";


            $(".accordion :input[type='text']").prop("readonly", true);
            $(".mySelect").attr("disabled", true);

        },
        error: function(err) {
            tingleAlert("<h3>" + "TRY AGAIN" + "</h3>");
        }

    });
    validation();

    this.removeEventListener("click", saveAll);

}

function dynamicClose(event) {
    event.preventDefault();
    var entitiyId = event.currentTarget.previousSibling.value;
    var currentEntityName = event.currentTarget.previousSibling.previousSibling.value;
    a = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
    b = event.currentTarget.parentNode.parentNode;
    var modalTinyBtn = new tingle.modal({
        footer: true
    });
    modalTinyBtn.open();



    modalTinyBtn.setContent("You want to Delete this Entity?");

    modalTinyBtn.addFooterBtn('YES', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
        deleteEntity(entitiyId, currentEntityName, a, b);
        modalTinyBtn.close();
    });

    modalTinyBtn.addFooterBtn('NO', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function() {
        modalTinyBtn.close();
    });
}

function deleteEntity(entitiyId, currentEntityName, x, y) {
    // alert("hi delete");
    $.ajax({
        url: "http://localhost:1337/entity/" + entitiyId,
        type: 'DELETE',
        success: function(result) {

            var index = entityArray.indexOf(currentEntityName);
            entityArray.splice(index, 1);

            var num_of_fields = y.nextSibling.firstChild.lastChild.childNodes;

            for (i = 0; i < num_of_fields.length; i++) {
                index = fieldArray.indexOf(num_of_fields[i]);
                fieldArray.splice(index, 1);
            }

            // console.log(JSON.stringify(result));

        },
        error: function(err) {
            // alert(JSON.stringify(err));
        }

    });

    x.removeChild(y.parentElement);
};

var fieldsElements, entityElement;

function dynamicEdit(event) {
    event.preventDefault();

    // this.setAttribute("class", "accordionItem accordionItemCollapsed");

    // $(".accordion :input[type='text']").prop("readonly", false);
    // $(event.currentTarget.parentNode.parentNode.nextSibling.firstChild.lastChild.childNodes).attr("disabled", false);
    // event.currentTarget.parentNode.parentNode.nextSibling.firstChild.lastChild.childNodes[0].firstChild.nextSibling.setAttribute("disabled", false);
    // alert("ok");
    // $(event.currentTarget).find('.mySelect').attr("disabled", false);
    entityElement = event.currentTarget.previousSibling.previousSibling.previousSibling;
    fieldsElements = event.currentTarget.parentNode.parentNode.nextSibling.firstChild.lastChild.childNodes;
    // $(event.currentTarget.parentNode.parentNode.nextSibling.firstChild.lastChild.childNodes[0].firstChild.nextSibling).attr("disabled", false);
    $(entityElement).prop("readonly", false);
    for (i = 0; i < fieldsElements.length; i++) {

        $(fieldsElements[i].firstChild).prop("readonly", false);
        $(fieldsElements[i].firstChild.nextSibling).attr("disabled", false);

        // $(fieldsElements[i].firstChild).change(function() {
        //     if(fieldArray.includes(fieldsElements[i].firstChild.value)) {
        //        tingleAlert("Field Name Atleast Exist");
        //     }
        // });
    }
    event.currentTarget.parentNode.parentNode.nextSibling.firstChild.firstChild.nextSibling.style.visibility = "visible";
    this.src = "/images/go.png";
    // this.addEventListener("click", abc);


    validation();

    // for(i=0; i<find.length; i++) {
    //       fieldNameValue[i] = find[i].firstChild.value;
    //       console.log(fieldNameValue[i] +"  c");
    // }

    // $(event.currentTarget.previousSibling.previousSibling.previousSibling).change(function() {
    //     if (entityArray.includes(event.currentTarget.previousSibling.previousSibling.previousSibling.value)) {
    //         tingleAlert("Entity Name Already Exist");
    //     }
    // });


    this.addEventListener("click", submit);

    // this.removeEventListener("click", dynamicEdit);

}

function submit(event) {
    event.preventDefault();

    var idEntity = event.currentTarget.previousSibling.previousSibling.value;
    // alert(idEntity);
    this.src = "/images/edit-sans.png";
    event.currentTarget.parentNode.parentNode.nextSibling.firstChild.firstChild.nextSibling.style.visibility = "hidden";
    var find = event.currentTarget.parentNode.parentNode.nextSibling.firstChild.lastChild.childNodes;
    var newEntityName = event.currentTarget.previousSibling.previousSibling.previousSibling.value.toUpperCase();

    // console.log(find);

    // function remainSame() {
    //        for(i=0; i<find.length; i++) {
    //        find[i].firstChild.value = fieldNameValue[i];
    // } newEntityName = newEntityName1;
    // this.removeEventListener("click", dynamicEdit);

    var newFieldValueCount = 0;
    $(entityElement).prop("readonly", true);
    for (i = 0; i < fieldsElements.length; i++) {

        $(fieldsElements[i].firstChild).prop("readonly", true);
        $(fieldsElements[i].firstChild.nextSibling).attr("disabled", true);
    }
    for (i = 0; i < find.length; i++) {
        if (find[i].firstChild.value.trim() != '') {
            continue;
        } else {
            newFieldValueCount++;
            break;
        }
    }
    if (newEntityName.trim() == '') {
        tingleAlert("<h3>" + "Enter Valid Entity Name" + "</h3>");
        // remainSame();
    } else if (find.length == 0) {
        tingleAlert("<h3>" + "Atleast One field Required to Submit" + "</h3>");
        // remainSame();
    } else if (newFieldValueCount > 0) {
        tingleAlert("<h3>" + "Enter Valid Fields Name" + "</h3>");
        // remainSame();
    } else {
        var e;
        var data = {

            "fields": _.map($(find), e => ({
                "name": $(e).find(".fieldShowValue").val().toUpperCase(),
                "type": $(e).find(".mySelect").val(),
                "entities": idEntity,
                "id": $(e).find(".fieldId").val(),
            })),

            "name": newEntityName,

        };
        // console.log(data);
        // console.log(fieldId);

        $.ajax({
            url: "http://localhost:1337/entity/" + idEntity,
            type: 'PUT',
            data: data,

            success: function(result) {
                // console.log(result);

                var count = Object.keys(result.entityCreated[0].fields).length;
                // console.log(count);
                for (var i = 0; i < count; i++) {
                    fieldsId = result.entityCreated[0].fields[i].id;
                    fieldId.setAttribute("class", "fieldId");
                    fieldId.value = fieldsId;
                    // this.addEventListener("click", dynamicEdit)
                    // cnt = 0;
                    // $('.fieldIdValue').val(fieldsId);
                    // console.log(fieldsId);
                    // fieldId.setAttribute("class", "fieldId");
                    // console.log(fieldId.length);
                }
            },
            error: function(err) {
                tingleAlert("<h3>" + "TRY AGAIN" + "</h3>");
            }


        });


    }
    validation();

    // this.addEventListener("click", dynamicEdit);
    this.removeEventListener("click", submit);


    // this.addEventListener("click", dynamicEdit);
}

function addField(event) {
    event.preventDefault();

    var div2 = document.createElement("div");
    div2.setAttribute("class", "allFields");
    var textFields = document.createElement("input");
    textFields.setAttribute("type", "text");
    textFields.setAttribute("placeholder", "Field Name");
    textFields.setAttribute("pattern", "[a-z0-9 ]{1,15}");
    textFields.setAttribute("class", "fieldShowValue");
    textFields.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; margin-left: 6%; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; text-transform: capitalize;");
    div2.appendChild(textFields);
    // console.log(document.querySelectorAll('.fieldShowValue'));

    var array = ["STRING", "DATE", "NUMBER"];
    var selectList = document.createElement("select");
    selectList.setAttribute("class", "mySelect");
    selectList.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; border: none; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; margin-left: 7%;");
    for (j = 0; j < array.length; j++) {
        var option = document.createElement("option");
        option.setAttribute("value", array[j]);
        option.text = array[j];
        selectList.appendChild(option);
    }

    div2.appendChild(selectList);
    fieldId = document.createElement("input");
    fieldId.setAttribute("type", "hidden");
    div2.appendChild(fieldId);
    fieldCBtn = document.createElement("input");
    fieldCBtn.setAttribute("type", "image");
    fieldCBtn.setAttribute("style", "float: right; width: 3%; margin: 1.8% 3% 0 0");
    fieldCBtn.src = "/images/delete.png";
    fieldCBtn.addEventListener("click", delField);
    div2.appendChild(fieldCBtn);
    validation();
    // $(div2).insertAfter(event.currentTarget.nextSibling);
    // event.currentTarget.nextSibling.appendChild(div2);
    $(event.currentTarget.nextSibling.nextSibling).prepend(div2);
    validation();
}


function delField(event) {

    var fieldId = event.currentTarget.previousSibling.value;
    var currentFieldName = event.currentTarget.previousSibling.previousSibling.previousSibling.value;
    a = event.currentTarget.parentNode.parentNode;
    b = event.currentTarget.parentNode;
    var modalTinyBtn = new tingle.modal({
        footer: true
    });
    modalTinyBtn.open();



    modalTinyBtn.setContent("You want to Delete this Field?");

    modalTinyBtn.addFooterBtn('YES', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
        deleteField(fieldId, currentFieldName, a, b);
        modalTinyBtn.close();
    });

    modalTinyBtn.addFooterBtn('NO', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function() {
        modalTinyBtn.close();
    });
}

function deleteField(fieldId, currentFieldName, x, y) {
    if (fieldId) {
        $.ajax({
            url: "http://localhost:1337/field/" + fieldId,
            type: 'DELETE',
            success: function(result) {
                var index = fieldArray.indexOf(currentFieldName);
                fieldArray.splice(index, 1);

                // console.log(JSON.stringify(result));
            },
            error: function(err) {

            }

        });

        x.removeChild(y);
    } else {
        tingleAlert("Field is Deleted without Creating");
        x.removeChild(y);
    }
}


var modalTinyNoFooter = new tingle.modal({
    onClose: function() {
        // console.log('close');
    },
    onOpen: function() {
        // console.log('open');
        // console.log(this.modalBox.clientWidth);
    },
    cssClass: ['class1', 'class2']
});

//SHOW
function tingleAlert(message) {


    modalTinyNoFooter.open();
    modalTinyNoFooter.setContent(message);
}

(function(window) {



    // class helper functions from bonzo https://github.com/ded/bonzo



    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

//fake jQuery
// var $ = function(selector){
//   return document.querySelector(selector);
// }
// var accordio = document.querySelector('.accordion');



//add event listener to all anchor tags with accordion title class
function animation(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target && e.target.nodeName == "A") {
        var classes = e.target.className.split(" ");
        if (classes) {
            for (var x = 0; x < classes.length; x++) {
                if (classes[x] == "accordionTitle") {
                    var title = e.target;

                    //next element sibling needs to be tested in IE8+ for any crashing problems
                    var content = e.target.parentNode.nextElementSibling;

                    //use classie to then toggle the active class which will then open and close the accordion

                    classie.toggle(title, 'accordionTitleActive');
                    //this is just here to allow a custom animation to treat the content
                    if (classie.has(content, 'accordionItemCollapsed')) {
                        if (classie.has(content, 'animateOut')) {
                            classie.remove(content, 'animateOut');
                        }
                        classie.add(content, 'animateIn');

                    } else {
                        classie.remove(content, 'animateIn');
                        classie.add(content, 'animateOut');
                    }
                    //remove or add the collapsed state
                    classie.toggle(content, 'accordionItemCollapsed');


                }
            }
        }

    }
}

function validation() {
    $(function() {
        $('input[type="text"]').attr({ maxLength: 15 });
        $('input[type="text"]').val().toUpperCase();
        $("input[type = 'text']").keypress(function(e) {
            var chr = String.fromCharCode(e.which);

            if ("abcderfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678910_".indexOf(chr) < 0)
                return false;
        });
    });
}

validation();
