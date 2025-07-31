import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Restaurante from '../../models/restaurante'
import RestaurantFood from '../RestaurantFood'
import { ItensCartContainer } from './styles'

const RestaurantList = () => {
  const { id } = useParams()

  const [food, setFood] = useState<Restaurante>()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setFood(res))
  }, [id])

  const itens = food

  return (
    <ItensCartContainer>
      {itens &&
        itens.cardapio.map((iten) => (
          <RestaurantFood
            key={iten.id}
            img={iten.foto}
            name={iten.nome}
            descricao={iten.descricao}
          />
        ))}
    </ItensCartContainer>
  )
}

export default RestaurantList
