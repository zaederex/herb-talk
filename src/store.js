import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import strainStoreConfing from './reducers/strain';

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        return (handlers[action.type] && handlers[action.type](state, action)) || state;
    }
}

const strainReducers = createReducer(strainStoreConfing.initialState, strainStoreConfing.actions);

const rootReducer = combineReducers({
    strains: strainReducers,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));