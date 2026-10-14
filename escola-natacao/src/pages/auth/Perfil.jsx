// E5 · Meu perfil: ver e editar os dados e sair
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {Avatar} from '../../components/Avatar'
import {Form, Field} from '../../components/Form'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useAuth} from '../../context/AuthContext'
import {useLoad} from '../../hooks/useLoad'
import {toast} from '../../utils/feedback'

export function Perfil() {
  const {setU, logout} = useAuth(),
    s = useLoad(() => api('GET', '/auth/eu/')),
    sv = async d => {
      setU(await api('PATCH', '/auth/eu/', d))
      s.reload()
    }
  return (
    <Page title="Meu perfil">
      <Load s={s}>
        {u => (
          <>
            <div className="row" style={{marginBottom: 16}}>
              <Avatar x={u} lg />
              <div className="g">
                <h3>{u.nome}</h3>
                <div className="mut">{u.email}</div>
                <div className="mut">{u.organizacao}</div>
              </div>
            </div>
            <Form
              key={u.nome + u.foto}
              label="Salvar"
              onSubmit={async d => {
                await sv(d)
                toast('Perfil atualizado')
              }}
            >
              <Field n="nome" label="Nome" v={u.nome} required />
              <Field n="foto" label="Trocar foto" type="file" />
            </Form>
            {u.foto && (
              <button
                className="btn ghost sm"
                style={{marginTop: 10}}
                onClick={() => sv({foto: null})}
              >
                Remover foto
              </button>
            )}
            <hr style={{border: 0, borderTop: '1px solid var(--line)', margin: '20px 0'}} />
            <Link className="btn ghost" to="/senha" style={{color: 'var(--pool)'}}>
              Alterar senha
            </Link>
            <button className="btn bad" style={{marginTop: 10}} onClick={logout}>
              Sair
            </button>
          </>
        )}
      </Load>
    </Page>
  )
}
