// C7 · Minhas aulas: próximos e histórico
import {useState, useEffect} from 'react'
import {api} from '../../api/client'
import {AulaItem} from '../../components/AulaItem'
import {Empty} from '../../components/Empty'
import {Page} from '../../components/Page'
import {ld, add, today} from '../../utils/date'
import {fail} from '../../utils/feedback'
import {list} from '../../utils/pagination'

export function MinhasAulas() {
  const [tab, setTab] = useState(0),
    [it, setIt] = useState(null),
    [pg, setPg] = useState(1),
    [nx, setNx] = useState(false)
  const q = p =>
    (tab
      ? `/agendamentos/?data_fim=${ld(add(new Date(), -1))}&ordering=-inicio&page=`
      : `/agendamentos/?data_inicio=${today()}&page=`) + p
  useEffect(() => {
    setIt(null)
    setPg(1)
    api('GET', q(1)).then(d => {
      setIt(list(d))
      setNx(d.next)
    }, fail)
  }, [tab])
  const more = async () => {
    const d = await api('GET', q(pg + 1))
    setIt(x => x.concat(list(d)))
    setPg(pg + 1)
    setNx(d.next)
  }
  return (
    <Page title="Minhas aulas">
      <div className="tabs">
        <button className={tab ? '' : 'on'} onClick={() => setTab(0)}>
          Próximos
        </button>
        <button className={tab ? 'on' : ''} onClick={() => setTab(1)}>
          Histórico
        </button>
      </div>
      {it === null ? (
        <p className="mut">Carregando…</p>
      ) : it.length ? (
        it.map(a => <AulaItem key={a.id} a={a} />)
      ) : (
        <Empty>Nenhuma aula aqui</Empty>
      )}
      {nx && (
        <button className="btn ghost" style={{color: 'var(--pool)'}} onClick={more}>
          Carregar mais
        </button>
      )}
    </Page>
  )
}
