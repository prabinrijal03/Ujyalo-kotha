const mongoose = require('mongoose');

const mongodb = 'mongodb+srv://prabinrijal03:Multiverse52@cluster0.zz0wgmh.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('connected')).catch(err=> console.log(err));

module.exports = mongoose;