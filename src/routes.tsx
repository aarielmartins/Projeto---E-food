import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantHome from './components/RestaurantHome'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/restaurante/:id" element={<RestaurantHome />} />
  </Routes>
)

export default Rotas
