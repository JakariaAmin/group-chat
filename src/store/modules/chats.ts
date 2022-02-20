import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from "@/store";
import User from "@/data/interface/User";
import Chat from "@/data/interface/Chat";
import {ChatStatus} from "@/data/enum/ChatStatus";


// initial state:
const initialState = (): User[] => ([] as User[]);

// state:
const state = (): User[] => {
    return initialState();
}

// getters:
const getters: GetterTree<User[], StateInterface> = {
    // get count of total unread messages of all users:
    getTotalUnread: (state: User[]) => {
        let count = 0;

        state.forEach(user => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            count += user.chats?.reduce((count, chat) => chat.status !== ChatStatus.read ? ++count : count, 0);
        });

        return count;
    },

    // get count of unread messages of target user:
    getUserUnread: (state: User[]) => (id: string) => {
        const count = state.find(val => val.id === id)?.chats?.reduce((count, chat) => chat.status !== ChatStatus.read ? ++count : count, 0);

        console.log('getUserUnread: ', {id, count});

        return count;
    },

    getUser: (state: User[], id: string) => {
        return state.find(val => val.id === id);
    },
}

// actions:
const actions: ActionTree<User[], StateInterface> = {
    reset({commit}) {
        commit('RESET');
    },

    initUsers({commit}, payload: User[]) {
        commit('INIT_USERS', payload);
    },

    pushChat({commit}, payload) {
        commit('PUSH_CHAT', payload);
    },

    // get count of unread messages of target user:
    countUnread({state}, id: string) {
        return new Promise((resolve) => {
            resolve(state.find(val => val.id === id)?.chats?.reduce((count, chat) => chat.status !== ChatStatus.read ? ++count : count, 0));
        })
    },
}

// mutations:
const mutations: MutationTree<User[]> = {
    RESET() {
        return initialState();
    },

    // set mock user and chats data:
    INIT_USERS(state: User[], payload: User[]) {
        Object.assign(state, payload);
    },

    // insert new chat intro conversation thread with target user:
    PUSH_CHAT(state: User[], payload) {
        const id: string = payload?.id;
        const chat: Chat = payload?.chat;

        // const targetUser: User | undefined = state.find(val => val.id === id);
        // targetUser?.chats?.push(chat);

        state.find(val => val.id === id)?.chats?.push(chat);
    },
}

// module:
const ChatsModule: Module<User[], StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default ChatsModule;
