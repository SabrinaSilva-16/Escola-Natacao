import {Routes, Route, Navigate} from 'react-router-dom'
import Protected from './components/Protected'
import {Entrada, Cadastro, Login, EsqueciSenha, Perfil, AlterarSenha} from './pages/auth'
import {
  Inicio,
  EscolherServico,
  EscolherProfessor,
  EscolherHorario,
  ConfirmarAgendamento,
  AgendamentoEnviado,
  MinhasAulas,
  DetalheAula,
  AvaliarAula,
  Professores,
  PerfilProfessor,
} from './pages/student'
import {
  AgendaDoDia,
  AConfirmar,
  Administracao,
  DadosNegocio,
  ProfessoresAdmin,
  FormProfessor,
  HorariosProfessor,
  ServicosAdmin,
  FormServico,
  AvaliacoesAdmin,
} from './pages/admin'

const privada = C => (
  <Protected>
    <C />
  </Protected>
)
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ent" replace />} />
      <Route path="/ent" element={<Entrada />} />
      <Route path="/cad" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/esq" element={<EsqueciSenha />} />
      <Route path="/perfil" element={privada(Perfil)} />
      <Route path="/senha" element={privada(AlterarSenha)} />
      <Route path="/ini" element={privada(Inicio)} />
      <Route path="/serv" element={privada(EscolherServico)} />
      <Route path="/serv/:prof" element={privada(EscolherServico)} />
      <Route path="/esc/:sid" element={privada(EscolherProfessor)} />
      <Route path="/data" element={privada(EscolherHorario)} />
      <Route path="/conf" element={privada(ConfirmarAgendamento)} />
      <Route path="/env" element={privada(AgendamentoEnviado)} />
      <Route path="/aulas" element={privada(MinhasAulas)} />
      <Route path="/aula/:id" element={privada(DetalheAula)} />
      <Route path="/aval/:id" element={privada(AvaliarAula)} />
      <Route path="/profs" element={privada(Professores)} />
      <Route path="/p/:id" element={privada(PerfilProfessor)} />
      <Route path="/ag" element={privada(AgendaDoDia)} />
      <Route path="/aconf" element={privada(AConfirmar)} />
      <Route path="/adm" element={privada(Administracao)} />
      <Route path="/neg" element={privada(DadosNegocio)} />
      <Route path="/aprof" element={privada(ProfessoresAdmin)} />
      <Route path="/fprof/:id" element={privada(FormProfessor)} />
      <Route path="/hor/:id" element={privada(HorariosProfessor)} />
      <Route path="/aserv" element={privada(ServicosAdmin)} />
      <Route path="/fserv/:id" element={privada(FormServico)} />
      <Route path="/aav" element={privada(AvaliacoesAdmin)} />
      <Route path="*" element={<Navigate to="/ent" replace />} />
    </Routes>
  )
}
