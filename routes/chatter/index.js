const router = require('express').Router();

const messageApi = require('./message-api');
const roomApi    = require('./room-api');
const userApi    = require('./user-api');

router.use(messageApi);
router.use(roomApi);
router.use(userApi);

module.exports = router;