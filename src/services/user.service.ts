
//Constants
import { BAD_REQUEST, CONFLICT, CREATED, NO_CONTENT, OK, commonMessages, userMessages } from '@constants';
// NotificationPriority, NotificationType,
import { Role, UserStatus } from '@enums';

//Types
import type { UnifiedUserServiceResponse } from '@customTypes';
import { User } from '@models';
import { userCommonService } from '@services';
import { paginationHandler, userHandler } from '@utils';

/**
 * Handles user creation
 * @param {Request} req Express request object
 * @returns {Promise<CreateUserResponse>} Response containing the created user or error information
 */
export const createUser = async (name: string, email: string, dob: string, description: string, picture: string): Promise<UnifiedUserServiceResponse> => {
  if (await userCommonService.checkIfUserExists(email)) {
    return {
      status: CONFLICT,
      success: false,
      message: commonMessages.USER_ALREADY_EXISTS,
      data: null,
    };
  };
  const dateOfBirth = userHandler.convertToDate(dob)  // Convert the string to Date object
  const newUser = new User({
    name,
    email,
    status: UserStatus.Active,
    dateOfBirth,
    description,
    picture
  });
  const createdUser = await newUser.save();
  return {
    status: CREATED,
    success: true,
    message: userMessages.USER_CREATED_AND_EMAIL_SENT,
    data: createdUser,
  };
};

/**
 * Retrieves users from the database.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req Express request object
 * @returns {Promise<GetUsersResponse>} Response containing the user(s) or error information
 */
export const getUsers = async (
  userId: string,
  pageNumber: number,
  pageSize: number,
  search: string | any,
  sortBy: string | any, // -1 , 1,
  orderBy: string | any,
): Promise<UnifiedUserServiceResponse> => {
  if (userId) {
    const user = await userCommonService.getUserById(userId);
    return {
      status: user ? OK : BAD_REQUEST,
      success: Boolean(user),
      message: user ? userMessages.USER_FETCH_SUCCESS : commonMessages.USER_NOT_FOUND,
      data: user || null,
    };
  }
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
  const filter: Record<string, any> = {
    status: UserStatus.Active,
    role: Role.User,
    isDeleted: false
  };
  if (search) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    filter['name'] = { $regex: search, $options: 'i' };
  }
  const users = await userCommonService.getAllUsers(limit, offset, filter, sort);
  // Fetch total count for pagination metadata
  const total = await User.countDocuments({
    role: Role.User,
    status: UserStatus.Active,
    isDeleted: false
  });
  return {
    status: OK,
    success: true,
    message: userMessages.USERS_FETCH_SUCCESS,
    data: { total: total, users: users },
  };
};

/**
 * Deletes a user from the database based on the provided user ID.
 * @param {Request} req Express request object
 * @returns {Promise<DeleteUserResponse>} Response containing the deletion result or error information
 */
export const deleteUser = async (userId: string): Promise<UnifiedUserServiceResponse> => {
  const user = await User.findByIdAndDelete(userId);
  return {
    status: user ? NO_CONTENT : BAD_REQUEST,
    success: !!user,
    message: user ? userMessages.USER_DELETE_SUCCESS : commonMessages.USER_NOT_FOUND,
    data: null,
  };
};

/**
 * Service to update a user's information (name, email, role, status only)
 * @param {Request} req Express request object
 * @returns {Promise<UpdateUserResponse>} Response containing the updated user or error information
 */
export const updateUser = async (
  userId: string,
  name: string,
  email: string,
  role: number,
  dob: string,
  description: string,
  picture: string
): Promise<UnifiedUserServiceResponse> => {
  const user = await userCommonService.getUserById(userId);
  if (!user)
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.USER_NOT_FOUND,
      data: null,
    };

  if (email && email !== user.email && (await userCommonService.checkIfUserExists(email)))
    return {
      status: CONFLICT,
      success: false,
      message: commonMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      data: null,
    };
  const dateOfBirth = dob ? userHandler.convertToDate(dob) : user.dateOfBirth // Convert the string to Date object
  Object.assign(user, {
    name: name || user.name,
    email: email || user.email,
    role: role || user.role,
    dateOfBirth: dateOfBirth || user.dateOfBirth,
    description: description || user.description,
    picture: picture || user.picture,

  });
  const updatedUser = await user.save();

  return {
    status: OK,
    success: true,
    message: userMessages.USER_UPDATED_SUCCESS,
    data: updatedUser,
  };
};

