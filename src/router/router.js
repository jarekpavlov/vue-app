import Main from '@/pages/Main'
import {createRouter, createWebHistory} from "vue-router";
import PostsPage from "@/pages/PostsPage";
import PostIdPage from "@/pages/PostIdPage";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router