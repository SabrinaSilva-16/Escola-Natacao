// C6 · Agendamento enviado
import {Link, Navigate} from 'react-router-dom'
import {Page} from '../../components/Page'
import {Tag} from '../../components/Tag'
import {B} from '../../state/booking'
import {fD, fH} from '../../utils/format'

export function AgendamentoEnviado() {
  const a = B.res
  if (!a) return <Navigate to="/ini" replace />
  return (
    <Page title="Agendamento enviado">
      <div className="card">
        <div className="sp">
          <b>{a.servico.nome}</b>
          <Tag s={a.status} />
        </div>
        <div>
          {fD(a.inicio)} às {fH(a.inicio)}
        </div>
        <div className="mut">{a.recurso.nome}</div>
      </div>
      <p className="mut">
        O administrador vai confirmar sua aula. Você acompanha o status em Aulas.
      </p>
      <Link className="btn" to={'/aula/' + a.id}>
        Ver aula
      </Link>
      <Link className="btn ghost" to="/ini" style={{marginTop: 10, color: 'var(--pool)'}}>
        Início
      </Link>
    </Page>
  )
}
