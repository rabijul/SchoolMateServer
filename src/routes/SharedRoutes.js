const SharedRepository = require("../DataAccess/SharedRepository.js");

const express = require("express");
const SharedRouter = express.Router();


SharedRouter.get("/Schools", SharedRepository.getAllSchoolsInfo); 
SharedRouter.get("/Users", SharedRepository.SharedUsersInfo);

SharedRouter.get("/:id", SharedRepository.getSchoolById);

module.exports = SharedRouter;