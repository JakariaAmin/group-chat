import Vue from "vue";
import Vuex from "vuex";
import User from "@/data/interface/User";
import createPersistedState from 'vuex-persistedstate';
import UserModule from "@/store/modules/user";
import ChatsModule from "@/store/modules/chat";
import ChatModule from "@/store/modules/chat";

Vue.use(Vuex);

// vuex modules:
const modules = {
    user : UserModule,
    chats: ChatsModule,
    chat: ChatModule,
}

// selective persisted state:
const persistedState = createPersistedState(
    {
        paths: ['user', 'chats', 'chat']
    });

export interface StateInterface {
    user: User;
    chats: User[];
    chat: User;
}

export default new Vuex.Store<StateInterface>(
    {
        modules: modules,

        actions: {
            // resets state of all the modules: this.$store.dispatch('reset');
            reset({commit}) {
                Object.keys(modules).forEach(moduleName => {
                    commit(`${moduleName}/RESET`);
                })
            }
        },

        plugins: [persistedState],
    })
