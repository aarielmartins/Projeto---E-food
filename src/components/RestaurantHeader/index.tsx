import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { open } from '../../store/redurcers/cart'
import Cardapio from '../../models/cardapio'
import { RootReducer } from '../../store'

const RestaurantHeader = () => {
  const [cardapio, setCardapio] = useState<Cardapio>()

  const { id } = useParams()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setCardapio(res))
  }, [id])

  const cardapioRestaurante = cardapio

  const dispatch = useDispatch()
  const { itens } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderContainer style={{ backgroundImage: `url(${fundoRestaurante})` }}>
      <Containerlogo className="container">
        <HomeLink to={'/'}>Restaurantes</HomeLink>
        <Link to={'/'}>
          <img src={logo} alt="Logo da Efood" />
        </Link>
        <Cart onClick={openCart}>{itens.length} produto(s) no carrinho</Cart>
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
