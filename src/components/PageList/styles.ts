// Importaçãod bibliotecas externas
import styled from 'styled-components'

export const HomeListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 80px;
  column-gap: 80px;
  margin-top: 80px;
  margin-bottom: 120px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
