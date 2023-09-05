const express = require("express");
const router = express.Router();

router.use(require("./TimeseriesRouter"));

module.exports = router;
