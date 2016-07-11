var container = document.querySelector(".container");
var tenantButtons = document.querySelectorAll(".tenant-buttons a");
var dummySection = document.querySelector(".dummy-section");
var insertFields = document.querySelector(".temp-value")
var fixedEntity = document.querySelector(".fixed-entity");
// var saveAll = document.querySelector(".main-section h3 input");

// saveAll.addEventListener("click", saveAll);

var tenant_id = "";


tenantButtons[1].style.display = "none";
tenantButtons[2].style.display = "none";
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
    });
}
var elements = document.querySelectorAll(".fixed-entity-field-block input[type='text'],.fixed-entity-field-block select,.fixed-entity-field-block input[type='image']");
var values = [];
var fieldDiv, fieldInnerDivOne, fieldInnerDivTwo, dieldDummy, fieldCloseBtn, a, b;
var fieldCount = 0,
    insertFields;
var fieldId ;


elements[2].addEventListener("click", addE);

function addE(event) {
    event.preventDefault();

    var entityName = document.querySelector("#fixed-entity-name").value;
    var fieldName = document.querySelector("#fixed-entity-field-name").value;


    if (((entityName.trim() != '' || entityName.trim() != null) && (fieldName.trim() != '' || fieldName.trim() != null)) && (entityName.match(letters) && fieldName.match(letters))) {

        fieldDiv = document.createElement("div");
        fieldDiv.setAttribute("class", "entityClass");
        fieldDiv.setAttribute("style", "margin-top: 3%; color:white; font-size:18px; text-transform:capitalize;");
        fieldInnerDivOne = document.createElement("div");
        fieldInnerDivOne.appendChild(document.createTextNode(elements[0].value));
        fieldInnerDivOne.setAttribute("style", "width: 31%; float: left; margin-left: 8%;");
        fieldInnerDivOne.setAttribute("class", "entityValue");
        fieldDiv.appendChild(fieldInnerDivOne);

        fieldInnerDivtwo = document.createElement("div");
        fieldInnerDivtwo.appendChild(document.createTextNode(elements[1].value));
        fieldInnerDivtwo.setAttribute("style", "width: 36%; float: left; margin-left: 9%;");
        fieldInnerDivtwo.setAttribute("class", "fieldValue");
        fieldDiv.appendChild(fieldInnerDivtwo);

        dieldDummy = document.createElement("div");

        fieldCloseBtn = document.createElement("input");
        fieldCloseBtn.setAttribute("type", "image");
        fieldCloseBtn.setAttribute("style", "width: 3%;");
        fieldCloseBtn.src = "/images/delete.png";
        // dieldDummy.appendChild(fieldCloseBtn);
        fieldDiv.appendChild(fieldCloseBtn);
        fieldCloseBtn.addEventListener("click", function(event) {
            a = event.currentTarget.parentNode.parentNode;
            b = event.currentTarget.parentElement;
            a.removeChild(b);
            fieldCount--;
            var hr = document.createElement('hr');
            hr.setAttribute("style", "width: 88%;");
            fieldDiv.appendChild(hr);

        });


        elements[0].value = "";

        insertFields.appendChild(fieldDiv);

        fieldCount++;
        console.log(fieldCount);
        this.removeEventListener("click", this, false);
    } else if (entityName.trim() == '' || !entityName.match(letters)) {
        alert('Enter valid Entity Name');

    } else {

        alert('Enter valid Field Name');

    }


    elements[2].removeEventListener("click", addE);

}

tenantButtons[1].addEventListener("click", tenantEdit);
 function tenantEdit(event) {
    event.preventDefault();

    this.firstChild.src = "/images/go.png";
    $("#tenant-name").prop("readonly", false);

    this.addEventListener("click", submitTenant);
    this.removeEventListener("click", tenantEdit);

}

function submitTenant(event) {
    event.preventDefault();
    this.firstChild.src = "/images/edit-sans.png";
    var tenantHidden = document.getElementById("tenantId").value;
    var data = {
        "name": document.getElementById("tenant-name").value,
    };
    alert("update");
    $.ajax({
        url: "http://localhost:1337/tenant/" + tenantHidden,
        type: 'PUT',
        data:data,
        success: function(result) {
            alert(JSON.stringify(result));
            $("#tenant-name").prop("readonly", true);
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

    });
    this.removeEventListener("click", submitTenant);
}

tenantButtons[2].addEventListener("click", function(event) {
    event.preventDefault();

    var tenantHidden = document.getElementById("tenantId").value;
    alert("delete");
    $.ajax({
        url: "http://localhost:1337/tenant/" + tenantHidden,
        type: 'DELETE',
        success: function(result) {
            alert(JSON.stringify(result));
             window.location.href = "http://localhost:1337/";
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

    });

    this.removeEventListener("click", this);

});

var letters = /^[A-Za-z]+$/;

function saveTenant(event) {
    event.preventDefault();

    var tenantName = document.querySelector("#tenant-name").value;
    if (tenantName != '' || tenantName != null) {

        if (tenantName.match(letters)) {

            var data = {
                "name": $("#tenant-name").val()
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
                    alert(tenant_id);
                    alert(JSON.stringify(result));

                    $("#tenant-name").prop("readonly", true);
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                }

            });

        } else {
            alert("Tenant Name Should be a Letters");
        }

    } else {

        alert('Missing Tenant Name');
    }

    this.removeEventListener("click", saveTenant);

}

var fCount, fieldGoBtn, dynamicfieldCloseBtn, div1, dynamicAdd;



function saveAll(event) {
    // event.preventDefault();

    var id = document.getElementById('setId').value;
    alert(id);
    var e;
    var data = {

        "fields": _.map($(".entityClass"), e => ({
            "field_name": $(e).find(".entityValue").text(),
            "field_type": $(e).find(".fieldValue").text()
        })),

        "name": $("#fixed-entity-name").val(),
        "tenant": id
    };

    alert("created");


    $.ajax({
        url: "http://localhost:1337/entities",
        type: 'POST',
        data: data,

        success: function(result) {

            //remove insert fields
            fixedEntity.removeChild(insertFields);
            insertFields = document.createElement("div");
            insertFields.setAttribute("class", "temp-value");
            fixedEntity.appendChild(insertFields);

            alert(JSON.stringify(result));
            var getId = _.map(result.entitiesCreated, 'id');
            var enitityValue = result.entitiesCreated[0].name;
            console.log(enitityValue);
            var fieldsValue;
            var fieldsType;
            console.log(JSON.stringify(result));
            console.log(enitityValue);

            var get = _.map(result.entitiesCreated, enitity => {
                $(enitity).find('fields')
                    // _.map(enitity, 'fields')
                    // enitity.fields.id

            });
            var entitiyId = result.entitiesCreated[0].id;


            var show = document.querySelector(".show");
            var accordion = document.createElement("div");
            accordion.setAttribute("class", "accordion");
            accordion.addEventListener("click", abc);
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
            textEntities.setAttribute("class", "entityShowValue");
            textEntities.setAttribute("style", "width: 25%; padding: 1%; margin: 1%; margin-left: 5em; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
            textEntities.value = enitityValue;
            accordionTitle.appendChild(textEntities);
            var entityIdShow = document.createElement("input");
            entityIdShow.setAttribute("type", "hidden");
            entityIdShow.setAttribute("class", "entitiyId");
            entityIdShow.value = entitiyId;
            accordionTitle.appendChild(entityIdShow);
            console.log(entitiyId + "marri");

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
            hr.setAttribute("style", "width: 88%;");
            showChild.appendChild(hr);
            // div1 = document.createElement("div");
            // showChild.appendChild(div1);
            // var div3 = document.createElement("div");
            fCount = fieldCount;
            for (i = 0; i < fCount; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "allFields");
                fieldsValue = result.entitiesCreated[0].fields[i].field_name;
                fieldsType = result.entitiesCreated[0].fields[i].field_type;
                fieldsId = result.entitiesCreated[0].fields[i].id;
                console.log(fieldsValue);

                var textFields = document.createElement("input");
                textFields.setAttribute("type", "text");
                textFields.setAttribute("class", "fieldShowValue");
                textFields.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; margin-left: 6%; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
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
                console.log(fieldsId + "tamil");



                for (j = 0; j < array.length; j++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", array[j]);
                    option.text = array[j];
                    selectList.appendChild(option);
                }
                console.log(fieldsType);

                if (fieldsType == "STRING") {
                    selectList.firstChild.selected = true;
                } else if (fieldsType == "DATE") {
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
                showChild.appendChild(div);
            }

             // showChild.appendChild(div3);

            dd.appendChild(showChild);


            dl.appendChild(dd);
            accordion.appendChild(dl);
            $(accordion).insertAfter(show);
            document.getElementById('fixed-entity-field-name').value = "";
            document.getElementById('fixed-entity-name').value = "";


            $(".accordion :input[type='text']").prop("readonly", true);
            $(".mySelect").attr("disabled", true);

            
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

    });
 this.removeEventListener("click", saveAll);

}

function dynamicClose(event) {
    event.preventDefault();
var entitiyId = event.currentTarget.previousSibling.value;
    if (window.confirm("Are You Sure To DELETE This Entity??!")) {
        $.ajax({
                url: "http://localhost:1337/entities/" + entitiyId,
                type: 'DELETE',
                success: function(result) {
                    console.log(JSON.stringify(result));
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                }

            });
        a = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
        b = event.currentTarget.parentNode.parentNode.parentElement;
        a.removeChild(b);
    }
}

function dynamicEdit(event) {
    event.preventDefault();

    // this.setAttribute("class", "accordionItem accordionItemCollapsed");

    $(".accordion :input[type='text']").prop("readonly", false);
    $(".mySelect").attr("disabled", false);
    event.currentTarget.parentNode.parentNode.nextSibling.firstChild.firstChild.nextSibling.style.visibility = "visible";
    this.src = "/images/go.png";
    this.addEventListener("click", abc);
    this.addEventListener("click", submit);

    this.removeEventListener("click", this);

}

function submit(event) {
    event.preventDefault();

    var idEntity = event.currentTarget.previousSibling.previousSibling.value;
    alert(idEntity);
    this.src = "/images/edit-sans.png";
    event.currentTarget.parentNode.parentNode.nextSibling.firstChild.firstChild.nextSibling.style.visibility = "hidden";
    // var find = event.currentTarget.parentNode.parentNode.nextSibling.firstChild.childNodes;
    var find = $(event.currentTarget).closest('.accordion'); //.parentNode.parentNode.nextSibling.firstChild.childNodes;
    
    var e;
    var data = {
            
            "fields": _.map($(find), e => ({
                "field_name": $(e).find(".fieldShowValue").val(),
                "field_type": $(e).find(".mySelect").val(),
                "entities": idEntity,
                "id": $(e).find(".fieldId").val(),
            })),
        
            "name": $(".entityShowValue").val(),

        };
    console.log(data);
    console.log(fieldId);
    $.ajax({
        url: "http://localhost:1337/entities/" + idEntity,
        type: 'PUT',
        data: data,

        success: function(result) {
            console.log(result);
            $(".accordion :input[type='text']").prop("readonly", true);
            $(".mySelect").attr("disabled", true);
            var count = Object.keys(result.entitiesCreated[0].fields).length;
            console.log(count);
            for (var i = 0; i <count; i++) {
                fieldsId = result.entitiesCreated[0].fields[i].id;
                fieldId.setAttribute("class", "fieldId");
                fieldId.value = fieldsId;
                // $('.fieldIdValue').val(fieldsId);
                console.log(fieldsId);
            // fieldId.setAttribute("class", "fieldId");
            // console.log(fieldId.length);
        }
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }


    });
    this.removeEventListener("click", submit);

}

function addField(event) {
    event.preventDefault();

    var div2 = document.createElement("div");
    div2.setAttribute("class", "allFields");
    var textFields = document.createElement("input");
    textFields.setAttribute("type", "text");
    textFields.setAttribute("class", "fieldShowValue");
    textFields.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; margin-left: 6%; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
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
    $(div2).insertAfter(event.currentTarget.nextSibling);
    // event.currentTarget.nextSibling.appendChild(div2);
}

function delField(event) {

     var fieldId = event.currentTarget.previousSibling.value;
    if (window.confirm("Are You Sure To DELETE This Field??!")) {
        $.ajax({
            url: "http://localhost:1337/fields/" + fieldId,
            type: 'DELETE',
            success: function(result) {
                console.log(JSON.stringify(result));
            },
            error: function(err) {
                alert(JSON.stringify(err));
            }

        });
        var a = event.currentTarget.parentNode.parentNode;
        var b = event.currentTarget.parentNode;
        a.removeChild(b);
    }
}


//SHOW


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
function abc(e) {
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