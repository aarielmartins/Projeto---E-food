import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { cores } from '../../styles'

export const HomeLink = styled(Link)`
  background-color: ${cores.laranja};
  color: ${cores.fundo};
  text-align: center;
  padding: 4px 8px;
  border: none;
  font-size: 14px;
  text-decoration: none;
`
