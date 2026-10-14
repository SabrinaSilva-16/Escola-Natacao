// C11 · Perfil do professor e avaliações
import {Link, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Avatar} from '../../components/Avatar'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {Stars} from '../../components/Stars'
import {useAuth} from '../../context/AuthContext'
import {useLoad} from '../../hooks/useLoad'
import {list} from '../../utils/pagination'

export function PerfilProfessor() {
  const {id} = useParams(),
    {can} = useAuth(),
    s = useLoad(async () => {
      const [r, sv, av] = await Promise.all([
        api('GET', '/recursos/' + id + '/'),
        api('GET', '/servicos/'),
        api('GET', '/avaliacoes/?recurso=' + id),
      ])
      return {r, ss: list(sv).filter(x => (x.recursos || []).includes(r.id)), l: list(av)}
    }, [id])
  return (
    <Page title="Professor" back="profs">
      <Load s={s}>
        {({r, ss, l}) => (
          <>
            <div className="row" style={{marginBottom: 12}}>
              <Avatar x={r} lg />
              <div className="g">
                <h2>{r.nome}</h2>
                <div className="mut">{r.bio}</div>
              </div>
            </div>
            <p>
              {ss.map(x => (
                <span key={x.id} className="tag" style={{marginRight: 6}}>
                  {x.nome}
                </span>
              ))}
            </p>
            {can('add_agendamento') && (
              <Link className="btn" to={'/serv/' + r.id}>
                Agendar com este professor
              </Link>
            )}
            <h3 style={{marginTop: 20}}>Avaliações</h3>
            {l.length ? (
              l.map(a => (
                <div key={a.id} className="card">
                  <div>
                    <Stars n={a.nota} />
                  </div>
                  <div>{a.comentario}</div>
                  <div className="mut">
                    {a.aluno} · {a.servico}
                  </div>
                </div>
              ))
            ) : (
              <Empty>Ainda sem avaliações</Empty>
            )}
          </>
        )}
      </Load>
    </Page>
  )
}
