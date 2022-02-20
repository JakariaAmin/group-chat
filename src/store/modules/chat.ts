import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from "@/store";
import User from "@/data/interface/User";
import Chat from "@/data/interface/Chat";
import {ChatStatus} from "@/data/enum/ChatStatus";


// initial state:
const initialState = (): User => ({} as User);

// state:
const state = () => {
    return initialState();
}

// getters:
const getters: GetterTree<User, StateInterface> = {
    getUser: (state: User, id: string) => {
        return state;
    },
}

// actions:
const actions: ActionTree<User, StateInterface> = {
    reset({commit}) {
        commit('RESET');
    },

    initUser({commit}, payload: User) {
        commit('INIT_USER', payload);
    },

    pushChat({commit}, payload: any) {
        commit('PUSH_CHAT', payload);
    },

    setRead({commit}, payload: any) {
        commit('SET_READ', payload);
    },
}

// mutations:
const mutations: MutationTree<User> = {
    RESET(state: User) {
        return initialState();
    },

    // set mock user and chat data:
    INIT_USER(state: User, payload: User) {
        Object.assign(state, payload);
    },

    // insert new chat intro conversation thread:
    PUSH_CHAT(state: User, payload: Chat) {
        state.chats?.push(payload);
    },

    // set all messages to read:
    SET_READ(state: User, payload: any) {
        const updatedState = state.chats?.map(chat => {
            if (chat.status !== ChatStatus.read) {
                chat.status = ChatStatus.read;
            }

            return {...chat};
        });

        console.log('SET_READ: ', {updatedState});

        return Object.assign(state, updatedState);
    },
}

// module:
const ChatModule: Module<User, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default ChatModule;
