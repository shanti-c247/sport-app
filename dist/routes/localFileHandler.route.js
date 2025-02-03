"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const router = express_1.default.Router();
// Apply the authentication middleware to all routes in this group
router.get('/:fileId', _controllers_1.localFileHandlerController.fetchLocalFile);
router.post('/', _middlewares_1.authenticate, _middlewares_1.uploadFileLocal, _controllers_1.localFileHandlerController.localFileUpload);
router.patch('/:fileId', _middlewares_1.authenticate, _middlewares_1.uploadFileLocal, _controllers_1.localFileHandlerController.localFileUploadUpdate);
router.delete('/:fileId', _middlewares_1.authenticate, _controllers_1.localFileHandlerController.localFileUploadDelete);
router.get('/', _controllers_1.localFileHandlerController.fetchLocalFileList);
exports.default = router;
//# sourceMappingURL=localFileHandler.route.js.map