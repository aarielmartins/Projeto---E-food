import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import * as S from './styles'
import * as Yup from 'yup'
import { CartGlobalContainer } from '../Cart/styles'
import {
  open,
  closeOrder,
  openPayment,
  closePayment,
  openOrder,
  clear
} from '../../store/redurcers/cart'
import { useFormik } from 'formik'

const Checkout = () => {
  const { isOrder } = useSelector((state: RootReducer) => state.cart)
  const { isPayment } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [purchase, { data, isSuccess }] = usePurchaseMutation()

  const abrirPagamento = () => {
    dispatch(openPayment())
  }

  const voltarCarrinho = () => {
    dispatch(open())
    dispatch(closeOrder())
  }

  const voltarEndereco = () => {
    dispatch(closePayment())
    dispatch(openOrder())
  }

  const concluirOrdem = () => {
    navigate('/')
    dispatch(clear())
  }

  const formEntrega = useFormik({
    initialValues: {
      name: '',
      adress: '',
      city: '',
      cep: '',
      number: '',
      complement: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('O nome do destinatário é obrigatório'),
      adress: Yup.string().required('O endereço é obrigatório'),
      city: Yup.string().required('A cidade é obrigatória'),
      cep: Yup.string()
        .required('O CEP é obrigatório')
        .min(8, 'O campo precisa ter 8 caracteres')
        .max(8, 'O campo precisa ter 8 caracteres'),
      number: Yup.string().required('O número do endereço é obrigatório'),
      complement: Yup.string()
    }),
    onSubmit: () => {
      abrirPagamento()
    }
  })

  const formPagamento = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cvv: '',
      dueMonth: '',
      dueYear: ''
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
        .required('O nome no cartão é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres'),
      cardNumber: Yup.string()
        .required('O número do cartão é obrigatório')
        .matches(/^[0-9]{16}$/, 'O número do cartão deve ter 16 dígitos'),
      cvv: Yup.string()
        .required('O CVV é obrigatório')
        .matches(/^[0-9]{3}$/, 'O CVV deve ter 3 dígitos'),
      dueMonth: Yup.string()
        .required('O mês de vencimento é obrigatório')
        .matches(/^(0[1-9]|1[0-2])$/, 'O mês deve estar no formato MM (01)'),
      dueYear: Yup.string()
        .required('O ano de vencimento é obrigatório')
        .matches(/^[0-9]{4}$/, 'O ano deve estar no formato AAAA')
    }),
    onSubmit: (values) => {
      purchase({
        products: [
          {
            id: 1,
            price: 150
          }
        ],
        delivery: {
          receiver: formEntrega.values.name,
          address: {
            descricao: formEntrega.values.adress,
            city: formEntrega.values.city,
            zipcode: formEntrega.values.cep,
            number: Number(formEntrega.values.number),
            complement: formEntrega.values.complement
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cvv),
            expires: {
              month: Number(values.dueMonth),
              year: Number(values.dueYear)
            }
          }
        }
      })
    }
  })

  return (
    <CartGlobalContainer className={isOrder ? 'is-open' : ''}>
      <S.OrderContainer>
        {data && isSuccess ? (
          // CONFIRMAÇÃO DE PEDIDO
          <>
            <S.OrderTitle>Pedido realizado - {data.orderId}</S.OrderTitle>
            <S.OrderDescription>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </S.OrderDescription>
            <S.OrderDescription>
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
            </S.OrderDescription>
            <S.OrderDescription>
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a
              refeição.
            </S.OrderDescription>
            <S.OrderDescription>
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!
            </S.OrderDescription>
            <S.OrderButton onClick={() => concluirOrdem()}>
              Concluir
            </S.OrderButton>
          </>
        ) : (
          <>
            {isPayment ? (
              // FORMULÁRIO DE PAGAMENTO
              <form onSubmit={formPagamento.handleSubmit}>
                <S.OrderTitle>Pagamento - valor a pagar R$ 0</S.OrderTitle>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="cardName">Nome no cartão</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formPagamento.values.cardName}
                      onChange={formPagamento.handleChange}
                      onBlur={formPagamento.handleBlur}
                    />
                    {formPagamento.touched.cardName &&
                      formPagamento.errors.cardName && (
                        <S.ErrorMessage>
                          {formPagamento.errors.cardName}
                        </S.ErrorMessage>
                      )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="cardNumber">Número no cartão</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formPagamento.values.cardNumber}
                      onChange={formPagamento.handleChange}
                      onBlur={formPagamento.handleBlur}
                    />
                    {formPagamento.touched.cardNumber &&
                      formPagamento.errors.cardNumber && (
                        <S.ErrorMessage>
                          {formPagamento.errors.cardNumber}
                        </S.ErrorMessage>
                      )}
                  </S.LabelContainer>
                  <S.LabelContainer width="86px">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formPagamento.values.cvv}
                      onChange={formPagamento.handleChange}
                      onBlur={formPagamento.handleBlur}
                    />
                    {formPagamento.touched.cvv && formPagamento.errors.cvv && (
                      <S.ErrorMessage>
                        {formPagamento.errors.cvv}
                      </S.ErrorMessage>
                    )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="dueMonth">Mês de vencimento</label>
                    <input
                      type="text"
                      id="dueMonth"
                      name="dueMonth"
                      value={formPagamento.values.dueMonth}
                      onChange={formPagamento.handleChange}
                      onBlur={formPagamento.handleBlur}
                    />
                    {formPagamento.touched.dueMonth &&
                      formPagamento.errors.dueMonth && (
                        <S.ErrorMessage>
                          {formPagamento.errors.dueMonth}
                        </S.ErrorMessage>
                      )}
                  </S.LabelContainer>
                  <S.LabelContainer>
                    <label htmlFor="dueYear">Ano de vencimento</label>
                    <input
                      type="text"
                      id="dueYear"
                      name="dueYear"
                      value={formPagamento.values.dueYear}
                      onChange={formPagamento.handleChange}
                      onBlur={formPagamento.handleBlur}
                    />
                    {formPagamento.touched.dueYear &&
                      formPagamento.errors.dueYear && (
                        <S.ErrorMessage>
                          {formPagamento.errors.dueYear}
                        </S.ErrorMessage>
                      )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderButton className="marginTop" type="submit">
                  Finalizar pagamento
                </S.OrderButton>
                <S.OrderButton type="button" onClick={() => voltarEndereco()}>
                  Voltar para edição de endereço
                </S.OrderButton>
              </form>
            ) : (
              // FORMULÁRIO DE ENTREGA
              <form onSubmit={formEntrega.handleSubmit}>
                <S.OrderTitle>Entrega</S.OrderTitle>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="name">Quem irá receber</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formEntrega.values.name}
                      onChange={formEntrega.handleChange}
                      onBlur={formEntrega.handleBlur}
                    />
                    {formEntrega.touched.name && formEntrega.errors.name && (
                      <S.ErrorMessage>{formEntrega.errors.name}</S.ErrorMessage>
                    )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="adress">Endereço</label>
                    <input
                      type="text"
                      id="adress"
                      name="adress"
                      value={formEntrega.values.adress}
                      onChange={formEntrega.handleChange}
                      onBlur={formEntrega.handleBlur}
                    />
                    {formEntrega.touched.adress &&
                      formEntrega.errors.adress && (
                        <S.ErrorMessage>
                          {formEntrega.errors.adress}
                        </S.ErrorMessage>
                      )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="city">Cidade</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formEntrega.values.city}
                      onChange={formEntrega.handleChange}
                      onBlur={formEntrega.handleBlur}
                    />
                    {formEntrega.touched.city && formEntrega.errors.city && (
                      <S.ErrorMessage>{formEntrega.errors.city}</S.ErrorMessage>
                    )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={formEntrega.values.cep}
                      onChange={formEntrega.handleChange}
                      onBlur={formEntrega.handleBlur}
                    />
                    {formEntrega.touched.cep && formEntrega.errors.cep && (
                      <S.ErrorMessage>{formEntrega.errors.cep}</S.ErrorMessage>
                    )}
                  </S.LabelContainer>
                  <S.LabelContainer>
                    <label htmlFor="number">Número</label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      value={formEntrega.values.number}
                      onChange={formEntrega.handleChange}
                      onBlur={formEntrega.handleBlur}
                    />
                    {formEntrega.touched.number &&
                      formEntrega.errors.number && (
                        <S.ErrorMessage>
                          {formEntrega.errors.number}
                        </S.ErrorMessage>
                      )}
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderRow>
                  <S.LabelContainer>
                    <label htmlFor="complement">Complemento (opcional)</label>
                    <input
                      type="text"
                      id="complement"
                      name="complement"
                      value={formEntrega.values.complement}
                      onChange={formEntrega.handleChange}
                      onBlur={formEntrega.handleBlur}
                    />
                  </S.LabelContainer>
                </S.OrderRow>
                <S.OrderButton className="marginTop" type="submit">
                  Continuar com pagamento
                </S.OrderButton>
                <S.OrderButton type="button" onClick={() => voltarCarrinho()}>
                  Voltar para o carrinho
                </S.OrderButton>
              </form>
            )}
          </>
        )}
      </S.OrderContainer>
    </CartGlobalContainer>
  )
}

export default Checkout
