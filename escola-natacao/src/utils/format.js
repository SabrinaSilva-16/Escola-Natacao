export const fD = i =>
  new Date(i).toLocaleDateString('pt-BR', {weekday: 'short', day: '2-digit', month: 'short'})
export const fH = i => i.slice(11, 16)
export const brl = v => Number(v).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
export const ST = {
  solicitado: 'Solicitada',
  confirmado: 'Confirmada',
  concluido: 'Concluída',
  cancelado: 'Cancelada',
}
export const msg = d =>
  Array.isArray(d)
    ? d.join(' ')
    : d?.detail ||
      d?.non_field_errors?.join(' ') ||
      Object.values(d || {})
        .flat()
        .join(' ') ||
      'Dados inválidos'
