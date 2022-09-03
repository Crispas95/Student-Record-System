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
            sendJSONrenspose(res, 200,  data);
        }
    });

}
 module.exports.read_student_by_Id = function(req, res){
    if(!req.params.student_Id){
        sendJSONrenspose(res,404,{"message": "No such student record found"});
    } 
    else if(req.params && req.params.student_Id)
    {
    Student.findById({_id: req.params.student_Id})
    .exec(function(err,data){
        if(err){
            sendJSONrenspose(res,400,{"err": err, "message": "Failed to retrive record"});
        } else{
            sendJSONrenspose(res, 200,  data);
        }
    });
 }
}

module.exports.update_student = function(req,res){
   var student_Id = req.params.student_Id
   var name = req.body.name
   var age = req.body.age
   var birthdate = req.body.birthdate
   var gender = req.body.gender

   if(!student_Id){
    sendJSONrenspose(res,404,{"message": "NO such student with that ID found"});
   } else if(student_Id){
    Student.updateOne({_id: student_Id}, {
        $set: {
        name: name,
        age: age,
        birthdate: birthdate,
        gender: gender
        }
    }).exec(function(err){
        if(err){
            sendJSONrenspose(res, 404, err)
        } else{
            sendJSONrenspose(res,200,{"message": "Student record update."})
        }
    })
   }
}

module.exports.delete_student = function(req, res){
    const student_Id = req.params.student_Id
    console.log(student_Id)
    if(!student_Id){
        sendJSONrenspose(res,404,{"message": " that id is not found"})
    }
    else if(student_Id){
        Student
        .findByIdAndRemove(student_Id)
        .exec(function(err){
            if(err){
                sendJSONrenspose(res, 404, err)
            }else{
                sendJSONrenspose(res,204,{"message": "Student record deleted"});
            }
        })
     }
}

