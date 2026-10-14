export const p2 = n => String(n).padStart(2, '0')
export const ld = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`
export const add = (d, n) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
export const today = () => ld(new Date())
