export const StatusFilter = ({v, set}) => (
  <div className="tabs">
    {[
      ['', 'Todos'],
      ['true', 'Ativos'],
      ['false', 'Inativos'],
    ].map(([k, t]) => (
      <button key={k} className={v == k ? 'on' : ''} onClick={() => set(k)}>
        {t}
      </button>
    ))}
  </div>
)
