function getToTreatTab(){
    var idPatient = localStorage.getItem("idPatient")
    localStorage.setItem("idPatient", idPatient)
    location.href = "/TreatmentsTab"
}