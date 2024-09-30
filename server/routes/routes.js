const express = require('express'),
    backend_routes = require('./backend');

var router = express.Router();

router.post('/addPatient', backend_routes.CreateNewPatient);      
router.post('/addTherap', backend_routes.CreateNewTherap);
router.post('/addTherapToPatient/:id', backend_routes.AddTherapPatient);
router.get('/getPatient/:id', backend_routes.GetPatient);
router.get('/getTherap/:id', backend_routes.GetTherap);

// router.put('/conferences/:id', conferences_routes.updateConference);     
// router.get('/conferences', conferences_routes.getConferences);     
// router.delete('/lecturer/:id/:idlec', conferences_routes.deleteLecturerFromConference);     
// router.delete('/list/:id', conferences_routes.deleteConference);        
// router.post('/lecturer/', conferences_routes.CreateLecturer);   
// router.get('/lecturers', conferences_routes.getLecturers);  
// router.get('/getlecturesconference/:id', conferences_routes.getLecturesConferences);


module.exports = router;