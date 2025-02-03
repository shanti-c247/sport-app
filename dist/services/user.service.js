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
exports.updateUser = exports.deleteUser = exports.getUsers = exports.createUser = void 0;
//Constants
const _constants_1 = require("@constants");
// NotificationPriority, NotificationType,
const _enums_1 = require("@enums");
const _models_1 = require("@models");
const _services_1 = require("@services");
const _utils_1 = require("@utils");
/**
 * Handles user creation
 * @param {Request} req Express request object
 * @returns {Promise<CreateUserResponse>} Response containing the created user or error information
 */
const createUser = (name, email, dob, description, picture) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield _services_1.userCommonService.checkIfUserExists(email)) {
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_ALREADY_EXISTS,
            data: null,
        };
    }
    ;
    const dateOfBirth = _utils_1.userHandler.convertToDate(dob); // Convert the string to Date object
    const newUser = new _models_1.User({
        name,
        email,
        status: _enums_1.UserStatus.Active,
        dateOfBirth,
        description,
        picture
    });
    console.log(newUser);
    const createdUser = yield newUser.save();
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.userMessages.USER_CREATED_AND_EMAIL_SENT,
        data: createdUser,
    };
});
exports.createUser = createUser;
/**
 * Retrieves users from the database.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req Express request object
 * @returns {Promise<GetUsersResponse>} Response containing the user(s) or error information
 */
const getUsers = (userId, pageNumber, pageSize, search, sortBy, // -1 , 1,
orderBy) => __awaiter(void 0, void 0, void 0, function* () {
    if (userId) {
        const user = yield _services_1.userCommonService.getUserById(userId);
        return {
            status: user ? _constants_1.OK : _constants_1.BAD_REQUEST,
            success: Boolean(user),
            message: user ? _constants_1.userMessages.USER_FETCH_SUCCESS : _constants_1.commonMessages.USER_NOT_FOUND,
            data: user || null,
        };
    }
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
    const filter = {
        status: _enums_1.UserStatus.Active,
        role: _enums_1.Role.User,
    };
    if (search) {
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        filter['name'] = { $regex: search, $options: 'i' };
    }
    const users = yield _services_1.userCommonService.getAllUsers(limit, offset, filter, sort);
    // Fetch total count for pagination metadata
    const total = yield _models_1.User.countDocuments({ role: _enums_1.Role.User });
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.userMessages.USERS_FETCH_SUCCESS,
        data: { total: total, users: users },
    };
});
exports.getUsers = getUsers;
/**
 * Deletes a user from the database based on the provided user ID.
 * @param {Request} req Express request object
 * @returns {Promise<DeleteUserResponse>} Response containing the deletion result or error information
 */
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _models_1.User.findByIdAndDelete(userId);
    return {
        status: user ? _constants_1.NO_CONTENT : _constants_1.BAD_REQUEST,
        success: !!user,
        message: user ? _constants_1.userMessages.USER_DELETE_SUCCESS : _constants_1.commonMessages.USER_NOT_FOUND,
        data: null,
    };
});
exports.deleteUser = deleteUser;
/**
 * Service to update a user's information (name, email, role, status only)
 * @param {Request} req Express request object
 * @returns {Promise<UpdateUserResponse>} Response containing the updated user or error information
 */
const updateUser = (userId, name, email, role, dob, description, picture) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _services_1.userCommonService.getUserById(userId);
    if (!user)
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.USER_NOT_FOUND,
            data: null,
        };
    if (email && email !== user.email && (yield _services_1.userCommonService.checkIfUserExists(email)))
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
            data: null,
        };
    const dateOfBirth = dob ? _utils_1.userHandler.convertToDate(dob) : user.dateOfBirth; // Convert the string to Date object
    Object.assign(user, {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
        dateOfBirth: dateOfBirth || user.dateOfBirth,
        description: description || user.description,
        picture: picture || user.picture,
    });
    const updatedUser = yield user.save();
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.userMessages.USER_UPDATED_SUCCESS,
        data: updatedUser,
    };
});
exports.updateUser = updateUser;
//# sourceMappingURL=user.service.js.map