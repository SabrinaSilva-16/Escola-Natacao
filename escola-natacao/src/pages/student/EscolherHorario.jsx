// C4 · Escolher data e horário
import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {api} from '../../api/client'
import {DayBar} from '../../components/DayBar'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {today} from '../../utils/date'
import {fH} from '../../utils/format'

export function EscolherHorario() {
  const nav = useNavigate(),
    [dia, setDia] = useState(B.dia || today())
  B.dia = dia
  const s = useLoad(
    () =>
      api(
        'GET',
        `/horarios-livres/?servico=${B.s}&data=${dia}` + (B.rid ? '&recurso=' + B.rid : ''),
      ),
    [dia],
  )
  if (!B.s) return <Navigate to="/serv" replace />
  return (
    <Page title="Data e horário" back={B.rec ? 'p/' + B.rec : 'esc/' + B.s}>
      <DayBar d={dia} set={setDia} />
      <Load s={s}>
        {l =>
          l.length ? (
            l.map(g => (
              <div key={g.recurso.id}>
                <h3>{g.recurso.nome}</h3>
                <div className="slots">
                  {g.inicios.map(i => (
                    <button
                      key={i}
                      className="chip"
                      onClick={() => {
                        B.rid = g.recurso.id
                        B.rn = g.recurso.nome
                        B.ini = i
                        nav('/conf')
                      }}
                    >
                      {fH(i)}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <Empty>
              Sem horários livres neste dia
              <br />
              Tente outro dia com as setas acima.
            </Empty>
          )
        }
      </Load>
    </Page>
  )
}
