const express = require('express')
require('./server/db/mongoose')
const routers = require('./server/routes/routes.js')
const path = require('path');

const app = express()
const port = process.env.PORT || 3007


app.use('/Login', express.static(path.join(__dirname, 'client/html/index.html')));
app.use('/OldPatient', express.static(path.join(__dirname, 'client/html/OldPatient.html')));
app.use('/AddPatient', express.static(path.join(__dirname, 'client/html/AddPatient.html')));
app.use('/AddTherap', express.static(path.join(__dirname, 'client/html/AddTherap.html')));
app.use('/TreatmentsTab', express.static(path.join(__dirname, 'client/html/TreatmentsTab.html')));
app.use('/Appointment', express.static(path.join(__dirname, 'client/html/MakingAnAppointment.html')));

app.use('/css', express.static(path.join(__dirname, 'client/css')));
app.use('/js', express.static(path.join(__dirname, 'client/js')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})