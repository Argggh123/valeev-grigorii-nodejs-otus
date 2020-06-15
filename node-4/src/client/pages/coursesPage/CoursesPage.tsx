import React from 'react';
import {
  Link,
  useParams,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import LessonPage from '../lessonPage/LessonPage';
import { useHttp } from '../../hooks/useHttp';

export default function CoursesPage(): React.ReactElement {
  const { id } = useParams();
  const { url } = useRouteMatch();

  const [course, loading, error] = useHttp(`/api/courses/${id}`);

  if (!course && loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong :(...</>;
  }

  const getCard = (item, index) => (
    <div className="card mr-3 mb-3 col" key={`course-lesson-item-${index + 1}`}>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <Link
          to={`/course/${id}/lesson/${item._id}`}
          className="btn btn-primary"
        >
          На страницу Урока
        </Link>
      </div>
    </div>
  );

  return (
    <Switch>
      <Route path={`${url}/lesson/:id`}>
        <LessonPage />
      </Route>
      <Route exact path={url}>
        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="row">
            {course.lessons.map(getCard)}
          </div>
        </div>
      </Route>
    </Switch>
  );

}
