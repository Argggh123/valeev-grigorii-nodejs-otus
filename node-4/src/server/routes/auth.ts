import { compare, hash } from 'bcrypt';
import { response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../schemas/User.schema';
import authMiddleware from '../midlleware/auth.midlleware';

export const auth = Router();

auth.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            errors: errors.array(),
            message: 'Некорректные данные при регистрации',
          });
      }

      const { email, password } = req.body;

      const createdUser = await User.findOne({ email });

      if (createdUser) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashPassword = await hash(password, 12);
      const user = new User({ email, password: hashPassword });
      const newUser = await user.save();

      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      res
        .status(201)
        .cookie('OAUTH_TOKEN', token)
        .json({ message: ' Пользователь создан' });
    } catch (e) {
      res.status(500).json('Что то пошло не так... Но это не точно');
    }
  },
);

auth.post(
  '/login',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при логине',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        return res.status(500).json({ message: 'Неверный логин или пароль' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      res
        .cookie('OAUTH_TOKEN', token, { maxAge: 36000000 })
        .json({
          userId: user.id,
          token,
        });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error });
    }
  },
);

auth.post(
  '/authorize',
  authMiddleware,
  (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // @ts-ignore
    if (req.user) {
      return res.json({
        token,
        // @ts-ignore
        userId: req.user.userId,
      });
    }
    res.status(500).json('Что то пошло не так... Но это не точно');
  },
);

auth.post(
  '/purchase',
  authMiddleware,
  async (req, res) => {
    console.log('test');
    const token = req.headers.authorization.split(' ')[1];
    const course = req.body.courceId;
    // @ts-ignore
    if (req.user) {
      // @ts-ignore
      const user = await User.find({ _id: req.user.userId });
      // @ts-ignore
      await User.find({ _id: req.user.userId })
        .update({
        purchasedCourses: [
          ...user[0].purchasedCourses,
          course,
        ],
      });
      console.log(user);
      return res.json({
        token,
        // @ts-ignore
        userId: req.user.userId,
      });
    }
    res.status(500).json('Что то пошло не так... Но это не точно');
  },
);
