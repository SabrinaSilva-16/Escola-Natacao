// E6 · Alterar senha
import {Link, useNavigate} from 'react-router-dom'
import {api} from '../../api/client'
import {Form, Field} from '../../components/Form'
import {Page} from '../../components/Page'
import {toast} from '../../utils/feedback'

export function AlterarSenha() {
  const nav = useNavigate()
  return (
    <Page title="Alterar senha" back="perfil">
      <Form
        label="Salvar"
        onSubmit={async d => {
          if (d.nova_senha != d.conf) throw {status: 400, data: {conf: ['As senhas não conferem']}}
          await api('POST', '/auth/alterar-senha/', {
            senha_atual: d.senha_atual,
            nova_senha: d.nova_senha,
          })
          nav('/perfil')
          toast('Senha alterada')
        }}
      >
        <Field n="senha_atual" label="Senha atual" type="password" required />
        <Field n="nova_senha" label="Nova senha" type="password" required />
        <Field n="conf" label="Confirmar nova senha" type="password" required />
      </Form>
      <p>
        <Link to="/perfil">Cancelar</Link>
      </p>
    </Page>
  )
}
