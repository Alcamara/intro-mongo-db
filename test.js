const mongoose = require('mongoose');

connect = () =>{
   // returns a promise      /* web protocal:url*/
	return mongoose.connect('mongodb://localhost:27017',{
        useNewUrlParser: true
      })
}

const student = new mongoose.Schema({
    firstName: String,

});

const Student = mongoose.model('student',student);

connect()
 .then(async connection =>{

    console.log('test');

    const newStudent = await Student.create({firstName: '007 Bond'});


    
    console.log(newStudent);

 })
 .catch(e =>{
    console.error(` Error: ${e}`);
 })