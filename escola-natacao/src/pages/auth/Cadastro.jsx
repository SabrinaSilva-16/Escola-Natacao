// E2 · Cadastro: cria a conta de aluno
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {ORG} from '../../api/config'
import {Form, Field} from '../../components/Form'
import {Page} from '../../components/Page'
import {useAuth} from '../../context/AuthContext'

export function Cadastro() {
  const {login} = useAuth()
  return (
    <Page title="Criar conta" back="ent">
      <Form
        label="Criar conta"
        onSubmit={async d => {
          await api('POST', '/auth/cadastro/', {...d, organizacao: ORG})
          await login(d.email, d.senha)
        }}
      >
        <Field n="nome" label="Nome" required />
        <Field n="email" label="E-mail" type="email" required />
        <Field n="senha" label="Senha" type="password" required />
      </Form>
      <p className="mut">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </Page>
  )
}
