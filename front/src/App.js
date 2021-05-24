import React from 'react';
import Router from './Router';
import { MyNavbar } from './components'

const App = () => {
  return (
    <div>
      <header>
        <MyNavbar />
      </header>
      <main>
        <Router />
        {/* <h1>Home</h1> */}
      </main>
    </div>
  )
}

export default App;