import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import EditUserView from "../views/EditUserView.vue";

import EditUserById from "../components/api/EditUserById.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
        },
        {
            path: "/contact",
            name: "contact",
            component: ContactView,
        },
        {
            path: "/editUser",
            name: "edit",
            component: EditUserById,
            props: (route) => ({
                userId: route.params.userId,
                token: route.params.token,
            }),
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

export default router;