
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Apis from '../views/Apis.vue';
import Api from '../views/Api.vue';
import Endpoint from '../views/Endpoint.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        {
            path: `/apis/:id`,
            props: true,
            component: Api
        },
        {
            path: "/apis",
            component: Apis
        },
        {
            path: `/endpoints/:id`,
            props: true,
            component: Endpoint
        }
    ]
})

export default router