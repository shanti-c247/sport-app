import { BAD_REQUEST, CREATED, NOT_FOUND, OK, fileHandlerMessages } from '@constants';
import type { IApiResponse, IFileUploadType, IUser } from '@customTypes';
import { File } from '@models';
import { paginationHandler } from '@utils';
import { Types } from 'mongoose';

/**
 * Get particular file from the database with storage type.
 * @param {string} fileId - Id of the file to fetch
 * @returns {IApiResponse} Response containing the file and error information
 */
export const fetchLocalFile = async (fileId: string): Promise<IApiResponse> => {
  if (!fileId) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECT_FILE_ERROR,
      data: null,
    };
  }
  const fileData = await File.findById(new Types.ObjectId(fileId));

  if (!fileData)
    return {
      status: NOT_FOUND,
      success: false,
      message: fileHandlerMessages.FILES_NOT_FOUND,
      data: null,
    };
  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
    data: fileData,
  };
};

/**
 * Retrieves files from the database.
 * If a FileId is provided, fetch that specific user; otherwise, fetch all files.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the user(s) or error information
 */
export const getFiles = async (
  pageNumber: number,
  pageSize: number,
  sortBy: string | any, // -1 , 1,
  orderBy: string | any,
): Promise<IApiResponse> => {

  // get pagination for manage pagination records
  const { limit, offset } = paginationHandler.getPagination(pageNumber, pageSize);
  /**
   * Manage sorting and pagination
   */
  // /sort_by = createdAt
  // order = asc || desc
  let sort: Record<string, any> = { createdAt: -1 };
  const order = orderBy ? orderBy : 'createdAt';
  if (sortBy || order) {
    orderBy = orderBy === 'asc' ? 1 : -1;
    sort = { [sortBy]: orderBy };
  }

  // return await User.find(filter).sort(sort).skip(offset).limit(limit);
  const files = await File.aggregate([
    { $sort: sort }, // Apply sorting
    { $skip: offset }, // Apply offset for pagination
    { $limit: limit }, // Apply limit for pagination
    { $addFields: { id: '$_id' } }, // Add id field
  ]);
  // Fetch total count for pagination metadata
  const total = await File.countDocuments({ isDeleted: false });
  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILE_FETCH_SUCCESS,
    data: { total: total, files: files },
  };
};


/**
 * Retrieves files from the database with pagination, sorting, and ordering.
 * @param {number} pageNumber - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [sortBy='createdAt'] - The field to sort by.
 * @param {string} [orderBy='desc'] - The order of sorting (asc or desc).
 * @returns {Promise<IApiResponse>} - The response containing the files or error information.
 */
export const getFilesWithPagination = async (
  pageNumber: number,
  pageSize: number,
  sortBy: string,
  orderBy: string
): Promise<IApiResponse> => {
  // Get pagination details
  const { limit, offset } = paginationHandler.getPagination(pageNumber, pageSize);

  // Determine sorting order
  const sortOrder = orderBy === 'asc' ? 1 : -1;
  const sort: any = { [sortBy ? sortBy : 'createdAt']: sortOrder };

  // Aggregate query with pagination and sorting
  const files = await File.aggregate([
    { $sort: sort },
    { $skip: offset },
    { $limit: limit }
  ]);

  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
    data: files,
  };


};

/**
 * Store local file path of user in database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
export const localFileUpload = async (user: IUser, files: IFileUploadType): Promise<IApiResponse> => {
  const uploadedFiles: string[] = [];
  if (files) {
    if (files?.fileUpload) {
      files.fileUpload.forEach((file: { path: string }) => uploadedFiles.push(file.path));
    }
  }

  if (uploadedFiles.length === 0) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECTED_FILE_ERROR,
      data: null,
    };
  }

  const result = await File.create({
    userId: user.id,
    path: uploadedFiles,
  });

  return {
    status: CREATED,
    success: true,
    message: fileHandlerMessages.FILES_UPLOAD_SUCCESS,
    data: result,
  };
};
/**
 * Delete a file from the database using the file ID.
 * @param {string} fileId - Id of the file to delete
 * @returns {IApiResponse} Response containing the status of the deletion
 */
export const deleteLocalFile = async (fileId: string): Promise<IApiResponse> => {
  if (!fileId) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECT_FILE_ERROR,
      data: null,
    };
  }
  const fileData = await File.findByIdAndDelete(new Types.ObjectId(fileId));
  if (!fileData) {
    return {
      status: NOT_FOUND,
      success: false,
      message: fileHandlerMessages.FILES_NOT_FOUND,
      data: null,
    };
  }

  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.DELETE_UPLOADED_FILE,
    data: null,
  };
};

/**
 * Update an existing uploaded file in the database using the file ID.
 * @param {string} fileId - Id of the file to update
 * @param {IFileUploadType} files - New file data to update
 * @returns {IApiResponse} Response containing the status of the update
 */
export const updateLocalFile = async (fileId: string, files: IFileUploadType): Promise<IApiResponse> => {
  if (!fileId) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECT_FILE_ERROR,
      data: null,
    };
  }

  const uploadedFiles: string[] = [];
  if (files) {
    if (files?.fileUpload) {
      files.fileUpload.forEach((file: { path: string }) => uploadedFiles.push(file.path));
    }
  }

  if (uploadedFiles.length === 0) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: fileHandlerMessages.SELECTED_FILE_ERROR,
      data: null,
    };
  }

  const fileData = await File.findByIdAndUpdate(
    new Types.ObjectId(fileId),
    { path: uploadedFiles },
    { new: true }
  );

  if (!fileData) {
    return {
      status: NOT_FOUND,
      success: false,
      message: fileHandlerMessages.FILES_NOT_FOUND,
      data: null,
    };
  }

  return {
    status: OK,
    success: true,
    message: fileHandlerMessages.FILES_UPLOAD_SUCCESS,
    data: fileData,
  };
};
