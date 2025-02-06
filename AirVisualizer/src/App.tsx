import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './app'
import Dashboard from './app/dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}
