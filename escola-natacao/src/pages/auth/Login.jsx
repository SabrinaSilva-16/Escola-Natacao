// E3 · Login: entra no app
import {Link} from 'react-router-dom'
import {Form, Field} from '../../components/Form'
import {Page} from '../../components/Page'
import {useAuth} from '../../context/AuthContext'

export function Login() {
  const {login} = useAuth()
  return (
    <Page title="Entrar" back="ent">
      <Form label="Entrar" onSubmit={d => login(d.email, d.senha)}>
        <Field n="email" label="E-mail" type="email" v="aluno@escola.com" required />
        <Field n="senha" label="Senha" type="password" v="123456" required />
      </Form>
      <p>
        <Link to="/esq">Esqueci minha senha</Link>
      </p>
      <p className="mut">
        Não tem conta? <Link to="/cad">Criar conta</Link>
      </p>
    </Page>
  )
}
