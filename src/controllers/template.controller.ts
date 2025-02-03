//Third-party modules
import type { NextFunction, Request, Response } from 'express';

//Middlewares
import { responseHandler } from '@middlewares';

//Utils
import { ErrorHandler, catchHandler } from '@utils';

//Services
import { templateService } from '@services';

/**
 * Handles creating a new template
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createTeamplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { htmlContent, cssContent } = req.body;
        const { status, success, message, data } = await templateService.createTeamplate(htmlContent, cssContent);
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
 * Handles deleting a template based on the provided template ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteTeamplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { templateId } = req.params;
        const { status, success, message, data } = await templateService.deleteTeamplate(templateId);

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
 * Controller to handle updating a template's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateTeamplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { templateId } = req.params;
        const { htmlContent, cssContent } = req.body;
        const { status, success, message, data } = await templateService.updateTeamplate(templateId, htmlContent, cssContent);

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
 * Handles retrieving templates.
 * If a templateId is provided, fetch that specific template; otherwise, fetch all templates.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getTeamplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { templateId } = req.params;
        const { page, limit, search, sortBy, orderBy } = req.query;
        const { status, success, message, data } = await templateService.getTeamplates(
            templateId,
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