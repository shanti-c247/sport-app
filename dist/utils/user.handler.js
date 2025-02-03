"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDate = exports.userRandomData = exports.generateSetPasswordLink = exports.generateHashedToken = void 0;
//Third-party modules
const node_crypto_1 = __importDefault(require("node:crypto"));
//Constants
const _constants_1 = require("@constants");
//Enums
const _enums_1 = require("@enums");
//Third-party modules
const faker_1 = require("@faker-js/faker");
/**
 * Generates a hashed version of a token using the algorithm specified in
 * the HASH_METHOD configuration variable.
 * @param token - The token to be hashed.
 * @returns A hashed version of the token.
 */
const generateHashedToken = (token) => {
    return node_crypto_1.default.createHash(_constants_1.commonVariables.HASH_METHOD).update(token).digest('hex');
};
exports.generateHashedToken = generateHashedToken;
/**
 * Generates a set password link by appending the provided token to the frontend app URL.
 * @param token - The token to be appended to the frontend app URL.
 * @returns The generated set password link.
 */
const generateSetPasswordLink = (token) => {
    return `${_constants_1.commonVariables.FRONTEND_APP_URL}?token=${token}`;
};
exports.generateSetPasswordLink = generateSetPasswordLink;
/**
 * Sends a set password email to the specified user.
 * @param {string} email - The recipient's email address.
 * @param {string} link - The set password link to be included in the email.
 * @param {IUser} user - The user object containing user details.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the email was sent successfully, otherwise false.
 */
// export const sendSetPasswordEmail = async (email: string, link: string, user: IUser): Promise<boolean> => {
//   const message = await setPasswordTemplate(link, user);
//   const emailResult = await emailHandler.sendEmail(email, commonMessages.SUBJECT_SET_PASSWORD, message);
//   return emailResult.success;
// };
/**
 * Generates random data for user related APIs.
 * @param {string} type The type of random data to generate. Supported types are:
 *   - `userSchema`: Random data conforming to the user schema.
 *   - `createUserRequest`: Random data for creating a new user.
 *   - `updateUserRequest`: Random data for updating a user.
 *   - `changeStatusRequest`: Random data for changing the status of a user.
 *   - `setPasswordRequest`: Random data for setting a new password for a user.
 * @returns {object} An object containing the random data.
 * @throws {Error} If the `type` parameter is not supported.
 */
const userRandomData = (type) => {
    const commonData = {
        name: { type: 'string', example: faker_1.faker.person.fullName() },
        email: { type: 'string', example: faker_1.faker.internet.email() },
        description: { type: 'string', example: "Test description" },
        dateOfBirth: { type: 'Date', example: "12-12-1998" },
        picture: { type: 'string', example: "http://test.png" },
    };
    const commonStatus = {
        type: 'integer',
        example: _enums_1.UserStatus.Active,
        enum: [_enums_1.UserStatus.Active, _enums_1.UserStatus.Inactive],
    };
    const commonPassword = {
        type: 'string',
        example: faker_1.faker.internet.password({
            length: _constants_1.commonVariables.PASSWORD_MIN_LENGTH,
        }),
    };
    switch (type) {
        case 'userSchema':
            return Object.assign(Object.assign({}, commonData), { id: { type: 'string', example: faker_1.faker.string.uuid() }, status: commonStatus, isDeleted: { type: 'boolean', example: false }, isTwoAuthEnabled: { type: 'boolean', example: false }, preferredTwoFAMethods: {
                    type: 'array',
                    example: [],
                }, recoveryCodes: {
                    type: 'array',
                    example: [],
                }, createdAt: { type: 'string', example: faker_1.faker.date.past() }, updatedAt: { type: 'string', example: faker_1.faker.date.recent() } });
        case 'createUserRequest':
            return commonData;
        case 'updateUserRequest':
            return Object.assign(Object.assign({}, commonData), { status: commonStatus });
        case 'changeStatusRequest':
            return {
                status: commonStatus,
            };
        case 'setPasswordRequest':
            return {
                password: commonPassword,
                token: { type: 'string', example: faker_1.faker.string.uuid() },
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
exports.userRandomData = userRandomData;
// Convert DD-MM-YYYY to Date object
const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
};
exports.convertToDate = convertToDate;
//# sourceMappingURL=user.handler.js.map