import {msg} from './format'
export function toast(t) {
  document.querySelector('.toast')?.remove()
  const e = document.createElement('div')
  e.className = 'toast'
  e.textContent = t
  document.body.append(e)
  setTimeout(() => e.remove(), 3200)
}
export function fail(e) {
  if (e.status == 401) return
  if (e.status == 404) {
    toast('Não encontrado')
    return history.back()
  }
  toast(
    {
      403: 'Você não tem permissão para esta ação',
      429: 'Muitas tentativas, aguarde um minuto',
      400: msg(e.data),
    }[e.status] || 'Sem conexão com o servidor. Tente de novo.',
  )
}
