import { Schema, model } from 'mongoose';

export const courseSchema = new Schema({
  title: String,
  description: String,
  cost: Number,
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson', default: [] }],
});

const Course = model('Course', courseSchema);

export default Course;
