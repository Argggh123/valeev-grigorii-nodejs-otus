import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth.Context';

export default function Header(): React.ReactElement {
  const { isAuth } = useContext(AuthContext);
  return (
    <nav className={'navbar navbar-expand-xl navbar-dark bg-primary mb-3'}>
      <Link className={'navbar-brand'} to={'/'}>My courses</Link>
      <div className={'collapse navbar-collapse'}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Список курсов</Link>
          </li>
          {!isAuth ?
            (<li className="nav-item">
              <Link className="nav-link" to="/auth">Авторизация</Link>
            </li>)
            : null}
        </ul>
      </div>
    </nav>
  );
}
