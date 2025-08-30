import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { open, add } from '../../store/redurcers/cart'
import Restaurante from '../../models/restaurante'
import RestaurantFood from '../RestaurantFood'
import close from '../../assets/images/fechar.png'
import {
  CloseButton,
  Description,
  ImgModal,
  ItensCartContainer,
  ModalButton,
  ModalDescription,
  ModalContent,
  ModalContainer,
  Overlay
} from './styles'
import { CardapioIten } from '../../models/cardapio'

export const formataPreco = (preco: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const RestaurantList = () => {
  const { id } = useParams()
  const [modal, setModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CardapioIten | null>(null)

  const [food, setFood] = useState<Restaurante>()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setFood(res))
  }, [id])

  const itens = food

  const dispatch = useDispatch()

  const addToCart = (action: CardapioIten) => {
    dispatch(add(action))
    dispatch(open())
  }

  return (
    <ItensCartContainer>
      {itens &&
        itens.cardapio.map((iten) => (
          <RestaurantFood
            key={iten.id}
            img={iten.foto}
            name={iten.nome}
            descricao={iten.descricao}
            onClick={() => {
              setSelectedItem(iten)
              setModal(true)
            }}
          />
        ))}

      <ModalContainer className={modal ? 'isOpen' : ''}>
        <ModalContent>
          <CloseButton onClick={() => setModal(false)}>
            <img src={close} alt="Botão para fechar" />
          </CloseButton>
          {selectedItem && (
            <ModalDescription>
              <ImgModal>
                <img src={selectedItem.foto} alt={selectedItem.nome} />
              </ImgModal>
              <Description>
                <h3>{selectedItem.nome}</h3>
                <p>{selectedItem.descricao}</p>
                <p>Serve: {selectedItem.porcao}</p>
                <ModalButton
                  onClick={() => {
                    addToCart(selectedItem)
                    setModal(false)
                  }}
                >
                  Adicionar ao carrinho - {formataPreco(selectedItem.preco)}
                </ModalButton>
              </Description>
            </ModalDescription>
          )}
        </ModalContent>
        <Overlay onClick={() => setModal(false)}></Overlay>
      </ModalContainer>
    </ItensCartContainer>
  )
}

export default RestaurantList
