var express = require("express");
var router = express.Router();

import controller from "../controllers/user.controller";

//signup
router.post("/signup", controller.signup);

//login
router.post("/login", controller.login);

export default router;
