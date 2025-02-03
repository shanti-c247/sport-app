import { IBio, IEvent, IImage, ITemplateB } from '@customTypes';
import { Schema, model, Document } from 'mongoose';


const ImageSchema = new Schema<IImage>({
  id: { type: Number, default: null },
  src: { type: String,default: null },
  description: { type: String, default: null },
  isBanner: { type: Boolean, default: null }
});

const BioSchema = new Schema<IBio>({
  profileImage: { type: String, default: null },
  title: { type: String, default: null },
  content: { type: String,default: null}
});

const EventSchema = new Schema<IEvent>({
  title: { type: String, default: null },
  eventDate: { type: String,default: null},
  description: { type: String,default: null }
});

const TemplateBSchema = new Schema<ITemplateB>({
  slider: { type: [ImageSchema], default: null },
  bio: { type: BioSchema, default: null },
  event: { type: [EventSchema],default: null }
});

export const TemplateB = model<ITemplateB>('templateB', TemplateBSchema);
