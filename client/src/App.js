import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CargoForm from './components/Cargoform'
import CargoList from './components/Cargolist'
import Menu from './components/Navbar'
import { Container } from '@mui/material'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Container>
          <Routes>
            <Route path='/cargo' element={<CargoList />} />
            <Route path='/cargo/new' element={<CargoForm />} />
            <Route path='/cargo/:id/edit' element={<CargoForm />} />

          </Routes>
        </Container>


      </BrowserRouter>
    </div>
  )
}