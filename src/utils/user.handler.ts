//Third-party modules
import crypto from 'node:crypto';

//Constants
import { commonMessages, commonVariables, setPasswordTemplate, userVariables } from '@constants';

//Utils
import { commonHandler, emailHandler } from '@utils';

//Custom types
import type { IUser } from '@customTypes';

//Enums
import { UserStatus } from '@enums';
//Third-party modules
import { faker } from '@faker-js/faker';

/**
 * Generates a hashed version of a token using the algorithm specified in
 * the HASH_METHOD configuration variable.
 * @param token - The token to be hashed.
 * @returns A hashed version of the token.
 */
export const generateHashedToken = (token: string): string => {
  return crypto.createHash(commonVariables.HASH_METHOD).update(token).digest('hex');
};

/**
 * Generates a set password link by appending the provided token to the frontend app URL.
 * @param token - The token to be appended to the frontend app URL.
 * @returns The generated set password link.
 */
export const generateSetPasswordLink = (token: string): string => {
  return `${commonVariables.FRONTEND_APP_URL}?token=${token}`;
};

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
export const userRandomData = (type: string) => {
  const commonData = {
    name: { type: 'string', example: faker.person.fullName() },
    email: { type: 'string', example: faker.internet.email() },
    description: { type: 'string', example: "Test description" },
    dateOfBirth: { type: 'Date', example: "12-12-1998" },
    picture: { type: 'string', example: "http://test.png" },
  };

  const commonStatus = {
    type: 'integer',
    example: UserStatus.Active,
    enum: [UserStatus.Active, UserStatus.Inactive],
  };

  const commonPassword = {
    type: 'string',
    example: faker.internet.password({
      length: commonVariables.PASSWORD_MIN_LENGTH,
    }),
  };

  switch (type) {
    case 'userSchema':
      return {
        ...commonData,
        id: { type: 'string', example: faker.string.uuid() },
        status: commonStatus,
        isDeleted: { type: 'boolean', example: false },
        isTwoAuthEnabled: { type: 'boolean', example: false },
        preferredTwoFAMethods: {
          type: 'array',
          example: [],
        },
        recoveryCodes: {
          type: 'array',
          example: [],
        },
        createdAt: { type: 'string', example: faker.date.past() },
        updatedAt: { type: 'string', example: faker.date.recent() },
      };
    case 'createUserRequest':
      return commonData;
    case 'updateUserRequest':
      return {
        ...commonData,
        status: commonStatus,
      };
    case 'changeStatusRequest':
      return {
        status: commonStatus,
      };
    case 'setPasswordRequest':
      return {
        password: commonPassword,
        token: { type: 'string', example: faker.string.uuid() },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};


// Convert DD-MM-YYYY to Date object
export const convertToDate = (dateString: any) => {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
};