import { Schema, model } from 'mongoose';

export const lessonSchema = new Schema({
  name: String,
  description: {
    type: String,
    default: null,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  lessonAttachment: {
    type: [String],
    default: [],
  },
});

export const Lesson = model('Lesson', lessonSchema);
