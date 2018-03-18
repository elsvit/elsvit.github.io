// @flow
import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './modules';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;