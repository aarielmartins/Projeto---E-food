import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantHome from './pages/RestaurantHome'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/restaurantes/:id" element={<RestaurantHome />} />
  </Routes>
)

export default Rotas
