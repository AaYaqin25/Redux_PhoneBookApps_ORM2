import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import UserBox from "./components/UserBox";
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))
function App() {
  return (
    <Provider store={store}>
      <UserBox />
    </Provider>
  );
}

export default App;
