import React from 'react';

import Header from '../components/header/Header';

export default function Layout(props): React.ReactElement {
  return (
    <>
      <Header />
    <div className={'container'}>
      {props.children}
    </div>
      </>
  );
}
