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
exports.updateLocalFile = exports.deleteLocalFile = exports.localFileUpload = exports.getFilesWithPagination = exports.getFiles = exports.fetchLocalFile = void 0;
const _constants_1 = require("@constants");
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const mongoose_1 = require("mongoose");
/**
 * Get particular file from the database with storage type.
 * @param {string} fileId - Id of the file to fetch
 * @returns {IApiResponse} Response containing the file and error information
 */
const fetchLocalFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fileId) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECT_FILE_ERROR,
            data: null,
        };
    }
    const fileData = yield _models_1.File.findById(new mongoose_1.Types.ObjectId(fileId));
    if (!fileData)
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.fileHandlerMessages.FILES_NOT_FOUND,
            data: null,
        };
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
        data: fileData,
    };
});
exports.fetchLocalFile = fetchLocalFile;
/**
 * Retrieves files from the database.
 * If a FileId is provided, fetch that specific user; otherwise, fetch all files.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the user(s) or error information
 */
const getFiles = (pageNumber, pageSize, sortBy, // -1 , 1,
orderBy) => __awaiter(void 0, void 0, void 0, function* () {
    // get pagination for manage pagination records
    const { limit, offset } = _utils_1.paginationHandler.getPagination(pageNumber, pageSize);
    /**
     * Manage sorting and pagination
     */
    // /sort_by = createdAt
    // order = asc || desc
    let sort = { createdAt: -1 };
    const order = orderBy ? orderBy : 'createdAt';
    if (sortBy || order) {
        orderBy = orderBy === 'asc' ? 1 : -1;
        sort = { [sortBy]: orderBy };
    }
    // return await User.find(filter).sort(sort).skip(offset).limit(limit);
    const files = yield _models_1.File.aggregate([
        { $sort: sort }, // Apply sorting
        { $skip: offset }, // Apply offset for pagination
        { $limit: limit }, // Apply limit for pagination
        { $addFields: { id: '$_id' } }, // Add id field
    ]);
    // Fetch total count for pagination metadata
    const total = yield _models_1.File.countDocuments({ isDeleted: false });
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILE_FETCH_SUCCESS,
        data: { total: total, files: files },
    };
});
exports.getFiles = getFiles;
/**
 * Retrieves files from the database with pagination, sorting, and ordering.
 * @param {number} pageNumber - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [sortBy='createdAt'] - The field to sort by.
 * @param {string} [orderBy='desc'] - The order of sorting (asc or desc).
 * @returns {Promise<IApiResponse>} - The response containing the files or error information.
 */
const getFilesWithPagination = (pageNumber, pageSize, sortBy, orderBy) => __awaiter(void 0, void 0, void 0, function* () {
    // Get pagination details
    const { limit, offset } = _utils_1.paginationHandler.getPagination(pageNumber, pageSize);
    // Determine sorting order
    const sortOrder = orderBy === 'asc' ? 1 : -1;
    const sort = { [sortBy ? sortBy : 'createdAt']: sortOrder };
    // Aggregate query with pagination and sorting
    const files = yield _models_1.File.aggregate([
        { $sort: sort },
        { $skip: offset },
        { $limit: limit }
    ]);
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILE_DETAIL_GET_SUCCESS,
        data: files,
    };
});
exports.getFilesWithPagination = getFilesWithPagination;
/**
 * Store local file path of user in database.
 * @param {Request} req Express request object
 * @returns {IApiResponse} Response containing the files and user detail or error information
 */
const localFileUpload = (user, files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = [];
    if (files) {
        if (files === null || files === void 0 ? void 0 : files.fileUpload) {
            files.fileUpload.forEach((file) => uploadedFiles.push(file.path));
        }
    }
    if (uploadedFiles.length === 0) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECTED_FILE_ERROR,
            data: null,
        };
    }
    const result = yield _models_1.File.create({
        userId: user.id,
        path: uploadedFiles,
    });
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.fileHandlerMessages.FILES_UPLOAD_SUCCESS,
        data: result,
    };
});
exports.localFileUpload = localFileUpload;
/**
 * Delete a file from the database using the file ID.
 * @param {string} fileId - Id of the file to delete
 * @returns {IApiResponse} Response containing the status of the deletion
 */
const deleteLocalFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fileId) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECT_FILE_ERROR,
            data: null,
        };
    }
    const fileData = yield _models_1.File.findByIdAndDelete(new mongoose_1.Types.ObjectId(fileId));
    if (!fileData) {
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.fileHandlerMessages.FILES_NOT_FOUND,
            data: null,
        };
    }
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.DELETE_UPLOADED_FILE,
        data: null,
    };
});
exports.deleteLocalFile = deleteLocalFile;
/**
 * Update an existing uploaded file in the database using the file ID.
 * @param {string} fileId - Id of the file to update
 * @param {IFileUploadType} files - New file data to update
 * @returns {IApiResponse} Response containing the status of the update
 */
const updateLocalFile = (fileId, files) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fileId) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECT_FILE_ERROR,
            data: null,
        };
    }
    const uploadedFiles = [];
    if (files) {
        if (files === null || files === void 0 ? void 0 : files.fileUpload) {
            files.fileUpload.forEach((file) => uploadedFiles.push(file.path));
        }
    }
    if (uploadedFiles.length === 0) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.fileHandlerMessages.SELECTED_FILE_ERROR,
            data: null,
        };
    }
    const fileData = yield _models_1.File.findByIdAndUpdate(new mongoose_1.Types.ObjectId(fileId), { path: uploadedFiles }, { new: true });
    if (!fileData) {
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.fileHandlerMessages.FILES_NOT_FOUND,
            data: null,
        };
    }
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.fileHandlerMessages.FILES_UPLOAD_SUCCESS,
        data: fileData,
    };
});
exports.updateLocalFile = updateLocalFile;
//# sourceMappingURL=localFileHandler.service.js.map