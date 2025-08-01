import styled from 'styled-components'

export const ItensCartContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 32px;
  column-gap: 32px;
  margin-top: 64px;
  margin-bottom: 120px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
