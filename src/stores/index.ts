import {createStore} from 'redux';
import rootReducer from '~stores/rootReducer';
export const store = createStore(rootReducer);
