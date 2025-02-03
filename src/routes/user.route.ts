//Controllers
import { userController } from '@controllers';
//Enums
import { Role } from '@enums';
//Middlewares
import { authenticate, authorize, validate } from '@middlewares';
//Validations
import { userValidations } from '@validations';
//Third-party modules
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(Role.Admin),
  validate(userValidations.createUserSchema),
  userController.createUser,
);
router.get('/:userId?', userController.getUsers);
router.delete('/:userId', authenticate, authorize(Role.Admin), userController.deleteUser);
router.put(
  '/:userId',
  authenticate,
  authorize(Role.Admin),
  validate(userValidations.updateUserSchema),
  userController.updateUser,
);

export default router;
