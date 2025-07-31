import star from '../../assets/images/star.png'
import HomeButton from '../HomeButton'
import {
  Avaliacao,
  Descricao,
  DescricaoContainer,
  HomeItensContainer,
  ImageContainer,
  Indicadores,
  NameConatiner
} from './styles'

type Props = {
  produto: string
  image: string
  avaliacao: number
  descricao: string
  indicador: string[]
  id: number
  destaque: boolean
}

const PageRestaurant = ({
  produto,
  avaliacao,
  image,
  id,
  descricao,
  indicador,
  destaque
}: Props) => {
  console.log(destaque)
  return (
    <HomeItensContainer>
      <ImageContainer>
        <img src={image} alt={produto} />
        <Indicadores>
          {destaque && <p>Destaque da semana</p>}
          <p>{indicador}</p>
        </Indicadores>
      </ImageContainer>
      <DescricaoContainer>
        <NameConatiner>
          <h3>{produto}</h3>
          <Avaliacao>
            <p>{avaliacao}</p>
            <img src={star} alt="" />
          </Avaliacao>
        </NameConatiner>
        <Descricao>
          <p>{descricao}</p>
        </Descricao>
        <HomeButton to={`/restaurante/${id}`} nome="Saiba Mais" />
      </DescricaoContainer>
    </HomeItensContainer>
  )
}

export default PageRestaurant
