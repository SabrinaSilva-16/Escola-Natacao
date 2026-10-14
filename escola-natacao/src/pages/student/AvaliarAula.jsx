// C9 · Avaliar aula concluída
import {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Form, Err, Field} from '../../components/Form'
import {Page} from '../../components/Page'
import {toast} from '../../utils/feedback'

export function AvaliarAula() {
  const {id} = useParams(),
    nav = useNavigate(),
    [n, setN] = useState(5)
  return (
    <Page title="Avaliar aula" back={'aula/' + id}>
      <Form
        label="Enviar"
        onSubmit={async d => {
          await api('POST', `/agendamentos/${id}/avaliar/`, {nota: n, comentario: d.comentario})
          toast('Avaliação enviada')
          nav('/aula/' + id)
        }}
      >
        <div>
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              type="button"
              className={'star' + (i <= n ? ' on' : '')}
              aria-label={i + ' estrelas'}
              onClick={() => setN(i)}
            >
              ★
            </button>
          ))}
        </div>
        <Err n="nota" />
        <Field n="comentario" label="Comentário" type="area" />
      </Form>
    </Page>
  )
}
