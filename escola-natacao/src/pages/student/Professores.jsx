// C10 · Professores
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {Avatar} from '../../components/Avatar'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {list} from '../../utils/pagination'

export function Professores() {
  const s = useLoad(async () => list(await api('GET', '/recursos/')).filter(r => r.ativo))
  return (
    <Page title="Professores" back="ini">
      <Load s={s}>
        {l =>
          l.length ? (
            l.map(r => (
              <Link key={r.id} className="item row" to={'/p/' + r.id}>
                <Avatar x={r} />
                <div className="g">
                  <b>{r.nome}</b>
                  <div className="mut">{r.bio}</div>
                </div>
              </Link>
            ))
          ) : (
            <Empty>Nenhum professor cadastrado</Empty>
          )
        }
      </Load>
    </Page>
  )
}
