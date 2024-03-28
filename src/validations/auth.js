import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Trường Name là bắt buôc",
    "string.empty": "Trường Name không dược để trống",
    "string.min": "Trường Name phải có ít nhất {#limit} ký tự",
    "string.max": "Trường Name không được vượt quá {#limit} ký tự",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Trường Email là bắt buôc",
    "string.empty": "Trường Emailkhông dược để trống",
    "string.email": "Trường Name phải là email hợp lệ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Trường Password là bắt buôc",
    "string.empty": "Trường Password không dược để trống",
    "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
    "string.max": "Trường Password không được vượt quá {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Trường Confirm Password là bắt buôc",
    "any.only": "Mật khẩu không trùng khớp",
  }),
  avatar: Joi.string().uri().messages({
    "string.uri": "Trường Avatat phải là đường dẫn hợp lệ",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
}).options({
  abortEarly: false,
});
