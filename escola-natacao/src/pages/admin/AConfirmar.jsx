// A2 · A confirmar: pedidos novos
import {api} from '../../api/client'
import {AulaItem} from '../../components/AulaItem'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {fail} from '../../utils/feedback'
import {list} from '../../utils/pagination'

export function AConfirmar() {
  const s = useLoad(async () => list(await api('GET', '/agendamentos/?status=solicitado'))),
    act = async (id, k) => {
      try {
        await api('POST', `/agendamentos/${id}/${k}/`)
        s.reload()
      } catch (e) {
        fail(e)
      }
    }
  return (
    <Page title="A confirmar">
      <Load s={s}>
        {l =>
          l.length ? (
            l.map(a => (
              <div key={a.id} className="item">
                <AulaItem a={a} />
                <div className="row">
                  <button className="btn sm" onClick={() => act(a.id, 'confirmar')}>
                    Confirmar
                  </button>
                  <button className="btn sm bad" onClick={() => act(a.id, 'cancelar')}>
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Empty>Nenhum pedido para confirmar</Empty>
          )
        }
      </Load>
    </Page>
  )
}
