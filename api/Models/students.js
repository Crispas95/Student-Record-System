const mongoose = require('mongoose');
 
const studentRecordSchema = new mongoose.Schema({
    name: {
        type: String, required: true,

    },
    age: {
        type: Number, required: true,
    },
    birthdate: {
        type: Date, required: true,
    },
    gender:{
        type: String, required: true,
    }
});

mongoose.model('Student',studentRecordSchema);