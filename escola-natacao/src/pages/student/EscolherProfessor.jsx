// C3 · Escolher professor (2º passo do agendamento)
import {Link, Navigate, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Avatar} from '../../components/Avatar'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {list} from '../../utils/pagination'

export function EscolherProfessor() {
  const {sid} = useParams(),
    s = useLoad(async () => {
      B.s = +sid
      B.serv = list(await api('GET', '/servicos/')).find(x => x.id == sid)
      if (B.rec) {
        B.rid = B.rec
        return {skip: 1}
      }
      return {l: list(await api('GET', '/recursos/?servicos=' + sid))}
    }, [sid])
  return (
    <Page title="Escolher professor" back="serv">
      <Load s={s}>
        {({skip, l}) =>
          skip ? (
            <Navigate to="/data" replace />
          ) : l.length ? (
            <>
              <Link className="item" to="/data" onClick={() => (B.rid = null)}>
                <b>Qualquer um</b>
                <div className="mut">Mostra os horários de todos os professores.</div>
              </Link>
              {l.map(r => (
                <div key={r.id} className="item" style={{margin: '0 0 10px'}}>
                  <Link
                    to="/data"
                    onClick={() => (B.rid = r.id)}
                    className="row"
                    style={{textDecoration: 'none', color: 'inherit'}}
                  >
                    <Avatar x={r} />
                    <div className="g">
                      <b>{r.nome}</b>
                      <div className="mut">{r.bio}</div>
                    </div>
                  </Link>
                  <Link to={'/p/' + r.id} className="mut">
                    Ver avaliações
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <Empty>Nenhum professor realiza este serviço.</Empty>
          )
        }
      </Load>
    </Page>
  )
}