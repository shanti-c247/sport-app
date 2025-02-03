import type { Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IEvent extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    eventDate?: Date;
    description: string;
    date?: Date;
}