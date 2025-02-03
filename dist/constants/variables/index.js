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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateBVariables = exports.templateVariables = exports.eventVariables = exports.authVariables = exports.commonVariables = exports.fileHandlerVariables = exports.localFileHandlerVariables = exports.emailVariables = exports.userVariables = void 0;
// Auto-generated imports
exports.userVariables = __importStar(require("./user.variables"));
exports.emailVariables = __importStar(require("./email.variables"));
exports.localFileHandlerVariables = __importStar(require("./localFileHandler.variables"));
exports.fileHandlerVariables = __importStar(require("./fileHandler.variables"));
exports.commonVariables = __importStar(require("./common.variables"));
exports.authVariables = __importStar(require("./auth.variables"));
exports.eventVariables = __importStar(require("./event.variables"));
exports.templateVariables = __importStar(require("./teamplate.variables"));
exports.templateBVariables = __importStar(require("./teamplateB.variables"));
//# sourceMappingURL=index.js.map