const express = require("express");
const routes = express.Router();
const automobileController = require('../controllers/automobileController');

router.post('/automobiles', automobileController.createAutomobile);
router.get('/automobiles', automobileController.getAllAutomobiles);
router.put('/automobiles/:id', automobileController.updateAutomobile);
router.delete('/automobiles/:id', automobileController.deleteAutomobile);


module.exports = routes;
