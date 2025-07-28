const ContactUsRepository = require("../DataAccess/ContactUsRepository");
const express = require("express");

const ContactUsrouter = express.Router();


ContactUsrouter.get('/', ContactUsRepository.getAllContactUsInfo);

ContactUsrouter.post('/Create', ContactUsRepository.saveContactUsDetails);


module.exports = ContactUsrouter;

