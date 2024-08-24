import * as Joi from 'joi';
import { UserTypes } from 'src/user/enum/user.enum';

export class AuthRequestDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userType?: UserTypes;
  status?: string;
  role?: string;
  token?: string;
}

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  userType: Joi.string().default('USER').allow('USER', 'ADMIN'),
  password: Joi.string()
    .min(8)
    // .pattern(
    //   new RegExp(
    //     '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%^&*()_+>\\\\<\\?£-])[\\w!@#\\$%^&*()_+>\\\\<\\?£-]{8,}$',
    //   ),
    // )
    .messages({
      'string.pattern.base':
        'Password strength weak. please include symbol(s) and number(s)',
    })
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'password do not match',
  }),
});
