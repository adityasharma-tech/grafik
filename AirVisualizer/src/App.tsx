import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './app'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}
