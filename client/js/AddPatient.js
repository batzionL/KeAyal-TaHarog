jQuery(function ($) {
    const random6DigitNumber = getRandom6DigitNumber();
    document.getElementById("pwdId").value = random6DigitNumber;
})

function getRandom6DigitNumber() {
    // Generate a random number between 1000000 and 9999999
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addPatient(e) {
    e.preventDefault();
    var id = document.getElementById("IdPatient").value;
    if (id.length < 9 || id.length > 9) {
        alert("מס' ת.ז. לא תקין")
    }
    else {
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: '/addPatient', // the url where we want to POST
                contentType: 'application/json',
                data: JSON.stringify({
                    "FName": $("#idFName").val(),
                    "LName": $("#idLName").val(),
                    "id": $("#IdPatient").val(),
                    "Email": $("#emailId").val(),
                    "password": $("#pwdId").val()
                }),
                processData: false,
                encode: true,
                success: function (data, textStatus, jQxhr) {
                    alert('in success of add student')
                    location.href = "/Login"
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    // alert('in error of add student')
                    // console.log('tring')
                    console.log(errorThrown);
                }
            })
        // }
    }
}

function showPassword() {
    var x = document.getElementById('pwdId');
    // switch (str) {
        // case 'sdt':
            // x = document.getElementById("sdt_pswd_id");
            // break;
        // case 'mod':
            // x = document.getElementById('mod_pswd_id');
            // break;
        // case 'old':
            // x = document.getElementById('old_pwd_or_ID');
            // break;
        // case 'new':
            // x = document.getElementById('id_new_pwd');
            // break;
        // case 'again':
            // x = document.getElementById('id_again_new_pwd');
            // break;
        // case 'login':
            // x = document.getElementById('id_password');
            // break;
    // }

    x.type = x.type === 'password' ? 'text' : 'password';
}
