import { BrowserRouter } from 'react-router-dom'
import { GlobalCss } from './styles'
import Rotas from './routes'
import Footer from './components/Footer'

//ORGANIZAÇÃO DE PÁGINAS PELO BROWSERROUTER
function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalCss />
        <div className="container"></div>
        <Rotas />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
