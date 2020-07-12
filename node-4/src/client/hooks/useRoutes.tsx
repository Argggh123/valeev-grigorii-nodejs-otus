import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from '../pages/auth/AuthPage';
import CoursesList from '../pages/coursesList/CoursesList';
import CoursesPage from '../pages/coursesPage/CoursesPage';

export function useRoutes(isAuth) {

  if (isAuth) {
    return (
      <Switch>
        <Route exact path={'/'}>
          <CoursesList />
        </Route>
        <Route path={'/course/:id'}>
          <CoursesPage />
        </Route>
        <Redirect to={'/'} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={'/auth'}>
        <AuthPage />
      </Route>
      <Route exact path={'/'}>
          <CoursesList />
      </Route>
      <Redirect to={'/auth'} />
    </Switch>
  );
}
