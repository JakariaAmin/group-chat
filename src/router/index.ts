import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Chats from "../views/Chats.vue";
import Chat from "@/views/Chat.vue";
import ChatHome from "@/layouts/ChatHome.vue";
import Welcome from "@/views/Welcome.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path     : '/',
        name     : 'Welcome',
        component: Welcome
    },
    {
        path     : '/home',
        name     : 'ChatHome',
        component: ChatHome,
        children : [
            {
                path     : 'chats',
                name     : 'Chats',
                component: Chats,
            },
            {
                path     : 'status',
                name     : 'Status',
                component: () => import('../views/Status.vue')
            },
            {
                path: 'calls',
                name: 'Calls',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Calls.vue')
            }
        ]
    },
    {
        path     : '/home/chats/:id',
        name     : 'Chat',
        component: Chat,
    },
]

const router = new VueRouter(
    {
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })

export default router;
