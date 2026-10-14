import {ST} from '../utils/format'
export const Tag = ({s}) => <span className={'tag ' + s}>{ST[s]}</span>
