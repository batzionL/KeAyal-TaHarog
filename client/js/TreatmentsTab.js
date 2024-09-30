function tryDiv() {
    const treatment = document.getElementById('divForTreatments');
    var idPatient = localStorage.getItem("idPatient")

    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getPatient/' + idPatient,
        success: function (result) {

            if (result[0].theraps_arr != null) {

                var therapsArr = result[0].theraps_arr;
                index = 0;
                $.each(result, function (index, value) {
                    $.ajax({
                        type: 'GET', // define the type of HTTP verb we want to use (GET for our for
                        url: '/getTherap/' + therapsArr[index],
                        success: function (result) {

                            const newDiv = document.createElement('div');
                            newDiv.className = 'dynamic-div';
                            newDiv.setAttribute('value', index)
                            newDiv.setAttribute("id", value._id)

                            const date = new Date(result[index].date);
                            const formattedDate = date.toLocaleDateString();

                            newDiv.innerHTML = `תאריך טיפול: ${formattedDate}`;
                            var problem = `<br>בעיה: ${result[index].problem}`;
                            var therapProcess = `<br>תהליך טיפולי: ${result[index].therapProcess}`;
                            var homeExercises = `<br>תרגילי בית: ${result[index].HomeExercises}`;

                            let isContentVisible = false;

                            // Add a click event listener to the div
                            newDiv.addEventListener('click', function () {
                                if (!isContentVisible) {
                                    this.innerHTML += problem + therapProcess + homeExercises;
                                    isContentVisible = true;
                                }
                                else {
                                    this.innerHTML = `תאריך טיפול: ${formattedDate}`;
                                    isContentVisible = false;
                                }
                            });

                            treatment.appendChild(newDiv);
                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    })
                });
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

window.onload = tryDiv;


/*
$(document).ready(function () {
    // var id = localStorage.getItem('conference_id')
    document.getElementById("id_keness").setAttribute('value', localStorage.getItem('conference_id'))
    document.getElementById("id_keness").disabled = "false";
    var lecturer = document.createElement("option")
    lecturer.setAttribute("disabled","disabled")
    lecturer.setAttribute("selected","selected")

    lecturers_name.appendChild(lecturer)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/lecturers/',
        success: function (result) {
            //adding all the options
            lecturers_name = document.getElementById("lecturers_name")
            index = 0;
            $.each(result, function (index, value) {
                var lecturer = document.createElement("option")
                lecturer.setAttribute('value', index)
                lecturer.setAttribute("id", value._id)
                lecturer.setAttribute("name_lecturer", value.name_lecturer)
                lecturer.setAttribute("image_lecturer", value.image_lecturer)
                lecturer.setAttribute("div_site", value.div_site)
                lecturer.innerHTML = value.name_lecturer
                lecturers_name.appendChild(lecturer)
                index++;
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    lecturers_name.addEventListener("change", function () {     //choose the id of lecturer that selected
        var select = document.getElementById('lecturers_name');
        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            if (option.selected) {
                localStorage.setItem('id_lec', option.id)
                break;
            }
        }
    });

});
*/