// A8 · Serviços (administrador)
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {StatusFilter} from '../../components/StatusFilter'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {brl} from '../../utils/format'
import {list} from '../../utils/pagination'

export function ServicosAdmin() {
  const [f, setF] = useState(B.sa || '')
  B.sa = f
  const s = useLoad(
    async () => list(await api('GET', '/servicos/' + (f ? '?ativo=' + f : ''))),
    [f],
  )
  return (
    <Page title="Serviços" back="adm">
      <StatusFilter v={f} set={setF} />
      <Link className="btn sm" to="/fserv/novo" style={{marginBottom: 12}}>
        Novo serviço
      </Link>
      <Load s={s}>
        {l =>
          l.length ? (
            l.map(x => (
              <Link key={x.id} className="item" to={'/fserv/' + x.id}>
                <div className="sp">
                  <b>{x.nome}</b>
                  <span className="tag">{x.ativo ? 'Ativo' : 'Inativo'}</span>
                </div>
                <div className="mut">
                  {x.duracao} min · {brl(x.preco)}
                </div>
              </Link>
            ))
          ) : (
            <Empty>Cadastre o primeiro serviço</Empty>
          )
        }
      </Load>
    </Page>
  )
}
