import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    userInfo: {
        avator: "",
        becomeStatus: 0,
        mobile: "",
        name: "",
        salesMan: {
            id: 0,
            name: "",
            tel: ""
        },
        sellerData: {
            biddingSupplyCount: 0,
            buys: 0,
            integral: 0,
            irons: 0,
            orders: 0,
            supplyPendingCount: 0,
            supplySuccessCount: 0
        },
        userData: {
            biddingSupplyCount: 0,
            buys: 0,
            integral: 0.0,
            irons: 0,
            orders: 0,
            supplyPendingCount: 0,
            supplySuccessCount: 0
        },
        userId: ""
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
    },
    resetUserInfo({ commit, state }) {
        commit(types.RESET_USER_INFO)
    },
}

// mutations
const mutations = {
    [types.GET_USER_INFO](state, userData) {
        state.userInfo = userData
    },
    [types.RESET_USER_INFO](state) {
        state.userInfo = {
            avator: "",
            becomeStatus: 0,
            mobile: "",
            name: "",
            salesMan: {
                id: 0,
                name: "",
                tel: ""
            },
            sellerData: {
                biddingSupplyCount: 0,
                buys: 0,
                integral: 0,
                irons: 0,
                orders: 0,
                supplyPendingCount: 0,
                supplySuccessCount: 0
            },
            userData: {
                biddingSupplyCount: 0,
                buys: 0,
                integral: 0.0,
                irons: 0,
                orders: 0,
                supplyPendingCount: 0,
                supplySuccessCount: 0
            },
            userId: ""
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}