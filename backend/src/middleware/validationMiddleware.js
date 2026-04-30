const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validate,
  // Add validation rules as needed
  loginValidation: [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
  ]
};
