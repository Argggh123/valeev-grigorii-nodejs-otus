import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StateType } from '../../redux';

export default function CoursesList(): React.ReactElement {

  const { coursesList } = useSelector((state: StateType) => state.courses)

  const getCourseCard = ({ title, id, description }, index: number) => (
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
