"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonHandler = void 0;
// Utils
const _utils_1 = require("@utils");
Object.defineProperty(exports, "commonHandler", { enumerable: true, get: function () { return _utils_1.commonHandler; } });
// Constants
const _constants_1 = require("@constants");
const initializeImports = () => __awaiter(void 0, void 0, void 0, function* () {
    const imports = yield Promise.all([
        _utils_1.commonHandler.conditionalImport("src/docs/user", "../docs/user/schemas"),
        _utils_1.commonHandler.conditionalImport("src/docs/user", "../docs/user/responses"),
        _utils_1.commonHandler.conditionalImport("src/docs/localFileHandler", "../docs/localFileHandler/schemas"),
        _utils_1.commonHandler.conditionalImport("src/docs/localFileHandler", "../docs/localFileHandler/responses"),
        _utils_1.commonHandler.conditionalImport('src/docs/auth', '../docs/auth/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/auth', '../docs/auth/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/event', '../docs/event/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/event', '../docs/event/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/template', '../docs/template/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/template', '../docs/template/responses'),
        _utils_1.commonHandler.conditionalImport('src/docs/templateB', '../docs/templateB/schemas'),
        _utils_1.commonHandler.conditionalImport('src/docs/templateB', '../docs/templateB/responses'),
    ]);
    const [userSchemas, userResponses, localFileHandlerSchemas, localFileHandlerResponses, authSchemas, authResponses, eventSchemas, eventResponses, templateSchemas, templateResponses, templateBSchemas, templateBResponses,] = imports;
    const swaggerOptions = _utils_1.swaggerHandler.createSwaggerConfig({
        routes: [
            _constants_1.userVariables.USER_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.localFileHandlerVariables.LOCALFILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.userVariables.AUTH_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.eventVariables.EVENT_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.templateVariables.TEAMPLATE_MODULE_SWAGGER_OPERATIONS_PATH,
            _constants_1.templateBVariables.TEAMPLATE_B_MODULE_SWAGGER_OPERATIONS_PATH
        ],
        additionalSchemas: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, userSchemas.default), localFileHandlerSchemas.default), authSchemas.default), eventSchemas.default), templateSchemas.default), templateBSchemas.default),
        additionalResponses: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, userResponses.default), localFileHandlerResponses.default), authResponses.default), eventResponses.default), templateResponses.default), templateBResponses.default),
    });
    return swaggerOptions;
});
exports.default = initializeImports();
//# sourceMappingURL=index.js.map