import { useState } from 'react'
import { Header } from "@ethan/header";
import { AppRoutes } from './AppRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Header>
      <AppRoutes />
    </Header>
  )
}

export default App
