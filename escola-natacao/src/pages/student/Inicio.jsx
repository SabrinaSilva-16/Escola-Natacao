// C1 · Início: resumo para o aluno
import {Link} from 'react-router-dom'
import {api} from '../../api/client'
import {S} from '../../api/session'
import {AulaItem} from '../../components/AulaItem'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Logo} from '../../components/Logo'
import {Page} from '../../components/Page'
import {useAuth} from '../../context/AuthContext'
import {useLoad} from '../../hooks/useLoad'
import {today} from '../../utils/date'
import {list} from '../../utils/pagination'

export function Inicio() {
  const {can} = useAuth(),
    s = useLoad(async () => {
      const [o, l] = await Promise.all([
        api('GET', '/organizacao/'),
        api('GET', '/agendamentos/?data_inicio=' + today()),
      ])
      S.org = o
      return {
        o,
        a: list(l).find(
          x => ['solicitado', 'confirmado'].includes(x.status) && new Date(x.inicio) > new Date(),
        ),
      }
    })
  return (
    <Page>
      <Load s={s}>
        {({o, a}) => (
          <>
            <div className="row" style={{marginBottom: 16}}>
              <div className="logo" style={{margin: 0, border: '1px solid var(--line)'}}>
                <Logo />
              </div>
              <div>
                <h2 style={{margin: 0}}>{o.nome}</h2>
                <div className="mut">{o.descricao}</div>
              </div>
            </div>
            <h3>Próxima aula</h3>
            {a ? <AulaItem a={a} /> : <Empty>Você não tem aulas agendadas</Empty>}
            {can('add_agendamento') && (
              <Link className="btn" to="/serv">
                Agendar
              </Link>
            )}
          </>
        )}
      </Load>
    </Page>
  )
}
