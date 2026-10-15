// A6 · Novo/editar professor
import {Link, useNavigate, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Form, Field} from '../../components/Form'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {toast} from '../../utils/feedback'

export function FormProfessor() {
  const {id} = useParams(),
    nav = useNavigate(),
    nw = id == 'novo',
    s = useLoad(
      async () => (nw ? {capacidade: 1, ativo: true} : api('GET', '/recursos/' + id + '/')),
      [id],
    )
  return (
    <Page title={nw ? 'Novo professor' : 'Editar professor'} back="aprof">
      <Load s={s}>
        {r => (
          <>
            <Form
              label="Salvar"
              onSubmit={async d => {
                await api(nw ? 'POST' : 'PATCH', nw ? '/recursos/' : `/recursos/${id}/`, d)
                toast('Professor salvo')
                nav('/aprof')
              }}
            >
              <Field n="nome" label="Nome" v={r.nome} required />
              <Field n="bio" label="Bio" type="area" v={r.bio} />
              <Field n="foto" label="Foto" type="file" />
              <Field
                n="capacidade"
                label="Capacidade (alunos por horário)"
                type="number"
                min="1"
                v={r.capacidade}
              />
              <Field n="ativo" label="Ativo" type="check" v={r.ativo} />
            </Form>
            {!nw && (
              <Link
                className="btn ghost"
                to={'/hor/' + id}
                style={{marginTop: 10, color: 'var(--pool)'}}
              >
                Horários
              </Link>
            )}
          </>
        )}
      </Load>
    </Page>
  )
}
