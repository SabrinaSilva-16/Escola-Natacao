import {useState, useContext, createContext} from 'react'
import {fail} from '../utils/feedback'
import {msg} from '../utils/format'
export const Ctx = createContext({})
function rd(f) {
  const o = {}
  let file = 0
  for (const el of f.elements) {
    if (!el.name) continue
    let v
    if (el.type == 'file') {
      if (!el.files[0]) continue
      v = el.files[0]
      file = 1
    } else if (el.type == 'checkbox') {
      if (el.dataset.m) {
        if (el.checked) (o[el.name] ??= []).push(+el.value)
        continue
      }
      v = el.checked
    } else if (el.type == 'number') v = el.value === '' ? '' : +el.value
    else v = el.value
    o[el.name] = v
  }
  if (!file) return o
  const fd = new FormData()
  for (const k in o) [].concat(o[k]).forEach(x => fd.append(k, x))
  return fd
}
const norm = d =>
  Array.isArray(d) || d.detail || d.non_field_errors
    ? {_g: msg(d)}
    : Object.fromEntries(Object.entries(d).map(([k, v]) => [k, [].concat(v).join(' ')]))
export function Form({onSubmit, label, children}) {
  const [err, setErr] = useState({}),
    [busy, setBusy] = useState(false)
  async function sub(ev) {
    ev.preventDefault()
    const f = ev.target
    setErr({})
    setBusy(true)
    try {
      await onSubmit(rd(f))
    } catch (e) {
      e.status == 400 ? setErr(norm(e.data)) : fail(e)
    }
    setBusy(false)
  }
  return (
    <form onSubmit={sub}>
      <Ctx.Provider value={err}>{children}</Ctx.Provider>
      {err._g && <i className="gen">{err._g}</i>}
      <button className="btn" disabled={busy}>
        {label}
      </button>
    </form>
  )
}
export const Err = ({n}) => {
  const e = useContext(Ctx)
  return e[n] ? <i className="err">{e[n]}</i> : null
}
export function Field({n, label, type = 'text', v, ...p}) {
  if (type == 'check')
    return (
      <label className="f chk">
        <input type="checkbox" name={n} defaultChecked={v ?? true} />
        {label}
      </label>
    )
  return (
    <label className="f">
      {label}
      {type == 'area' ? (
        <textarea name={n} rows="3" defaultValue={v} />
      ) : (
        <input
          name={n}
          type={type}
          defaultValue={type == 'file' ? undefined : v}
          accept={type == 'file' ? 'image/*' : undefined}
          {...p}
        />
      )}
      <Err n={n} />
    </label>
  )
}
