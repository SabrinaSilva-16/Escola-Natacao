import {Empty} from './Empty'
export const Load = ({s, children}) =>
  s.e ? (
    <Empty>
      Não foi possível carregar esta tela.
      <br />
      <button className="btn" onClick={s.reload}>
        Tentar de novo
      </button>
    </Empty>
  ) : s.d === undefined ? (
    <p className="mut">Carregando…</p>
  ) : (
    children(s.d)
  )
