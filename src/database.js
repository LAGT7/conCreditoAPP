const mongoose = require('mongoose');
const MONGODB_URI= 'mongodb://localhost/conCredito-app';
mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(db=> console.log('Its alive !!!'))
.catch(err => console.log(err));