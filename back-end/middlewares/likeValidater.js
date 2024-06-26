const { body } = require('express-validator');

const likeValidate = [
  body('userId')
    .notEmpty()
    .withMessage('UserId cannot be empty')
];

module.exports = likeValidate;
