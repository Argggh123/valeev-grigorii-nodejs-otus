type Lesson = {
  id: string,
  name: string,
  description: string,
  start?: Date,
}

type Course = {
  id: string,
  title: string,
  description?: string,
  lessons?: Lesson[];
};

export type CoursesStateType = {
  coursesList: Course[]
  course?: Course | {};
};

const defaultState: CoursesStateType = {
  coursesList: [],
};

export default function CoursesReducer(state = defaultState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
