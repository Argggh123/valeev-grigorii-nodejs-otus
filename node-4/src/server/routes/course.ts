import { Router } from 'express';
import Course from '../schemas/Course.schema';

export const course = Router();

course.get('/', (req, res) => {
  Course.find((err, docs) => {
    res.status(200).send(docs);
  });
});

course.get('/:id', async (req, res) => {
  const { id } = req.params;
  Course.findById(id)
    .populate('lessons')
    .exec()
    .then((doc) => {
      res.send(doc);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

course.post('/', (request, response) => {
  const { name, description, cost, lessons = [] } = request.body;
  new Course({ name, description, cost, lessons })
    .save()
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send(error);
    });
});
