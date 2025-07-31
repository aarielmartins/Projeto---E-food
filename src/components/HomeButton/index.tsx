import { HomeLink } from './styles'

type Props = {
  nome: string
  to: string
}

const HomeButton = ({ nome, to }: Props) => {
  return <HomeLink to={to}>{nome}</HomeLink>
}

export default HomeButton
