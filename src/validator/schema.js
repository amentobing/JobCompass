import Joi from 'joi';

export const registSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.email': 'format email tidak valid!',
    'any.required': 'email harus diisi!',
  }),
  username: Joi.string().alphanum().min(4).max(10).required().messages({
    'string.alphanum': 'username harus berupa huruf dan angka. panjangnya 4-10 karakter',
    'string.min': 'username harus berupa huruf dan angka. panjangnya 4-10 karakter',
    'string.max': 'username harus berupa huruf dan angka. panjangnya 4-10 karakter',
    'any.required': 'username harus diisi!',
  }),
  password: Joi.string().pattern(new RegExp('^(?=.*[._%#!-])[a-zA-Z0-9._%#!-]{6,}$')).required().messages({
    'string.pattern.base': 'format password harus berupa (a-z, A-Z, 0-9, dan spesial karakter (._%#!-))',
    'any.required': 'password harus diisi!',
  }),
  confirmPass: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.only': 'password tidak cocok',
    'any.required': 'confirmPass harus diisi!',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      'string.email': 'format email tidak valid!',
      'any.required': 'email harus diisi!',
    }),
  password: Joi.string().pattern(new RegExp('^(?=.*[._%#!-])[a-zA-Z0-9._%#!-]{6,}$')).message('format password harus berupa (a-z, A-Z, 0-9, dan spesial karakter (._%#!-))').required(),
});
