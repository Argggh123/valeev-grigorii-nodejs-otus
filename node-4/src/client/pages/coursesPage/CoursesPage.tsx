import React from 'react';
import { useParams } from 'react-router-dom';

export default function CoursesPage(): React.ReactElement {
  const { id } = useParams();

  return (
    <div>
      Курс {id}
    </div>
  );
}
