import React from 'react'
import "../../globals.css";
import Header from '../components/Header/Header';
import Notifications from '../components/Header/Notifications';

export default function layout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body>
       <Header>
          <Notifications />
       </Header>
        {children}
      </body>
    </html>
  )
}
