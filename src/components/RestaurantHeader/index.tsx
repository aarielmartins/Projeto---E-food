import { Link, useParams } from 'react-router-dom'
import fundoRestaurante from '../../assets/images/fundoRestaurante.png'
import logo from '../../assets/images/logo.png'
import {
  Cart,
  ContainerImg,
  Containerlogo,
  HeaderContainer,
  HomeLink,
  Img,
  Italic,
  Overlay
} from './styles'
import { useEffect, useState } from 'react'
import Cardapio from '../../models/cardapio'

const RestaurantHeader = () => {
  const [cardapio, setCardapio] = useState<Cardapio>()

  const { id } = useParams()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setCardapio(res))
  })

  const cardapioRestaurante = cardapio

  return (
    <HeaderContainer style={{ backgroundImage: `url(${fundoRestaurante})` }}>
      <Containerlogo>
        <HomeLink to={'/'}>Restaurantes</HomeLink>
        <Link to={'/'}>
          <img src={logo} alt="Logo da Efood" />
        </Link>
        <Cart>0 produto(s) no carrinho</Cart>
      </Containerlogo>
      <ContainerImg
        style={{ backgroundImage: `url(${cardapioRestaurante?.capa})` }}
      >
        <Img className="container">
          <Italic>{cardapioRestaurante?.tipo}</Italic>
          <h3>{cardapioRestaurante?.titulo}</h3>
        </Img>
        <Overlay></Overlay>
      </ContainerImg>
    </HeaderContainer>
  )
}

export default RestaurantHeader
