//Third-party modules
import type { NextFunction, Request, Response } from 'express';

//Middlewares
import { responseHandler } from '@middlewares';

//Utils
import { ErrorHandler, catchHandler } from '@utils';

//Services
import { templateBService } from '@services';

/**
 * Handles creating a new templateB
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createTemplateB = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body,'--req.body');
        
        const { 
            slider,
            bio,
            event} = req.body;

        const { status, success, message, data } = await templateBService.createTemplateB(slider,
            bio,
            event,);
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
 * Handles deleting a templateB based on the provided templateB ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteTemplateB = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { templateBId } = req.params;
        const { status, success, message, data } = await templateBService.deleteTemplateB(templateBId);

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
 * Controller to handle updating a templateB's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateTemplateB = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { templateBId } = req.params;
        const { slider,
            bio,
            event, } = req.body;
        const { status, success, message, data } = await templateBService.updateTemplateB(templateBId, slider,
            bio,
            event,);

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
 * Handles retrieving templateBs.
 * If a templateBId is provided, fetch that specific templateB; otherwise, fetch all templateBs.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getTemplateBs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { templateBId } = req.params;
        const { page, limit, search, sortBy, orderBy } = req.query;
        const { status, success, message, data } = await templateBService.getTemplateBs(
            templateBId,
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