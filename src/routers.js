import houseList from "./components/houseList.vue";
import houseAdd from "./components/houseAdd.vue";
import houseUpd from "./components/houseUpd.vue"
import {createRouter, createWebHistory} from "vue-router";

const routes=[
    {
        name:'houseList',
        component:houseList,
        path:'/houseList',
    },
    {
        name:'houseAdd',
        component:houseAdd,
        path:'/houseAdd',
    },
    {
        name:'houseUpd',
        component:houseUpd,
        path:'/houseUpd/:id',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router