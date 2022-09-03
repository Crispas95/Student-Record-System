var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



const studentctrl = require('../api/Controller/student');
router.post('/createStudent',studentctrl.createStudent);
router.get('/readAllstudents',studentctrl.readStudent);

module.exports = router;
