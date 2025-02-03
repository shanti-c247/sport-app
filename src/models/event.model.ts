import { commonVariables } from '@constants';
import type { IEvent } from '@customTypes';
import mongoose, { type Model, Schema } from 'mongoose';

const EventSchema: Schema = new Schema<IEvent>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    title: { type: String, required: true },
    eventDate: { type: Date, required: true },
    description: { type: String, default: null, }
},
    {
        timestamps: true,
    });

// Customize JSON transformation to exclude sensitive data
EventSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id; // Add id
        commonVariables.EVENT_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => delete ret[field]);
        return ret;
    },
});

export const Event: Model<IEvent> = mongoose.model<IEvent>('event', EventSchema);
