// C5 · Confirmar agendamento
import {Navigate, useNavigate} from 'react-router-dom'
import {api} from '../../api/client'
import {Form, Field} from '../../components/Form'
import {Page} from '../../components/Page'
import {B} from '../../state/booking'
import {toast} from '../../utils/feedback'
import {fD, fH, brl, msg} from '../../utils/format'

export function ConfirmarAgendamento() {
  const nav = useNavigate(),
    s = B.serv
  if (!B.ini) return <Navigate to="/serv" replace />
  return (
    <Page title="Confirmar agendamento" back="data">
      <div className="card">
        <b>{s.nome}</b>
        <div className="mut">{B.rn}</div>
        <div>
          {fD(B.ini)} às {fH(B.ini)}
        </div>
        <div className="mut">
          {s.duracao} min · {brl(s.preco)}
        </div>
      </div>
      <Form
        label="Confirmar"
        onSubmit={async d => {
          try {
            B.res = await api('POST', '/agendamentos/', {
              servico: B.s,
              recurso: B.rid,
              inicio: B.ini,
              observacoes: d.observacoes,
            })
          } catch (e) {
            if (e.status == 400 && e.data.inicio) {
              toast(msg(e.data.inicio))
              return nav('/data')
            }
            throw e
          }
          nav('/env')
        }}
      >
        <Field n="observacoes" label="Observações" type="area" />
      </Form>
    </Page>
  )
}
