import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";

// import VirtualList from "vue-virtual-scroll-list";
import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false;

Vue.component("DynamicScroller", DynamicScroller);
Vue.component("DynamicScrollerItem", DynamicScrollerItem);

new Vue(
    {
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')



// TODO: scroll to bottom on page open not fully working.
// TODO: margin between chat bubble overlapping. specially in desktop layout.
// TODO: chat text input width fix.
// TODO: virtual scroll jumps on new data insert.
// TODO: virtual scroll load more logical improvement.
// TODO: page transition.
