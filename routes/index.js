var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var dateFormat = require('dateformat');
var now = new Date();

var Sensor = require('../models/sensor');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');

});

router.get('/profile', ensureAuthenticated, function(req, res){
	res.render('profile');

});

router.get('/about', function(req, res){
	res.render('about');
});

router.get('/features', function(req, res){
	res.render('features');
});

router.get('/add_camera', function (req, res) {
	res.render('add_camera')
})


router.get('/appliances', function(req, res){
	res.render('appliances');
})

router.get('/camera', function(req, res){
	Sensor.find({}, function(err, docs){
		if(err) res.json(err);
		else    res.render('camera', {camera: docs});
	});
});


router.get('/remove_camera/:id', function (req, res) {
	Sensor.findById( req.params.id, function ( err, sensor ){
        console.log(req.param.id);
		sensor.remove( function ( err, todo ){
			res.redirect( '/camera' );
			if (err){
				res.json(err);
			};
		});
	});
});

router.get('/lighting', function(req, res){
	res.render('lighting');
})
router.get('/locks', function(req, res){
	res.render('locks');
})

router.get('/temperature', function(req, res){
	res.render('temperature');
})


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;