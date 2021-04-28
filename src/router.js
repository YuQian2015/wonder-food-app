import Vue from 'vue'
import VueRouter from 'vue-router'

import UserList from './components/UserList.vue'
import LoginPage from './components/LoginPage.vue'
import Posts from './components/Posts.vue'
import NewPost from './components/NewPost.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/login',
        name: 'login-page',
        component: LoginPage
    },
    {
        path: '/users',
        name: 'user-list',
        component: UserList
    },
    {
        path: '/index',
        name: 'index',
        component: Posts
    },
    {
        path: '/post',
        name: 'post',
        component: NewPost
    }
]

export default new VueRouter({
    mode: 'hash',
    routes
})