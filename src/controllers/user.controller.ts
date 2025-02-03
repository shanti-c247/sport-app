//Third-party modules
import type { NextFunction, Request, Response } from 'express';

//Middlewares
import { responseHandler } from '@middlewares';

//Utils
import { ErrorHandler, catchHandler } from '@utils';

import { FORBIDDEN, userMessages } from '@constants';
//Services
import { userService } from '@services';

/**
 * Handles creating a new user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, dateOfBirth, description, picture } = req.body;
    const { status, success, message, data } = await userService.createUser(name, email, dateOfBirth, description, picture);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles deleting a user based on the provided user ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    if (userId === req?.user?.id.toString()) {
      next(new ErrorHandler(userMessages.SELF_DELETE_ERROR_MESSAGE, FORBIDDEN, null));
    }
    const { status, success, message, data } = await userService.deleteUser(userId);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Controller to handle updating a user's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const { name, email, role, dateOfBirth, description, picture } = req.body;
    const { status, success, message, data } = await userService.updateUser(userId, name, email, role, dateOfBirth, description, picture);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles retrieving users.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const { page, limit, search, sortBy, orderBy } = req.query;
    const { status, success, message, data } = await userService.getUsers(
      userId,
      Number(page),
      Number(limit),
      search,
      sortBy,
      orderBy,
    );
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};