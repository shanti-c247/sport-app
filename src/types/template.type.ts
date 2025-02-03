import type { Types } from 'mongoose';

// Define the structure of the file upload database
export interface ITeamplate {
    userId: Types.ObjectId;
    htmlContent: string;
    cssContent: string;
    isDeleted: boolean;
}