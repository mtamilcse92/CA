var container = document.querySelector(".container");
var tenantButtons = document.querySelectorAll(".tenant-buttons a");
var dummySection = document.querySelector(".dummy-section");
var insertFields = document.querySelector(".temp-value")
var fixedEntity = document.querySelector(".fixed-entity");

var tenant_id = "";


tenantButtons[1].style.display = "none";
tenantButtons[2].style.display = "none";
tenantButtons[0].addEventListener("click", saveTenant);
$(document).ready(function(){
        $(".main-section :input").prop("disabled", true);
    });

function enable_entities() {

    tenantButtons[0].style.display = "none";
    tenantButtons[1].style.display = "inline";
    tenantButtons[2].style.display = "inline";
    $('.main-section').append('<style>.main-section:before{display:none !important;}</style>');
        $(document).ready(function(){
        $(".main-section :input").prop("disabled", false);
    });
}
var elements = document.querySelectorAll(".fixed-entity-field-block input[type='text'],.fixed-entity-field-block select,.fixed-entity-field-block input[type='image']");
var values = [];
var fieldDiv, fieldInnerDivOne, fieldInnerDivTwo, dieldDummy, fieldCloseBtn, a, b;
var fieldCount = 0,insertFields;


elements[2].addEventListener("click", function(event) {


    if (((document.getElementById('fixed-entity-name').value).trim() == '')) {
        alert('missing name');
        return
    } else if (((document.getElementById('fixed-entity-field-name').value).trim() == '')) {

        alert('missing fields name');
        return
    } else {

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


        elements[0].value = " ";

insertFields.appendChild(fieldDiv);
        
        fieldCount++;
        console.log(fieldCount);
    }


});

tenantButtons[2].addEventListener("click", function(event) {
var tenantHidden =document.getElementById("tenantId").value;
alert("delete");
          $.ajax({
        url: "http://localhost:1337/tenant/" + tenantHidden,
        type: 'DELETE',
        success: function(result) {
          alert(JSON.stringify(result));
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

          });

});

function saveTenant() {

    if (document.getElementById('tenant-name').value == '') {
        alert('missing name');
        return
    } else {
        var data = {
            "name": $("#tenant-name").val()
        };
        $.ajax({
            url: '/tenant/',
            type: 'POST',
            data: data,
            success: function(result) {
                var create = _.map(result, 'id');
                // var create = _.map(result.entities, enitity => {

                // });
                document.getElementById("tenantId").value = create;
                document.getElementById("setId").value = create;
                enable_entities(event)
                tenant_id = JSON.stringify(create);
                alert(tenant_id);
                alert(JSON.stringify(result));
            },
            error: function(err) {
                alert(JSON.stringify(err));
            }

        });

    }


}

var fCount;

// document.getElementById("save").addEventListener("click", saveAll);

function saveAll() {
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
            show.setAttribute("style", "background:#FFFFFF; border-radius: 0.9em;  border:2px solid #4FC3F7; border-width: thin; margin-top: 3%; width: 100%; ");

            showChild = document.createElement("div");
            showChild.setAttribute("class", "showClass");
            showChild.setAttribute("style", "margin-top: 1%;");

            var textEntities = document.createElement("input");
            textEntities.setAttribute("type", "text");
            textEntities.setAttribute("id", "entityShowValue");
            textEntities.setAttribute("style", "width: 25%; padding: 1%; margin: 1%; margin-left: 5em; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
            textEntities.value = enitityValue;
            showChild.appendChild(textEntities);
            fieldCloseBtn = document.createElement("input");
            fieldCloseBtn.setAttribute("type", "image");
            fieldCloseBtn.setAttribute("style", "width: 3%; float: right; margin-top: 1%; margin-right: 2%;");
            fieldCloseBtn.src = "/images/delete.png";
            // dieldDummy.appendChild(fieldCloseBtn);
            showChild.appendChild(fieldCloseBtn);

            fieldEditBtn = document.createElement("input");
            fieldEditBtn.setAttribute("type", "image");
            fieldEditBtn.setAttribute("style", "width: 3%; float: right; margin-top: 1%; margin-right: 1%;");
            fieldEditBtn.src = "/images/edit-sans.png";
            // dieldDummy.appendChild(fieldCloseBtn);
            showChild.appendChild(fieldEditBtn);

            var mybr = document.createElement('br');
            showChild.appendChild(mybr);
            var fieldText = document.createElement("Label");
            fieldText.setAttribute("style", "margin-left: 6%;");
            fieldText.innerHTML = "FIELD:";
            showChild.appendChild(fieldText);

            var hr = document.createElement('hr');
            hr.setAttribute("style", "width: 88%;");
            showChild.appendChild(hr);
            fieldInnerDivOne = document.createElement("div");
               fCount = fieldCount;
             for (i = 0; i < fCount; i++) {
            fieldsValue = result.entitiesCreated[0].fields[i].field_name;
            fieldsType = result.entitiesCreated[0].fields[i].field_type;
            console.log(fieldsValue);

            var textFields = document.createElement("input");
            textFields.setAttribute("type", "text");
            textFields.setAttribute("data-i", "fieldShowValue");
            textFields.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; margin-left: 6%; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
            showChild.appendChild(textFields);
            // console.log(document.querySelectorAll('.fieldShowValue'));
            textFields.value = fieldsValue;
            var array = ["STRING", "DATE", "NUMBER"];
            var selectList = document.createElement("select");
            selectList.setAttribute("class", "mySelect");
            selectList.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; border: none; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; margin-left: 7%;");
            showChild.appendChild(selectList);



            for (j = 0; j < array.length; j++) {
                var option = document.createElement("option");
                option.setAttribute("value", array[j]);
                option.text = array[j];
                selectList.appendChild(option);
            }
            console.log(fieldsType);
            
            if(fieldsType == "STRING") {
              selectList.firstChild.selected = true;
            }
            else if(fieldsType == "DATE") {
              selectList.firstChild.nextSibling.selected = true;
            }
            else {
               selectList.lastChild.selected = true; 
            }fieldCount--;
            }
            

            show.appendChild(showChild);
            document.getElementById('fixed-entity-field-name').value = "";
            document.getElementById('fixed-entity-name').value = "";
            
            

            fieldCloseBtn.addEventListener("click", function(event) {
                a = event.currentTarget.parentNode.parentNode;
                b = event.currentTarget.parentElement;
                a.removeChild(b);
                

                 $.ajax({
        url: "http://localhost:1337/entities/" + entitiyId,
        type: 'DELETE',
        data: data,
        success: function(result) {
          console.log(JSON.stringify(result));
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

          });
            });


        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

    });

}
