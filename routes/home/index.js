const router = require('express').Router();

const projectApi = require('./project-api');

router.use(projectApi);

module.exports = router;