import { createStore } from 'vuex'

import programacionModule from '../../modules/agenda/store/programacion'



const stores = createStore({
    modules: {
        programacionModule
        
    }
})

export default stores