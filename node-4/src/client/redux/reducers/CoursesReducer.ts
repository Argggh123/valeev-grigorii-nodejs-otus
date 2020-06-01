type Lesson = {
  id: string,
  name: string,
  description: string,
  start?: Date,
}

type Course = {
  id: string,
  title: string,
  description?: string,
  lessons?: Lesson[];
};

export type CoursesStateType = {
  coursesList: Course[]
  course?: Course | {};
};

const defaultState: CoursesStateType = {
  coursesList: [
    {
      id: '1',
      title: 'Курс по Node.js',
      description: 'Курс по основам Node.js и серверному JavaScript',
      lessons: [
        {
          id: '1',
          name: 'Установа Node.js',
          description: 'В этом уроке будет рассказано как установить Node.js и что она из себя представляет',
          start: new Date(2020, 5, 30, 20, 0),
        },
        {
          id: '2',
          name: 'Hello World на Node.js',
          description: 'В этом уроке будет рассказано как написать свою первую программу и запустить ее с помощью Node.js',
          start: new Date(2020, 5, 31, 20, 0),
        },
      ],
    },
    {
      id: '2',
      title: 'Курс по JavaScript',
      description: 'Обучение базовым понятиям в JavaScript',
      lessons: [
        {
          id: '1',
          name: 'Что такое JavaScript',
          description: 'В этом уроке будет рассказано что это за язык JavaScript и для чего он нужен',
          start: new Date(2019, 5, 27, 20, 0),
        },
        {
          id: '2',
          name: 'Типы данных в JavaScript',
          description: 'В этом уроке будет рассказано какие типы данных присудствуют в JavaScript',
          start: new Date(2019, 5, 28, 20, 0),
        },
        {
          id: '3',
          name: 'Типы переменных в JavaScript',
          description: 'В этом уроке будет рассказано какие переменные существуют в JavaScript',
          start: new Date(2019, 5, 29, 20, 0),
        },
      ],
    },
    {
      id: '3',
      title: 'Курс по основам React',
      description: 'Обучение основам React',
      lessons: [
        {
          id: '1',
          name: 'Обзор бибилиотеки React',
          description: 'В этом уроке будет рассказано что из себя представляет библиотека React и для чего она нужна',
          start: new Date(2020, 0, 15, 20, 0),
        },
        {
          id: '2',
          name: 'create-react-app',
          description: 'В этом уроке будет рассказано как быстро сделать свое первое приложение на React',
          start: new Date(2020, 0, 16, 20, 0),
        },
      ],
    },
  ],
};

export default function CoursesReducer(state = defaultState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
