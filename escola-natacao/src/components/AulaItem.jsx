import {Link} from 'react-router-dom'
import {Tag} from './Tag'
import {useAuth} from '../context/AuthContext'
import {fD, fH} from '../utils/format'
export const AulaItem = ({a}) => {
  const {isAdm} = useAuth()
  return (
    <Link className="item" to={'/aula/' + a.id}>
      <div className="sp">
        <b>{a.servico.nome}</b>
        <Tag s={a.status} />
      </div>
      <div className="mut">
        {fD(a.inicio)} às {fH(a.inicio)} · {a.recurso.nome}
        {isAdm && ' · ' + a.aluno}
      </div>
    </Link>
  )
}
