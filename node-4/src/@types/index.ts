import { Document } from 'mongoose';

interface ICourse extends Document {
  title: string,
  description: string,
  cost: number,
  lessons?: ILesson[],
}

interface ILesson extends Document {
  name: string
  description: string,
  startDate?: Date
  lessonAttachment?: string[]
}

export interface IUser extends Document {
  name?: string,
  email: string
  password: string,
  purchasedCourses: ICourse[]
  completedLessons: ILesson[]
}


export type UserFormType = {
  email: string | null,
  password: string | null,
}
