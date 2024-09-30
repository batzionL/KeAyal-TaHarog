const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var TherapSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    motherName: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true,
        trim: true
    },

    problem: {
        type: String,
        required: true,
        trim: true
    },

    therapProcess: {
        type: String,
        required: true,
        trim: true
    },

    HomeExercises: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });
TherapSchema.plugin(id_validator);

const Therap = mongoose.model('Therap', TherapSchema);
module.exports = Therap