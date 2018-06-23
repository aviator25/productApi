var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://products25:abc123@ds161700.mlab.com:61700/products25')
var Product = require('./products');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;



// create the / in the url behind the localhost: 8080/api
router.get('/', function(req, res) {

	res.json({ message: 'hooray! welcome to our api!'});
});



// url for product api
router.route('/products')

	.post(function(req, res) {

		var product = new Product();
		product.name = req.body.name;
		product.packaging = req.body.packaging;
		product.quantity = req.body.quantity;
		product.price = req.body.price;

		product.save(function(err) {
			if(err)
				res.send(err);

			res.json({ message: 'Product created!' });
		});
	})


// get function call the product api
		.get(function(req, res) {
			Product.find(function(err, products) {
				if(err)
					res.send(err);

				res.json(products)
			})
		})

router.route('/products/:product_id')
		.get(function(req, res) {
			Product.findById(req.params.product_id, function(err, product){
				if(err)
					res.send(err);
				res.json(product);
			});
		})


		.post(function(req, res) {

			Product.findById( req.params.product_id, function(err, product) {

				if(err)
					res.send(err);

				product.name = req.body.name;
				product.packaging = req.body.packaging;
				product.quantity = req.body.quantity;
				product.price = req.body.price;

				//save the product
				product.save(function(err) {
					if(err)
						res.send(err);

					res.json({ message: 'Product has been updated!' });
				});
			});
		})

		.delete(function(req, res ) {
			Product.remove({
				_id: req.params.product_id
			}, function(err, product) {
				if(err)
					res.send(err);

				res.json({ message: 'Succesfully deleted' });
			});
		})



app.use('/api' , router);
app.listen(port);
console.log('Magic happens on port ' + port);