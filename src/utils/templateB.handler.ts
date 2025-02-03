import { faker } from "@faker-js/faker";

/**
 * Generates random data for template related APIs.
 * @param {string} type The type of random data to generate. Supported types are:
 *   - `createTeamplateBRequest`: Random data for creating a new template.
 * @returns {object} An object containing the random data.
 * @throws {Error} If the `type` parameter is not supported.
 */


const sContent = `[
    {
        id: 1,
        src: 'https://www.shutterstock.com/image-photo/calm-weather-on-sea-ocean-600nw-2212935531.jpg', // Example placeholder image
        description: 'Sample Image 1',
        isBanner: false
    },
    {
        id: 2,
        src: 'https://www.shutterstock.com/image-photo/calm-weather-on-sea-ocean-600nw-2212935531.jpg', // Example placeholder image
        description: 'Sample Image 2',
        isBanner: false
    }
],
    bio: {
        profileImage: '',
        title: '',
        content: ''
    },
    event: {
        title: '',
        date: '',
        description: ''
    }`

export const templateBRandomData = (type: string) => {
    const commonData = {
        sliderContent: { type: 'object', example: sContent },
    };
    switch (type) {
        case 'createTeamplateRequest':
            return commonData;
        case 'updateTeamplateRequest':
            return commonData;
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};