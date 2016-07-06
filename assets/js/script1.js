var container = document.querySelector(".container");
var tenantButtons = document.querySelectorAll(".tenant-buttons a");
var dummySection = document.querySelector(".dummy-section");
var insertFields = document.querySelector(".temp-value");
var tenant_id = "";


tenantButtons[1].style.display = "none";
tenantButtons[2].style.display = "none";

tenantButtons[0].addEventListener("click", saveTenant);

function enable_entities() {

    tenantButtons[0].style.display = "none";
    tenantButtons[1].style.display = "inline";
    tenantButtons[2].style.display = "inline";
    dummySection.style.display = "none";
    // saveTenant(event);
}
var elements = document.querySelectorAll(".fixed-entity-field-block input[type='text'],.fixed-entity-field-block select,.fixed-entity-field-block input[type='image']");
var values = [];
var fieldDiv, fieldInnerDivOne, fieldInnerDivTwo, dieldDummy, fieldCloseBtn, a, b;



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
        fieldDiv.setAttribute("style", "margin-top: 3%;");
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
        fieldCloseBtn.setAttribute("style", "width: 4%;");
        fieldCloseBtn.src = "/images/delete.png";
        // dieldDummy.appendChild(fieldCloseBtn);
        fieldDiv.appendChild(fieldCloseBtn);
        fieldCloseBtn.addEventListener("click", function(event) {
            a = event.currentTarget.parentNode.parentNode;
            b = event.currentTarget.parentElement;
            a.removeChild(b);

        });


        elements[0].value = " ";


        insertFields.appendChild(fieldDiv);
    }


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
            alert(JSON.stringify(result));
            var getId = _.map(result.entitiesCreated, 'id');
            var enitityValue = result.entitiesCreated[0].name;
            var fieldsValue = result.entitiesCreated[0].fields[0].field_name;
            console.log(enitityValue);
            console.log(fieldsValue);
            // userIds = _.map(result.entitiesCreated, _.pick('id'));
            // userIds = _.fromPairs(result);

            var get = _.map(result.entitiesCreated, enitity => {
                $(enitity).find('fields')
                    // _.map(enitity, 'fields')
                    // enitity.fields.id

            });
            alert(JSON.stringify(result.entitiesCreated[0].fields[0].id));

            // var get = _.map(result.entitiesCreated.fields, 'id');

            // alert(JSON.stringify(getId));
            // alert(JSON.stringify(get));
            // var arr = _.values(result);
            // console.log(result.id);
            // document.getElementById("fixed-entity-name").value = "";



            var show = document.querySelector(".show");
            show.setAttribute("style", "background:#FFFFFF; border-radius: 0.9em;  border:2px solid #4FC3F7; border-width: thin; margin-top: 3%; width: 100%; ");

            var textEntities = document.createElement("input");
            textEntities.setAttribute("type", "text");
            textEntities.setAttribute("id", "entityShowValue");
            textEntities.setAttribute("style", "width: 25%; padding: 1%; margin: 1%; margin-left: 8em; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
            show.appendChild(textEntities);
            fieldCloseBtn = document.createElement("input");
            fieldCloseBtn.setAttribute("type", "image");
            fieldCloseBtn.setAttribute("style", "width: 4%; float: right; margin-top: 1%; margin-right: 2%;");
            fieldCloseBtn.src = "/images/delete.png";
            // dieldDummy.appendChild(fieldCloseBtn);
            show.appendChild(fieldCloseBtn);

            fieldCloseBtn = document.createElement("input");
            fieldCloseBtn.setAttribute("type", "image");
            fieldCloseBtn.setAttribute("style", "width: 4%; float: right; margin-top: 1%; margin-right: 1%;");
            fieldCloseBtn.src = "/images/edit-sans.png";
            // dieldDummy.appendChild(fieldCloseBtn);
            show.appendChild(fieldCloseBtn);

            var mybr = document.createElement('br');
            show.appendChild(mybr);
            var fieldText = document.createElement("Label");
            fieldText.setAttribute("style", "margin-left: 6%;");
            fieldText.innerHTML = "FIELD:";
            show.appendChild(fieldText);

            var hr = document.createElement('hr');
            hr.setAttribute("style", "width: 88%;");
            show.appendChild(hr);
            fieldInnerDivOne = document.createElement("div");

            var textFields = document.createElement("input");
            textFields.setAttribute("type", "text");
            textFields.setAttribute("id", "fieldShowValue");
            textFields.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; margin-left: 6%; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0;");
            show.appendChild(textFields);

            var array = ["STRING", "DATE", "NUMBERS"];
            var selectList = document.createElement("select");
            selectList.setAttribute("id", "mySelect");
            selectList.setAttribute("style", "width: 36%; padding: 0.9%; margin: 1%; border: none; border-radius: 0.5em; border: solid; border-width: thin; border-color: #EFEFF0; margin-left: 7%;");
            show.appendChild(selectList);


            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", array[i]);
                option.text = array[i];
                selectList.appendChild(option);
            }

            document.getElementById('entityShowValue').value = enitityValue;
            document.getElementById('fieldShowValue').value = fieldsValue;


            fieldCloseBtn.addEventListener("click", function(event) {
                a = event.currentTarget.parentNode.parentNode;
                b = event.currentTarget.parentElement;
                a.removeChild(b);
            });

        },
        error: function(err) {
            alert(JSON.stringify(err));
        }

    });
}
