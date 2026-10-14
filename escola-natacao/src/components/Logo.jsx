import {S} from '../api/session'
export const Logo = () =>
  S.org.logo ? (
    <img src={S.org.logo} alt="" />
  ) : (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      stroke="#0B6E7F"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <path d="M4 18q7-8 11 0t11 0 11 0 11 0M4 32q7-8 11 0t11 0 11 0 11 0" />
    </svg>
  )
