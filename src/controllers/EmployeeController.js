const employee  = require("src\\entities\\Employee.js");
const { Request, Response } = require("express");



class RecipientController {
  static async getAllRecipients(req, res) {
    try {
      const recipientRepository = getRepository(Recipient);
      const recipients = await recipientRepository.find();
      return res.json(recipients);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = RecipientController;