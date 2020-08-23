import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useHttp, useLazyHttp } from '../../hooks/useHttp';
import AuthContext from '../../context/Auth.Context';

export default function CoursesList(): React.ReactElement {
  const auth = useContext(AuthContext);
  const [data, loading, error] = useHttp('/api/courses');
  const [fetch] = useLazyHttp();

  const purchaseCourseHandler = (course: string) => {
    fetch('/api/auth/purchase', {
      method: 'POST', body: JSON.stringify({
        courceId: course,
      }),
    });
    console.log(course);
  };

  const getCourseCard = ({ title, _id, description }, index: number) => (
    <div className="card mr-3 mb-3 col" key={`course-card-item-${index + 1}`}>
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
        <p className="cad-text">{description}</p>
        <Link to={`/course/${_id}`} className="btn btn-primary">На страницу курса</Link>
        {auth.isAuth
          ? <button onClick={() => purchaseCourseHandler(_id)} className="btn btn-success">Приобрести курс</button>
          : null}
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
