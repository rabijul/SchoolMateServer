const SharedRepository = require("../DataAccess/SharedRepository.js");

const express = require("express");
const LoginRouter = express.Router();

LoginRouter.post("/", SharedRepository.loginUserValidation);

module.exports = LoginRouter;