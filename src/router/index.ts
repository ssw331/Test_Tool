import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Triangle from "../components/exec/Triangle.vue";
import Calender from "../components/exec/Calender.vue";
import Pannel from "../components/Pannel.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld
    },
    {
        path: '/exec',
        name: 'Exec',
        component: Pannel,
        children: [
            {
                path: 'triangle',
                name: 'Triangle',
                component: Triangle,
            },
            {
                path: 'calender',
                name: 'Calender',
                component: Calender,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router