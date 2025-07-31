import { Link } from 'react-router-dom'
import fundo from '../../assets/images/fundo.png'
import logo from '../../assets/images/logo.png'
import { HeaderContainer, Logo, Titulo } from './styles'

const Header = () => {
  return (
    <HeaderContainer style={{ backgroundImage: `url(${fundo})` }}>
      <Logo>
        <Link to={'/'}>
          <img src={logo} alt="Logo da Efood" />
        </Link>
      </Logo>
      <Titulo>
        Viva experiências gastronômicas
        <br /> no conforto da sua casa
      </Titulo>
    </HeaderContainer>
  )
}

export default Header
