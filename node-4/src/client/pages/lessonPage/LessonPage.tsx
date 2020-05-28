import React from 'react';
import { useParams } from 'react-router-dom';

export default function LessonPage(): React.ReactElement {
  const { id } = useParams();
  return (
    <div>
      LessonPage {id}
    </div>
  );
}
