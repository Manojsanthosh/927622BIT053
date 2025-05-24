const express = require('express');
const numberController = require('../controllers/numberController');

const router = express.Router();

router.get('/:numberid', numberController.getNumbers);

module.exports = router;