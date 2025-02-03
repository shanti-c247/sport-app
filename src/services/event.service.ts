import { BAD_REQUEST, CREATED, NOT_FOUND, OK, eventMessages } from '@constants';
import type { IApiResponse, IEvent, IUser } from '@customTypes';
import { Event } from '@models';
import { paginationHandler } from '@utils';
import { Types } from 'mongoose';

/**
 * Save a new event in the database.
 * @param {IEvent} event - Event data to save
 * @returns {IApiResponse} Response containing the status of the save operation
 */
export const addEvent = async (user: IUser, title: string, eventDate: Date, description: string): Promise<IApiResponse> => {
    const newEvent = new Event({
        userId: user.id,
        title: title,
        eventDate: eventDate,
        description: description
    });
    await newEvent.save();

    return {
        status: CREATED,
        success: true,
        message: eventMessages.CREATE_EVENT,
        data: newEvent,
    };
};

/**
 * Get an event by its ID.
 * @param {string} eventId - ID of the event to retrieve
 * @returns {IApiResponse} Response containing the event data or an error message
 */
export const getEventById = async (eventId: string): Promise<IApiResponse> => {
    if (!Types.ObjectId.isValid(eventId)) {
        return {
            status: BAD_REQUEST,
            success: false,
            message: eventMessages.INVALID_EVENT_ID,
            data: null
        };
    }

    const event = await Event.findById(eventId);
    if (!event) {
        return {
            status: NOT_FOUND,
            success: false,
            message: eventMessages.EVENT_NOT_FOUND,
            data: null
        };
    }

    return {
        status: OK,
        success: true,
        message: eventMessages.EVENT_FETCHED,
        data: event,
    };
};

/**
 * Update an event by its ID.
 * @param {string} eventId - ID of the event to update
 * @param {Partial<IEvent>} updateData - Data to update the event with
 * @returns {IApiResponse} Response containing the status of the update operation
 */
export const partialUpdate = async (eventId: string, updateData: Partial<IEvent>): Promise<IApiResponse> => {
    if (!Types.ObjectId.isValid(eventId)) {
        return {
            status: BAD_REQUEST,
            success: false,
            message: eventMessages.INVALID_EVENT_ID,
            data: null

        };
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
    if (!updatedEvent) {
        return {
            status: NOT_FOUND,
            success: false,
            message: eventMessages.EVENT_NOT_FOUND,
            data: null
        };
    }

    return {
        status: OK,
        success: true,
        message: eventMessages.EVENT_UPDATED,
        data: updatedEvent,
    };
};

/**
 * Delete an event by its ID.
 * @param {string} eventId - ID of the event to delete
 * @returns {IApiResponse} Response containing the status of the delete operation
 */
export const deleteEventById = async (eventId: string): Promise<IApiResponse> => {
    if (!Types.ObjectId.isValid(eventId)) {
        return {
            status: BAD_REQUEST,
            success: false,
            message: eventMessages.INVALID_EVENT_ID,
            data: null
        };
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
        return {
            status: NOT_FOUND,
            success: false,
            message: eventMessages.EVENT_NOT_FOUND,
            data: null
        };
    }

    return {
        status: OK,
        success: true,
        message: eventMessages.EVENT_DELETED,
        data: deletedEvent,
    };
};

/**
 * Get all events with pagination, sorting, and searching.
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of events per page
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Order of sorting (asc or desc)
 * @param {string} search - Search term to filter events
 * @returns {IApiResponse} Response containing the paginated list of events
 */
export const getAllEvents = async (
    pageNumber: number,
    pageSize: number,
    sortBy: string | any, // -1 , 1,
    sortOrder: string | any,
    search: string | any
): Promise<IApiResponse> => {
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const { limit, offset } = paginationHandler.getPagination(pageNumber, pageSize);

    const match: any = {};
    if (search) {
        match.$or = [
            { title: { $regex: search, $options: 'i' } },
        ];
    }
    const events = await Event.aggregate([
        { $match: match },
        { $sort: sortOptions },
        { $skip: offset },
        { $limit: limit },
    ]);

    const totalEvents = await Event.countDocuments(match);

    return {
        status: OK,
        success: true,
        message: eventMessages.EVENTS_FOUND,
        data: { total: totalEvents, events: events }
    };
};