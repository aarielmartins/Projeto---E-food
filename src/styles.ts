import { createGlobalStyle } from 'styled-components'

export const cores = {
  branco: '#f4f4f4',
  cinza: '#838383',
  chumbo: '#0b0b0b',
  fundo: '#FFFFFF'
}

export const GlobalCss = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  body {
    background-color: ${cores.fundo};
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 768px) {
      max-width: 80%;
    }
  }
`
