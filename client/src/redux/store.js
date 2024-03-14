import {compose,createStore,applyMiddleware} from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware({})

const configureStore = preloadedState=> createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(
    sagaMiddleware
  ))
)

const store = configureStore({})

sagaMiddleware.run(rootSaga)

export default store