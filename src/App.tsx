import { Provider } from 'react-redux'
import Game from './Game'
import store from './store/store'

type Props = {
  gameData?: string
}
const App = ({ gameData }: Props) => (
  <Provider store={store}>
    <Game gameData={gameData} />
  </Provider>
)

export default App