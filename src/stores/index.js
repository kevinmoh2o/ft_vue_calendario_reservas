import { createStore } from 'vuex'
import state from './state'
import * as action from './action'

/* 
const stores = {
    namespaced: true,
    action,
    state
} */
const stores = createStore({
    modules: {
        action,
        state
    }
})

export default stores