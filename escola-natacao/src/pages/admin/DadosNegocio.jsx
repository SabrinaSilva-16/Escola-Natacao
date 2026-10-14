// A4 · Dados do negócio
import {api} from '../../api/client'
import {S} from '../../api/session'
import {Form, Field} from '../../components/Form'
import {Load} from '../../components/Load'
import {Page} from '../../components/Page'
import {useLoad} from '../../hooks/useLoad'
import {toast} from '../../utils/feedback'

export function DadosNegocio() {
  const s = useLoad(() => api('GET', '/organizacao/')),
    sv = async d => {
      S.org = await api('PATCH', '/organizacao/', d)
      s.reload()
    }
  return (
    <Page title="Dados do negócio" back="adm">
      <Load s={s}>
        {o => {
          S.org = o
          return (
            <>
              <Form
                key={o.nome + o.logo}
                label="Salvar"
                onSubmit={async d => {
                  await sv(d)
                  toast('Dados salvos')
                }}
              >
                <Field n="nome" label="Nome" v={o.nome} required />
                <Field n="descricao" label="Descrição" type="area" v={o.descricao} />
                <Field n="logo" label="Trocar logo" type="file" />
              </Form>
              {o.logo && (
                <button
                  className="btn ghost sm"
                  style={{marginTop: 10}}
                  onClick={() => sv({logo: null})}
                >
                  Remover logo
                </button>
              )}
            </>
          )
        }}
      </Load>
    </Page>
  )
}
