// A1 · Agenda do dia
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {api, all} from '../../api/client'
import {DayBar} from '../../components/DayBar'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {Tag} from '../../components/Tag'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {today} from '../../utils/date'
import {fH} from '../../utils/format'
import {list} from '../../utils/pagination'

export function AgendaDoDia() {
  const [dia, setDia] = useState(B.ad || today()),
    [af, setAf] = useState(B.af || '')
  B.ad = dia
  B.af = af
  const s = useLoad(
    async () => ({
      rs: list(await api('GET', '/recursos/')),
      l: await all(
        `/agendamentos/?data_inicio=${dia}&data_fim=${dia}` + (af ? '&recurso=' + af : ''),
      ),
    }),
    [dia, af],
  )
  return (
    <Page title="Agenda do dia">
      <DayBar d={dia} set={setDia} />
      <Load s={s}>
        {({rs, l}) => (
          <>
            <label className="f">
              <select value={af} onChange={e => setAf(e.target.value)}>
                <option value="">Todos os professores</option>
                {rs.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.nome}
                  </option>
                ))}
              </select>
            </label>
            {l.length ? (
              l.map(a => (
                <Link key={a.id} className="item" to={'/aula/' + a.id}>
                  <div className="sp">
                    <b>
                      {fH(a.inicio)} · {a.servico.nome}
                    </b>
                    <Tag s={a.status} />
                  </div>
                  <div className="mut">
                    {a.recurso.nome} · {a.aluno}
                  </div>
                  {a.observacoes && <div className="mut">“{a.observacoes}”</div>}
                </Link>
              ))
            ) : (
              <Empty>Nenhuma aula neste dia</Empty>
            )}
          </>
        )}
      </Load>
    </Page>
  )
}
