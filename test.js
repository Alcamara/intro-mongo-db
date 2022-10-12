const mongoose = require('mongoose');

connect = () =>{
   // returns a promise      /* web protocal:url*/
	return mongoose.connect('mongodb://localhost:27017',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
}

const student = new mongoose.Schema({
    //firstName: String,
    // if your want to add more metadate
   firstName: {
      type: String,
      // validation
      required: true,
      // index
      unique: true
   },

   // faveFoods: [{type: String}],
   // info: {
   //    school:{
   //       type: String
   //    },
   //    showSize: {
   //       type: Number
   //    }
   // },

   school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'school'
   }

});

const school = new mongoose.Schema({
   name: String,
   openSince: Number,
   students: Number,
   isGreat: Boolean,
   staff:[{type: String}] 
})

const School = mongoose.model('school',school);
const Student = mongoose.model('student',student);

connect()
 .then(async connection =>{


   //  let student = await Student.create({firstName: 'Ryu'});
 
   //  console.log(student);

   const schoolConfig = {
      name: 'Armstrong High School',
      openSince: 1985,
      students: 800,
      isGreat: true
   }

   const schoolConfig2 = {
      name: 'Johnson High School',
      openSince: 1975,
      students: 400,
      isGreat: false,
      
   }

   const schoolConfig3 = {
      name: 'Carter High School',
      openSince: 1965,
      students: 400,
      isGreat: false,
      staff:['Mike','Chris','Peter'] 
   }

   const schoolConfig4 = {
      name: 'George Washingston High School',
      openSince: 1945,
      students: 1000,
      isGreat: true,
      staff:['Sara','Ben','Charle'] 
   }

   const newSchools = await School.create(schoolConfig4)

   /*
      $gt = great than
   */

   // const match = await School.findOne({
   //    students: {$gt: 300},
   //    isGreat: false
   
   // }).exec()

   const match = await School.find({
      staff: 'Peter',
      isGreat: false
   
   })
   .limit(2) //limit amount of documents returned
   .exec()

   // const addSchool =  await School.create({name: 'MIT'});

   // const newStudent = await Student.create({
   //    firstName: 'Joe', 
   //    school: addSchool._id,
   // })

   // const match = await Student.findById(newStudent.id)
   //    .populate('school')
   //    .exec()

   console.log(match);

 })
 .catch(e =>{
    console.error(` Error: ${e}`);
 })