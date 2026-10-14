import {ld, add} from '../utils/date'
export const DayBar = ({d, set}) => {
  const sh = v => set(ld(add(new Date(d + 'T12:00'), v)))
  return (
    <div className="row" style={{marginBottom: 12}}>
      <button className="chip" style={{flex: 'none'}} onClick={() => sh(-1)}>
        ‹
      </button>
      <input
        className="chip"
        type="date"
        value={d}
        onChange={e => e.target.value && set(e.target.value)}
        style={{flex: 1}}
      />
      <button className="chip" style={{flex: 'none'}} onClick={() => sh(1)}>
        ›
      </button>
    </div>
  )
}
