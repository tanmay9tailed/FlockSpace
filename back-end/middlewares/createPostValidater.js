const { body } = require('express-validator');

const createPostValidator = [
  body('userId')
    .notEmpty()
    .withMessage('userId cannot be empty'),
  body('description')
    .notEmpty()
    .withMessage('Description cannot be empty'),
];

module.exports = createPostValidator;
