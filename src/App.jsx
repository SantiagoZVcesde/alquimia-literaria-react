import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      {/* El Outlet es donde se renderizarán las páginas (Home, Login, etc.) */}
      <Outlet />
    </>
  )
}

export default App