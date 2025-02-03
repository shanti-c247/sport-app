import { faker } from "@faker-js/faker";

/**
 * Generates random data for event related APIs.
 * @param {string} type The type of random data to generate. Supported types are:
 *   - `createEventRequest`: Random data for creating a new event.
 *   - `updateEventRequest`: Random data for updating a event.
 * @returns {object} An object containing the random data.
 * @throws {Error} If the `type` parameter is not supported.
 */
export const eventRandomData = (type: string) => {
    const commonData = {
        title: { type: 'string', example: faker.person.fullName() },
        description: { type: 'string', example: "Test description" },
        eventDate: { type: 'Date', example: "12/12/1998" },
    };
    const commonUpdateData = {
        eventId: { type: 'string', example: "e49a0a79-b56c-47fc-a33c-9d562de6d6b4" },
        title: { type: 'string', example: faker.person.fullName() },
        description: { type: 'string', example: "Test description" },
        date: { type: 'Date', example: "12/12/1998" },
    };
    switch (type) {
        case 'createEventRequest':
            return commonData;
        case 'updateEventRequest':
            return {
                ...commonUpdateData,
            };
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};