var express = require('express');
var app = require('../app');
var router = express.Router();

/* 
 * il faudra déplacer les fonctions et différentes var à leur bonne place...
 *
 *
 */

var brand = 'max'; // nom générique du produit

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'dashboard ', brand: brand, section: 'main' });
});

/* GET meteo page. */
router.get('/meteo', function(req, res, next) {
	
	//var brand = "max";
	var weather = require('weather-js');
  
  weather.find({search: 'Berlin, DEU', degreeType: 'C'}, function(err, result) {
		if(err) console.log(err);
		console.log(JSON.stringify(result, null, 2));
		current_temp = result[0].current.temperature;
		current_city = result[0].location.name;
		current_degree_type = result[0].location.degreetype;
		current_image_url = result[0].current.imageUrl
		//console.log(current_temp);
		res.render('meteo', { title: 'météo', brand: brand, section: 'meteo' });
	});

});

/* GET light pattern page. */
router.get('/light-patterns', function(req, res, next) {
  res.render('lightpatterns', { title: 'light patterns ', brand: brand, section: 'light-patterns'});
});

/* GET options page. */
router.get('/options', function(req, res, next) {
	res.render('options', { title: 'options ', brand: brand, section: 'options'});
});

/* GET voice page. */
router.get('/talk', function(req, res, next) {
	res.render('talk', { title: 'talk ', brand: brand, section: 'talk'});
});

/* GET notifications page. */
router.get('/notifications', function(req, res, next) {
	res.render('notifications', { title: 'notifications ', brand: brand, section: 'notifications'});
});

module.exports = router;
