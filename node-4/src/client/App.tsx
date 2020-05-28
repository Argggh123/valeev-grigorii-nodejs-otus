import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import AuthPage from './pages/auth/AuthPage';
import CoursesList from './pages/coursesList/CoursesList';
import CoursesPage from './pages/coursesPage/CoursesPage';
import LessonPage from './pages/lessonPage/LessonPage';

export default function App(): React.ReactElement {
  return (
    <Layout>
      <Switch>
        <Route exact path={'/'}>
          <CoursesList />
        </Route>
        <Route path={'/auth'}>
          <AuthPage />
        </Route>
        <Route exact path={'/course/:id'}>
          <CoursesPage />
        </Route>
        <Route path={'/:id/lesson/:id'}>
          <LessonPage />
        </Route>
      </Switch>
    </Layout>
  );
}
