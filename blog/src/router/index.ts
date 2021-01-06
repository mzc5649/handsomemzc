import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";

Vue.use(VueRouter);
//路由懒加载
const Index = () => import('@/views/Index.vue');
const Blog = () => import('@/views/Blog.vue')
const BlogIndex = () => import('@/views/blog/Index.vue')
const BlogMessage = () => import('@/views/message/Index.vue')
const Article = () => import('@/views/article/Index.vue')
const ArticleSort = () => import('@/views/sort/Index.vue')
const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Index",
        component: Index
    },
    {
        path: '/404',
        meta: {title: '404'},
        component: () => import('@/views/404.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        redirect: "/blog/index",
        component: Blog,
        meta: {
            title: '博客'
        },
        children: [
            {path: 'index', name: 'BlogIndex', meta: {title: '博客首页',keepAlive:true}, component: BlogIndex},
            {path: 'msg', name: 'BlogMessage', meta: {title: '留言',keepAlive:true}, component: BlogMessage},
            {path: 'article/:id', name: 'Article', meta: {title: '文章详情',keepAlive:false}, component: Article},
            {path: 'sort/:id', name: 'ArticleSort', meta: {title: '分类详情',keepAlive:true}, component: ArticleSort},
        ]

    },
    {path: '*', redirect: '/404'}
];

const router = new VueRouter({
    scrollBehavior: () => {y:0},
    routes,
});

export default router;
