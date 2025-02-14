import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './app/dashboard'
import Home from './app'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}
