import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from "@/store";
import User from "@/data/interface/User";
import {ChatStatus} from "@/data/enum/ChatStatus";
import Chat from "@/data/interface/Chat";


// initial state:
const initialState = (): User => ({} as User);

// state:
const state = (): User => {
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

    initUser({commit}, payload: User) {
        commit('INIT_USER', payload);
    },

    // insert new chat intro conversation thread:
    pushChat({state}, payload: Chat) {
        return new Promise((resolve) => {
            state.chats?.push(payload);

            resolve(true);
        })
    },

    // insert new chats intro conversation thread, mock data to reach 5000:
    pushChats({state}, payload: Chat[]) {
        return new Promise((resolve) => {

            state.chats?.splice(0, 0, ...payload);

            resolve(true);
        })
    },

    setRead({commit}, payload) {
        commit('SET_READ', payload);
    },
}

// mutations:
const mutations: MutationTree<User> = {
    RESET() {
        return initialState();
    },

    // set mock user and chat data:
    INIT_USER(state: User, payload: User) {
        Object.assign(state, payload);
    },

    // set all not own messages to read status:
    SET_READ(state: User, id: string) {
        const updatedState = state.chats?.map(chat => {
            if (chat.user?.id !== id && chat.status !== ChatStatus.read) {
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
