const { body } = require('express-validator');

const commentValidate = [
  body('userId')
    .notEmpty()
    .withMessage('UserId cannot be empty'),
  body('text')
    .notEmpty()
    .withMessage('something must be written.')
];

module.exports = commentValidate;
