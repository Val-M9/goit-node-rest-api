import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be 50 characters max",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must contain exactly 10 digits",
      "string.empty": "Phone is required",
      "any.required": "Phone is required",
    }),
  favorite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be 50 characters max",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email address",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone must contain exactly 10 digits",
    }),
})
  .min(1)
  .messages({
    "object.min":
      "At least one field (name, email, or phone) must be provided for update",
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite field is required",
  }),
});
