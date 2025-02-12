import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './app/dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}
