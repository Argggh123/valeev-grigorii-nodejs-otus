import React from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp';

export default function LessonPage(): React.ReactElement {
  const { id } = useParams();

  const [lesson, loading, error] = useHttp(`/api/lessons/${id}`);

  if (!lesson && loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong :(...</>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1>{lesson.name}</h1>
        <p className="cad-text">{lesson.description}</p>
      </div>
    </div>
  );
}
