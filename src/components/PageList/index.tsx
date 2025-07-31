import { useEffect, useState } from 'react'
import { HomeListContainer } from './styles'
import PageRestaurant from '../PageRestaurants'
import Restaurante from '../../models/restaurante'

const PageList = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])

  useEffect(() => {
    fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setRestaurantes(res))
  }, [])

  const itens = restaurantes

  return (
    <div className="container">
      <HomeListContainer>
        {itens.map((item) => (
          <PageRestaurant
            key={item.id}
            id={item.id}
            produto={item.titulo}
            image={item.capa}
            avaliacao={item.avaliacao}
            descricao={item.descricao}
            indicador={item.tipo}
            destaque={item.destacado}
          />
        ))}
      </HomeListContainer>
    </div>
  )
}

export default PageList
