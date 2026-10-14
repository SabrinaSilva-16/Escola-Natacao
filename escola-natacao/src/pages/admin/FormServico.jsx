// A9 · Novo / editar serviço
import {useNavigate, useParams} from 'react-router-dom'
import {api} from '../../api/client'
import {Form, Field} from '../../components/Form'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {toast} from '../../utils/feedback'
import {list} from '../../utils/pagination'

export function FormServico() {
  const {id} = useParams(),
    nav = useNavigate(),
    nw = id == 'novo',
    s = useLoad(
      async () => ({
        s: nw
          ? {duracao: 45, preco: 0, ativo: true, recursos: []}
          : await api('GET', '/servicos/' + id + '/'),
        rs: list(await api('GET', '/recursos/')),
      }),
      [id],
    )
  return (
    <Page title={nw ? 'Novo serviço' : 'Editar serviço'} back="aserv">
      <Load s={s}>
        {({s: x, rs}) => (
          <Form
            label="Salvar"
            onSubmit={async d => {
              if (!(d instanceof FormData)) d.recursos ??= []
              await api(nw ? 'POST' : 'PATCH', nw ? '/servicos/' : `/servicos/${id}/`, d)
              toast('Serviço salvo')
              nav('/aserv')
            }}
          >
            <Field n="nome" label="Nome" v={x.nome} required />
            <Field n="descricao" label="Descrição" type="area" v={x.descricao} />
            <Field n="duracao" label="Duração (min)" type="number" min="1" v={x.duracao} />
            <Field n="preco" label="Preço (R$)" type="number" min="0" step="0.01" v={x.preco} />
            <Field n="imagem" label="Imagem" type="file" />
            <b style={{fontSize: 14}}>Professores que oferecem</b>
            <div style={{margin: '8px 0 14px'}}>
              {rs.map(r => (
                <label key={r.id} className="f chk" style={{marginBottom: 6}}>
                  <input
                    type="checkbox"
                    name="recursos"
                    data-m="1"
                    value={r.id}
                    defaultChecked={(x.recursos || []).includes(r.id)}
                  />
                  {r.nome}
                </label>
              ))}
            </div>
            <Field n="ativo" label="Ativo" type="check" v={x.ativo} />
          </Form>
        )}
      </Load>
    </Page>
  )
}
