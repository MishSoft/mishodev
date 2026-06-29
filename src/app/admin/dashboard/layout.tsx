import React from 'react'
import Header from '../components/Header/Header';
import Notifications from '../components/Header/Notifications';

export default function layout({children}: {children: React.ReactNode}) {

  return (
    <>
      <Header>
        <Notifications />
      </Header>
      {children}
    </>
  )
}
