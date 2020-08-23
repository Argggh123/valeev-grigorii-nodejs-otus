import { Schema, model } from 'mongoose';
import { IUser } from '../../@types';

const userSchema = new Schema({
  name: { type: String, default: 'User' },
  email: { type: String, require: true },
  password:  { type: String, require: true },
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: [] }],
  completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson', default: [] }],
});

const User = model<IUser>('User', userSchema);

export default User;
