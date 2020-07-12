import { Router } from 'express';
import { Lesson } from '../schemas/Lesson.schema';
import authMiddleware from '../midlleware/auth.midlleware';

export const lesson = Router();

lesson.post('/', (request, response) => {
  const { name, description } = request.body;
  const lesson = new Lesson({ name, description });

  lesson.save()
    .then((result) => {
      response
        .status(200)
        .send(result._id);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error });
    });
});

lesson.get('/:id', authMiddleware, async (request, response) => {
  try {
    const { id } = request.params;
    const lesson = await Lesson.findById(id);
    response.status(200).send(lesson);
  } catch (error) {
    response.status(500).json({ error });
  }
});
