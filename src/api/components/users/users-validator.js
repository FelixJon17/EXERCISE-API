const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      confirmPassword: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('confirm Password'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  updatepw: {
    body: {
      password_lama: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('password lama'),
      password_baru: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('password baru'),
      password_cek: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('password cek'),
    },
  },
};
