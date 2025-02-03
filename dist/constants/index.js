"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailMessages = exports.commonMessages = exports.eventMessages = exports.fileHandlerMessages = exports.userMessages = exports.eventVariables = exports.emailVariables = exports.commonVariables = exports.authVariables = exports.localFileHandlerVariables = exports.fileHandlerVariables = exports.userVariables = void 0;
// Auto-generated imports
__exportStar(require("./emailTemplate.constant"), exports);
var variables_1 = require("./variables");
Object.defineProperty(exports, "userVariables", { enumerable: true, get: function () { return variables_1.userVariables; } });
Object.defineProperty(exports, "fileHandlerVariables", { enumerable: true, get: function () { return variables_1.fileHandlerVariables; } });
Object.defineProperty(exports, "localFileHandlerVariables", { enumerable: true, get: function () { return variables_1.localFileHandlerVariables; } });
Object.defineProperty(exports, "authVariables", { enumerable: true, get: function () { return variables_1.authVariables; } });
Object.defineProperty(exports, "commonVariables", { enumerable: true, get: function () { return variables_1.commonVariables; } });
Object.defineProperty(exports, "emailVariables", { enumerable: true, get: function () { return variables_1.emailVariables; } });
Object.defineProperty(exports, "eventVariables", { enumerable: true, get: function () { return variables_1.eventVariables; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "userMessages", { enumerable: true, get: function () { return messages_1.userMessages; } });
Object.defineProperty(exports, "fileHandlerMessages", { enumerable: true, get: function () { return messages_1.fileHandlerMessages; } });
Object.defineProperty(exports, "eventMessages", { enumerable: true, get: function () { return messages_1.eventMessages; } });
Object.defineProperty(exports, "commonMessages", { enumerable: true, get: function () { return messages_1.commonMessages; } });
Object.defineProperty(exports, "emailMessages", { enumerable: true, get: function () { return messages_1.emailMessages; } });
__exportStar(require("./statusCode"), exports);
__exportStar(require("./emailTemplate.constant"), exports);
//# sourceMappingURL=index.js.map