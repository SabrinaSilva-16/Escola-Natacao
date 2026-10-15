// E1 · Entrada: primeira tela
import {Link, Navigate} from 'react-router-dom'
import {S} from '../../api/session'
import {Logo} from '../../components/Logo'
import {useAuth} from '../../context/AuthContext'

export function Entrada() {
  const {u, isAdm} = useAuth()
  if (u) return <Navigate to={isAdm ? '/ag' : '/ini'} replace />
  return (
    <div className="hero">
      <div className="ropes" />
      <div className="in">
        <div className="logo">
          <Logo />
        </div>
        <h1>{S.org.nome}</h1>
        <p>Aulas de natação para adultos e crianças. Agende, acompanhe e avalie.</p>
        <Link className="btn" to="/login">
          Entrar
        </Link>
        <Link className="btn ghost" to="/cad">
          Criar conta
        </Link>
      </div>
      <div className="ropes" />
    </div>
  )
}