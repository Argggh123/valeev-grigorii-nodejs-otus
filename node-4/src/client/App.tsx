import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthPage from './pages/auth/AuthPage';
import CoursesList from './pages/coursesList/CoursesList';
import CoursesPage from './pages/coursesPage/CoursesPage';
import Layout from './hoc/Layout';

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
        <Route path={'/course/:id'}>
          <CoursesPage />
        </Route>
      </Switch>
    </Layout>
  );
}
