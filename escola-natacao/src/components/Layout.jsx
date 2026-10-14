import {useLocation} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import Nav from './Nav'
const SEM_MENU = ['/', '/ent', '/login', '/cad', '/esq']
export default function Layout({children}) {
  const {u} = useAuth(),
    {pathname} = useLocation()
  return (
    <>
      {children}
      {u && !SEM_MENU.includes(pathname) && <Nav />}
    </>
  )
}
