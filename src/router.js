import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from './components/LoginPage.vue'
import Posts from './components/Posts.vue'
import NewPost from './components/NewPost.vue'
import Me from './components/Me.vue'
import Comment from './components/Comment.vue'
import User from './components/User.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/login',
        name: 'login-page',
        component: LoginPage
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
    },
    {
        path: '/me',
        name: 'me',
        component: Me
    },
    {
        path: '/comment/:id',
        name: 'comment',
        component: Comment
    },
    {
        path: '/user/:id',
        name: 'user',
        component: User
    }

]

export default new VueRouter({
    mode: 'hash',
    routes
})