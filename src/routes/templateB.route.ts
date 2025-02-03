//Controllers
import { templateBController } from '@controllers';
//Enums
import { authenticate, validate } from '@middlewares';
//Validations
import { templateBValidations } from '@validations';
//Third-party modules
import { Router } from 'express';

const router = Router();

router.post(
    '/',
    // validate(templateBValidations.mainValidationSchema),
    templateBController.createTemplateB,
);
router.get('/:templateId?', templateBController.getTemplateBs);
router.delete('/:templateId', authenticate, templateBController.deleteTemplateB);
router.put(
    '/:templateId',
    authenticate,
    validate(templateBValidations.mainValidationSchema),
    templateBController.updateTemplateB,
);

export default router;
