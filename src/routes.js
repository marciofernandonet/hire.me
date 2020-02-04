const express = require('express');
const Shorten = require('./controllers/ShortenController');

const routes = express.Router();

routes.put('/create?:url', Shorten.shorten);
routes.get('/most_accessed', Shorten.mostAccessed);
routes.get('/:alias', Shorten.retrieve);

module.exports = routes;