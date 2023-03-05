import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import './grid.scss'

const Grid = () => {
  const columns = useSelector<RootState>(state => state.tiles.columns)
  console.log(`columns`, columns)
  return (
    <div className="grid">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="7.6923076923076925" height="7.6923076923076925" className="grid-cell__rectangle"></rect>
        <rect x="7.6923076923076925" y="0" width="7.6923076923076925" height="7.6923076923076925" className="grid-cell__rectangle"></rect>
      </svg>
    </div>
  )
}

export default Grid
