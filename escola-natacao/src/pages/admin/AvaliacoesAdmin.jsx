// A10 · Avaliações
import {useState} from 'react'
import {api} from '../../api/client'
import {Empty} from '../../components/Empty'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {Stars} from '../../components/Stars'
import {useLoad} from '../../hooks/useLoad'
import {B} from '../../state/booking'
import {list} from '../../utils/pagination'

export function AvaliacoesAdmin() {
  const [rp, setR] = useState(B.ar || ''),
    [nt, setN] = useState(B.an || '')
  B.ar = rp
  B.an = nt
  const s = useLoad(
    async () => ({
      rs: list(await api('GET', '/recursos/')),
      l: list(
        await api(
          'GET',
          '/avaliacoes/?' + new URLSearchParams({...(rp && {recurso: rp}), ...(nt && {nota: nt})}),
        ),
      ),
    }),
    [rp, nt],
  )
  return (
    <Page title="Avaliações" back="adm">
      <Load s={s}>
        {({rs, l}) => (
          <>
            <div className="row">
              <label className="f g">
                <select value={rp} onChange={e => setR(e.target.value)}>
                  <option value="">Professor</option>
                  {rs.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label className="f g">
                <select value={nt} onChange={e => setN(e.target.value)}>
                  <option value="">Nota</option>
                  {[5, 4, 3, 2, 1].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            {l.length ? (
              l.map(a => (
                <div key={a.id} className="card">
                  <div>
                    <Stars n={a.nota} />
                  </div>
                  <div>{a.comentario}</div>
                  <div className="mut">
                    {a.aluno} · {a.servico} · {a.recurso.nome}
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
