import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { postsReducer } from './postsReducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['posts']
}

const rootReducer = combineReducers({
    posts: postsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer<RootState>(persistConfig, rootReducer);