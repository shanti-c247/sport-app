import { commonVariables } from '@constants';
import type { ITeamplate } from '@customTypes';
import mongoose, { type Model, Schema } from 'mongoose';

const templateSchema = new Schema<ITeamplate>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        htmlContent: {
            type: String,
            default: null,
        },
        cssContent: {
            type: String,
            default: null,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// Customize JSON transformation to exclude sensitive data
templateSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id; // Add id
        commonVariables.EVENT_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => delete ret[field]);
        return ret;
    },
});

export const Teamplate: Model<ITeamplate> = mongoose.model<ITeamplate>('template', templateSchema);
