import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    userInfo: {
        userId: 123
    }
}

// getters
const getters = {
    userInfo: state => state.userInfo
}

// actions
const actions = {
    setUserInfo({ commit, state }, userData) {
        commit(types.GET_USER_INFO, userData)
    }
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