import {useState, useEffect} from 'react'
import {fail} from '../utils/feedback'
export function useLoad(fn, deps = []) {
  const [s, set] = useState({}),
    [n, setN] = useState(0)
  useEffect(() => {
    let ok = true
    set({})
    fn().then(
      d => ok && set({d}),
      e => {
        fail(e)
        ok && set({e: 1})
      },
    )
    return () => {
      ok = false
    }
  }, [...deps, n])
  return {...s, reload: () => setN(x => x + 1)}
}
