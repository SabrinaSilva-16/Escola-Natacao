import {BRAND} from './config'
// Estado de sessão em memória: tokens (também guardados no navegador) e dados do negócio.
export const S = {tk: null, u: null, org: {nome: BRAND, descricao: '', logo: null}}
try {
  S.tk = JSON.parse(localStorage.getItem('tk'))
} catch {}
export const save = () => {
  try {
    S.tk ? localStorage.setItem('tk', JSON.stringify(S.tk)) : localStorage.removeItem('tk')
  } catch {}
}
