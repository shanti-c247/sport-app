//Third-party modules
import type { NextFunction, Request, Response } from 'express';
import { responseHandler } from '@middlewares';
//Services
import { authService } from '@services';
//Utils
import { ErrorHandler, catchHandler } from '@utils';

/**
 * Handles registering a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await authService.register(req.body.name, req.body.email, req.body.password);
        const { success, message, status, data } = response;
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
 * Handles login a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = req.body;
        const response = await authService.login(req.body.email, req.body.password, res);
        const { success, message, status, data } = response;
        if (success) {
            responseHandler(res, message, status, data);
        } else {
            next(new ErrorHandler(message, status, data));
        }
    } catch (error) {
        catchHandler(error, next);
    }
};



