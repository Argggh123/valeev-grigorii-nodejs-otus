import { Router } from 'express';
import { Lesson } from '../schemas/Lesson.schema';

export const lesson = Router();

lesson.post('/', (request, response) => {
  const { name, description } = request.body;
  const lesson = new Lesson({ name, description });

  lesson.save()
    .then((result) => {
      response.status(200).send(result._id);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error });
    });
});

lesson.get('/:id', (request, response) => {
  const { id } = request.params;
  Lesson.findById(id)
    .exec()
    .then((result) => {
      response.status(200).send(result)
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error });
    });
});
