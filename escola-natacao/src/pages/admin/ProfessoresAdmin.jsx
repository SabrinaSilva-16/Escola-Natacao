// A5 · Professores (administrador)
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {Avatar} from '../../components/Avatar'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {StatusFilter} from '../../components/StatusFilter'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {list} from '../../utils/pagination'

export function ProfessoresAdmin() {
  const [f, setF] = useState(B.pa || '')
  B.pa = f
  const s = useLoad(
    async () => list(await api('GET', '/recursos/' + (f ? '?ativo=' + f : ''))),
    [f],
  )
  return (
    <Page title="Professores" back="adm">
      <StatusFilter v={f} set={setF} />
      <Link className="btn sm" to="/fprof/novo" style={{marginBottom: 12}}>
        Novo professor
      </Link>
      <Load s={s}>
        {l =>
          l.length ? (
            l.map(r => (
              <Link key={r.id} className="item row" to={'/fprof/' + r.id}>
                <Avatar x={r} />
                <div className="g">
                  <b>{r.nome}</b>
                  <div className="mut">Capacidade: {r.capacidade}</div>
                </div>
                <span className="tag">{r.ativo ? 'Ativo' : 'Inativo'}</span>
              </Link>
            ))
          ) : (
            <Empty>Cadastre o primeiro professor</Empty>
          )
        }
      </Load>
    </Page>
  )
}
