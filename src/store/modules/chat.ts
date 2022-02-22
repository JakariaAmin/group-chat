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

    getChats: (state: User) => {
        return state.chats;
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

    pushThreadChat({commit}, chat: Chat) {
        commit('PUSH_CHAT', chat);
    },

    // insert new chat intro conversation thread:
    pushChat({commit, state}, payload: any) {
        return new Promise((resolve) => {
            commit('PUSH_CHAT', payload.chat);

            // update chats module too.
            // as chat module can get too large 5000+ chats, had to se 2 module, 1 for users 1 for chats.
            // find solution to improve this part and use 1 state rather than 2.
            commit('chats/PUSH_CHAT', payload, {root: true});

            resolve(true);
        })
    },

    // insert new chats intro conversation thread, mock data to reach 5000:
    pushChats({state}, chats: Chat[]) {
        return new Promise((resolve) => {

            state.chats?.splice(0, 0, ...chats);

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
    INIT_USER(state: User, user: User) {
        // take first 100 chats only when user load chat screen:
        Object.assign(state, user);
    },

    // insert new chat into conversation thread:
    PUSH_CHAT(state: User, chat: Chat) {
        state.chats?.push(chat);
    },

    // set all not own messages to read status:
    SET_READ(state: User, id: string) {
        const updatedChats = state.chats?.map(chat => {
            if (chat.user?.id !== id && chat.status !== ChatStatus.read) {
                chat.status = ChatStatus.read;
            }

            return {...chat};
        });

        return Object.assign(state, {...state, chats: updatedChats});
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
