declare module '*.vue' {
    import Vue from "vue";
    export default Vue
}

declare module 'vue-virtual-scroller' {
    import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
    export {DynamicScroller, DynamicScrollerItem}
}

/*declare module 'vue-virtual-scroll-list' {
    import {VirtualList} from 'vue-virtual-scroll-list'
    export {VirtualList}
}*/
