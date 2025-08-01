import { Button, ContainerImg, ItenCartContainer } from './styles'

type Props = {
  img?: string
  name?: string
  descricao?: string
  onClick?: () => void
}

const RestaurantFood = ({ img, name, descricao, onClick }: Props) => {
  //FUNÇÃO PARA DETERMINAR O TAMANHO DA DESCRIÇÃO
  const getDescricao = (des: string) => {
    if (des.length > 105) {
      return des.slice(0, 102) + ' ...'
    }
    return des
  }
  return (
    <>
      <ItenCartContainer onClick={onClick}>
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
