export const Avatar = ({x, lg}) => (
  <span className={'av' + (lg ? ' lg' : '')}>
    {x.foto ? <img src={x.foto} alt="" /> : (x.nome || '?')[0]}
  </span>
)
