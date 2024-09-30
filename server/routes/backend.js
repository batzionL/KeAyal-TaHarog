const { json } = require('express');
const Patient = require('../models/Patient.js')
const Therap = require('../models/Therap.js')

function containsNumbers(str) {
    // console.log('containsNumbers')
    return /[0-9]/.test(str);
}

function isValidDate(date) {
    var str_date = new Date(date).toISOString().slice(0, 10)
    const arr_date = str_date.split("-");
    var y = parseInt(arr_date[0]);
    var m = parseInt(arr_date[1]);
    var d = parseInt(arr_date[2]);
    var current_year = new Date().getFullYear();
    if ((y < current_year || y > 9999) || (m < 1 || m > 12) || (d < 1 || d > 31)) {
        return false
    }
    else if (((m == 2) && (d > 28)) || (((m == 4) || (m == 6) || (m == 9) || (m == 11)) && (d > 30))) {
        return false
    }
    else {
        return true
    }
}


module.exports = {
    /* CreateNewPatient()
    add new patient
    return with status 200 in success
    */
    CreateNewPatient: function (req, res) {
        const patient = new Patient(req.body);

        patient.save().then(patient =>
            res.status(200).send(patient)
        ).catch(e => res.status(400).send(e))
    },

    /* CreateNewTherap()
    add new therap
    return with status 200 in success
    */
    CreateNewTherap: function (req, res) {
        const therap = new Therap(req.body);
        therap.save().then(therap =>
            res.status(200).send(therap)
        ).catch(e => res.status(400).send(e))
    },

    AddTherapPatient: function (req, res) {
        // console.log('AddProjectToModerator')
        // console.log(req.body)
        // console.log(req.params.modID)
        if (!req.body) res.status(400).send("There is no body");
        // else if (!req.params["_id"] || !req.body.modID) res.status(400).send("Missing parameters");
        else {
            // console.log(req.body)
            // console.log(req.params)
            //find the specific moderator and update it
            Patient.findOneAndUpdate({ "id": req.params.id }, { $push: { theraps_arr: req.body.therapId } }, { new: true, runValidators: true }).then(patient => {
                if (!patient) {
                    return res.status(404).send()
                }
                else {
                    res.status(200).send(patient)
                }
            }).catch(e => res.status(400).send(e))
        }
    },

    /* updateConference()
    get id conference an update this conference
    return with status 200 in success
    */
    // updateConference: function (req, res) {
    // console.log(JSON.stringify(req.body.name))
    // if (!req.body.name ||
    // !req.body.manager ||
    // !req.body.image ||
    // !req.body.date) {
    // res.status(400).send("Missing parameters")
    // }
    // else if (!isValidDate(req.body.date)) {
    // res.status(400).send("Invalid date")
    // }
    // else {          //If it's valid
    // const updates = Object.keys(req.body)
    // const allowedUpdates = ['name', 'manager', 'image', 'date', 'number_of_session']//, 'lecturers_arr']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if (!isValidOperation) {
    // return res.status(400).send({ error: 'Invalid updates!' })
    // }
    // Conference.findOneAndUpdate({ "_id": req.params.id }, req.body, { new: true, runValidators: true }).then(conference => {
    // console.log('updateConference - ' + conference)
    // if (!conference) {
    // return res.status(404).send('There is no conference')
    // }
    // else {
    // res.send(conference)
    // }
    // }).catch(e => res.status(400).send(e))
    // }
    // },

    /* AddLecturerToConference()
    get id conference and add lecturer to this conference
    return with status 200 in success
    */
    /*AddLecturerToConference: function (req, res) {
        //console.log('conference')
        if (!req.body) res.status(400).send("There is no body");
        else if (!req.params["id"] || !req.body.lecturerID) res.status(400).send("Missing parameters");
        else {
            // console.log(req.params['id'])
            //find the specific conference and update it
            Conference.findOneAndUpdate({ "_id": req.params.id }, { $push: { lecturers_arr: req.body.lecturerID } }, { new: true, runValidators: true }).then(conference => {
                // console.log(conference)
                if (!conference) {
                    return res.status(404).send()
                }
                else {
                    res.send(conference)
                }
            }).catch(e => res.status(400).send(e))
        }
    },*/

    /* getConference()
    get id conference and show lecturer list of this conference
    return with status 200 in success
    */
    GetPatient: function (req, res) {
        if (!req.params["id"]) res.status(400).send("There is no id");
        // console.log('req.params');
        // console.log(req.params);
        Patient.find({ "id": req.params.id }).then(patient => {
            // console.log(patient);
            // console.log('getConference - conf - ' + JSON.stringify(conference) )
            res.status(200).send(patient)
        }
        ).catch(e => res.status(500).send())
    },

    GetTherap: function (req, res) {
        if (!req.params["id"]) res.status(400).send("There is no id");
        // console.log('req.params');
        // console.log(req.params);
        Therap.find({ "id": req.params._id }).then(therap => {
            // console.log(patient);
            // console.log('getConference - conf - ' + JSON.stringify(conference) )
            res.status(200).send(therap)
        }
        ).catch(e => res.status(500).send())
    },

    /* getConferences()
    show conferences list
    return conference details in success
    */
    /* getConferences: function (req, res) {
         Conference.find().then(conferences => { res.send(conferences) }
         ).catch(e => res.status(500).send())
     },
 
     getLecturesConferences: async function (req, res) {
         await Conference.findOne({ _id: req.params.id }).then(conference => {
             if (conference.lecturers_arr.length == 0)
                 res.status(200).send([]);
             var lecturesConferences = []
             var flag = 0
             // console.log('hvhgh')
             // console.log(conference.lecturers_arr)
             conference.lecturers_arr.forEach((lecturers, i) => {
                 Lecturer.findOne({ _id: lecturers }).then(lecturers => {
                     // console.log('hvhgh')
                     console.log(lecturers)
                     var temp = []
                     temp.push(lecturers._id)
                     temp.push(lecturers.name_lecturer)
                     temp.push(lecturers.image_lecturer)
                     temp.push(lecturers.div_site)
 
                     lecturesConferences[i] = temp
                     flag = 1
                     if ((i == conference.lecturers_arr.length - 1) && (flag == 1)) {
                         res.status(200).send(lecturesConferences);
                     }
                 })
             });
         }).catch(e => res.status(500).send())
     },*/

    /* deleteLecturerFromConference()
    get id conference and name lecturer
    delete lecturer from specific conference
    return with status 200 in success
    */
    /*  deleteLecturerFromConference: function (req, res) {
          //validation
          if (!req.params["id"]) res.status(400).send("There is no id");
          else {
              Conference.findOneAndUpdate(
                  { _id: req.params.id },
                  { "$pull": { lecturers_arr: req.params.idlec } }
              ).then(lecturer => {
                  if (lecturer)
                      res.status(200).send("Lecturer removed successfuly")
                  else
                      res.status(404).send("No such lecturer")
              }).catch(e => { res.status(500).send(e) })
              // }
          }
      },
  
      // deleteLecturerFromConference: function (req, res) {
      //     readFile(data => {
      //         if (!req.params['id']) res.status(400).send('No ID');
      //         else {
      //             const conf_id = req.params["id"];     //Save details of spesific conference
      //             const lec_name = req.params["name"];     //Svae all lecturers of this conference
      //             if (!conf_id) res.status(400).send('No Conference');
      //             else {
      //                 if (!lec_name) res.status(400).send("no such lecturer");
      //                 else {
  
      //                     delete data[conf_id]['lecturers_arr'][lec_name];
      //                     writeFile(JSON.stringify(data, null, 2), () => {
      //                         res.status(200).send(`Lecturer name:${lec_name} removed`);
      //                     });
      //                 }
      //             }
      //         }
      //     },
      //         true);
      // },*/

    /* deleteConference()
    get id conference
    delete specific conference
    return with status 200 in success
    */
    /* deleteConference: function (req, res) {
         console.log('deleteConference - ' + req.params.id)
         Conference.deleteOne({ _id: req.params.id }, function (err) {
             if (!err) {
                 res.status(200).send();
             }
             else {
                 res.status(500).send()
             }
         });
     },*/

    /* CreateLecturer()
    add new lecturer
    return with status 200 in success
    */
    /* CreateLecturer: function (req, res) {
         if (!req.body) res.status(400).send("There is no body")
         else if (!req.body.name_lecturer ||
             !req.body.image_lecturer) {
             res.status(400).send("Missing parameters")
         }
         else if (containsNumbers(req.body.name_lecturer)) {      //verify that name doesnt contain numbers
             res.status(400).send('Invalid lecturer name')
         }
         else {
             console.log("new lecturer")
             const lecturer = new Lecturer(req.body);            
             lecturer.save().then(lecturer =>{
                 console.log(" in then lect")
                 res.status(200).send(lecturer)
             }
             ).catch(e => res.status(400).send(e))
         }
     },*/

    /*
    getLecturers()
    show conferences list
    return conference details in success
   */
    /*getLecturers: async function (req, res) {
        await Lecturer.find().then(lecturers_arr => res.send(lecturers_arr)
            // console.log('server - ' + lecturer)
        ).catch(e => res.status(500).send())
    },*/
};