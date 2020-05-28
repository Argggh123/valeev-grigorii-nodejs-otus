import React from 'react';

export default function AuthPage(): React.ReactElement {
  return (
    <div className="card">
      <div className="card-body">
        <h1>Авторизация</h1>
        <form action="">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="button" className="btn btn-primary">Войти</button>
        </form>
      </div>
    </div>
  );
}
