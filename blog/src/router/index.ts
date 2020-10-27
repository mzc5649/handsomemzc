import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";

Vue.use(VueRouter);
//路由懒加载
const Index = () => import('@/views/Index.vue');
const Blog = () => import('@/views/Blog.vue')
const BlogIndex = () => import('@/views/blog/Index.vue')
const BlogMessage = () => import('@/views/message/Index.vue')
const Article = () => import('@/views/article/Index.vue')
const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Index",
        component: Index
    },
    {
        path:'/blog',
        name:'Blog',
        redirect: "/blog/index",
        component:Blog,
        meta:{
          title:'博客'
        },
        children:[
            {path:'index',name:'BlogIndex',component:BlogIndex},
            {path:'msg',name:'BlogMessage',component:BlogMessage},
            {path:'article/:id',name:'Article',component:Article},
        ]
    },

];

const router = new VueRouter({
    routes
});

export default router;
