// C8 e A3 · Detalhe da aula (aluno e administrador)
import {Link, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {Stars} from '../../components/Stars'
import {Tag} from '../../components/Tag'
import {useAuth} from '../../context/AuthContext'
import {useLoad} from '../../hooks/useLoad'
import {toast, fail} from '../../utils/feedback'
import {fD, fH, brl} from '../../utils/format'

export function DetalheAula() {
  const {id} = useParams(),
    {isAdm, can} = useAuth(),
    s = useLoad(() => api('GET', '/agendamentos/' + id + '/'), [id])
  const act = async k => {
    if (k == 'cancelar' && !confirm('Deseja cancelar esta aula?')) return
    try {
      await api('POST', `/agendamentos/${id}/${k}/`)
      toast('Aula atualizada')
      s.reload()
    } catch (e) {
      fail(e)
    }
  }

  const Ab = ({k, l, c = ''}) => (
    <button className={'btn ' + c} style={{marginTop: 10}} onClick={() => act(k)}>
      {l}
    </button>
  )

  return (
    <Page title="Detalhe da aula" back={isAdm ? 'ag' : 'aulas'}>
      <Load s={s}>
        {a => (
          <>
            <div className="card">
              <div className="sp">
                <b>{a.servico.nome}</b>
                <Tag s={a.status} />
              </div>
              <div>
                {fD(a.inicio)} às {fH(a.inicio)}
              </div>
              <div className="mut">
                {a.recurso.nome} · {a.servico.duracao} min · {brl(a.servico.preco)}
              </div>
              {isAdm && <div className="mut">Aluno: {a.aluno}</div>}
              {a.observacoes && <p>{a.observacoes}</p>}
              {a.avaliacao && (
                <p>
                  <Stars n={a.avaliacao.nota} />
                  <br />
                  <span className="mut">{a.avaliacao.comentario}</span>
                </p>
              )}
            </div>
            {can('confirmar_agendamento') && a.status == 'solicitado' && (
              <Ab k="confirmar" l="Confirmar" />
            )}
            {can('concluir_agendamento') && a.status == 'confirmado' && (
              <Ab k="concluir" l="Concluir" />
            )}
            {can('cancelar_agendamento') && ['solicitado', 'confirmado'].includes(a.status) && (
              <Ab k="cancelar" l="Cancelar" c="bad" />
            )}
            {can('avaliar_agendamento') && a.status == 'concluido' && !a.avaliacao && (
              <Link className="btn" style={{marginTop: 10}} to={'/aval/' + a.id}>
                Avaliar
              </Link>
            )}
          </>
        )}
      </Load>
    </Page>
  )
}