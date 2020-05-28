import React from 'react';
import { Link } from 'react-router-dom';

export type CourseItemType = {
  id: number,
  title: string,
  description: string
}

const coursesList: CourseItemType[] = [
  {
    id: 1,
    title: 'Курс 1',
    description: 'Супер описание курса',
  },
  {
    id: 2,
    title: 'Курс 2',
    description: 'Супер описание курса',
  },
  {
    id: 3,
    title: 'Курс 3',
    description: 'Супер описание курса',
  },
  {
    id: 4,
    title: 'Курс 4',
    description: 'Супер описание курса',
  },
];

export default function CoursesList(): React.ReactElement {

  const getCourseCard = ({ title, id, description }: CourseItemType, index: number) => (
    <div className="card mr-3 mb-3" key={`course-card-item-${index + 1}`}>
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
        <p className="cad-text">{description}</p>
        <Link to={`/course/${id}`} className="btn btn-primary">На страницу курса</Link>
      </div>
    </div>
  );

  return (
    <div className="row">
      {coursesList.map(getCourseCard)}
    </div>
  );
}
