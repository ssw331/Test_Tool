import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Triangle from "../components/exec/Triangle.vue";
import Calender from "../components/exec/Calender.vue";
import Telecom from "../components/exec/Telecom.vue";
// import Pannel from "../components/PannelTemplate.vue";
import Pannel from "../components/Pannel.vue";
import DefaultOne from "../components/exec/DefaultOne.vue";

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
                path: '',
                name: 'Default',
                component: DefaultOne,
            },
            {
                path: 'triangle',
                name: 'Triangle',
                component: Triangle,
            },
            {
                path: 'calender',
                name: 'Calender',
                component: Calender,
            },
            {
                path: 'telecom',
                name: 'Telecom',
                component: Telecom,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router