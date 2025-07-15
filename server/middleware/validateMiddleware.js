const { validationResult } = require('express-validator');

// Middleware to handle validation results
const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.param, message: e.msg })),
      });
    }
    next();
  };
};

module.exports = { validate }; 