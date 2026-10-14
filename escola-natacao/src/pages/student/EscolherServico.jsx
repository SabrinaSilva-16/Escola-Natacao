// C2 · Escolher serviço (1º passo do agendamento)
import {Link, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {brl} from '../../utils/format'
import {list} from '../../utils/pagination'

export function EscolherServico() {
  const {prof} = useParams()
  B.rec = prof ? +prof : null
  const s = useLoad(async () => list(await api('GET', '/servicos/')).filter(x => x.ativo))
  return (
    <Page title="Escolher serviço" back="ini">
      <Load s={s}>
        {l =>
          l.length ? (
            l.map(x => (
              <Link key={x.id} className="item" to={'/esc/' + x.id}>
                {x.imagem ? <img className="im" src={x.imagem} alt="" /> : <div className="im" />}
                <div className="sp">
                  <b>{x.nome}</b>
                  <b>{brl(x.preco)}</b>
                </div>
                <div className="mut">{x.descricao}</div>
                <div className="mut">{x.duracao} min</div>
              </Link>
            ))
          ) : (
            <Empty>Nenhum serviço disponível</Empty>
          )
        }
      </Load>
    </Page>
  )
}
