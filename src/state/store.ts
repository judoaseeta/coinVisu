import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { createBrowserHistory } from 'history';
// reducers
import { rootReducer } from './reducers';
// sagas
import rootSaga from './sagas';
export const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleWare({
    context: {
        history
    }
});

const configStore = (initialState?:any) => {
    const store = initialState ?  createStore( rootReducer,initialState,applyMiddleware(sagaMiddleWare)) : createStore( rootReducer,applyMiddleware(sagaMiddleWare));
    sagaMiddleWare.run(rootSaga);
    return store;
}
export default configStore;
