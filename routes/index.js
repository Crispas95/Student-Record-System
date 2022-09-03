var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



const studentctrl = require('../api/Controller/student');

router.post('/createStudent',studentctrl.createStudent);
router.get('/readAllstudents',studentctrl.readStudent);
router.get('/read_student_by_Id/:student_Id',studentctrl.read_student_by_Id);
router.put('/update_student/:student_Id',studentctrl.update_student);
router.delete('/delete_student/:student_Id',studentctrl.delete_student);
module.exports = router;
