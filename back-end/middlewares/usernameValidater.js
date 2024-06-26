const { body } = require('express-validator');

const usernameValidate = [
  body('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
];

module.exports = usernameValidate;
