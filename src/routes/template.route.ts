//Controllers
import { templateController } from '@controllers';
//Enums
import { authenticate, validate } from '@middlewares';
//Validations
import { templateValidations } from '@validations';
//Third-party modules
import { Router } from 'express';

const router = Router();

router.post(
    '/',
    authenticate,
    // validate(templateValidations.createTeamplateValidationSchema),
    templateController.createTeamplate,
);
router.get('/:templateId?', templateController.getTeamplates);
router.delete('/:templateId', authenticate, templateController.deleteTeamplate);
router.put(
    '/:templateId',
    authenticate,
    validate(templateValidations.createTeamplateValidationSchema),
    templateController.updateTeamplate,
);

export default router;
