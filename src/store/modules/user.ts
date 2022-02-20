import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from "@/store";
import User from "@/data/interface/User";


// initial state:
const initialState = (): User => ({} as User);

// state:
const state = () => {
    return initialState();
}

// getters:
const getters: GetterTree<User, StateInterface> = {
    getUser: (state: User) => {
        return state;
    },
}

// actions:
const actions: ActionTree<User, StateInterface> = {
    reset({commit}) {
        commit('RESET');
    },

    updateUser({commit}, payload: User) {
        commit('UPDATE_USER', payload);
    },
}

// mutations:
const mutations: MutationTree<User> = {
    RESET(state: User) {
        return initialState();
    },

    UPDATE_USER(state: User, payload: User) {
        Object.assign(state, payload);
    },
}

// module:
const UserModule: Module<User, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default UserModule;
