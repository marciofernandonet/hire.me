const mongoose = require('mongoose');
const shortenSchema = require('../schemas/ShortenSchema');

const Shorten = mongoose.model('Shorten', shortenSchema);

module.exports = Shorten;