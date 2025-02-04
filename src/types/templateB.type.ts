import { IEvent } from '@customTypes';
import type { Document } from 'mongoose';

export interface IImage {
  id: number;
  src: string;
  description: string;
  isBanner: boolean;
}

export interface IBio {
  profileImage: string;
  title: string;
  content: string;
}

export interface ITemplateB extends Document {
  slider: IImage[];
  bio: IBio;
  event: IEvent[];
  isDeleted: boolean;

}

