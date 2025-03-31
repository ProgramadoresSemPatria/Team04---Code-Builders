import { Router } from 'express';
import { signUpSchema } from '../validations/signup-schemas';
import { validate } from '../../../common/middlewares/validation-middleware';
import { makeAuthController } from '../../../common/factories/auth-controller-factory';
import { loginSchema } from '../validations/login-schemas';

const authController = makeAuthController();

export default (router: Router): void => {
  router.post('/signup', validate(signUpSchema), (req, res, next) =>
    authController.signUp(req, res, next)
  );
  router.post('/login', validate(loginSchema), (req, res, next) =>
    authController.login(req, res, next)
  );
};
