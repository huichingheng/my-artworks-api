const express = require("express");
const router = express.Router();
const indexRouterHandler = require('../middleware/indexRouterHandler')

router.use(express.json());

router.get("/", indexRouterHandler.landingPage);
router.post("/signup", indexRouterHandler.signUp);
router.post("/signin", indexRouterHandler.signIn);

module.exports = router;