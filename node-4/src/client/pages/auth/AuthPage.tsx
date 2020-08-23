import React from 'react';
import { useLazyHttp } from '../../hooks/useHttp';
import { UserFormType } from '../../../@types';
import AuthContext from '../../context/Auth.Context';

export default function AuthPage(): React.ReactElement {
  const auth = React.useContext(AuthContext);
  const [useFetch] = useLazyHttp();
  const [form, setForm] = React.useState<UserFormType>({
    email: '',
    password: '',
  });

  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    event.preventDefault();
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const loginHandler = () => {
    useFetch(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(form),
      },
    ).then((result) => {
      auth.login(result.token, result.userId);
    }).catch((err) => {
      console.log(err);
    });

  };

  const registerHandler = () => {
    useFetch(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(form),
      },
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1>Авторизация</h1>
        <form action="">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              className="form-control"
              value={form.email}
              onChange={formChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={formChangeHandler}
            />
          </div>
          <button type="button" className="btn btn-primary mr-3"
                  onClick={loginHandler}>Войти</button>
          <button type="button" className="btn btn-secondary"
                  onClick={registerHandler}>Регистрация</button>
        </form>
      </div>
    </div>
  );
}
