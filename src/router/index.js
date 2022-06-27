
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Apis from '../views/Apis.vue';
import Endpoints from '../views/Endpoints.vue';
import Testgroups from '../views/Testgroups.vue';

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
            path: `/apis/:id/endpoints`,
            props: true,
            component: Endpoints
        },
        {
            path: "/apis",
            component: Apis
        },
        {
            path: `/endpoints/:id/testgroups`,
            props: true,
            component: Testgroups
        }
    ]
})

export default router