import { FooterContainer, FooterLogo, FooterText } from './styles'
import logo from '../../assets/images/logo.png'
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import twitter from '../../assets/images/twitter.png'

const Footer = () => {
  return (
    <FooterContainer>
      <img src={logo} alt="Logo da Efood" />
      <FooterLogo>
        <img src={instagram} alt="Logo do Facbook" />
        <img src={facebook} alt="Logo do Instagram" />
        <img src={twitter} alt="Logo do X" />
      </FooterLogo>
      <FooterText>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade <br />
        dos produtos é toda do estabelecimento contratado.
      </FooterText>
    </FooterContainer>
  )
}

export default Footer
