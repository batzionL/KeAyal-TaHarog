const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var PatientSchema = new mongoose.Schema({
    FName: {
        type: String,
        required: true,
        trim: true
    },

    LName: {
        type: String,
        required: true,
        trim: true
    },

    id: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    Email: {
        type: String,
        required: true,
        trim: true
    },

    //List of projects the moderator in
    theraps_arr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therap'
    }],

}, { timestamps: true });
PatientSchema.plugin(id_validator);

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient