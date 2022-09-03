const mongoose = require('mongoose');
const Student = mongoose.model('Student');



const sendJSONrenspose = function (res,status,content){
    res.status(status);
    res.json(content);
}

module.exports.createStudent = function(req, res){
    if(!req.body.name || !req.body.age || !req.body.birthdate || !req.body.gender){
        sendJSONrenspose(res,400,{ "message": "Fill in all required fileds"})
        return;
    }
    const student = new Student();
    student.name = req.body.name;
    student.age = req.body.age;
    student.birthdate =req.body.birthdate;
    student.gender = req.body.gender;

    student.save(function(err,data){
        if(err){
            sendJSONrenspose(res,404,{"err": err, "message": "Failed to create student record"});
        } else{
            sendJSONrenspose(res, 201,{"message": "student record created"});
        }
    })
}

module.exports.readStudent= function(req, res){
    Student
    .find({})
    .exec(function(err,data){
        if(err){
            sendJSONrenspose(res,400,{"err": err, "message": "Failed to retrive record"});
        } else{
            sendJSONrenspose(res, 201,  data);
        }
    })

}

