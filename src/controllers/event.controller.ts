// Constants
// Middlewares
import { commonMessages, UNAUTHORIZE } from '@constants';
import { responseHandler } from '@middlewares';
// Services
import { eventService } from '@services';
// Utils
import { ErrorHandler, catchHandler } from '@utils';
// Third-party modules
import type { NextFunction, Request, Response } from 'express';

/**
 * Handles local event uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            return next(new ErrorHandler(commonMessages.USER_NOT_FOUND, UNAUTHORIZE, null));
        }
        const { title, eventDate, description } = req.body;
        const response = await eventService.addEvent(user, title, eventDate, description);
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
 * Handles local event uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { eventId, title, eventDate, description } = req.body;
        const response = await eventService.partialUpdate(eventId, { title, eventDate, description });
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
 * Handles get event details from local storage
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const eventId: string = req.params.eventId;
        const response = await eventService.getEventById(eventId);
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
 * Handles retrieving users.
 * otherwise, fetch all events.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page, limit, sortBy, orderBy, search } = req.query;
        const { status, success, message, data } = await eventService.getAllEvents(
            Number(page),
            Number(limit),
            sortBy,
            orderBy,
            search
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

/**
 * Handles local event uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await eventService.deleteEventById(req.params.eventId);
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