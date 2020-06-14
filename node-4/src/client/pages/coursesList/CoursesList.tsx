import React from 'react';
import { Link } from 'react-router-dom';

import { useHttp } from '../../hooks/useHttp';

export default function CoursesList(): React.ReactElement {

  const [data, loading, error] = useHttp('/api/courses');

  const getCourseCard = ({ title, _id, description }, index: number) => (
    <div className="card mr-3 mb-3 col" key={`course-card-item-${index + 1}`}>
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
        <p className="cad-text">{description}</p>
        <Link to={`/course/${_id}`} className="btn btn-primary">На страницу курса</Link>
      </div>
    </div>
  );

  if (!data && loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong :(...</>;
  }

  return (
    <div className="row">
      {data.map(getCourseCard)}
    </div>
  );
}
