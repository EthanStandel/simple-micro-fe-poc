import { useState } from 'react'
import logo from './logo.svg'
import { Header } from "@ethan/header";
import { AppRoutes } from './Routes';

function App() {
  return (
    <div className="App">
      <Header>
        <AppRoutes />
      </Header>
    </div>
  )
}

export default App
