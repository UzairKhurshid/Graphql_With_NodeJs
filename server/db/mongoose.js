const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/testGraphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
  console.log("Successfully connected to database")
}).catch(err=>{
  console.log("Error Connecting database")
});