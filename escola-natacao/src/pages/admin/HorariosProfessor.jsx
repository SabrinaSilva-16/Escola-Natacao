// A7 · Horários do professor
import {useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {toast, fail} from '../../utils/feedback'
import {list} from '../../utils/pagination'

export function HorariosProfessor() {
  const {id} = useParams(),
    s = useLoad(async () => list(await api('GET', '/disponibilidades/?recurso=' + id))),
    dn = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  const run = async f => {
    try {
      await f()
      s.reload()
    } catch (e) {
      fail(e)
      s.reload()
    }
  }
  return (
    <Page title="Horários do professor" back={'fprof/' + id}>
      <Load s={s}>
        {l => (
          <>
            {!l.length && <Empty>Sem horários: ninguém consegue agendar</Empty>}
            {dn.map((n, i) => (
              <div key={i} className="card">
                <h3>{n}</h3>
                {l
                  .filter(x => x.dia == i)
                  .map(x => (
                    <div key={x.id} className="row" style={{marginBottom: 8}}>
                      {['inicio', 'fim'].map(k => (
                        <input
                          key={k + x.id + x[k]}
                          className="chip"
                          type="time"
                          defaultValue={x[k]}
                          onChange={e =>
                            e.target.value &&
                            run(() =>
                              api('PATCH', '/disponibilidades/' + x.id + '/', {
                                [k]: e.target.value,
                              }).then(() => toast('Horário salvo')),
                            )
                          }
                        />
                      ))}
                      <button
                        className="chip"
                        style={{flex: 'none'}}
                        aria-label="Remover"
                        onClick={() => run(() => api('DELETE', '/disponibilidades/' + x.id + '/'))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                <button
                  className="btn ghost sm"
                  style={{color: 'var(--pool)'}}
                  onClick={() =>
                    run(() =>
                      api('POST', '/disponibilidades/', {
                        recurso: +id,
                        dia: i,
                        inicio: '08:00',
                        fim: '12:00',
                      }),
                    )
                  }
                >
                  Adicionar faixa
                </button>
              </div>
            ))}
          </>
        )}
      </Load>
    </Page>
  )
}
