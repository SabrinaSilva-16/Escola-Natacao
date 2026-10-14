// E4 · Esqueci minha senha: pede o link de nova senha
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {ORG} from '../../api/config'
import {Form, Field} from '../../components/Form'
import {Page} from '../../components/Page'

export function EsqueciSenha() {
  const [ok, setOk] = useState(false)
  return (
    <Page title="Esqueci minha senha">
      {ok ? (
        <p className="card">
          Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha. O link
          vale por 1 hora e só pode ser usado uma vez.
        </p>
      ) : (
        <Form
          label="Enviar link"
          onSubmit={async d => {
            await api('POST', '/auth/redefinir-senha/', {organizacao: ORG, email: d.email})
            setOk(true)
          }}
        >
          <Field n="email" label="E-mail" type="email" required />
        </Form>
      )}
      <p>
        <Link to="/login">Voltar para o login</Link>
      </p>
    </Page>
  )
}
