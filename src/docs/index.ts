
// Utils
import { commonHandler, swaggerHandler } from '@utils';

// Constants
import { userVariables, localFileHandlerVariables, eventVariables, templateVariables, templateBVariables } from '@constants';

// Types
import type { ImportedModule } from '@customTypes';

const initializeImports = async () => {
  const imports: ImportedModule[] = await Promise.all([
    commonHandler.conditionalImport<ImportedModule>("src/docs/user", "../docs/user/schemas"),
    commonHandler.conditionalImport<ImportedModule>("src/docs/user", "../docs/user/responses"),
    commonHandler.conditionalImport<ImportedModule>("src/docs/localFileHandler", "../docs/localFileHandler/schemas"),
    commonHandler.conditionalImport<ImportedModule>("src/docs/localFileHandler", "../docs/localFileHandler/responses"),
    commonHandler.conditionalImport<ImportedModule>('src/docs/auth', '../docs/auth/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/auth', '../docs/auth/responses'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/event', '../docs/event/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/event', '../docs/event/responses'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/template', '../docs/template/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/template', '../docs/template/responses'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/templateB', '../docs/templateB/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/templateB', '../docs/templateB/responses'),
  ]);

  const [
    userSchemas, userResponses,
    localFileHandlerSchemas, localFileHandlerResponses,
    authSchemas,
    authResponses,
    eventSchemas,
    eventResponses,
    templateSchemas,
    templateResponses,
    templateBSchemas,
    templateBResponses,
  ]: ImportedModule[] = imports;

  const swaggerOptions = swaggerHandler.createSwaggerConfig({
    routes: [
      userVariables.USER_MODULE_SWAGGER_OPERATIONS_PATH,
      localFileHandlerVariables.LOCALFILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH,
      userVariables.AUTH_MODULE_SWAGGER_OPERATIONS_PATH,
      eventVariables.EVENT_MODULE_SWAGGER_OPERATIONS_PATH,
      templateVariables.TEAMPLATE_MODULE_SWAGGER_OPERATIONS_PATH,
      templateBVariables.TEAMPLATE_B_MODULE_SWAGGER_OPERATIONS_PATH
    ],
    additionalSchemas: {
      ...userSchemas.default,
      ...localFileHandlerSchemas.default,
      ...authSchemas.default,
      ...eventSchemas.default,
      ...templateSchemas.default,
      ...templateBSchemas.default,
    },
    additionalResponses: {
      ...userResponses.default,
      ...localFileHandlerResponses.default,
      ...authResponses.default,
      ...eventResponses.default,
      ...templateResponses.default,
      ...templateBResponses.default,

    },
  });

  return swaggerOptions;
};

export default initializeImports();

export { commonHandler };
