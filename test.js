const mongoose = require('mongoose');

connect = () =>{
   // returns a promise      /* web protocal:url*/
	return mongoose.connect('mongoosedb://localhost:27017')
}

const student = new mongoose.Schema({
    firstName: String,

});

const Student = mongoose.model('student',student);