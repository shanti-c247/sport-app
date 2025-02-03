import { fileHandler } from '@utils';

const localFileHandlerSchemas = {
  LocalFile: {
    type: 'object',
    properties: fileHandler.fileHandlerRandomData('fileSchema'),
  },

  // Upload File Request
  LocalUploadFileRequest: {
    type: 'object',
    required: ['fileUpload'],
    properties: fileHandler.fileHandlerRandomData('fileUploadSchema'),
  },
  UpdateLocalUploadFileRequest: {
    type: 'object',
    properties: fileHandler.fileHandlerRandomData('updateLocalUploadFileRequest'),
  },
};
export default localFileHandlerSchemas;
