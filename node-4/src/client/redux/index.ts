import { combineReducers } from 'redux';

import CoursesReducer, { CoursesStateType } from './reducers/CoursesReducer';


export type StateType = {
  courses: CoursesStateType
}

export const rootReducer = combineReducers({
  courses: CoursesReducer,
});

