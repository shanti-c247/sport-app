"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const localFileHandler_route_1 = __importDefault(require("./localFileHandler.route"));
const event_route_1 = __importDefault(require("./event.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const template_route_1 = __importDefault(require("./template.route"));
const templateB_route_1 = __importDefault(require("./templateB.route"));
const indexRoute = express_1.default.Router();
indexRoute.use('/auth', auth_route_1.default);
indexRoute.use('/user', user_route_1.default);
indexRoute.use('/local-files', localFileHandler_route_1.default);
indexRoute.use('/events', event_route_1.default);
indexRoute.use('/template', template_route_1.default);
indexRoute.use('/template-b', templateB_route_1.default);
exports.default = indexRoute;
//# sourceMappingURL=apiRoute.js.map