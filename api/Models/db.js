const mongoose = require('mongoose');
const dbURL= "mongodb+srv://Makanani:123@cluster0.pvxb8.mongodb.net/Studentdb";
mongoose.connect(dbURL);

mongoose.connection.on('connect',function(){
    console.log('mongoose connected to', +dbURL)
});

mongoose.connection.on('error',function(err){
    console.log('mongoose connection error', +err);
});

mongoose.connection.on('disconnect',function(){
    console.log('mongoose disconncted');
});

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnect through " +msg);
        callback();
    });

};

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

require('./students');

