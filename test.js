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

const Student = new mongoose.model('student',student);

connect()
 .then(async connection =>{


    let student = await Student.create({firstName: 'ken master'});
 
    console.log(student);

 })
 .catch(e =>{
    console.error(` Error: ${e}`);
 })