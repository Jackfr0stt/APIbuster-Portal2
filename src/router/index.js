import {
    createRouter,
    createWebHistory
} from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Apis from '../views/Apis.vue';
import Methods from '../views/Methods.vue';
import Testgroups from '../views/Testgroups.vue';
import Tests from '../views/Tests.vue';

const router = createRouter({
    linkActiveClass: 'router-active',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        {
            path: "/apis",
            component: Apis
        },
        {
            path: `/apis/:id/methods`,
            props: true,
            component: Methods
        },
        {
            path: `/methods/:id/testgroups`,
            props: true,
            component: Testgroups
        },
        {
            path: `/testgroups/:id/tests`,
            props: true,
            component: Tests
        }
    ]
})

export default router