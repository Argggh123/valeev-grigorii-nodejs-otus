import React from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  useParams,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import { StateType } from '../../redux';
import LessonPage from '../lessonPage/LessonPage';

export default function CoursesPage(): React.ReactElement {
  const { id } = useParams();
  const { url } = useRouteMatch();

  const { coursesList } = useSelector((state: StateType) => state.courses);

  const course = coursesList.find((course) => course.id === id);

  if (!course) {
    return <div>Нет данных по курсу :(</div>;
  }

  const getCard = (item, index) => (
    <div className="card" key={`course-lesson-item-${index + 1}`}>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{course.description}</p>
        <Link
          to={`/course/${id}/lesson/${item.id}`}
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
