// jQuery(function ($) {
// const random6DigitNumber = getRandom6DigitNumber();
// document.getElementById("pwdId").value = random6DigitNumber;
// })
// 
// function getRandom6DigitNumber() {
// Generate a random number between 1000000 and 9999999
// const min = 100000;
// const max = 999999;
// return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function addTherap(e) {
    e.preventDefault();
    // let text;
    let idPatient = prompt("הכניסי ת.ז. של המטופלת");
    // if (IdPatient == null || IdPatient == "") {
    // text = "User cancelled the prompt.";
    // } else {
    // text = "Hello " + person + "! How are you today?";
    // }
    // var id = document.getElementById("IdPatient").value;
    // if (id.length < 9 || id.length > 9) {
    // alert("מס' ת.ז. לא תקין")
    // }
    // else {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/addTherap', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "name": $("#idName").val(),
            "motherName": $("#idMomName").val(),
            "age": $("#IdAge").val(),
            "date": $("#dateId").val(),
            "problem": $("#problemId").val(),
            "therapProcess": $("#therapProcId").val(),
            "HomeExercises": $("#homeExId").val()
        }),
        processData: false,
        encode: true,
        success: function (data) {
            // console.log(data._id)
            addIdTherapToPatient(data._id, idPatient)

            // alert('in success of add student')
            // location.href = "/Login"
        },
        error: function (jqXhr, textStatus, errorThrown) {
            // alert('in error of add student')
            // console.log('tring')
            console.log(errorThrown);
        }
    })
    // }
    // }
}

/*function checkIfExist(idPatient) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getPatient/' + idPatient,
        success: function (result) {
            // console.log(result[0])
            if (result[0] != undefined) {
                addIdTherapToPatient(result[0]._id, idPatient)
                // alert('מנחה זה כבר קיים');
                // localStorage.setItem('flag', "true");
                // location.reload();
            }
            // else {
            // localStorage.setItem('flag', 'false')
            // }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}*/

function addIdTherapToPatient(idTherap, idPatient) {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/addTherapToPatient/' + idPatient, // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "therapId": idTherap,
        }),
        processData: false,
        encode: true,
        success: async function (data, textStatus, jQxhr) {
            // console.log(id_pjt)
            // await add_mod_to_pro(id_pjt, outputSingleOrCouple);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

/*
// Create the pop-up elements and append them to the body
function createPopupHatch() {
    // Create modal container
    let modal = document.createElement('div');
    modal.style.display = 'none'; // Initially hidden
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
    modal.id = 'popupHatch';

    // Create modal content box
    let modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '40%';
    modalContent.style.borderRadius = '10px';
    modalContent.style.textAlign = 'center';

    // Create close button (X)
    let closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.float = 'right';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#aaa';

    // Add close functionality to close button
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    // Add content to modal
    let modalTitle = document.createElement('h2');
    modalTitle.innerText = 'Popup Hatch Content';

    let modalText = document.createElement('p');
    modalText.innerText = 'This is a pop-up hatch created using JavaScript only.';

    // Append everything
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Show the modal when the user clicks the button
    let openPopupBtn = document.createElement('button');
    openPopupBtn.innerText = 'Open Popup Hatch';
    openPopupBtn.style.padding = '10px 20px';
    openPopupBtn.style.fontSize = '16px';
    openPopupBtn.onclick = function () {
        modal.style.display = 'block';
    };
    document.body.appendChild(openPopupBtn);

    // Close the modal if the user clicks outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Call the function to create the pop-up hatch when the page loads
window.onload = createPopupHatch;
*/
