// $(document).ready(function () {
// var btnOldPatient = document.getElementById("btnOldPatient");
// id = localStorage.getItem('conference_id')
/* ajax call to show the data from the json on the table
in success we'll see the data
*/
//    $.ajax({
//    type: 'GET',
//    url: "/getlecturesconference/" + id,
//    success: function (data) {
//    for (var i = 0; i < data.length; i++) {
//    var row = $('<tr><td>' + data[i][1] + '</td>' +
//    '<td><img src="' + data[i][2] + '"></td>' +
//    '<td>' + data[i][3] + '</td>' +
//    '<td><button id="' + data[i][0] + '" onclick="dlt_btn(\'' + data[i][0] + '\')" >Delete</button></td>' + '</tr>');
//    $('#tbl_lecturer').append(row);
//    }
//    },
//    error: function (jqXHR, textStatus, errorThrown) {
//    console.log('Error: ' + textStatus );
//    }
//    });
// });

function OldPatient() {
    var divOfIdAndPsd = document.getElementById('divOfIdAndPsd');
    divOfIdAndPsd.style.visibility = 'visible';
    // var id = document.getElementById('IdPatient').value;
    // var password = document.getElementById('pwdPatient').value;
    // localStorage.setItem("id", id);
    // localStorage.setItem("password", password);
    // console.log('id - ', id);
    // console.log('pwd - ', password);
    // getPatientUsername(id, password);
}

function getPatientUsername() {
    var id = document.getElementById('IdPatient').value;
    var password = document.getElementById('pwdPatient').value;
    // id = localStorage.getItem("id");
    // password = localStorage.getItem("password");
    // console.log('id - ', id);
    $.ajax({
        type: 'GET',
        url: '/getPatient/' + id,
        success: function (result) {
            if (result[0] != undefined) {
                if (result[0].id == id && result[0].password == password) {
                    localStorage.setItem("idPatient", id)
                    window.location.href = "/oldPatient";
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function showPassword() {
    var x = document.getElementById('pwdId');
    x.type = x.type === 'password' ? 'text' : 'password';
}
