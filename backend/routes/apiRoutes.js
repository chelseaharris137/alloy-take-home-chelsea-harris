const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// GET Alloy parameters
router.get(
  "/alloy/parameters",
  apiController.getParameters
);

// POST applicant evaluation
router.post(
  "/alloy/evaluations",
  apiController.submitForm
);

module.exports = router;