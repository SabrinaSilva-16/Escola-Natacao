// Menu da administração
import {Link} from 'react-router-dom'
import {Page} from '../../components/Page'

export const Administracao = () => (
  <Page title="Administração">
    {[
      ['neg', 'Dados do negócio'],
      ['aprof', 'Professores'],
      ['aserv', 'Serviços'],
      ['aav', 'Avaliações'],
    ].map(([k, l]) => (
      <Link key={k} className="item sp" to={'/' + k}>
        <b>{l}</b>
        <span>›</span>
      </Link>
    ))}
  </Page>
)
