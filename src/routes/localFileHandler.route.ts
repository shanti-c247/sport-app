import express from 'express';

import { localFileHandlerController } from '@controllers';
import { authenticate, uploadFileLocal } from '@middlewares';

const router = express.Router();

// Apply the authentication middleware to all routes in this group
router.get('/:fileId', localFileHandlerController.fetchLocalFile);
router.post('/', authenticate, uploadFileLocal, localFileHandlerController.localFileUpload);
router.patch('/:fileId', authenticate, uploadFileLocal, localFileHandlerController.localFileUploadUpdate);
router.delete('/:fileId', authenticate, localFileHandlerController.localFileUploadDelete);
router.get('/', localFileHandlerController.fetchLocalFileList);


export default router;
