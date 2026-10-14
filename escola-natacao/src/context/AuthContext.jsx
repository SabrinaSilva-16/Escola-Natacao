import {createContext, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {S, save} from '../api/session'
import {api} from '../api/client'
import {ORG} from '../api/config'
const Auth = createContext(null)
export const useAuth = () => useContext(Auth)
const ADMIN = 'api.change_organizacao'
export function AuthProvider({children}) {
  const [u, setU] = useState(null),
    [ready, setReady] = useState(!S.tk),
    nav = useNavigate()
  useEffect(() => {
    if (S.tk)
      api('GET', '/auth/eu/')
        .then(setU)
        .catch(() => {})
        .finally(() => setReady(true))
  }, [])
  const isAdm = !!u?.permissoes.includes(ADMIN),
    can = x => !!u?.permissoes.includes('api.' + x)
  const login = async (email, senha) => {
    S.tk = await api('POST', '/auth/login/', {organizacao: ORG, email, senha})
    save()
    const me = await api('GET', '/auth/eu/')
    setU(me)
    nav(me.permissoes.includes(ADMIN) ? '/ag' : '/ini')
  }
  const logout = () => {
    S.tk = null
    save()
    setU(null)
    nav('/ent')
  }
  if (!ready)
    return (
      <main>
        <p className="mut">Carregando…</p>
      </main>
    )
  return <Auth.Provider value={{u, setU, isAdm, can, login, logout}}>{children}</Auth.Provider>
}
