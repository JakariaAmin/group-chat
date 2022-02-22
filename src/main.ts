import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import vuetify from "@/plugins/vuetify";

import './quasar';

import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.component("DynamicScroller", DynamicScroller);
Vue.component("DynamicScrollerItem", DynamicScrollerItem);

Vue.config.productionTip = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import firebaseMessaging from './firebase';
Vue.prototype.$messaging = firebaseMessaging;


new Vue(
    {
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')


// TODO: virtual scroll jumps on new data insert.
// TODO: virtual scroll load more logic improvement.

// TODO: page transition.
// TODO: margin between chat bubble overlapping. specially in desktop layout.
