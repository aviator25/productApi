var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: String,
	packaging: String,
	quantity: Number,
	price: Number,
	categories: [],
	createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Product', ProductSchema);