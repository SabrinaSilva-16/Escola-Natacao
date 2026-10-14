import {MOCK, BASE} from './config'
import {mock} from './mock'
import {S, save} from './session'
import {list} from '../utils/pagination'
const go = p => {
  location.hash = '#/' + p
}
/* ===== Cliente da API ===== */
async function raw(m, p, b) {
  if (MOCK) return mock(m, p, b)
  const h = {}
  if (S.tk?.access && !p.includes('/auth/login') && !p.includes('/auth/cadastro'))
    h.Authorization = 'Bearer ' + S.tk.access
  if (b && !(b instanceof FormData)) {
    h['Content-Type'] = 'application/json'
    b = JSON.stringify(b)
  }
  const r = await fetch(BASE + p, {method: m, headers: h, body: b})
  let d = null
  try {
    d = await r.json()
  } catch {}
  return {status: r.status, data: d}
}
export async function api(m, p, b) {
  let r = await raw(m, p, b)
  if (r.status == 401 && S.tk?.refresh && !p.includes('/auth/')) {
    const t = await raw('POST', '/auth/renovar/', {refresh: S.tk.refresh})
    if (t.status == 200) {
      S.tk.access = t.data.access
      save()
      r = await raw(m, p, b)
    }
  }
  if (r.status == 401 && !p.includes('/auth/login')) {
    S.tk = null
    S.u = null
    save()
    go('login')
  }
  if (r.status >= 400) throw r
  return r.data
}
export async function all(p) {
  let o = [],
    pg = 1,
    d
  do {
    d = await api('GET', p + (p.includes('?') ? '&' : '?') + 'page=' + pg++)
    o = o.concat(list(d))
  } while (d.next)
  return o
}
