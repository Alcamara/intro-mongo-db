const mongoose = require('mongoose');

connect = () =>{
   // returns a promise      /* web protocal:url*/
	return mongoose.connect('mongodb://localhost:27017',{
        useNewUrlParser: true
      })
}

const student = new mongoose.Schema({
    //firstName: String,
    // if your want to add more metadate
   firstname: {
      type: String,
      // validation
      required: true,
      // index
      unique: true
   },

   faveFoods: [{type: string}],
   info: {
      school:{
         type: string
      },
      showSize: {
         type: Number
      }
   },

   school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'school'
   }

},{timestamps: true});

const school = new mongoose.Schema({
   name: String
})

const School = mongoose.model('school',school);
const Student = mongoose.model('student',student);

connect()
 .then(async connection =>{


   //  let student = await Student.create({firstName: 'Ryu'});
 
   //  console.log(student);

   const addSchool =  await School.create({name: 'MIT'});

   const newStudent = await Student.create({
      firstname: 'Paul', 
      school: addSchool._id,
   })

   const match = await Student.findById(student.id)
      .populate('school')
      .exec()

   console.log(match);

 })
 .catch(e =>{
    console.error(` Error: ${e}`);
 })