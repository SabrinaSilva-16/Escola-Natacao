import {NavLink} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
const ALUNO = [
  ['ini', 'Início'],
  ['serv', 'Agendar', 'add_agendamento'],
  ['aulas', 'Aulas'],
  ['profs', 'Professores'],
  ['perfil', 'Perfil'],
]
const ADMIN = [
  ['ag', 'Agenda'],
  ['aconf', 'A confirmar'],
  ['adm', 'Administração'],
  ['perfil', 'Perfil'],
]
export default function Nav() {
  const {isAdm, can} = useAuth()
  return (
    <nav>
      {(isAdm ? ADMIN : ALUNO)
        .filter(([, , p]) => !p || can(p))
        .map(([k, l]) => (
          <NavLink key={k} to={'/' + k} className={({isActive}) => (isActive ? 'on' : '')}>
            {l}
          </NavLink>
        ))}
    </nav>
  )
}
