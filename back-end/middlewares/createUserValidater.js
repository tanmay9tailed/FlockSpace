const { body } = require('express-validator');

const createUserValidater = [
  body('userId')
    .notEmpty()
    .withMessage('userId cannot be empty'),
];

module.exports = createUserValidater;
