const Joi = require("joi");

const UserSchema = {
  signup: Joi.object({
    name: Joi.string()
      .regex(/^[A-Za-z\s]+$/)
      .min(4)
      .max(20)
      .required(),
    username: Joi.string()
      .pattern(/^[a-z0-9]+$/)
      .min(4)
      .max(20)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),

  signin: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),

  changeName: Joi.object({
    name: Joi.string()
      .regex(/^[A-Za-z\s]+$/)
      .min(4)
      .max(20)
      .required(),
  }),

  changeUsername: Joi.object({
    username: Joi.string()
      .pattern(/^[a-z0-9]+$/)
      .min(4)
      .max(20)
      .required(),
  }),

  changePassword: Joi.object({
    oldPassword: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
    newPassword: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),

  deleteAccount: Joi.object({
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),

  verify: Joi.object({
    code: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
  }),

  params: {
    userId: Joi.object({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

module.exports = UserSchema;
