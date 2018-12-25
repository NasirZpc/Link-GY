import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
    userinfo : '',
    activeIndex:'0',
}

export default () => {
    return new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    })
}
