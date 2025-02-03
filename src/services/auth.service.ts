// Built-in modules
import {
    BAD_REQUEST,
    CONFLICT,
    CREATED,
    OK,
    UNAUTHORIZE,
    commonMessages,
} from '@constants';
// Types
import type {
    IApiResponse,
} from '@customTypes';
import { Role } from '@enums';
// Models
import { User } from '@models';
// Utilities
import { authHandler, generateTokenHandler } from '@utils';
// Third-party modules
import type { Response } from 'express';

/**
 * Handles user registration
 * @param {IRegisterBody} data User registration data
 * @returns {Promise<IApiResponse>} Response containing the created user or error information
 */
export const register = async (name: string, email: string, password: string): Promise<IApiResponse> => {
    const formatEmail = email.toLowerCase();
    const checkUser = await User.findOne({ email: formatEmail });

    if (checkUser) {
        return {
            status: CONFLICT,
            success: false,
            message: commonMessages.USER_ALREADY_EXISTS,
            data: null,
        };
    }

    const hashedPassword = await authHandler.hashPassword(password);

    const user = await User.create({
        name,
        email: formatEmail,
        password: hashedPassword,
        role: Role.Admin,
    });
    if (!user) {
        return {
            status: UNAUTHORIZE,
            success: false,
            message: commonMessages.INTERNAL_SERVER_ERROR,
            data: null,
        };
    }
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return {
        status: CREATED,
        success: true,
        message: commonMessages.USER_REGISTERD,
        data: null,
    };
};

/**
 * Login a user with email and password. If the user has TwoFA enabled, a verification code will be sent to the selected method.
 * @param {ILoginBody} data - The login data
 * @param {Response} res - The response
 * @returns {Promise<IApiResponse>} - The response
 */
export const login = async (email: string, password: string, res: Response): Promise<IApiResponse> => {
    const formatEmail = email.toLowerCase();
    //  'name email role password isTwoAuthEnabled preferredTwoFAMethods,'
    const user = await User.findOne({ email: formatEmail });

    if (!user) {
        return {
            status: BAD_REQUEST,
            success: false,
            message: commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }

    if (user && user.status === 0) {
        return {
            status: BAD_REQUEST,
            success: false,
            message: commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    const isMatch = await authHandler.comparePassword(password, user.password);

    if (!isMatch) {
        return {
            status: BAD_REQUEST,
            success: false,
            message: commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return {
        status: OK,
        success: true,
        message: commonMessages.LOGIN_SUCCESS,
        data: {
            token: await generateTokenHandler.generateAuthToken(res, payload),
            role: user.role,
            isTwoAuthEnabled: user.isTwoAuthEnabled,
        },
    };
};
