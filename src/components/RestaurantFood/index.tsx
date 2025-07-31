import { Button, ContainerImg, ItenCartContainer } from './styles'

type Props = {
  img?: string
  name?: string
  descricao?: string
}

const RestaurantFood = ({ img, name, descricao }: Props) => {
  //FUNÇÃO PARA DETERMINAR O TAMANHO DA DESCRIÇÃO
  const getDescricao = (des: string) => {
    if (des.length > 105) {
      return des.slice(0, 102) + ' ...'
    }
    return des
  }
  return (
    <>
      <ItenCartContainer>
        <ContainerImg>
          <img src={img} alt={name} />
        </ContainerImg>
        <h3>{name}</h3>
        <p>{descricao && getDescricao(descricao)}</p>
        <Button>adicionar ao carrinho</Button>
      </ItenCartContainer>
    </>
  )
}

export default RestaurantFood
