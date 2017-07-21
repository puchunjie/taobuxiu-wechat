import * as types from '../mutation-types'
const state = {
    orderConfirmData: []
}

// getters
const getters = {
    orderConfirmData: state => state.orderConfirmData
}

// actions
const actions = {
    setOrderData({ commit, state }, data) {
        commit(types.SET_ORDER_DATA, data)
    },
    resetOrderData({ commit, state }) {
        commit(types.RESET_ORDER_DATA)
    }
}

// mutations
const mutations = {
    [types.SET_ORDER_DATA](state, data) {
        state.orderConfirmData = data
    },
    [types.RESET_ORDER_DATA](state) {
        state.orderConfirmData = []
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}