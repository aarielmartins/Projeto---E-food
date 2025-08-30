import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import {
  Button,
  CartBuy,
  CartContainer,
  CartContent,
  CartDescribe,
  CartGlobalContainer,
  ImageContainer,
  Lixeira,
  Overlay
} from './styles'
import { formataPreco } from '../RestaurantList/index'
import { close, remove, openOrder } from '../../store/redurcers/cart'
import lixeira from '../../assets/images/lixeira.png'

const Cart = () => {
  const { itens, isOpen } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const abrirPedido = () => {
    if (itens.length > 0) {
      dispatch(openOrder())
    } else {
      closeCart()
      alert('Seu carrinho esta vazio')
    }
  }

  // const getTotalPrice = () => {
  //   return itens.reduce((acumulador, valorAtual) => {
  //     return (acumulador += valorAtual.prices.current!)
  //   }, 0)
  // }

  return (
    <CartGlobalContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <CartContainer>
        {itens.map((item) => (
          <CartContent key={item.id}>
            <ImageContainer>
              <img src={item.foto} alt={item.nome} />
            </ImageContainer>
            <CartDescribe>
              <h4>{item.nome}</h4>
              <p>{formataPreco(item.preco)}</p>
            </CartDescribe>
            <Lixeira
              src={lixeira}
              alt="lixeira para deletar produto"
              onClick={() => removeItem(item.id)}
            />
          </CartContent>
        ))}
        <CartBuy>
          <p>Valor total</p>
          <p>
            {formataPreco(
              itens.reduce((total: number, item) => total + item.preco, 0)
            )}
          </p>
        </CartBuy>
        <Button onClick={() => abrirPedido()}>Continuar com a entrega</Button>
      </CartContainer>
    </CartGlobalContainer>
  )
}

export default Cart
