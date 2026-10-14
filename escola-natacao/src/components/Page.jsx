import {Link} from 'react-router-dom'
export const Page = ({title, back, children}) => (
  <main>
    {title && (
      <div className="top">
        {back && (
          <Link className="bk" to={'/' + back} aria-label="Voltar">
            ‹
          </Link>
        )}
        <h2 style={{margin: 0}}>{title}</h2>
      </div>
    )}
    {children}
  </main>
)
