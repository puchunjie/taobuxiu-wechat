import * as types from '../mutation-types'
const state = {
    pageInfo: {
        currentPage: 0,
        pageCount: 10,
        ironType: '',
        material: '',
        surface: '',
        proPlace: '',
        keyword: '',
        default: true,
        order: 'default'
    }
}

// getters
const getters = {
    pageInfo: state => state.pageInfo
}

// actions
const actions = {
    setUserInfo({ commit, state }, userData) {
        commit(types.GET_USER_INFO, userData)
    },
    resetUserInfo({ commit, state }) {
        commit(types.RESET_USER_INFO)
    },
}

// mutations
const mutations = {
    [types.GET_USER_INFO](state, userData) {
        state.userInfo = userData
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}