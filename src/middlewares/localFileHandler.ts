import fs from 'fs';
import path from 'path';
import { commonHandler } from '@utils';
import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { getStore } from "@netlify/blobs";
// import { redirect } from "@netlify/functions";
import { fileHandlerMessages, fileHandlerVariables } from '@constants';
import { ErrorHandler, catchHandler } from '@utils';

/**
 * Ensure the directory exists in /tmp.
 */
const ensureDirectoryExists = (dirPath: string) => {
  console.log('dirPath', dirPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Local file storage configuration.
 */
const localFileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // Create a path in /tmp for uploads
    const destinationPath = path.join('/tmp', 'uploads', 'documents');

    // Ensure the directory exists in /tmp
    ensureDirectoryExists(destinationPath);

    // Set the destination for multer to write the file
    cb(null, destinationPath);
  },
  filename: (_req, file, cb) => {
    // Generate a unique filename based on timestamp
    const fileName = `${Date.now().toString()}-${file.originalname}`;
    cb(null, fileName);
  },
});

/**
 * Middleware to handle local file upload.
 */
const localUploadMiddleware = multer({
  storage: localFileStorage,
  limits: {
    fileSize: fileHandlerVariables.FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (fileHandlerVariables.FILE_FORMATS.includes(extname.slice(1))) {
      cb(null, true);
    } else {
      cb(new Error(fileHandlerMessages.FILE_TYPE_ERROR));
    }
  },
}).fields([
  {
    name: fileHandlerVariables.FILE_UPLOAD_FIELD,
    maxCount: fileHandlerVariables.FILE_UPLOAD_LIMIT,
  },
]);

/**
 * Handles local file uploading.
 */
export const uploadFileLocal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure directory exists inside /tmp
    const destinationPath = path.join('/tmp', 'uploads', 'documents');
    console.log(destinationPath, '---------');

    await ensureDirectoryExists(destinationPath);

    const convertedFileSize = await commonHandler.convertFileSize(fileHandlerVariables.FILE_SIZE, 'Byte', 'MB');

    localUploadMiddleware(req, res, (error) => {
      if (error) {
        if (error.code === fileHandlerVariables.LIMIT_FILE_SIZE_ERROR_CODE) {
          return next(
            new ErrorHandler(
              `${error.field} ${fileHandlerMessages.FILE_SIZE_ERROR} ${convertedFileSize}MB`,
              400,
              error,
            ),
          );
        }
        if (error.code === fileHandlerVariables.ENOENT_ERROR_CODE) {
          return next(
            new ErrorHandler(
              `${fileHandlerMessages.DIRECTORY_FOUND_ERROR} ${fileHandlerVariables.UPLOAD_DIR}.`,
              400,
              error,
            ),
          );
        }
        if (error.code === fileHandlerVariables.LIMIT_UNEXPECTED_FILE_ERROR_CODE) {
          return next(
            new ErrorHandler(`${fileHandlerMessages.FILE_UPLOAD_LIMIT_ERROR} for ${error.field} `, 400, error),
          );
        }
        if (error.name === 'Error') {
          return next(new ErrorHandler(error.message, 400, error));
        }
        return next(new ErrorHandler(`${fileHandlerMessages.UPLOAD_FILE_ERROR} ${error.field}.`, 400, error));
      }
      next();
    });
  } catch (error) {
    catchHandler(error, next);
  }
};


export async function uploadEndpoint({ request }: any) {
  console.log(request,'--request');
  
  // Get form data from the request (assumes that `request` is the incoming
  // request object)
  const formData = await request.formData();
  // Get the file from the form data
  const fileUpload = formData.get("fileUpload") as File;
  // Load the Netlify Blobs store called `UserUpload`
  const userUploadStore = getStore({ name: "UserUpload", consistency: "strong" });
  // Set the file in the store. Replace `<key>` with a unique key for the file.
  const fileName = `${Date.now().toString()}.png`;
  await userUploadStore.set(fileName, fileUpload);
  // Redirect to a new page
  const userUploadBlob = await userUploadStore.get(fileName, {
    type: "stream",
  });
  console.log(userUploadBlob,'--userUploadBlob');
  
  // Make sure you throw a 404 if the blob is not found.
  if (!userUploadBlob) {
    return new Response("Upload not found", { status: 404 });
  }
  // Return the blob
  return new Response(userUploadBlob);
  return 'success';
}


// export async function uploadEndpoint() {
//   // Load the Netlify Blobs store called `UserUpload`
//   const userUploadStore = getStore({ name: "UserUpload", consistency: "strong" });
//   // Get the blob from the store. Replace `<key>` with the unique key used when
//   // uploading.
//   const userUploadBlob = await userUploadStore.get("<key>", {
//     type: "stream",
//   });
//   // Make sure you throw a 404 if the blob is not found.
//   if (!userUploadBlob) {
//     return new Response("Upload not found", { status: 404 });
//   }
//   // Return the blob
//   return new Response(userUploadBlob);
// }